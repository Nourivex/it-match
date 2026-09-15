import { DIMENSIONS, resolveArchetype } from "./archetypes.js";

const BUILD_PRIORITY = [1, 0.82, 0.66, 0.52];
const OMITTED_SIGNAL = 0.08;

function blank(value = 0) {
  return Object.fromEntries(DIMENSIONS.map((dimension) => [dimension, value]));
}

function applyVector(target, weights = {}, multiplier = 1) {
  for (const dimension of DIMENSIONS) {
    target[dimension] += (Number(weights[dimension]) || 0) * multiplier;
  }
}

function primaryDimensions(weights = {}) {
  const highest = Math.max(...DIMENSIONS.map((dimension) => Number(weights[dimension]) || 0));
  return highest > 0
    ? DIMENSIONS.filter((dimension) => (Number(weights[dimension]) || 0) === highest)
    : [];
}

export function calculateProfile({ answers, buildOrder, buildComponents }) {
  const rawScores = blank(10);
  const evidence = blank(0);

  for (const answer of answers) {
    applyVector(rawScores, answer.weights);
    const primaries = answer.primary ? [answer.primary] : primaryDimensions(answer.weights);
    for (const dimension of primaries) evidence[dimension] += 1;
  }

  const componentById = new Map(buildComponents.map((component) => [component.id, component]));
  buildOrder.forEach((componentId, index) => {
    const component = componentById.get(componentId);
    if (!component) return;
    const multiplier = BUILD_PRIORITY[index] ?? BUILD_PRIORITY.at(-1);
    applyVector(rawScores, component.weights, multiplier);
    for (const dimension of primaryDimensions(component.weights)) {
      evidence[dimension] += multiplier;
    }
  });

  const selected = new Set(buildOrder);
  for (const component of buildComponents) {
    if (!selected.has(component.id)) applyVector(rawScores, component.weights, -OMITTED_SIGNAL);
  }

  const values = Object.values(rawScores);
  const lowest = Math.min(...values);
  const highest = Math.max(...values);
  const spread = Math.max(highest - lowest, 1);
  const scores = blank(0);
  for (const dimension of DIMENSIONS) {
    scores[dimension] = Math.round(56 + ((rawScores[dimension] - lowest) / spread) * 36);
  }

  const archetype = resolveArchetype(rawScores, evidence);
  const ranked = [...DIMENSIONS].sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a];
    return DIMENSIONS.indexOf(a) - DIMENSIONS.indexOf(b);
  });

  return {
    archetype,
    scores,
    rawScores,
    evidence,
    ranked,
    totalScore: Object.values(scores).reduce((sum, score) => sum + score, 0),
  };
}
