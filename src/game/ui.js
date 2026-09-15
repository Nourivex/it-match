import { ARCHETYPES, DIMENSION_LABELS, DIMENSIONS } from "./archetypes.js";
import { icon } from "./icons.js";

const CARD_ACCENTS = ["cyan", "violet", "lime", "orange"];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function progressRail(activeRound) {
  const labels = ["INSTINCT", "SYSTEM", "CRISIS", "DECISION"];
  return `
    <footer class="progress-footer" aria-label="Progress permainan">
      <div class="progress-copy"><strong>ROUND ${activeRound} OF 4</strong><span>${labels[activeRound - 1]}</span></div>
      <div class="progress-track" aria-hidden="true">
        ${labels.map((_, index) => `<i class="${index < activeRound ? "is-active" : ""} ${index === activeRound - 1 ? "is-current" : ""}"></i>`).join("")}
      </div>
    </footer>`;
}

function brandHeader(nickname) {
  return `
    <header class="game-header">
      <button class="wordmark" type="button" data-action="go-attract" aria-label="Kembali ke layar awal">
        <span>IT TECH</span><span>MATCH</span>
      </button>
      <div class="header-kicker">BUILD YOUR TECH PATH</div>
      ${nickname ? `<div class="nickname-chip">${icon("profile")}<span>${escapeHtml(nickname)}</span></div>` : '<div class="expo-chip">CAMPUS TECH ARENA</div>'}
    </header>`;
}

function optionCards(question, disabled = false, selectedOptionId = null) {
  return `
    <div class="option-grid" role="group" aria-label="Pilihan jawaban">
      ${question.options.map((option, index) => `
        <button class="option-card accent-${CARD_ACCENTS[index % CARD_ACCENTS.length]} ${selectedOptionId === option.id ? "is-selected" : ""}"
          type="button" data-action="choose-option" data-option-id="${escapeHtml(option.id)}" ${disabled ? "disabled" : ""}>
          <span class="card-icon">${icon(option.icon)}</span>
          <span class="option-copy"><strong>${escapeHtml(option.label)}</strong><small>${escapeHtml(option.detail)}</small></span>
          <span class="card-arrow">${icon("arrow")}</span>
        </button>`).join("")}
    </div>`;
}

function questionView({ question, title, sequence, total, round, feedback, selectedOptionId }) {
  return `
    ${brandHeader("")}
    <main class="game-main question-main">
      <section class="question-panel" aria-labelledby="question-title">
        <div class="section-meta"><span>${escapeHtml(title)}</span><b>${sequence}/${total}</b></div>
        <p class="eyebrow">${escapeHtml(question.eyebrow)}</p>
        <h1 id="question-title" tabindex="-1">${escapeHtml(question.question)}</h1>
      </section>
      ${optionCards(question, Boolean(feedback), selectedOptionId)}
      ${feedback ? `<div class="feedback-toast" role="status">${icon("check")}<span>${escapeHtml(feedback)}</span></div>` : ""}
    </main>
    ${progressRail(round)}`;
}

function renderAttract(notice) {
  return `
    <main class="attract-screen">
      <section class="attract-copy">
        <div class="event-label"><span></span> CAMPUS TECHNOLOGY EXPERIENCE</div>
        <h1><span>IT TECH</span><span>MATCH</span></h1>
        <p class="attract-tagline">What’s your tech instinct?</p>
        <div class="attract-facts" aria-label="Informasi permainan">
          <span><b>2</b> MINUTES</span><i></i><span><b>4</b> CHALLENGES</span><i></i><span><b>1</b> TECH PATH</span>
        </div>
        ${notice ? `<p class="friendly-notice" role="status">${escapeHtml(notice)}</p>` : ""}
        <button class="primary-action start-action" type="button" data-action="start" data-autofocus>
          <span>START THE MATCH</span>${icon("arrow")}
        </button>
        <p class="no-device-note">No phone. No login. Langsung main di sini.</p>
      </section>
      <section class="arena-visual" aria-hidden="true">
        <div class="arena-orbit orbit-one"></div><div class="arena-orbit orbit-two"></div>
        <div class="arena-center"><span>YOUR</span><strong>TECH</strong><span>PATH</span></div>
        ${["BUILDER", "SOLVER", "EXPLORER", "DESIGNER", "GUARDIAN", "ANALYST"].map((label, index) => `<div class="arena-node node-${index + 1}"><i></i>${label}</div>`).join("")}
      </section>
      <footer class="attract-footer">
        <span>INTERACTIVE INFORMATICS EXHIBITION</span>
        <button type="button" class="operator-link" data-action="operator">OPERATOR</button>
      </footer>
    </main>`;
}

