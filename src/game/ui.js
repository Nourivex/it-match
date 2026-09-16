import { ARCHETYPES, DIMENSIONS, getArchetypeDescription, getDimensionLabels } from "./archetypes.js";
import { SUPPORTED_LOCALES } from "./i18n.js";
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

function languageSwitcher(locale, t, variant = "") {
  return `
    <div class="locale-switcher ${variant}" role="group" aria-label="${escapeHtml(t("attract.languageLabel"))}">
      ${SUPPORTED_LOCALES.map((entry) => `
        <button type="button" class="locale-btn ${locale === entry.code ? "is-active" : ""}"
          data-action="set-locale" data-locale="${entry.code}"
          aria-pressed="${locale === entry.code ? "true" : "false"}"
          title="${escapeHtml(entry.name)}">${entry.label}</button>`).join("")}
    </div>`;
}

function progressRail(activeRound, t) {
  const labels = t("meta.roundNames");
  return `
    <footer class="progress-footer" aria-label="${escapeHtml(t("meta.progressLabel"))}">
      <div class="progress-copy"><strong>${escapeHtml(t("meta.roundOf", { active: activeRound }))}</strong><span>${escapeHtml(labels[activeRound - 1])}</span></div>
      <div class="progress-track" aria-hidden="true">
        ${labels.map((_, index) => `<i class="${index < activeRound ? "is-active" : ""} ${index === activeRound - 1 ? "is-current" : ""}"></i>`).join("")}
      </div>
    </footer>`;
}

function brandHeader(nickname, locale, t) {
  return `
    <header class="game-header">
      <button class="wordmark" type="button" data-action="go-attract" aria-label="${escapeHtml(t("meta.backToAttract"))}">
        <span>IT TECH</span><span>MATCH</span>
      </button>
      <div class="header-kicker">${escapeHtml(t("meta.headerKicker"))}</div>
      <div class="header-right">
        ${nickname ? `<div class="nickname-chip">${icon("profile")}<span>${escapeHtml(nickname)}</span></div>` : `<div class="expo-chip">${escapeHtml(t("meta.expoChip"))}</div>`}
        ${languageSwitcher(locale, t, "is-compact")}
      </div>
    </header>`;
}

function optionCards(question, t, disabled = false, selectedOptionId = null) {
  return `
    <div class="option-grid" role="group" aria-label="${escapeHtml(t("meta.optionsLabel"))}">
      ${question.options.map((option, index) => `
        <button class="option-card accent-${CARD_ACCENTS[index % CARD_ACCENTS.length]} ${selectedOptionId === option.id ? "is-selected" : ""}"
          type="button" data-action="choose-option" data-option-id="${escapeHtml(option.id)}" ${disabled ? "disabled" : ""}>
          <span class="card-icon">${icon(option.icon)}</span>
          <span class="option-copy"><strong>${escapeHtml(option.label)}</strong><small>${escapeHtml(option.detail)}</small></span>
          <span class="card-arrow">${icon("arrow")}</span>
        </button>`).join("")}
    </div>`;
}

function questionView({ question, title, sequence, total, round, feedback, selectedOptionId, locale, t }) {
  return `
    ${brandHeader("", locale, t)}
    <main class="game-main question-main">
      <section class="question-panel" aria-labelledby="question-title">
        <div class="section-meta"><span>${escapeHtml(title)}</span><b>${sequence}/${total}</b></div>
        <p class="eyebrow">${escapeHtml(question.eyebrow)}</p>
        <h1 id="question-title" tabindex="-1">${escapeHtml(question.question)}</h1>
      </section>
      ${optionCards(question, t, Boolean(feedback), selectedOptionId)}
      ${feedback ? `<div class="feedback-toast" role="status">${icon("check")}<span>${escapeHtml(feedback)}</span></div>` : ""}
    </main>
    ${progressRail(round, t)}`;
}

