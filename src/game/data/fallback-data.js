export const GAME_VERSION = "1.0.0";
export const QUESTION_VERSION = "2026.09.15";

const instinct = [
  {
    id: "instinct-outage",
    eyebrow: "Campus signal 01",
    question: "Website kampus tiba-tiba tidak bisa dibuka. Apa yang paling membuatmu penasaran?",
    options: [
      { id: "repair", label: "Membongkar dan memperbaikinya", detail: "Aku ingin membuatnya bekerja lagi.", icon: "build", feedback: "Kamu langsung melihat sesuatu yang bisa dibangun ulang.", weights: { builder: 5, problemSolver: 2 }, primary: "builder" },
      { id: "trace", label: "Mencari tahu penyebabnya", detail: "Aku ingin mengikuti jejak masalahnya.", icon: "debug", feedback: "Kamu tertarik pada cerita di balik masalahnya.", weights: { problemSolver: 5, analyst: 2 }, primary: "problemSolver" },
      { id: "experience", label: "Membuat tampilannya lebih jelas", detail: "Aku ingin pengalaman pengguna tetap nyaman.", icon: "design", feedback: "Kamu memperhatikan bagaimana teknologi terasa bagi orang lain.", weights: { designer: 5, builder: 1 }, primary: "designer" },
      { id: "secure", label: "Memastikan tidak ada celah", detail: "Aku ingin tahu apakah sistemnya tetap aman.", icon: "shield", feedback: "Kamu memikirkan apa yang perlu dilindungi.", weights: { guardian: 5, problemSolver: 1 }, primary: "guardian" },
    ],
  },
  {
    id: "instinct-crowd",
    eyebrow: "Campus signal 02",
    question: "Aplikasi acara kampus mendadak dipakai ribuan orang. Bagian mana yang paling ingin kamu pegang?",
    options: [
      { id: "scale", label: "Menyiapkan sistem agar tetap kuat", detail: "Biar layanan tetap jalan saat ramai.", icon: "cloud", feedback: "Kamu memikirkan fondasi yang siap dipakai banyak orang.", weights: { builder: 4, guardian: 2 }, primary: "builder" },
      { id: "bottleneck", label: "Mencari titik yang membuatnya lambat", detail: "Aku ingin menemukan hambatannya.", icon: "search", feedback: "Kamu memilih membaca gejala sebelum bergerak.", weights: { problemSolver: 4, analyst: 3 }, primary: "problemSolver" },
      { id: "flow", label: "Menyederhanakan alur pengguna", detail: "Biar orang cepat menemukan yang dicari.", icon: "flow", feedback: "Kamu melihat sistem dari sudut pandang penggunanya.", weights: { designer: 5, analyst: 1 }, primary: "designer" },
      { id: "experiment", label: "Mencoba fitur antrean otomatis", detail: "Aku penasaran apakah teknologi baru bisa membantu.", icon: "spark", feedback: "Kamu tertarik menguji kemungkinan baru.", weights: { explorer: 5, builder: 1 }, primary: "explorer" },
    ],
  },
  {
    id: "instinct-admin",
    eyebrow: "Campus signal 03",
    question: "Proses administrasi kampus terasa berulang dan memakan waktu. Apa yang ingin kamu lakukan dulu?",
    options: [
      { id: "automate", label: "Membuat otomatisasi sederhana", detail: "Aku ingin mengurangi pekerjaan berulang.", icon: "automation", feedback: "Kamu melihat peluang untuk membuat teknologi bekerja lebih cerdas.", weights: { explorer: 5, builder: 2 }, primary: "explorer" },
      { id: "map", label: "Memetakan proses dari awal", detail: "Aku ingin tahu di mana waktunya habis.", icon: "map", feedback: "Kamu memilih memahami pola sebelum mengubahnya.", weights: { analyst: 5, problemSolver: 2 }, primary: "analyst" },
      { id: "redesign", label: "Merapikan formulir dan alurnya", detail: "Aku ingin membuat prosesnya terasa ringan.", icon: "layout", feedback: "Kamu memperhatikan detail yang langsung dirasakan pengguna.", weights: { designer: 5, builder: 1 }, primary: "designer" },
      { id: "validate", label: "Memastikan data tetap akurat", detail: "Aku ingin mencegah kesalahan ikut menyebar.", icon: "check", feedback: "Kamu menjaga agar sistem bisa dipercaya.", weights: { guardian: 4, analyst: 3 }, primary: "guardian" },
    ],
  },
];

