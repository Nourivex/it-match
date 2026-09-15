const LOCAL_KEY = "it-tech-match-local-analytics-v1";
const MAX_RECORDS = 600;

function readRecords() {
  try {
    const value = JSON.parse(localStorage.getItem(LOCAL_KEY));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeRecords(records) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(records.slice(-MAX_RECORDS)));
  } catch {
    // Analytics never blocks a booth session.
  }
}

export function createLocalAnalytics() {
  function started(sessionId, startedAt) {
    const records = readRecords().filter((record) => record.sessionId !== sessionId);
    records.push({ sessionId, startedAt, completed: false });
    writeRecords(records);
  }

  function completed(sessionId, details) {
    const records = readRecords();
    const index = records.findIndex((record) => record.sessionId === sessionId);
    const next = {
      ...(index >= 0 ? records[index] : { sessionId, startedAt: details.completedAt }),
      completed: true,
      ...details,
    };
    if (index >= 0) records[index] = next;
    else records.push(next);
    writeRecords(records);
  }

  function today() {
    const day = new Date().toISOString().slice(0, 10);
    const records = readRecords().filter((record) => String(record.startedAt).slice(0, 10) === day);
    const completedRecords = records.filter((record) => record.completed);
    const archetypes = {};
    const interests = {};
    for (const record of completedRecords) {
      archetypes[record.archetype] = (archetypes[record.archetype] || 0) + 1;
      for (const interest of record.buildOrder || []) interests[interest] = (interests[interest] || 0) + 1;
    }
    return {
      started: records.length,
      completed: completedRecords.length,
      completionRate: records.length ? Math.round((completedRecords.length / records.length) * 100) : 0,
      averageDurationMs: completedRecords.length
        ? Math.round(completedRecords.reduce((sum, record) => sum + (record.durationMs || 0), 0) / completedRecords.length)
        : 0,
      archetypes,
      interests,
    };
  }

  return { started, completed, today };
}