function renderAttract(notice, locale, t) {
  return `
    <main class="attract-screen">
      <section class="attract-copy">
        <div class="event-label"><span></span> ${escapeHtml(t("attract.event"))}</div>
        <h1><span>IT TECH</span><span>MATCH</span></h1>
        <p class="attract-tagline">${escapeHtml(t("attract.tagline"))}</p>
        <div class="attract-facts" aria-label="${escapeHtml(t("meta.progressLabel"))}">
          <span><b>2</b> ${escapeHtml(t("attract.factsMinutes"))}</span><i></i><span><b>4</b> ${escapeHtml(t("attract.factsChallenges"))}</span><i></i><span><b>1</b> ${escapeHtml(t("attract.factsPath"))}</span>
        </div>
        ${notice ? `<p class="friendly-notice" role="status">${escapeHtml(notice)}</p>` : ""}
        <button class="primary-action start-action" type="button" data-action="start" data-autofocus>
          <span>${escapeHtml(t("attract.start"))}</span>${icon("arrow")}
        </button>
        <p class="no-device-note">${escapeHtml(t("attract.noDevice"))}</p>
      </section>
      <section class="arena-visual" aria-hidden="true">
        <div class="arena-orbit orbit-one"></div><div class="arena-orbit orbit-two"></div>
        <div class="arena-center"><span>${escapeHtml(t("attract.centerYour"))}</span><strong>${escapeHtml(t("attract.centerTech"))}</strong><span>${escapeHtml(t("attract.centerPath"))}</span></div>
        ${["BUILDER", "SOLVER", "EXPLORER", "DESIGNER", "GUARDIAN", "ANALYST"].map((label, index) => `<div class="arena-node node-${index + 1}"><i></i>${label}</div>`).join("")}
      </section>
      <footer class="attract-footer">
        <span>${escapeHtml(t("attract.footer"))}</span>
        <div class="attract-footer-actions">
          ${languageSwitcher(locale, t)}
          <button type="button" class="operator-link" data-action="operator">${escapeHtml(t("attract.operator"))}</button>
        </div>
      </footer>
    </main>`;
}

function renderWelcome(locale, t) {
  return `
    ${brandHeader("", locale, t)}
    <main class="game-main welcome-main">
      <section class="welcome-card">
        <div class="welcome-index">00</div>
        <div class="welcome-copy">
          <p class="eyebrow">${escapeHtml(t("welcome.eyebrow"))}</p>
          <h1 tabindex="-1">${escapeHtml(t("welcome.title"))}</h1>
          <p>${escapeHtml(t("welcome.subtitle"))}</p>
          <form class="nickname-form" data-form="nickname">
            <label for="nickname">${escapeHtml(t("welcome.nicknameLabel"))} <span>${escapeHtml(t("welcome.optional"))}</span></label>
            <input id="nickname" name="nickname" maxlength="24" autocomplete="off" placeholder="${escapeHtml(t("welcome.placeholder"))}" data-autofocus>
            <div class="welcome-actions">
              <button class="secondary-action" type="button" data-action="skip-nickname"><span>${escapeHtml(t("welcome.skip"))}</span></button>
              <button class="primary-action" type="submit"><span>${escapeHtml(t("welcome.go"))}</span>${icon("arrow")}</button>
            </div>
          </form>
        </div>
        <aside class="intro-note">
          <strong>${escapeHtml(t("welcome.trust"))}</strong>
          <p>${escapeHtml(t("welcome.trustBody"))}</p>
          <div class="intro-steps"><i></i><i></i><i></i><i></i></div>
        </aside>
      </section>
    </main>
    <footer class="simple-footer"><span>${escapeHtml(t("welcome.footerLeft"))}</span><span>${escapeHtml(t("welcome.footerRight"))}</span></footer>`;
}

