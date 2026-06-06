import type { Locale } from "@/i18n/config";

export interface ServiceStat {
  v: string;
  l: string;
}

export interface Service {
  id: string;
  label: string;
  title: string;
  desc: string;
  stats: ServiceStat[];
  img: string;
}

const SERVICES_ID: Service[] = [
  {
    id: "insight",
    label: "INSIGHTS",
    title: "BinaInsights",
    desc: "Self Awareness & Insights Discovery. Membantu individu dan tim memahami diri mereka lebih baik untuk mendorong pertumbuhan yang lebih cerdas.",
    stats: [{ v: "15k+", l: "Asesmen" }, { v: "98%", l: "Akurasi" }],
    img: "/asset/BinaInsight.png",
  },
  {
    id: "play",
    label: "PLAY",
    title: "BinaPlay",
    desc: "Gamified Learning & Team Engagement. Pengalaman belajar yang menarik untuk memperkuat koneksi, energi, dan kolaborasi tim.",
    stats: [{ v: "300+", l: "Sesi" }, { v: "4.9/5", l: "Rating" }],
    img: "/asset/BinaPlay.png",
  },
  {
    id: "lab",
    label: "LAB",
    title: "BinaLab",
    desc: "Experiential Workshops. Belajar melalui pengalaman nyata untuk membangun wawasan dan kapabilitas.",
    stats: [{ v: "250+", l: "Workshop" }, { v: "95%", l: "Kepuasan" }],
    img: "/asset/BinaLab.png",
  },
  {
    id: "academy",
    label: "ACADEMY",
    title: "BinaAcademy",
    desc: "Structured Learning Programs. Perjalanan pembelajaran terstruktur yang dirancang untuk pertumbuhan berkelanjutan.",
    stats: [{ v: "10k+", l: "Alumni" }, { v: "92%", l: "Penyelesaian" }],
    img: "/asset/BinaAcademy.png",
  },
  {
    id: "coach",
    label: "COACH",
    title: "BinaCoach",
    desc: "Executive & Performance Coaching. Membimbing individu untuk berpikir jernih, bertindak dengan kesadaran, dan tumbuh dengan rasa memiliki.",
    stats: [{ v: "500+", l: "Eksekutif" }, { v: "3x", l: "Pertumbuhan" }],
    img: "/asset/BinaCoach.png",
  },
  {
    id: "impact",
    label: "IMPACT",
    title: "BinaImpact",
    desc: "Measurement & ROI. Mengukur kemajuan untuk memastikan dampak yang bermakna dan berkelanjutan.",
    stats: [{ v: "100+", l: "Laporan" }, { v: "100%", l: "Ketertelusuran" }],
    img: "/asset/BinaImpact.png",
  },
  {
    id: "journey",
    label: "JOURNEY",
    title: "BinaJourney",
    desc: "Beyond travel. Real transformation. Perjalanan terpandu yang dirancang bukan hanya untuk menciptakan kenangan, tetapi untuk menghadirkan kejelasan, tujuan, dan pertumbuhan pribadi.",
    stats: [{ v: "50+", l: "Destinasi" }, { v: "4.9/5", l: "Pengalaman" }],
    img: "/asset/BinaJourney.png",
  },
  {
    id: "works",
    label: "WORKS",
    title: "BinaWorks",
    desc: "Execution & Performance Acceleration. Mengubah pembelajaran menjadi tindakan, dan strategi menjadi hasil nyata.",
    stats: [{ v: "200+", l: "Proyek" }, { v: "99%", l: "Tercapai" }],
    img: "/asset/BinaWorks.png",
  },
];

const SERVICES_EN: Service[] = [
  {
    id: "insight",
    label: "INSIGHTS",
    title: "BinaInsights",
    desc: "Self Awareness & Insights Discovery. Helps individuals and teams understand themselves more clearly so growth decisions become sharper.",
    stats: [{ v: "15k+", l: "Assessments" }, { v: "98%", l: "Accuracy" }],
    img: "/asset/BinaInsight.png",
  },
  {
    id: "play",
    label: "PLAY",
    title: "BinaPlay",
    desc: "Gamified Learning & Team Engagement. Engaging learning experiences that strengthen connection, energy, and team collaboration.",
    stats: [{ v: "300+", l: "Sessions" }, { v: "4.9/5", l: "Rating" }],
    img: "/asset/BinaPlay.png",
  },
  {
    id: "lab",
    label: "LAB",
    title: "BinaLab",
    desc: "Experiential Workshops. Learning through real experience to build insight, behavior awareness, and practical capability.",
    stats: [{ v: "250+", l: "Workshops" }, { v: "95%", l: "Satisfaction" }],
    img: "/asset/BinaLab.png",
  },
  {
    id: "academy",
    label: "ACADEMY",
    title: "BinaAcademy",
    desc: "Structured Learning Programs. A structured learning journey designed for sustainable capability growth.",
    stats: [{ v: "10k+", l: "Alumni" }, { v: "92%", l: "Completion" }],
    img: "/asset/BinaAcademy.png",
  },
  {
    id: "coach",
    label: "COACH",
    title: "BinaCoach",
    desc: "Executive & Performance Coaching. Guides individuals to think clearly, act with awareness, and grow with ownership.",
    stats: [{ v: "500+", l: "Executives" }, { v: "3x", l: "Growth" }],
    img: "/asset/BinaCoach.png",
  },
  {
    id: "impact",
    label: "IMPACT",
    title: "BinaImpact",
    desc: "Measurement & ROI. Measures progress to ensure learning creates meaningful and sustainable impact.",
    stats: [{ v: "100+", l: "Reports" }, { v: "100%", l: "Traceability" }],
    img: "/asset/BinaImpact.png",
  },
  {
    id: "journey",
    label: "JOURNEY",
    title: "BinaJourney",
    desc: "Beyond travel. Real transformation. Guided journeys designed not only for memories, but for clarity, purpose, and personal growth.",
    stats: [{ v: "50+", l: "Destinations" }, { v: "4.9/5", l: "Experience" }],
    img: "/asset/BinaJourney.png",
  },
  {
    id: "works",
    label: "WORKS",
    title: "BinaWorks",
    desc: "Execution & Performance Acceleration. Turns learning into action, and strategy into measurable results.",
    stats: [{ v: "200+", l: "Projects" }, { v: "99%", l: "Achieved" }],
    img: "/asset/BinaWorks.png",
  },
];

export const SERVICES = SERVICES_ID;

export function getServices(locale: Locale) {
  return locale === "en" ? SERVICES_EN : SERVICES_ID;
}