const buildComponents = [
  { id: "frontend", label: "Frontend", description: "Halaman yang langsung digunakan calon mahasiswa.", icon: "frontend", weights: { builder: 5, designer: 3 } },
  { id: "backend", label: "Backend", description: "Logika yang mengatur proses pendaftaran.", icon: "backend", weights: { builder: 5, problemSolver: 2 } },
  { id: "database", label: "Database", description: "Tempat data pendaftar tersimpan terstruktur.", icon: "database", weights: { analyst: 5, builder: 2 } },
  { id: "cloud", label: "Cloud", description: "Sumber daya yang bisa mengikuti kebutuhan sistem.", icon: "cloud", weights: { explorer: 4, builder: 3 } },
  { id: "network", label: "Network", description: "Jalur yang menghubungkan pengguna dan layanan.", icon: "network", weights: { guardian: 4, problemSolver: 3 } },
  { id: "security", label: "Security", description: "Perlindungan untuk akses dan data pendaftar.", icon: "shield", weights: { guardian: 5, problemSolver: 2 } },
  { id: "ai", label: "AI", description: "Bantuan cerdas untuk pertanyaan atau pemeriksaan data.", icon: "spark", weights: { explorer: 5, analyst: 2 } },
  { id: "uiux", label: "UI/UX", description: "Alur yang membuat pendaftaran mudah dipahami.", icon: "design", weights: { designer: 5, analyst: 1 } },
];

