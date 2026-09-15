export function createBoothAudio(sdk) {
  let audio = null;
  let contextPromise = null;
  let enabled = true;

  function prepare() {
    if (!contextPromise) {
      contextPromise = sdk.audio.getContext().then((handle) => {
        audio = handle;
        return handle;
      }).catch(() => null);
    }
    return contextPromise;
  }

  function unlock() {
    void prepare().then((handle) => handle?.unlock()).catch(() => {});
  }

  function tone(frequency = 520, duration = 0.07, volume = 0.035) {
    if (!enabled || !audio || audio.context.state !== "running") return;
    const now = audio.context.currentTime;
    const oscillator = audio.context.createOscillator();
    const gain = audio.context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    oscillator.connect(gain).connect(audio.context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  return {
    prepare,
    unlock,
    select() { tone(520, 0.06); },
    place(index) { tone(440 + index * 70, 0.08); },
    reveal() {
      tone(440, 0.15, 0.045);
      setTimeout(() => tone(660, 0.18, 0.04), 110);
    },
    setEnabled(value) { enabled = Boolean(value); },
    async destroy() {
      if (audio) await audio.dispose().catch(() => {});
      audio = null;
    },
  };
}
