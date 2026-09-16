export const SUPPORTED_LOCALES = Object.freeze([
  { code: "id", label: "ID", name: "Bahasa Indonesia" },
  { code: "en", label: "EN", name: "English" },
]);

export const DEFAULT_LOCALE = "id";
const STORAGE_KEY = "it-match-locale-v1";

export function normalizeLocale(value) {
  return value === "en" ? "en" : "id";
}

export function getInitialLocale() {
  try {
    const stored = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (stored === "id" || stored === "en") return stored;
  } catch {
    // Storage unavailable (private mode, SSR). Fall back to default.
  }
  return DEFAULT_LOCALE;
}

export function setStoredLocale(locale) {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, normalizeLocale(locale));
  } catch {
    // Ignore storage failures; locale still applies for this session.
  }
}

const id = {
  "meta.backToAttract": "Kembali ke layar awal",
  "meta.headerKicker": "BANGUN JALUR TEKNOLOGIMU",
  "meta.expoChip": "ARENA TEKNOLOGI KAMPUS",
  "meta.progressLabel": "Progress permainan",
  "meta.roundOf": "RONDE {active} DARI 4",
  "meta.roundNames": ["INSTING", "SISTEM", "KRISIS", "KEPUTUSAN"],
  "meta.optionsLabel": "Pilihan jawaban",

  "attract.event": "PENGALAMAN TEKNOLOGI KAMPUS",
  "attract.tagline": "Apa insting teknologimu?",
  "attract.factsMinutes": "MENIT",
  "attract.factsChallenges": "TANTANGAN",
  "attract.factsPath": "JALUR TEKNOLOGI",
  "attract.start": "MULAI BERMAIN",
  "attract.noDevice": "Tanpa HP. Tanpa login. Langsung main di sini.",
  "attract.footer": "PAMERAN INFORMATIKA INTERAKTIF",
  "attract.operator": "OPERATOR",
  "attract.centerYour": "JALUR",
  "attract.centerTech": "TEKNOLOGI",
  "attract.centerPath": "KAMU",
  "attract.languageLabel": "Bahasa",

  "welcome.eyebrow": "Sebelum mulai",
  "welcome.title": "Siapa nama panggilanmu?",
  "welcome.subtitle": "Opsional. Tidak perlu nama asli—hasilmu tetap bisa muncul tanpa nama.",
  "welcome.nicknameLabel": "NAMA PANGGILAN",
  "welcome.optional": "OPSIONAL",
  "welcome.placeholder": "Tulis di sini…",
  "welcome.skip": "LEWATI",
  "welcome.go": "AYO MULAI",
  "welcome.trust": "PERCAYAI INSTINGMU",
  "welcome.trustBody": "Tidak ada jawaban salah. Pilih yang paling membuatmu penasaran.",
  "welcome.footerLeft": "4 tantangan cepat",
  "welcome.footerRight": "Arah, bukan vonis ilmiah",

  "round1.title": "RONDE 1 — PILIH INSTINGMU",
  "round4.title": "RONDE 4 — BUAT KEPUTUSAN",

  "build.eyebrow": "Ronde 2 — Bangun sistem",
  "build.title": "Rancang sistem pendaftaran mahasiswa baru.",
  "build.instruction": "Pilih {count} komponen yang ingin kamu prioritaskan. Urutan pilihanmu ikut membentuk profil.",
  "build.yourSystem": "SISTEM KAMU",
  "build.tapRemove": "Ketuk untuk melepas",
  "build.priority": "PRIORITAS",
  "build.emptyHint": "Ketuk kartu di bawah atau seret ke area sistem.",
  "build.bankLabel": "Komponen teknologi",
  "build.remaining": "Pilih {count} lagi",
  "build.ready": "Sistem siap dieksplorasi",
  "build.continue": "LANJUT",

  "crisis.eyebrow": "Ronde 3 — Krisis teknologi",
  "crisis.choose": "PILIH LANGKAH PERTAMAMU",

  "calculating.eyebrow": "Menghubungkan sinyalmu",
  "calculating.title": "MENGHITUNG PROFIL TEKNOLOGI",
  "calculating.body": "Merangkai pilihan, prioritas, dan insting teknologimu…",

  "result.eyebrow": "Jalur teknologimu",
  "result.signalMap": "Peta sinyalku",
  "result.techProfile": "PROFIL TEKNOLOGI",
  "result.directional": "Arah, bukan ilmiah",
  "result.enjoy": "Kamu mungkin suka menjelajahi",
  "result.discovery": "Mungkin Informatika punya lebih dari satu jalur untukmu.",
  "result.strongest": "Kecenderungan terkuat",
  "result.explore": "JELAJAHI INFORMATIKA",
  "result.playAgain": "MAIN LAGI",
  "result.nextPlayer": "PEMAIN BERIKUTNYA →",

  "community.eyebrow": "Penasaran jalur ini bisa membawamu ke mana?",
  "community.title": "Temukan lebih banyak jalur di Informatika.",
  "community.body": "Ngobrol dengan tim Informatika di booth ini. Tanyakan mata kuliah, komunitas, proyek mahasiswa, atau bidang teknologi yang ingin kamu coba.",
  "community.boothNext": "LANGKAH BERIKUTNYA",
  "community.boothCta": "TANYA TIM DI BOOTH →",
  "community.openPage": "BUKA HALAMAN RESMI",

  "operator.eyebrow": "Operator booth",
  "operator.title": "DENYUT HARI INI",
  "operator.synced": "Supabase tersinkron",
  "operator.local": "Mode lokal",
  "operator.pending": "{count} menunggu sinkron",
  "operator.players": "PEMAIN",
  "operator.playersSub": "permainan dimulai",
  "operator.completed": "SELESAI",
  "operator.completedSub": "{rate}% penyelesaian",
  "operator.average": "RATA-RATA",
  "operator.averageSub": "durasi sesi",
  "operator.distribution": "DISTRIBUSI JALUR TEKNOLOGI",
  "operator.results": "{count} HASIL",
  "operator.topPicks": "PILIHAN SISTEM TERATAS",
  "operator.localView": "TAMPILAN LOKAL",
  "operator.empty": "Hasil sesi hari ini akan muncul di sini.",
  "operator.refresh": "MUAT ULANG DATA",
  "operator.back": "KEMBALI KE AWAL",

  "idle.eyebrow": "Cek booth",
  "idle.title": "Masih bermain?",
  "idle.body": "Tekan lanjut untuk kembali ke tantanganmu. Booth akan reset otomatis jika tidak digunakan.",
  "idle.resume": "LANJUT",
  "idle.reset": "RESET",

  "notice.cleaned": "Sesi sebelumnya sudah dibersihkan. Kamu bisa langsung mulai lagi.",
  "notice.recovered": "Sesi sebelumnya sudah dibersihkan. Silakan mulai lagi.",
  "game.firstPriority": "Menarik — kamu memprioritaskan {label} lebih dulu.",
  "game.addedAngle": "{label} menambah sudut baru ke sistemmu.",
  "game.removed": "Pilihan dilepas. Kamu bisa menyusun prioritas lain.",

  "startup.title": "IT TECH MATCH",
  "startup.body": "Sesi perlu dimulai ulang.",
  "startup.retry": "MULAI ULANG",
};

