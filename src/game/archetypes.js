export const DIMENSIONS = Object.freeze([
  "builder",
  "problemSolver",
  "explorer",
  "designer",
  "guardian",
  "analyst",
]);

export const ARCHETYPES = Object.freeze({
  builder: {
    name: "THE BUILDER",
    shortName: "Builder",
    description: "Jawabanmu menunjukkan kecenderungan untuk mengubah ide menjadi sesuatu yang benar-benar bekerja.",
    areas: ["Software Engineering", "Web Development", "Backend", "DevOps"],
    accent: "cyan",
  },
  problemSolver: {
    name: "THE PROBLEM SOLVER",
    shortName: "Problem Solver",
    description: "Jawabanmu menunjukkan kecenderungan untuk membongkar masalah dan memahami cara kerja sebuah sistem.",
    areas: ["Software Engineering", "Systems", "Troubleshooting", "Algorithms"],
    accent: "orange",
  },
  explorer: {
    name: "THE EXPLORER",
    shortName: "Explorer",
    description: "Jawabanmu menunjukkan kecenderungan untuk mencoba kemungkinan baru dan bereksperimen dengan teknologi yang sedang berkembang.",
    areas: ["AI", "Emerging Technology", "Research", "Automation"],
    accent: "violet",
  },
  designer: {
    name: "THE DESIGNER",
    shortName: "Designer",
    description: "Jawabanmu menunjukkan kecenderungan untuk membuat teknologi terasa jelas, berguna, dan menyenangkan bagi penggunanya.",
    areas: ["UI/UX", "Frontend", "Product Design", "Creative Technology"],
    accent: "violet",
  },
  guardian: {
    name: "THE GUARDIAN",
    shortName: "Guardian",
    description: "Jawabanmu menunjukkan kecenderungan untuk menjaga sistem tetap aman, andal, dan siap menghadapi risiko.",
    areas: ["Cybersecurity", "Network", "Infrastructure", "Systems"],
    accent: "lime",
  },
  analyst: {
    name: "THE ANALYST",
    shortName: "Analyst",
    description: "Jawabanmu menunjukkan kecenderungan untuk menemukan pola, menata data, dan membuat keputusan secara terstruktur.",
    areas: ["Data Science", "Data Analytics", "AI", "Business Intelligence"],
    accent: "orange",
  },
});

export const DIMENSION_LABELS = Object.freeze({
  builder: "Builder",
  problemSolver: "Problem Solver",
  explorer: "Explorer",
  designer: "Designer",
  guardian: "Guardian",
  analyst: "Analyst",
});

export function resolveArchetype(rawScores, evidence) {
  return [...DIMENSIONS].sort((a, b) => {
    const scoreDifference = rawScores[b] - rawScores[a];
    if (Math.abs(scoreDifference) > 0.0001) return scoreDifference;
    const evidenceDifference = (evidence[b] ?? 0) - (evidence[a] ?? 0);
    if (Math.abs(evidenceDifference) > 0.0001) return evidenceDifference;
    return DIMENSIONS.indexOf(a) - DIMENSIONS.indexOf(b);
  })[0];
}