function renderWelcome() {
  return `
    ${brandHeader("")}
    <main class="game-main welcome-main">
      <section class="welcome-card">
        <div class="welcome-index">00</div>
        <div class="welcome-copy">
          <p class="eyebrow">Before we begin</p>
          <h1 tabindex="-1">Siapa nama panggilanmu?</h1>
          <p>Opsional. Tidak perlu nama asli—hasilmu tetap bisa muncul tanpa nama.</p>
          <form class="nickname-form" data-form="nickname">
            <label for="nickname">NAMA PANGGILAN <span>OPTIONAL</span></label>
            <input id="nickname" name="nickname" maxlength="24" autocomplete="off" placeholder="Tulis di sini…" data-autofocus>
            <div class="welcome-actions">
              <button class="secondary-action" type="button" data-action="skip-nickname"><span>SKIP</span></button>
              <button class="primary-action" type="submit"><span>LET’S GO</span>${icon("arrow")}</button>
            </div>
          </form>
        </div>
        <aside class="intro-note">
          <strong>TRUST YOUR INSTINCT</strong>
          <p>Tidak ada jawaban salah. Pilih yang paling membuatmu penasaran.</p>
          <div class="intro-steps"><i></i><i></i><i></i><i></i></div>
        </aside>
      </section>
    </main>
    <footer class="simple-footer"><span>4 quick challenges</span><span>Directional, not scientific</span></footer>`;
}

function renderBuild(state, data) {
  const selected = new Set(state.buildOrder);
  const selectedComponents = state.buildOrder.map((id) => data.buildComponents.find((component) => component.id === id)).filter(Boolean);
  return `
    ${brandHeader(state.nickname)}
    <main class="game-main build-main">
      <section class="build-heading">
        <div><p class="eyebrow">Round 2 — Build the system</p><h1 tabindex="-1">Rancang sistem pendaftaran mahasiswa baru.</h1></div>
        <p>Pilih <strong>4 komponen</strong> yang ingin kamu prioritaskan. Urutan pilihanmu ikut membentuk profil.</p>
      </section>
      <section class="system-builder">
        <div class="system-zone">
          <div class="system-zone-head"><span>YOUR SYSTEM</span><b>${state.buildOrder.length}/4</b></div>
          <div class="system-slots" data-drop-zone>
            ${[0, 1, 2, 3].map((index) => {
              const component = selectedComponents[index];
              return component
                ? `<button class="system-slot is-filled" type="button" data-action="remove-component" data-component-id="${component.id}" draggable="true"><span class="slot-number">0${index + 1}</span>${icon(component.icon)}<strong>${component.label}</strong><small>Tap to remove</small></button>`
                : `<div class="system-slot"><span class="slot-number">0${index + 1}</span><span class="slot-plus">+</span><small>PRIORITY</small></div>`;
            }).join("")}
          </div>
          <div class="system-feedback" role="status">${state.feedback ? `${icon("check")}<span>${escapeHtml(state.feedback)}</span>` : "<span>Tap kartu di bawah atau seret ke area sistem.</span>"}</div>
        </div>
        <div class="component-bank" aria-label="Komponen teknologi">
          ${data.buildComponents.map((component, index) => `
            <button class="tech-card accent-${CARD_ACCENTS[index % 4]} ${selected.has(component.id) ? "is-used" : ""}" type="button"
              data-action="add-component" data-component-id="${component.id}" draggable="true" ${selected.has(component.id) || state.buildOrder.length >= 4 ? "disabled" : ""}>
              ${icon(component.icon)}<span><strong>${component.label}</strong><small>${component.description}</small></span><b>+</b>
            </button>`).join("")}
        </div>
      </section>
      <div class="build-actions">
        <span>${state.buildOrder.length < 4 ? `Pilih ${4 - state.buildOrder.length} lagi` : "Sistem siap dieksplorasi"}</span>
        <button class="primary-action" type="button" data-action="finish-build" ${state.buildOrder.length !== 4 ? "disabled" : ""}><span>CONTINUE</span>${icon("arrow")}</button>
      </div>
    </main>
    ${progressRail(2)}`;
}

function renderCrisis(state, data) {
  const question = data.crisis[state.crisisIndex % data.crisis.length];
  return `
    ${brandHeader(state.nickname)}
    <main class="game-main crisis-main">
      <section class="crisis-banner">
        <div class="crisis-pulse">${icon(question.icon || "alert")}</div>
        <div><p class="eyebrow">Round 3 — Tech crisis</p><h1>${escapeHtml(question.headline || "TECH SIGNAL")}</h1></div>
        <span>CHOOSE YOUR FIRST MOVE</span>
      </section>
      <section class="question-panel crisis-question" aria-labelledby="crisis-title">
        <p class="eyebrow">${escapeHtml(question.eyebrow)}</p>
        <h2 id="crisis-title" tabindex="-1">${escapeHtml(question.question)}</h2>
      </section>
      ${optionCards(question, Boolean(state.feedback), state.selectedOptionId)}
      ${state.feedback ? `<div class="feedback-toast" role="status">${icon("check")}<span>${escapeHtml(state.feedback)}</span></div>` : ""}
    </main>
    ${progressRail(3)}`;
}