const en = {
  "meta.backToAttract": "Back to start screen",
  "meta.headerKicker": "BUILD YOUR TECH PATH",
  "meta.expoChip": "CAMPUS TECH ARENA",
  "meta.progressLabel": "Game progress",
  "meta.roundOf": "ROUND {active} OF 4",
  "meta.roundNames": ["INSTINCT", "SYSTEM", "CRISIS", "DECISION"],
  "meta.optionsLabel": "Answer choices",

  "attract.event": "CAMPUS TECHNOLOGY EXPERIENCE",
  "attract.tagline": "What’s your tech instinct?",
  "attract.factsMinutes": "MINUTES",
  "attract.factsChallenges": "CHALLENGES",
  "attract.factsPath": "TECH PATH",
  "attract.start": "START THE MATCH",
  "attract.noDevice": "No phone. No login. Just play right here.",
  "attract.footer": "INTERACTIVE INFORMATICS EXHIBITION",
  "attract.operator": "OPERATOR",
  "attract.centerYour": "YOUR",
  "attract.centerTech": "TECH",
  "attract.centerPath": "PATH",
  "attract.languageLabel": "Language",

  "welcome.eyebrow": "Before we begin",
  "welcome.title": "What should we call you?",
  "welcome.subtitle": "Optional. No real name needed—you can still get your result without one.",
  "welcome.nicknameLabel": "NICKNAME",
  "welcome.optional": "OPTIONAL",
  "welcome.placeholder": "Type here…",
  "welcome.skip": "SKIP",
  "welcome.go": "LET’S GO",
  "welcome.trust": "TRUST YOUR INSTINCT",
  "welcome.trustBody": "There are no wrong answers. Pick what makes you most curious.",
  "welcome.footerLeft": "4 quick challenges",
  "welcome.footerRight": "Directional, not scientific",

  "round1.title": "ROUND 1 — PICK YOUR INSTINCT",
  "round4.title": "ROUND 4 — MAKE THE DECISION",

  "build.eyebrow": "Round 2 — Build the system",
  "build.title": "Design the new student registration system.",
  "build.instruction": "Pick {count} components to prioritize. Your order shapes your profile.",
  "build.yourSystem": "YOUR SYSTEM",
  "build.tapRemove": "Tap to remove",
  "build.priority": "PRIORITY",
  "build.emptyHint": "Tap a card below or drag it into the system area.",
  "build.bankLabel": "Technology components",
  "build.remaining": "Pick {count} more",
  "build.ready": "System ready to explore",
  "build.continue": "CONTINUE",

  "crisis.eyebrow": "Round 3 — Tech crisis",
  "crisis.choose": "CHOOSE YOUR FIRST MOVE",

  "calculating.eyebrow": "Connecting your signals",
  "calculating.title": "CALCULATING TECH PROFILE",
  "calculating.body": "Weaving together your choices, priorities, and tech instincts…",

  "result.eyebrow": "Your tech path",
  "result.signalMap": "Your signal map",
  "result.techProfile": "TECH PROFILE",
  "result.directional": "Directional, not scientific",
  "result.enjoy": "You may enjoy exploring",
  "result.discovery": "Maybe Informatics has more than one path for you.",
  "result.strongest": "Strongest tendencies",
  "result.explore": "EXPLORE INFORMATICS",
  "result.playAgain": "PLAY AGAIN",
  "result.nextPlayer": "NEXT PLAYER →",

  "community.eyebrow": "Curious where this path can take you?",
  "community.title": "Discover more paths in Informatics.",
  "community.body": "Chat with the Informatics team at this booth. Ask about courses, communities, student projects, or the tech field you want to try.",
  "community.boothNext": "NEXT STEP",
  "community.boothCta": "ASK THE BOOTH TEAM →",
  "community.openPage": "OPEN OFFICIAL PAGE",

  "operator.eyebrow": "Booth operator",
  "operator.title": "TODAY’S PULSE",
  "operator.synced": "Supabase synced",
  "operator.local": "Local mode",
  "operator.pending": "{count} waiting to sync",
  "operator.players": "PLAYERS",
  "operator.playersSub": "games started",
  "operator.completed": "COMPLETED",
  "operator.completedSub": "{rate}% completion",
  "operator.average": "AVERAGE",
  "operator.averageSub": "session duration",
  "operator.distribution": "TECH PATH DISTRIBUTION",
  "operator.results": "{count} RESULTS",
  "operator.topPicks": "TOP SYSTEM PICKS",
  "operator.localView": "LOCAL VIEW",
  "operator.empty": "Today’s session results will appear here.",
  "operator.refresh": "REFRESH DATA",
  "operator.back": "BACK TO ATTRACT",

  "idle.eyebrow": "Booth check",
  "idle.title": "Still playing?",
  "idle.body": "Press continue to return to your challenge. The booth resets automatically when idle.",
  "idle.resume": "CONTINUE",
  "idle.reset": "RESET",

  "notice.cleaned": "The previous session was cleared. You can start again right away.",
  "notice.recovered": "The previous session was cleared. Please start again.",
  "game.firstPriority": "Interesting — you prioritized {label} first.",
  "game.addedAngle": "{label} adds a new angle to your system.",
  "game.removed": "Choice removed. You can arrange another priority.",

  "startup.title": "IT TECH MATCH",
  "startup.body": "The session needs to restart.",
  "startup.retry": "RESTART",
};

export const STRINGS = Object.freeze({ id, en });

export function createTranslator(locale) {
  const active = normalizeLocale(locale);
  return function t(key, vars = {}) {
    const table = STRINGS[active] || id;
    let value = table[key];
    if (value === undefined) value = id[key];
    if (value === undefined) return key;
    if (typeof value !== "string") return value;
    return value.replaceAll(/\{(\w+)\}/g, (_, name) =>
      vars[name] !== undefined ? String(vars[name]) : `{${name}}`,
    );
  };
}
