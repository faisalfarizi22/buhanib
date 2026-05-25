export interface ServiceStat {
  v: string;
  l: string;
}

export interface Service {
  label: string;
  title: string;
  desc: string;
  stats: ServiceStat[];
  img: string;
}

export const SERVICES: Service[] = [
  {
    label: "INSIGHTS",
    title: "BinaInsights",
    desc: "Self Awareness & Insights Discovery. Membantu individu dan tim memahami diri mereka lebih baik untuk mendorong pertumbuhan yang lebih cerdas.",
    stats: [{ v: "15k+", l: "Asesmen" }, { v: "98%", l: "Akurasi" }],
    img: "/asset/BinaInsight.png",
  },
  {
    label: "PLAY",
    title: "BinaPlay",
    desc: "Gamified Learning & Team Engagement. Pengalaman belajar yang menarik untuk memperkuat koneksi, energi, dan kolaborasi tim.",
    stats: [{ v: "300+", l: "Sesi" }, { v: "4.9/5", l: "Rating" }],
    img: "/asset/BinaPlay.png",
  },
  {
    label: "LAB",
    title: "BinaLab",
    desc: "Experiential Workshops. Belajar melalui pengalaman nyata untuk membangun wawasan dan kapabilitas.",
    stats: [{ v: "250+", l: "Workshop" }, { v: "95%", l: "Kepuasan" }],
    img: "/asset/BinaLab.png",
  },
  {
    label: "ACADEMY",
    title: "BinaAcademy",
    desc: "Structured Learning Programs. Perjalanan pembelajaran terstruktur yang dirancang untuk pertumbuhan berkelanjutan.",
    stats: [{ v: "10k+", l: "Alumni" }, { v: "92%", l: "Penyelesaian" }],
    img: "/asset/BinaAcademy.png",
  },
  {
    label: "COACH",
    title: "BinaCoach",
    desc: "Executive & Performance Coaching. Membimbing individu untuk berpikir jernih, bertindak dengan kesadaran, dan tumbuh dengan rasa memiliki.",
    stats: [{ v: "500+", l: "Eksekutif" }, { v: "3x", l: "Pertumbuhan" }],
    img: "/asset/BinaCoach.png",
  },
  {
    label: "IMPACT",
    title: "BinaImpact",
    desc: "Measurement & ROI. Mengukur kemajuan untuk memastikan dampak yang bermakna dan berkelanjutan.",
    stats: [{ v: "100+", l: "Laporan" }, { v: "100%", l: "Ketertelusuran" }],
    img: "/asset/BinaImpact.png",
  },
  {
    label: "JOURNEY",
    title: "BinaJourney",
    desc: "Beyond travel. Real transformation. Perjalanan terpandu yang dirancang bukan hanya untuk menciptakan kenangan, tetapi untuk menghadirkan kejelasan, tujuan, dan pertumbuhan pribadi.",
    stats: [{ v: "50+", l: "Destinasi" }, { v: "4.9/5", l: "Pengalaman" }],
    img: "/asset/BinaJourney.png",
  },
  {
    label: "WORKS",
    title: "BinaWorks",
    desc: "Execution & Performance Acceleration. Mengubah pembelajaran menjadi tindakan, dan strategi menjadi hasil nyata.",
    stats: [{ v: "200+", l: "Proyek" }, { v: "99%", l: "Tercapai" }],
    img: "/asset/BinaWorks.png",
  },
];