function renderCalculating(state) {
  return `
    ${brandHeader(state.nickname)}
    <main class="calculating-screen" aria-live="polite">
      <div class="profile-spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><strong>6</strong></div>
      <p class="eyebrow">Connecting your signals</p>
      <h1 tabindex="-1">CALCULATING<br>TECH PROFILE</h1>
      <p>Merangkai pilihan, prioritas, dan insting teknologimu…</p>
      <div class="calculate-track"><span></span></div>
    </main>`;
}

function renderResult(state) {
  const profile = state.profile;
  const archetype = ARCHETYPES[profile.archetype];
  const strongest = profile.ranked.slice(0, 2);
  return `
    ${brandHeader(state.nickname)}
    <main class="result-main accent-result-${archetype.accent}">
      <section class="result-reveal">
        <p class="eyebrow">Your tech path</p>
        <div class="result-number">01 / 06</div>
        <h1 tabindex="-1">${archetype.name}</h1>
        <p class="result-description">${escapeHtml(archetype.description)}</p>
        <div class="tendency-row" aria-label="Kecenderungan terkuat">
          ${strongest.map((dimension) => `<span>${DIMENSION_LABELS[dimension]} <b>${profile.scores[dimension]}</b></span>`).join("")}
        </div>
        <div class="discovery-line"><i></i><p>Maybe Informatics has more than one path for you.</p></div>
      </section>
      <section class="profile-panel">
        <div class="profile-heading"><div><p class="eyebrow">Your signal map</p><h2>TECH PROFILE</h2></div><span>Directional<br>not scientific</span></div>
        <div class="profile-bars">
          ${DIMENSIONS.map((dimension, index) => `
            <div class="profile-row">
              <div><span>0${index + 1}</span><strong>${DIMENSION_LABELS[dimension]}</strong><b>${profile.scores[dimension]}</b></div>
              <div class="bar-track"><i style="--score:${profile.scores[dimension]}%"></i></div>
            </div>`).join("")}
        </div>
        <div class="explore-areas"><p class="eyebrow">You may enjoy exploring</p><div>${archetype.areas.map((area) => `<span>${escapeHtml(area)}</span>`).join("")}</div></div>
      </section>
      <section class="result-actions">
        <button class="primary-action" type="button" data-action="explore"><span>EXPLORE INFORMATICS</span>${icon("arrow")}</button>
        <button class="secondary-action" type="button" data-action="play-again"><span>PLAY AGAIN</span></button>
        <button class="text-action" type="button" data-action="next-player">NEXT PLAYER →</button>
      </section>
    </main>`;
}

function renderCommunity(state, data) {
  const url = data.config?.communityCtaUrl;
  return `
    ${brandHeader(state.nickname)}
    <main class="community-main">
      <section class="community-panel">
        <div class="community-mark">${icon("spark")}</div>
        <p class="eyebrow">Curious where this path can take you?</p>
        <h1 tabindex="-1">Temukan lebih banyak jalur di Informatika.</h1>
        <p>Ngobrol dengan tim Informatika di booth ini. Tanyakan mata kuliah, komunitas, proyek mahasiswa, atau bidang teknologi yang ingin kamu coba.</p>
        <div class="community-points"><span>PROJECTS</span><span>COMMUNITY</span><span>CAREERS</span></div>
        ${url ? `<a class="primary-action" href="${escapeHtml(url)}" target="_blank" rel="noopener"><span>OPEN OFFICIAL PAGE</span>${icon("arrow")}</a>` : '<div class="booth-cta">LANGKAH BERIKUTNYA <strong>TANYA TIM DI BOOTH →</strong></div>'}
      </section>
      <section class="community-actions">
        <button class="secondary-action" type="button" data-action="play-again"><span>PLAY AGAIN</span></button>
        <button class="primary-action" type="button" data-action="next-player"><span>NEXT PLAYER</span>${icon("arrow")}</button>
      </section>
    </main>`;
}

