import { createClient } from "@supabase/supabase-js";
import { fallbackData } from "../data/fallback-data.js";
import { createOfflineQueue } from "../storage/offline-queue.js";

const CACHE_KEY = "it-tech-match-content-cache-v1";
const CONTENT_TIMEOUT_MS = 1800;

function withTimeout(promise, delay = CONTENT_TIMEOUT_MS) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), delay)),
  ]);
}

function hasValidOptions(entry) {
  return entry && typeof entry.id === "string" && typeof entry.question === "string"
    && Array.isArray(entry.options) && entry.options.length >= 3
    && entry.options.every((option) => option && typeof option.label === "string" && option.weights);
}

function validateDataset(dataset) {
  return dataset
    && typeof dataset.gameVersion === "string"
    && typeof dataset.questionVersion === "string"
    && Array.isArray(dataset.instinct) && dataset.instinct.length >= 3 && dataset.instinct.every(hasValidOptions)
    && Array.isArray(dataset.crisis) && dataset.crisis.length >= 1 && dataset.crisis.every(hasValidOptions)
    && Array.isArray(dataset.decisions) && dataset.decisions.length >= 3 && dataset.decisions.every(hasValidOptions)
    && Array.isArray(dataset.buildComponents) && dataset.buildComponents.length >= 8;
}

function readCache() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY));
    return validateDataset(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeCache(dataset) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(dataset));
  } catch {
    // The bundled dataset remains available when browser storage is full.
  }
}

function toQuestion(row) {
  return {
    id: row.id,
    eyebrow: row.metadata?.eyebrow || "Tech signal",
    headline: row.metadata?.headline,
    icon: row.metadata?.icon,
    question: row.question,
    options: row.options,
  };
}

function assembleDataset(configRow, rows) {
  const value = configRow?.value || {};
  const grouped = { instinct: [], crisis: [], decisions: [] };
  for (const row of rows || []) {
    if (grouped[row.round]) grouped[row.round].push(toQuestion(row));
  }
  const dataset = {
    gameVersion: configRow?.version || fallbackData.gameVersion,
    questionVersion: value.questionVersion || rows?.[0]?.version || fallbackData.questionVersion,
    config: { ...fallbackData.config, ...(value.config || {}) },
    buildComponents: value.buildComponents,
    instinct: grouped.instinct,
    crisis: grouped.crisis,
    decisions: grouped.decisions,
  };
  return validateDataset(dataset) ? dataset : null;
}

export function createSupabaseService() {
  const queue = createOfflineQueue();
  const url = import.meta.env.VITE_SUPABASE_URL;
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const client = url && publishableKey
    ? createClient(url, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: { headers: { "x-client-info": "it-tech-match-booth/1.0" } },
    })
    : null;
  let flushing = null;

  async function loadRemoteContent() {
    if (!client) return readCache() || fallbackData;
    try {
      const [configResponse, questionResponse] = await withTimeout(Promise.all([
        client.from("game_config").select("key,value,version,active").eq("key", "booth").eq("active", true).limit(1).maybeSingle(),
        client.from("game_questions").select("id,round,question,options,metadata,version,active").eq("active", true).order("created_at", { ascending: true }),
      ]));
      if (configResponse.error || questionResponse.error) throw new Error("content unavailable");
      const dataset = assembleDataset(configResponse.data, questionResponse.data);
      if (!dataset) throw new Error("content invalid");
      writeCache(dataset);
      return dataset;
    } catch {
      return readCache() || fallbackData;
    }
  }

  async function send(operation) {
    if (!client) throw new Error("offline");
    const names = {
      start: "start_booth_session",
      checkpoint: "record_booth_checkpoint",
      complete: "complete_booth_session",
    };
    const response = await client.rpc(names[operation.type], operation.payload);
    if (response.error) throw response.error;
  }

  async function enqueueOrSend(type, payload) {
    const operation = { type, payload };
    try {
      await send(operation);
    } catch {
      await queue.add(operation);
    }
  }

  async function flushQueue() {
    if (flushing) return flushing;
    flushing = (async () => {
      const entries = await queue.all();
      for (const entry of entries) {
        try {
          await send(entry);
          await queue.remove(entry.id);
        } catch {
          break;
        }
      }
      return queue.count();
    })().finally(() => { flushing = null; });
    return flushing;
  }

  async function getOperatorStats() {
    if (!client) return null;
    try {
      const response = await withTimeout(client.rpc("get_booth_stats"), 2500);
      return response.error ? null : response.data;
    } catch {
      return null;
    }
  }

  const onlineHandler = () => { void flushQueue(); };
  if (client) {
    globalThis.addEventListener("online", onlineHandler);
    setTimeout(() => { void flushQueue(); }, 600);
  }

  return {
    configured: Boolean(client),
    loadContent: loadRemoteContent,
    startSession(payload) { return enqueueOrSend("start", payload); },
    checkpoint(payload) { return enqueueOrSend("checkpoint", payload); },
    completeSession(payload) { return enqueueOrSend("complete", payload); },
    flushQueue,
    pendingCount: () => queue.count(),
    getOperatorStats,
    destroy() {
      globalThis.removeEventListener("online", onlineHandler);
    },
  };
}
