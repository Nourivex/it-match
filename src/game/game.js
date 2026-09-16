import { createLocalAnalytics } from "./analytics.js";
import { createBoothAudio } from "./audio.js";
import { getLocalizedFallbackData } from "./data/localized-data.js";
import { createTranslator, getInitialLocale, normalizeLocale, setStoredLocale } from "./i18n.js";
import { calculateProfile } from "./scoring.js";
import { createGameState } from "./state.js";
import { createSupabaseService } from "./supabase/service.js";
import { renderApp } from "./ui.js";

function numberTweak(tweaks, key, fallback) {
  const value = Number(tweaks?.get?.(key));
  return Number.isFinite(value) ? value : fallback;
}

function boolTweak(tweaks, key, fallback) {
  const value = tweaks?.get?.(key);
  return typeof value === "boolean" ? value : fallback;
}

function normaliseRemoteStats(remote, local) {
  if (!remote || typeof remote !== "object") return local;
  return {
    started: Number(remote.started ?? remote.players ?? local.started) || 0,
    completed: Number(remote.completed ?? local.completed) || 0,
    completionRate: Number(remote.completionRate ?? remote.completion_rate ?? local.completionRate) || 0,
    averageDurationMs: Number(remote.averageDurationMs ?? remote.average_duration_ms ?? local.averageDurationMs) || 0,
    archetypes: remote.archetypes || remote.archetype_distribution || local.archetypes,
    interests: local.interests,
  };
}

