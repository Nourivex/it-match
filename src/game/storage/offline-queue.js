const DB_NAME = "it-tech-match-booth";
const DB_VERSION = 1;
const STORE = "syncQueue";

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) {
      reject(new Error("IndexedDB unavailable"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE)) {
        database.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transaction(database, mode, action) {
  return new Promise((resolve, reject) => {
    const tx = database.transaction(STORE, mode);
    const store = tx.objectStore(STORE);
    const request = action(store);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function createOfflineQueue() {
  let databasePromise = null;
  const memoryFallback = [];

  function getDatabase() {
    databasePromise ??= openDatabase();
    return databasePromise;
  }

  async function add(operation) {
    const record = { ...operation, queuedAt: new Date().toISOString() };
    try {
      const database = await getDatabase();
      return await transaction(database, "readwrite", (store) => store.add(record));
    } catch {
      const id = `memory-${Date.now()}-${memoryFallback.length}`;
      memoryFallback.push({ ...record, id });
      return id;
    }
  }

  async function all() {
    try {
      const database = await getDatabase();
      const records = await transaction(database, "readonly", (store) => store.getAll());
      return [...records, ...memoryFallback].sort((a, b) => String(a.queuedAt).localeCompare(String(b.queuedAt)));
    } catch {
      return [...memoryFallback];
    }
  }

  async function remove(id) {
    if (String(id).startsWith("memory-")) {
      const index = memoryFallback.findIndex((entry) => entry.id === id);
      if (index >= 0) memoryFallback.splice(index, 1);
      return;
    }
    try {
      const database = await getDatabase();
      await transaction(database, "readwrite", (store) => store.delete(id));
    } catch {
      // A failed cleanup remains safe to retry on the next flush.
    }
  }

  async function count() {
    return (await all()).length;
  }

  return { add, all, remove, count };
}