function durationLabel(milliseconds = 0) {
  if (!milliseconds) return "—";
  const seconds = Math.round(milliseconds / 1000);
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`;
}

function renderOperator(operatorStats, pendingCount, isRemote) {
  const stats = operatorStats || { started: 0, completed: 0, completionRate: 0, averageDurationMs: 0, archetypes: {}, interests: {} };
  const totalArchetypes = Object.values(stats.archetypes || {}).reduce((sum, value) => sum + Number(value || 0), 0);
  const topInterests = Object.entries(stats.interests || {}).sort((a, b) => b[1] - a[1]).slice(0, 4);
  return `
    ${brandHeader("")}
    <main class="operator-main">
      <section class="operator-heading"><div><p class="eyebrow">Booth operator</p><h1 tabindex="-1">TODAY’S PULSE</h1></div><div class="sync-chip ${pendingCount ? "has-pending" : ""}"><i></i>${pendingCount ? `${pendingCount} waiting to sync` : isRemote ? "Supabase synced" : "Local mode"}</div></section>
      <section class="metric-grid">
        <article><span>PLAYERS</span><strong>${stats.started || 0}</strong><small>games started</small></article>
        <article><span>COMPLETED</span><strong>${stats.completed || 0}</strong><small>${stats.completionRate || 0}% completion</small></article>
        <article><span>AVERAGE</span><strong>${durationLabel(stats.averageDurationMs)}</strong><small>session duration</small></article>
      </section>
      <section class="operator-panels">
        <article class="distribution-panel"><div class="panel-title"><h2>TECH PATH DISTRIBUTION</h2><span>${totalArchetypes} RESULTS</span></div>
          ${Object.keys(ARCHETYPES).map((key) => {
            const count = Number(stats.archetypes?.[key] || 0);
            const percent = totalArchetypes ? Math.round((count / totalArchetypes) * 100) : 0;
            return `<div class="distribution-row"><span>${ARCHETYPES[key].shortName}</span><div><i style="--score:${percent}%"></i></div><b>${percent}%</b></div>`;
          }).join("")}
        </article>
        <article class="interest-panel"><div class="panel-title"><h2>TOP SYSTEM PICKS</h2><span>LOCAL VIEW</span></div>
          ${topInterests.length ? topInterests.map(([name, count], index) => `<div class="interest-row"><span>0${index + 1}</span><strong>${escapeHtml(name.toUpperCase())}</strong><b>${count}</b></div>`).join("") : '<p class="empty-state">Hasil sesi hari ini akan muncul di sini.</p>'}
        </article>
      </section>
      <div class="operator-actions"><button class="secondary-action" type="button" data-action="refresh-operator"><span>REFRESH DATA</span></button><button class="primary-action" type="button" data-action="exit-operator"><span>BACK TO ATTRACT</span>${icon("arrow")}</button></div>
    </main>`;
}

function renderIdleConfirm() {
  return `
    <main class="idle-screen">
      <section class="idle-card" role="dialog" aria-modal="true" aria-labelledby="idle-title">
        <div class="idle-icon">${icon("spark")}</div>
        <p class="eyebrow">Booth check</p>
        <h1 id="idle-title" tabindex="-1">Masih bermain?</h1>
        <p>Tekan lanjut untuk kembali ke tantanganmu. Booth akan reset otomatis jika tidak digunakan.</p>
        <div><button class="primary-action" type="button" data-action="resume"><span>LANJUT</span>${icon("arrow")}</button><button class="secondary-action" type="button" data-action="next-player"><span>RESET</span></button></div>
      </section>
    </main>`;
}

export function renderApp({ state, data, notice, operatorStats, pendingCount = 0, operatorRemote = false }) {
  if (state.screen === "attract") return renderAttract(notice);
  if (state.screen === "welcome") return renderWelcome();
  if (state.screen === "round1") {
    return questionView({
      question: data.instinct[state.roundOneIndex],
      title: "ROUND 1 — PICK YOUR INSTINCT",
      sequence: state.roundOneIndex + 1,
      total: data.instinct.length,
      round: 1,
      feedback: state.feedback,
      selectedOptionId: state.selectedOptionId,
    });
  }
  if (state.screen === "build") return renderBuild(state, data);
  if (state.screen === "crisis") return renderCrisis(state, data);
  if (state.screen === "round4") {
    return questionView({
      question: data.decisions[state.roundFourIndex],
      title: "ROUND 4 — MAKE THE DECISION",
      sequence: state.roundFourIndex + 1,
      total: data.decisions.length,
      round: 4,
      feedback: state.feedback,
      selectedOptionId: state.selectedOptionId,
    });
  }
  if (state.screen === "calculating") return renderCalculating(state);
  if (state.screen === "result") return renderResult(state);
  if (state.screen === "community") return renderCommunity(state, data);
  if (state.screen === "operator") return renderOperator(operatorStats, pendingCount, operatorRemote);
  if (state.screen === "idle") return renderIdleConfirm();
  return renderAttract("Sesi sebelumnya telah dibersihkan. Silakan mulai lagi.");
}