export function createGame({ mount, sdk, tweaks }) {
  const store = createGameState();
  const persistence = createSupabaseService();
  const analytics = createLocalAnalytics();
  const audio = createBoothAudio(sdk);
  let locale = getInitialLocale();
  let t = createTranslator(locale);
  let data = getLocalizedFallbackData(locale);
  let remoteData = null;
  let notice = "";
  let operatorStats = null;
  let operatorRemote = false;
  let pendingCount = 0;
  let inputLocked = false;
  let draggedComponentId = null;
  let timers = new Set();
  let idleTimer = null;
  let unsubscribers = [];
  const config = {
    feedbackDelayMs: numberTweak(tweaks, "feedbackDelayMs", 520),
    resultIdleSeconds: numberTweak(tweaks, "resultIdleSeconds", 90),
    activeIdleSeconds: numberTweak(tweaks, "activeIdleSeconds", 180),
    soundEnabled: boolTweak(tweaks, "soundEnabled", true),
  };

  function later(callback, delay) {
    const timer = setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
    return timer;
  }

  function clearTimers() {
    for (const timer of timers) clearTimeout(timer);
    timers = new Set();
    idleTimer = null;
  }

  function focusScreen() {
    requestAnimationFrame(() => {
      const target = mount.querySelector("[data-autofocus], h1[tabindex='-1'], h2[tabindex='-1']");
      target?.focus({ preventScroll: true });
    });
  }

  function applyLocale(next, options = {}) {
    locale = normalizeLocale(next);
    t = createTranslator(locale);
    setStoredLocale(locale);
    try {
      document.documentElement.lang = locale;
    } catch {
      // Non-DOM environment.
    }
    // Remote CMS content is treated as Indonesian; English keeps the bundled EN set
    // so the quiz stays fully translated even when Supabase content loads.
    data = locale === "en" ? getLocalizedFallbackData("en") : remoteData || getLocalizedFallbackData("id");
    if (!options.silent) render({ focus: false });
  }

  function render({ focus = true } = {}) {
    mount.innerHTML = renderApp({
      state: store.get(),
      data,
      notice,
      operatorStats,
      pendingCount,
      operatorRemote,
      locale,
      t,
    });
    if (focus) focusScreen();
    scheduleIdle();
  }

  function startPayload(state) {
    return {
      p_session_id: state.sessionId,
      p_nickname: null,
      p_started_at: state.startedAt,
      p_game_version: data.gameVersion,
      p_question_version: data.questionVersion,
    };
  }

  function checkpoint(round, metadata = {}) {
    const state = store.get();
    void persistence.checkpoint({
      p_session_id: state.sessionId,
      p_event_type: "round_completed",
      p_round: round,
      p_metadata: metadata,
    });
  }

  function beginSession() {
    clearTimers();
    inputLocked = false;
    notice = "";
    const currentStarts = analytics.today().started;
    const state = store.startSession();
    store.patch({ crisisIndex: currentStarts % data.crisis.length });
    analytics.started(state.sessionId, state.startedAt);
    void persistence.startSession(startPayload(store.get()));
    audio.select();
    render();
  }

  function beginRoundOne(nickname = "") {
    store.patch({ screen: "round1", nickname: nickname.trim().slice(0, 24), feedback: null, selectedOptionId: null });
    store.addEvent("round_started", 1);
    audio.select();
    render();
  }

  function activeQuestion(state) {
    if (state.screen === "round1") return data.instinct[state.roundOneIndex];
    if (state.screen === "crisis") return data.crisis[state.crisisIndex % data.crisis.length];
    if (state.screen === "round4") return data.decisions[state.roundFourIndex];
    return null;
  }

  function chooseOption(optionId) {
    if (inputLocked) return;
    const state = store.get();
    const question = activeQuestion(state);
    const option = question?.options.find((entry) => entry.id === optionId);
    if (!question || !option) return;
    inputLocked = true;
    const round = state.screen === "round1" ? 1 : state.screen === "crisis" ? 3 : 4;
    store.recordAnswer(round, question, option);
    store.patch({ selectedOptionId: option.id });
    audio.select();
    render({ focus: false });

    later(() => {
      const latest = store.get();
      if (latest.screen === "round1") {
        if (latest.roundOneIndex + 1 < data.instinct.length) {
          store.patch({ roundOneIndex: latest.roundOneIndex + 1, feedback: null, selectedOptionId: null });
        } else {
          store.addEvent("round_completed", 1, { answerCount: data.instinct.length });
          checkpoint(1, { answerCount: data.instinct.length });
          store.patch({ screen: "build", feedback: null, selectedOptionId: null });
          store.addEvent("round_started", 2);
        }
      } else if (latest.screen === "crisis") {
        store.addEvent("round_completed", 3, { incidentId: question.id });
        checkpoint(3, { incidentId: question.id });
        store.patch({ screen: "round4", roundFourIndex: 0, feedback: null, selectedOptionId: null });
        store.addEvent("round_started", 4);
      } else if (latest.screen === "round4") {
        if (latest.roundFourIndex + 1 < data.decisions.length) {
          store.patch({ roundFourIndex: latest.roundFourIndex + 1, feedback: null, selectedOptionId: null });
        } else {
          store.addEvent("round_completed", 4, { answerCount: data.decisions.length });
          checkpoint(4, { answerCount: data.decisions.length });
          finishProfile();
          return;
        }
      }
      inputLocked = false;
      render();
    }, config.feedbackDelayMs);
  }

  function addComponent(componentId) {
    const state = store.get();
    if (state.screen !== "build" || state.buildOrder.includes(componentId) || state.buildOrder.length >= 4) return;
    const component = data.buildComponents.find((entry) => entry.id === componentId);
    if (!component) return;
    const next = [...state.buildOrder, componentId];
    store.setBuildOrder(next);
    store.patch({ feedback: next.length === 1 ? t("game.firstPriority", { label: component.label }) : t("game.addedAngle", { label: component.label }) });
    audio.place(next.length);
    render({ focus: false });
  }

  function removeComponent(componentId) {
    const state = store.get();
    if (state.screen !== "build") return;
    store.setBuildOrder(state.buildOrder.filter((id) => id !== componentId));
    store.patch({ feedback: t("game.removed") });
    audio.select();
    render({ focus: false });
  }

  function finishBuild() {
    const state = store.get();
    if (state.buildOrder.length !== 4) return;
    store.addEvent("system_built", 2, { order: state.buildOrder });
    store.addEvent("round_completed", 2, { order: state.buildOrder });
    checkpoint(2, { order: state.buildOrder });
    store.patch({ screen: "crisis", feedback: null, selectedOptionId: null });
    store.addEvent("round_started", 3, { incidentId: data.crisis[state.crisisIndex % data.crisis.length].id });
    audio.select();
    render();
  }

  function finishProfile() {
    const state = store.get();
    const profile = calculateProfile({
      answers: state.answers,
      buildOrder: state.buildOrder,
      buildComponents: data.buildComponents,
    });
    const completedAt = new Date().toISOString();
    const durationMs = Math.max(0, new Date(completedAt).getTime() - new Date(state.startedAt).getTime());
    store.patch({ screen: "calculating", profile, completedAt, feedback: null, selectedOptionId: null });
    store.addEvent("profile_calculated", 4, { archetype: profile.archetype });
    const completedState = store.get();
    analytics.completed(completedState.sessionId, {
      completedAt,
      durationMs,
      archetype: profile.archetype,
      buildOrder: completedState.buildOrder,
    });
    void persistence.completeSession({
      p_session_id: completedState.sessionId,
      p_nickname: completedState.nickname || null,
      p_completed_at: completedAt,
      p_duration_ms: durationMs,
      p_game_version: data.gameVersion,
      p_question_version: data.questionVersion,
      p_archetype: profile.archetype,
      p_builder_score: profile.scores.builder,
      p_problem_solver_score: profile.scores.problemSolver,
      p_explorer_score: profile.scores.explorer,
      p_designer_score: profile.scores.designer,
      p_guardian_score: profile.scores.guardian,
      p_analyst_score: profile.scores.analyst,
      p_total_score: profile.totalScore,
      p_events: completedState.events,
    });
    render();
    later(() => {
      if (store.get().screen !== "calculating") return;
      store.patch({ screen: "result" });
      audio.reveal();
      inputLocked = false;
      render();
    }, 1250);
  }

  function cleanReset(screen = "attract") {
    clearTimers();
    inputLocked = false;
    draggedComponentId = null;
    notice = "";
    operatorStats = null;
    operatorRemote = false;
    store.reset(screen);
    render();
  }

  async function openOperator() {
    clearTimers();
    store.patch({ screen: "operator" });
    operatorStats = analytics.today();
    operatorRemote = false;
    pendingCount = await persistence.pendingCount();
    render();
    const remote = await persistence.getOperatorStats();
    if (store.get().screen !== "operator") return;
    operatorStats = normaliseRemoteStats(remote, analytics.today());
    operatorRemote = Boolean(remote);
    pendingCount = await persistence.pendingCount();
    render({ focus: false });
  }

  function showIdleConfirm() {
    const state = store.get();
    if (["attract", "operator", "idle"].includes(state.screen)) return;
    store.patch({ previousScreen: state.screen, screen: "idle" });
    render();
    later(() => {
      if (store.get().screen === "idle") cleanReset("attract");
    }, 15000);
  }

  function scheduleIdle() {
    if (idleTimer !== null) {
      clearTimeout(idleTimer);
      timers.delete(idleTimer);
      idleTimer = null;
    }
    const screen = store.get().screen;
    let seconds = 0;
    let callback = null;
    if (["welcome", "round1", "build", "crisis", "round4"].includes(screen)) {
      seconds = Number(data.config?.activeIdleSeconds) || config.activeIdleSeconds;
      callback = showIdleConfirm;
    } else if (["result", "community"].includes(screen)) {
      seconds = Number(data.config?.resultIdleSeconds) || config.resultIdleSeconds;
      callback = () => cleanReset("attract");
    }
    if (!callback || seconds <= 0) return;
    idleTimer = later(() => {
      idleTimer = null;
      callback();
    }, seconds * 1000);
  }

  function resumeFromIdle() {
    const state = store.get();
    const previous = state.previousScreen;
    if (!previous) {
      cleanReset("attract");
      return;
    }
    clearTimers();
    store.patch({ screen: previous, previousScreen: null });
    render();
  }

  function friendlyRecovery() {
    clearTimers();
    store.reset("attract");
    notice = t("notice.cleaned");
    render();
  }

  function handleAction(action, target) {
    if (action === "start") beginSession();
    else if (action === "set-locale") applyLocale(target.dataset.locale);
    else if (action === "skip-nickname") beginRoundOne("");
    else if (action === "choose-option") chooseOption(target.dataset.optionId);
    else if (action === "add-component") addComponent(target.dataset.componentId);
    else if (action === "remove-component") removeComponent(target.dataset.componentId);
    else if (action === "finish-build") finishBuild();
    else if (action === "explore") { store.patch({ screen: "community" }); audio.select(); render(); }
    else if (action === "play-again") beginSession();
    else if (action === "next-player") cleanReset("attract");
    else if (action === "go-attract") showIdleConfirm();
    else if (action === "resume") resumeFromIdle();
    else if (action === "operator" || action === "refresh-operator") void openOperator();
    else if (action === "exit-operator") cleanReset("attract");
  }

  function onClick(event) {
    const target = event.target.closest("[data-action]");
    if (!target || !mount.contains(target)) return;
    try {
      handleAction(target.dataset.action, target);
    } catch {
      friendlyRecovery();
    }
  }

  function onSubmit(event) {
    if (!event.target.matches("[data-form='nickname']")) return;
    event.preventDefault();
    const formData = new FormData(event.target);
    beginRoundOne(String(formData.get("nickname") || ""));
  }

  function onDragStart(event) {
    const card = event.target.closest("[data-component-id]");
    draggedComponentId = card?.dataset.componentId || null;
    if (event.dataTransfer && draggedComponentId) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", draggedComponentId);
    }
  }

  function onDragOver(event) {
    if (!event.target.closest("[data-drop-zone]")) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  }

  function onDrop(event) {
    if (!event.target.closest("[data-drop-zone]")) return;
    event.preventDefault();
    const id = event.dataTransfer?.getData("text/plain") || draggedComponentId;
    if (id) addComponent(id);
    draggedComponentId = null;
  }

  function onKeyDown(event) {
    audio.unlock();
    if (event.key !== "Escape") return;
    const screen = store.get().screen;
    if (screen === "community") { store.patch({ screen: "result" }); render(); }
    else if (screen === "operator") cleanReset("attract");
    else if (screen === "idle") resumeFromIdle();
  }

  function onPointerDown() {
    audio.unlock();
  }

  function subscribeTweaks() {
    const entries = [
      ["feedbackDelayMs", (value) => { config.feedbackDelayMs = Number(value) || 520; }],
      ["resultIdleSeconds", (value) => { config.resultIdleSeconds = Number(value) || 90; scheduleIdle(); }],
      ["activeIdleSeconds", (value) => { config.activeIdleSeconds = Number(value) || 180; scheduleIdle(); }],
      ["soundEnabled", (value) => { config.soundEnabled = Boolean(value); audio.setEnabled(config.soundEnabled); }],
    ];
    unsubscribers = entries.map(([key, callback]) => tweaks?.subscribe?.(key, callback)).filter(Boolean);
    audio.setEnabled(config.soundEnabled);
  }

  return {
    start() {
      mount.className = "booth-app";
      applyLocale(locale, { silent: true });
      mount.addEventListener("click", onClick);
      mount.addEventListener("submit", onSubmit);
      mount.addEventListener("dragstart", onDragStart);
      mount.addEventListener("dragover", onDragOver);
      mount.addEventListener("drop", onDrop);
      mount.addEventListener("keydown", onKeyDown, true);
      mount.addEventListener("pointerdown", onPointerDown, true);
      subscribeTweaks();
      void audio.prepare();
      if (globalThis.location.hash === "#operator") void openOperator();
      else render();
      void persistence.loadContent().then((loaded) => {
        remoteData = loaded;
        if (locale === "id") {
          data = loaded;
          if (store.get().screen === "attract") render({ focus: false });
        }
      });
    },
    destroy() {
      clearTimers();
      mount.removeEventListener("click", onClick);
      mount.removeEventListener("submit", onSubmit);
      mount.removeEventListener("dragstart", onDragStart);
      mount.removeEventListener("dragover", onDragOver);
      mount.removeEventListener("drop", onDrop);
      mount.removeEventListener("keydown", onKeyDown, true);
      mount.removeEventListener("pointerdown", onPointerDown, true);
      for (const unsubscribe of unsubscribers) unsubscribe();
      persistence.destroy();
      void audio.destroy();
      mount.replaceChildren();
      mount.className = "";
    },
  };
}