function renderBuild(state, data, locale, t) {
  const selected = new Set(state.buildOrder);
  const selectedComponents = state.buildOrder.map((id) => data.buildComponents.find((component) => component.id === id)).filter(Boolean);
  return `
    ${brandHeader(state.nickname, locale, t)}
    <main class="game-main build-main">
      <section class="build-heading">
        <div><p class="eyebrow">${escapeHtml(t("build.eyebrow"))}</p><h1 tabindex="-1">${escapeHtml(t("build.title"))}</h1></div>
        <p>${escapeHtml(t("build.instruction", { count: 4 }))}</p>
      </section>
      <section class="system-builder">
        <div class="system-zone">
          <div class="system-zone-head"><span>${escapeHtml(t("build.yourSystem"))}</span><b>${state.buildOrder.length}/4</b></div>
          <div class="system-slots" data-drop-zone>
            ${[0, 1, 2, 3].map((index) => {
              const component = selectedComponents[index];
              return component
                ? `<button class="system-slot is-filled" type="button" data-action="remove-component" data-component-id="${component.id}" draggable="true"><span class="slot-number">0${index + 1}</span>${icon(component.icon)}<strong>${component.label}</strong><small>${escapeHtml(t("build.tapRemove"))}</small></button>`
                : `<div class="system-slot"><span class="slot-number">0${index + 1}</span><span class="slot-plus">+</span><small>${escapeHtml(t("build.priority"))}</small></div>`;
            }).join("")}
          </div>
          <div class="system-feedback" role="status">${state.feedback ? `${icon("check")}<span>${escapeHtml(state.feedback)}</span>` : `<span>${escapeHtml(t("build.emptyHint"))}</span>`}</div>
        </div>
        <div class="component-bank" aria-label="${escapeHtml(t("build.bankLabel"))}">
          ${data.buildComponents.map((component, index) => `
            <button class="tech-card accent-${CARD_ACCENTS[index % 4]} ${selected.has(component.id) ? "is-used" : ""}" type="button"
              data-action="add-component" data-component-id="${component.id}" draggable="true" ${selected.has(component.id) || state.buildOrder.length >= 4 ? "disabled" : ""}>
              ${icon(component.icon)}<span><strong>${component.label}</strong><small>${component.description}</small></span><b>+</b>
            </button>`).join("")}
        </div>
      </section>
      <div class="build-actions">
        <span>${state.buildOrder.length < 4 ? escapeHtml(t("build.remaining", { count: 4 - state.buildOrder.length })) : escapeHtml(t("build.ready"))}</span>
        <button class="primary-action" type="button" data-action="finish-build" ${state.buildOrder.length !== 4 ? "disabled" : ""}><span>${escapeHtml(t("build.continue"))}</span>${icon("arrow")}</button>
      </div>
    </main>
    ${progressRail(2, t)}`;
}

function renderCrisis(state, data, locale, t) {
  const question = data.crisis[state.crisisIndex % data.crisis.length];
  return `
    ${brandHeader(state.nickname, locale, t)}
    <main class="game-main crisis-main">
      <section class="crisis-banner">
        <div class="crisis-pulse">${icon(question.icon || "alert")}</div>
        <div><p class="eyebrow">${escapeHtml(t("crisis.eyebrow"))}</p><h1>${escapeHtml(question.headline || "TECH SIGNAL")}</h1></div>
        <span>${escapeHtml(t("crisis.choose"))}</span>
      </section>
      <section class="question-panel crisis-question" aria-labelledby="crisis-title">
        <p class="eyebrow">${escapeHtml(question.eyebrow)}</p>
        <h2 id="crisis-title" tabindex="-1">${escapeHtml(question.question)}</h2>
      </section>
      ${optionCards(question, t, Boolean(state.feedback), state.selectedOptionId)}
      ${state.feedback ? `<div class="feedback-toast" role="status">${icon("check")}<span>${escapeHtml(state.feedback)}</span></div>` : ""}
    </main>
    ${progressRail(3, t)}`;
}

function renderCalculating(state, locale, t) {
  return `
    ${brandHeader(state.nickname, locale, t)}
    <main class="calculating-screen" aria-live="polite">
      <div class="profile-spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><strong>6</strong></div>
      <p class="eyebrow">${escapeHtml(t("calculating.eyebrow"))}</p>
      <h1 tabindex="-1">${escapeHtml(t("calculating.title")).replace(" ", "<br>")}</h1>
      <p>${escapeHtml(t("calculating.body"))}</p>
      <div class="calculate-track"><span></span></div>
    </main>`;
}

