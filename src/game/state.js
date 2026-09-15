function makeSessionId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `booth-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createInitialState(screen = "attract") {
  return {
    screen,
    sessionId: null,
    nickname: "",
    startedAt: null,
    completedAt: null,
    roundOneIndex: 0,
    roundFourIndex: 0,
    crisisIndex: 0,
    answers: [],
    buildOrder: [],
    events: [],
    profile: null,
    feedback: null,
    previousScreen: null,
  };
}

export function createGameState() {
  let state = createInitialState();

  return {
    get() {
      return state;
    },
    patch(next) {
      state = { ...state, ...next };
      return state;
    },
    startSession() {
      const now = new Date();
      state = {
        ...createInitialState("welcome"),
        sessionId: makeSessionId(),
        startedAt: now.toISOString(),
      };
      return state;
    },
    recordAnswer(round, question, option) {
      state = {
        ...state,
        answers: [
          ...state.answers,
          {
            round,
            questionId: question.id,
            optionId: option.id,
            weights: { ...option.weights },
            primary: option.primary,
          },
        ],
        events: [
          ...state.events,
          { eventType: "answer_selected", round, metadata: { questionId: question.id, optionId: option.id } },
        ],
        feedback: option.feedback,
      };
      return state;
    },
    setBuildOrder(buildOrder) {
      state = { ...state, buildOrder: [...buildOrder] };
      return state;
    },
    addEvent(eventType, round, metadata = {}) {
      state = { ...state, events: [...state.events, { eventType, round, metadata }] };
      return state;
    },
    reset(screen = "attract") {
      state = createInitialState(screen);
      return state;
    },
  };
}
