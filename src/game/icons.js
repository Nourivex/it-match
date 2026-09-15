const paths = {
  arrow: '<path d="M5 12h14M14 6l6 6-6 6"/>',
  build: '<path d="M14 6l4-4 4 4-4 4M3 21l7-7M7 7l10 10M4 4l4 1 1 4-2 2-4-4zM15 15l2-2 4 4-2 2z"/>',
  debug: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
  design: '<path d="M4 4h16v12H4zM8 20h8M12 16v4"/><path d="M8 8h8M8 12h5"/>',
  shield: '<path d="M12 3l7 3v5c0 4.6-2.8 8-7 10-4.2-2-7-5.4-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  cloud: '<path d="M7 18h10a4 4 0 0 0 .4-7.98A6 6 0 0 0 6.1 8.1 5 5 0 0 0 7 18z"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M16 16l5 5"/>',
  flow: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h5a4 4 0 0 1 4 4v4M16 14l-3-3M16 14l3-3"/>',
  spark: '<path d="M12 2l1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  automation: '<path d="M4 7h11M12 4l3 3-3 3M20 17H9M12 14l-3 3 3 3"/><circle cx="5" cy="17" r="2"/><circle cx="19" cy="7" r="2"/>',
  map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/>',
  layout: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  frontend: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
  backend: '<path d="M5 5h14v5H5zM5 14h14v5H5z"/><path d="M8 7.5h.01M8 16.5h.01M12 7.5h4M12 16.5h4"/>',
  database: '<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"/>',
  network: '<circle cx="12" cy="12" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M10.5 10.5l-4-4M13.5 10.5l4-4M10.5 13.5l-4 4M13.5 13.5l4 4"/>',
  alert: '<path d="M12 3l10 18H2z"/><path d="M12 9v5M12 18h.01"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
};

export function icon(name, className = "") {
  const body = paths[name] || paths.spark;
  return `<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}