function renderResult(state, locale, t) {
  const profile = state.profile;
  const archetype = ARCHETYPES[profile.archetype];
  const labels = getDimensionLabels(locale);
  const description = getArchetypeDescription(profile.archetype, locale);
  const strongest = profile.ranked.slice(0, 2);
  return `
    ${brandHeader(state.nickname, locale, t)}
    <main class="result-main accent-result-${archetype.accent}">
      <section class="result-reveal">
        <p class="eyebrow">${escapeHtml(t("result.eyebrow"))}</p>
        <div class="result-number">01 / 06</div>
        <h1 tabindex="-1">${archetype.name}</h1>
        <p class="result-description">${escapeHtml(description)}</p>
        <div class="tendency-row" aria-label="${escapeHtml(t("result.strongest"))}">
          ${strongest.map((dimension) => `<span>${escapeHtml(labels[dimension])} <b>${profile.scores[dimension]}</b></span>`).join("")}
        </div>
        <div class="discovery-line"><i></i><p>${escapeHtml(t("result.discovery"))}</p></div>
      </section>
      <section class="profile-panel">
        <div class="profile-heading"><div><p class="eyebrow">${escapeHtml(t("result.signalMap"))}</p><h2>${escapeHtml(t("result.techProfile"))}</h2></div><span>${escapeHtml(t("result.directional")).replace(", ", "<br>")}</span></div>
        <div class="profile-bars">
          ${DIMENSIONS.map((dimension, index) => `
            <div class="profile-row">
              <div><span>0${index + 1}</span><strong>${escapeHtml(labels[dimension])}</strong><b>${profile.scores[dimension]}</b></div>
              <div class="bar-track"><i style="--score:${profile.scores[dimension]}%"></i></div>
            </div>`).join("")}
        </div>
        <div class="explore-areas"><p class="eyebrow">${escapeHtml(t("result.enjoy"))}</p><div>${archetype.areas.map((area) => `<span>${escapeHtml(area)}</span>`).join("")}</div></div>
      </section>
      <section class="result-actions">
        <button class="primary-action" type="button" data-action="explore"><span>${escapeHtml(t("result.explore"))}</span>${icon("arrow")}</button>
        <button class="secondary-action" type="button" data-action="play-again"><span>${escapeHtml(t("result.playAgain"))}</span></button>
        <button class="text-action" type="button" data-action="next-player">${escapeHtml(t("result.nextPlayer"))}</button>
      </section>
    </main>`;
}

function renderCommunity(state, data, locale, t) {
  const url = data.config?.communityCtaUrl;
  return `
    ${brandHeader(state.nickname, locale, t)}
    <main class="community-main">
      <section class="community-panel">
        <div class="community-mark">${icon("spark")}</div>
        <p class="eyebrow">${escapeHtml(t("community.eyebrow"))}</p>
        <h1 tabindex="-1">${escapeHtml(t("community.title"))}</h1>
        <p>${escapeHtml(t("community.body"))}</p>
        <div class="community-points"><span>PROJECTS</span><span>COMMUNITY</span><span>CAREERS</span></div>
        ${url ? `<a class="primary-action" href="${escapeHtml(url)}" target="_blank" rel="noopener"><span>${escapeHtml(t("community.openPage"))}</span>${icon("arrow")}</a>` : `<div class="booth-cta">${escapeHtml(t("community.boothNext"))} <strong>${escapeHtml(t("community.boothCta"))}</strong></div>`}
      </section>
      <section class="community-actions">
        <button class="secondary-action" type="button" data-action="play-again"><span>${escapeHtml(t("result.playAgain"))}</span></button>
        <button class="primary-action" type="button" data-action="next-player"><span>${escapeHtml(t("result.nextPlayer")).replace(" →", "")}</span>${icon("arrow")}</button>
      </section>
    </main>`;
}