const crisis = [
  {
    id: "crisis-server",
    eyebrow: "Server outage",
    headline: "SERVER DOWN",
    question: "Website kampus tidak bisa diakses. Tindakan pertama mana yang paling menarik untuk kamu lakukan?",
    icon: "alert",
    options: [
      { id: "logs", label: "Baca log dan cari pola error", detail: "Ikuti petunjuk yang sudah ditinggalkan sistem.", icon: "debug", feedback: "Kamu memilih membaca jejak sebelum mengubah keadaan.", weights: { problemSolver: 5, analyst: 2 }, primary: "problemSolver" },
      { id: "network", label: "Periksa jalur network", detail: "Pastikan permintaan masih bisa mencapai server.", icon: "network", feedback: "Kamu memeriksa jalur penting yang menjaga sistem tetap terhubung.", weights: { guardian: 4, problemSolver: 3 }, primary: "guardian" },
      { id: "deploy", label: "Tinjau perubahan terbaru", detail: "Cari tahu apa yang berubah sebelum gangguan muncul.", icon: "history", feedback: "Kamu menghubungkan kejadian sekarang dengan perubahan sebelumnya.", weights: { analyst: 4, problemSolver: 3 }, primary: "analyst" },
      { id: "fallback", label: "Bangun halaman status sementara", detail: "Berikan informasi jelas sambil tim memperbaiki sistem.", icon: "frontend", feedback: "Kamu menjaga pengalaman pengguna sambil solusi utama disiapkan.", weights: { builder: 3, designer: 3 }, primary: "builder" },
    ],
  },
  {
    id: "crisis-login",
    eyebrow: "Security signal",
    headline: "SUSPICIOUS LOGIN",
    question: "Ada pola login yang tidak biasa pada akun kampus. Apa yang ingin kamu cek lebih dulu?",
    icon: "shield",
    options: [
      { id: "protect", label: "Amankan sesi yang terdampak", detail: "Batasi risiko sambil pemeriksaan berjalan.", icon: "lock", feedback: "Kamu mengutamakan perlindungan saat informasinya belum lengkap.", weights: { guardian: 5, builder: 1 }, primary: "guardian" },
      { id: "pattern", label: "Bandingkan pola waktunya", detail: "Cari anomali dari rangkaian aktivitas.", icon: "chart", feedback: "Kamu mencari pola yang bisa menjelaskan kejadian.", weights: { analyst: 5, guardian: 1 }, primary: "analyst" },
      { id: "trace", label: "Telusuri alur autentikasi", detail: "Pahami bagaimana akses itu bisa terjadi.", icon: "debug", feedback: "Kamu tertarik membongkar cara kerja masalahnya.", weights: { problemSolver: 5, guardian: 2 }, primary: "problemSolver" },
      { id: "detect", label: "Coba sistem deteksi otomatis", detail: "Eksperimen dengan peringatan untuk pola serupa.", icon: "spark", feedback: "Kamu melihat peluang menguji perlindungan baru.", weights: { explorer: 5, guardian: 2 }, primary: "explorer" },
    ],
  },
  {
    id: "crisis-ui",
    eyebrow: "Experience issue",
    headline: "BROKEN UI",
    question: "Formulir pendaftaran terlihat rusak di beberapa layar. Dari mana kamu ingin mulai?",
    icon: "layout",
    options: [
      { id: "reproduce", label: "Ulangi masalah di beberapa layar", detail: "Cari kondisi yang memicu tampilan rusak.", icon: "search", feedback: "Kamu memilih membuat masalahnya bisa diamati dengan jelas.", weights: { problemSolver: 5, designer: 2 }, primary: "problemSolver" },
      { id: "journey", label: "Lihat bagian alur yang paling terganggu", detail: "Prioritaskan dampaknya pada pengguna.", icon: "flow", feedback: "Kamu menilai masalah dari pengalaman yang paling terasa.", weights: { designer: 5, analyst: 1 }, primary: "designer" },
      { id: "component", label: "Bangun ulang komponen bermasalah", detail: "Buat bagian itu stabil dan mudah dipakai kembali.", icon: "build", feedback: "Kamu ingin mengubah temuan menjadi komponen yang bekerja.", weights: { builder: 5, designer: 1 }, primary: "builder" },
      { id: "device-data", label: "Kelompokkan data perangkat", detail: "Lihat apakah ada pola pada ukuran atau browser tertentu.", icon: "chart", feedback: "Kamu mencari struktur di balik laporan yang tersebar.", weights: { analyst: 5, problemSolver: 1 }, primary: "analyst" },
    ],
  },
  {
    id: "crisis-database",
    eyebrow: "Performance issue",
    headline: "SLOW DATABASE",
    question: "Pencarian data mahasiswa makin lambat. Investigasi mana yang paling membuatmu penasaran?",
    icon: "database",
    options: [
      { id: "query", label: "Lihat query yang paling berat", detail: "Cari operasi yang paling banyak menghabiskan waktu.", icon: "chart", feedback: "Kamu memilih mengukur sebelum menentukan arah.", weights: { analyst: 5, problemSolver: 2 }, primary: "analyst" },
      { id: "trace", label: "Ikuti permintaan dari awal", detail: "Temukan di mana alurnya mulai melambat.", icon: "debug", feedback: "Kamu ingin memahami seluruh jalur masalahnya.", weights: { problemSolver: 5, analyst: 1 }, primary: "problemSolver" },
      { id: "cache", label: "Coba lapisan cache sederhana", detail: "Uji cara baru untuk mempercepat data yang sering dibaca.", icon: "spark", feedback: "Kamu tertarik menguji solusi yang bisa langsung terasa.", weights: { explorer: 4, builder: 3 }, primary: "explorer" },
      { id: "capacity", label: "Periksa kapasitas infrastrukturnya", detail: "Pastikan fondasi sistem masih cukup kuat.", icon: "cloud", feedback: "Kamu memikirkan daya tahan sistem secara menyeluruh.", weights: { guardian: 4, builder: 2 }, primary: "guardian" },
    ],
  },
  {
    id: "crisis-dataset",
    eyebrow: "Data issue",
    headline: "MESSY DATASET",
    question: "Data kegiatan mahasiswa datang dari banyak sumber dan tidak rapi. Apa yang ingin kamu lakukan dulu?",
    icon: "chart",
    options: [
      { id: "sample", label: "Bersihkan satu sampel kecil", detail: "Temukan aturan yang bisa dipakai berulang.", icon: "check", feedback: "Kamu mengubah masalah besar menjadi langkah yang bisa diuji.", weights: { analyst: 5, problemSolver: 2 }, primary: "analyst" },
      { id: "pipeline", label: "Bangun alur impor yang konsisten", detail: "Buat sistem yang merapikan data saat masuk.", icon: "build", feedback: "Kamu tertarik membangun proses yang bekerja berulang kali.", weights: { builder: 5, analyst: 1 }, primary: "builder" },
      { id: "visual", label: "Buat tampilan untuk melihat kekacauannya", detail: "Gunakan visual agar pola masalah mudah dibaca.", icon: "design", feedback: "Kamu membuat informasi rumit lebih mudah dipahami.", weights: { designer: 4, analyst: 3 }, primary: "designer" },
      { id: "model", label: "Eksperimen dengan pengelompokan otomatis", detail: "Lihat apakah teknologi baru bisa menemukan strukturnya.", icon: "spark", feedback: "Kamu tertarik menemukan pola lewat eksperimen.", weights: { explorer: 5, analyst: 2 }, primary: "explorer" },
    ],
  },
];