function durationLabel(milliseconds = 0) {
  if (!milliseconds) return "—";
  const seconds = Math.round(milliseconds / 1000);
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`;
}

function renderOperator(operatorStats, pendingCount, isRemote, locale, t) {
  const stats = operatorStats || { started: 0, completed: 0, completionRate: 0, averageDurationMs: 0, archetypes: {}, interests: {} };
  const totalArchetypes = Object.values(stats.archetypes || {}).reduce((sum, value) => sum + Number(value || 0), 0);
  const topInterests = Object.entries(stats.interests || {}).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const labels = getDimensionLabels(locale);
  const syncText = pendingCount ? t("operator.pending", { count: pendingCount }) : isRemote ? t("operator.synced") : t("operator.local");
  return `
    ${brandHeader("", locale, t)}
    <main class="operator-main">
      <section class="operator-heading"><div><p class="eyebrow">${escapeHtml(t("operator.eyebrow"))}</p><h1 tabindex="-1">${escapeHtml(t("operator.title"))}</h1></div><div class="sync-chip ${pendingCount ? "has-pending" : ""}"><i></i>${escapeHtml(syncText)}</div></section>
      <section class="metric-grid">
        <article><span>${escapeHtml(t("operator.players"))}</span><strong>${stats.started || 0}</strong><small>${escapeHtml(t("operator.playersSub"))}</small></article>
        <article><span>${escapeHtml(t("operator.completed"))}</span><strong>${stats.completed || 0}</strong><small>${escapeHtml(t("operator.completedSub", { rate: stats.completionRate || 0 }))}</small></article>
        <article><span>${escapeHtml(t("operator.average"))}</span><strong>${durationLabel(stats.averageDurationMs)}</strong><small>${escapeHtml(t("operator.averageSub"))}</small></article>
      </section>
      <section class="operator-panels">
        <article class="distribution-panel"><div class="panel-title"><h2>${escapeHtml(t("operator.distribution"))}</h2><span>${escapeHtml(t("operator.results", { count: totalArchetypes }))}</span></div>
          ${Object.keys(ARCHETYPES).map((key) => {
            const count = Number(stats.archetypes?.[key] || 0);
            const percent = totalArchetypes ? Math.round((count / totalArchetypes) * 100) : 0;
            return `<div class="distribution-row"><span>${escapeHtml(labels[key] || ARCHETYPES[key].shortName)}</span><div><i style="--score:${percent}%"></i></div><b>${percent}%</b></div>`;
          }).join("")}
        </article>
        <article class="interest-panel"><div class="panel-title"><h2>${escapeHtml(t("operator.topPicks"))}</h2><span>${escapeHtml(t("operator.localView"))}</span></div>
          ${topInterests.length ? topInterests.map(([name, count], index) => `<div class="interest-row"><span>0${index + 1}</span><strong>${escapeHtml(name.toUpperCase())}</strong><b>${count}</b></div>`).join("") : `<p class="empty-state">${escapeHtml(t("operator.empty"))}</p>`}
        </article>
      </section>
      <div class="operator-actions"><button class="secondary-action" type="button" data-action="refresh-operator"><span>${escapeHtml(t("operator.refresh"))}</span></button><button class="primary-action" type="button" data-action="exit-operator"><span>${escapeHtml(t("operator.back"))}</span>${icon("arrow")}</button></div>
    </main>`;
}

function renderIdleConfirm(locale, t) {
  return `
    <main class="idle-screen">
      <section class="idle-card" role="dialog" aria-modal="true" aria-labelledby="idle-title">
        <div class="idle-icon">${icon("spark")}</div>
        <p class="eyebrow">${escapeHtml(t("idle.eyebrow"))}</p>
        <h1 id="idle-title" tabindex="-1">${escapeHtml(t("idle.title"))}</h1>
        <p>${escapeHtml(t("idle.body"))}</p>
        <div><button class="primary-action" type="button" data-action="resume"><span>${escapeHtml(t("idle.resume"))}</span>${icon("arrow")}</button><button class="secondary-action" type="button" data-action="next-player"><span>${escapeHtml(t("idle.reset"))}</span></button></div>
      </section>
    </main>`;
}

export function renderApp({ state, data, notice, operatorStats, pendingCount = 0, operatorRemote = false, locale = "id", t }) {
  if (state.screen === "attract") return renderAttract(notice, locale, t);
  if (state.screen === "welcome") return renderWelcome(locale, t);
  if (state.screen === "round1") {
    return questionView({
      question: data.instinct[state.roundOneIndex],
      title: t("round1.title"),
      sequence: state.roundOneIndex + 1,
      total: data.instinct.length,
      round: 1,
      feedback: state.feedback,
      selectedOptionId: state.selectedOptionId,
      locale,
      t,
    });
  }
  if (state.screen === "build") return renderBuild(state, data, locale, t);
  if (state.screen === "crisis") return renderCrisis(state, data, locale, t);
  if (state.screen === "round4") {
    return questionView({
      question: data.decisions[state.roundFourIndex],
      title: t("round4.title"),
      sequence: state.roundFourIndex + 1,
      total: data.decisions.length,
      round: 4,
      feedback: state.feedback,
      selectedOptionId: state.selectedOptionId,
      locale,
      t,
    });
  }
  if (state.screen === "calculating") return renderCalculating(state, locale, t);
  if (state.screen === "result") return renderResult(state, locale, t);
  if (state.screen === "community") return renderCommunity(state, data, locale, t);
  if (state.screen === "operator") return renderOperator(operatorStats, pendingCount, operatorRemote, locale, t);
  if (state.screen === "idle") return renderIdleConfirm(locale, t);
  return renderAttract(t("notice.recovered"), locale, t);
}