const decisions = [
  {
    id: "decision-website",
    eyebrow: "Quick decision 01",
    question: "Kamu punya satu hari untuk meningkatkan website kampus. Fokusmu ke mana?",
    options: [
      { id: "feature", label: "Fitur yang benar-benar bekerja", detail: "Ubah ide menjadi fungsi yang bisa dipakai.", icon: "build", feedback: "Kamu memilih kemajuan yang bisa langsung digunakan.", weights: { builder: 5, problemSolver: 1 }, primary: "builder" },
      { id: "speed", label: "Masalah yang membuatnya lambat", detail: "Cari dan lepaskan hambatan terbesar.", icon: "debug", feedback: "Kamu memilih menyelesaikan akar gangguan.", weights: { problemSolver: 5, analyst: 1 }, primary: "problemSolver" },
      { id: "clarity", label: "Alur yang lebih mudah dipahami", detail: "Buat setiap langkah terasa jelas.", icon: "design", feedback: "Kamu memprioritaskan pengalaman yang manusiawi.", weights: { designer: 5, analyst: 1 }, primary: "designer" },
      { id: "prototype", label: "Prototipe fitur cerdas baru", detail: "Uji kemungkinan yang belum pernah dicoba.", icon: "spark", feedback: "Kamu memilih membuka kemungkinan baru.", weights: { explorer: 5, builder: 1 }, primary: "explorer" },
    ],
  },
  {
    id: "decision-data",
    eyebrow: "Quick decision 02",
    question: "Kamu menerima dataset yang berantakan. Apa yang paling ingin kamu temukan?",
    options: [
      { id: "pattern", label: "Pola yang tersembunyi", detail: "Susun data sampai ceritanya terlihat.", icon: "chart", feedback: "Kamu tertarik pada struktur yang belum terlihat.", weights: { analyst: 5, explorer: 1 }, primary: "analyst" },
      { id: "cause", label: "Sumber kesalahannya", detail: "Telusuri kenapa datanya menjadi tidak konsisten.", icon: "search", feedback: "Kamu ingin memahami penyebab sebelum memperbaiki hasil.", weights: { problemSolver: 5, analyst: 2 }, primary: "problemSolver" },
      { id: "tool", label: "Alat untuk merapikannya otomatis", detail: "Buat proses yang bisa dipakai lagi.", icon: "automation", feedback: "Kamu melihat kesempatan membangun solusi berulang.", weights: { builder: 4, explorer: 3 }, primary: "builder" },
      { id: "privacy", label: "Data sensitif yang perlu dijaga", detail: "Pastikan informasi penting tidak tersebar.", icon: "shield", feedback: "Kamu memperhatikan tanggung jawab di balik data.", weights: { guardian: 5, analyst: 1 }, primary: "guardian" },
    ],
  },
  {
    id: "decision-login",
    eyebrow: "Quick decision 03",
    question: "Satu login mencurigakan muncul. Detail mana yang pertama menarik perhatianmu?",
    options: [
      { id: "protect", label: "Akun dan akses yang harus dilindungi", detail: "Kurangi risiko sebelum berkembang.", icon: "shield", feedback: "Kamu langsung melihat apa yang perlu dijaga.", weights: { guardian: 5, problemSolver: 1 }, primary: "guardian" },
      { id: "timeline", label: "Urutan aktivitasnya", detail: "Rangkai kejadian untuk membaca polanya.", icon: "history", feedback: "Kamu menyusun fakta menjadi gambaran yang jelas.", weights: { analyst: 5, problemSolver: 2 }, primary: "analyst" },
      { id: "mechanism", label: "Cara akses itu bisa terjadi", detail: "Bongkar mekanisme sampai masuk akal.", icon: "debug", feedback: "Kamu tertarik pada cara kerja di balik gejalanya.", weights: { problemSolver: 5, guardian: 2 }, primary: "problemSolver" },
      { id: "detector", label: "Cara mendeteksi pola serupa", detail: "Eksperimen agar sistem belajar memberi peringatan.", icon: "spark", feedback: "Kamu mengubah kejadian menjadi ide untuk eksplorasi.", weights: { explorer: 5, guardian: 2 }, primary: "explorer" },
    ],
  },
];

export const fallbackData = Object.freeze({
  gameVersion: GAME_VERSION,
  questionVersion: QUESTION_VERSION,
  config: {
    communityCtaUrl: "",
    resultIdleSeconds: 90,
    activeIdleSeconds: 180,
  },
  instinct,
  buildComponents,
  crisis,
  decisions,
});
