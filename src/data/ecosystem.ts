import type { Locale } from "@/i18n/config";

export const ECOSYSTEM_DATA = {
  insight: {
    id: "insight",
    title: "BinaInsights",
    iconType: "insights",
    subtitle: "Self Awareness & Insights Discovery",
    tagline: "Kesadaran Diri dan Penggalian Makna",
    challenges: [
      "Konflik antar tim yang terpendam",
      "Komunikasi yang kurang efektif",
      "Rendahnya rasa memiliki (belonging)",
      "Pemimpin yang kurang memahami dinamika tim"
    ],
    description: "Sering kali perusahaan hanya melihat gejala di permukaan tanpa memahami akar perilaku, pola pikir, dan motivasi yang sebenarnya ada.",
    benefits: [
      "Keputusan pengembangan yang tepat sasaran",
      "Meningkatkan kolaborasi & sinergi tim",
      "Mengurangi konflik internal yang merusak",
      "Memperkuat efektivitas kepemimpinan"
    ],
    results: [
      "Pemetaan karakter & dinamika tim",
      "Profil kepemimpinan individu",
      "Analisis budaya organisasi",
      "Dashboard insight & data pengembangan"
    ],
    color: "#D9A441"
  },
  lab: {
    id: "lab",
    title: "BinaLab",
    iconType: "lab",
    subtitle: "Experiential Workshops",
    tagline: "Lokakarya Berbasis Pengalaman",
    challenges: [
      "Pelatihan yang terlalu teoritis & membosankan",
      "Kurangnya keterlibatan peserta",
      "Materi yang mudah dilupakan paska sesi",
      "Kurangnya perubahan perilaku nyata"
    ],
    description: "BinaLab memberikan pembelajaran berbasis pengalaman agar peserta lebih terlibat, reflektif, dan sadar terhadap perilaku diri dalam situasi aman.",
    benefits: [
      "Peserta jauh lebih terlibat & reflektif",
      "Koneksi antara materi dengan realitas kerja",
      "Pengalaman belajar yang membekas kuat",
      "Peningkatan kesadaran perilaku diri"
    ],
    results: [
      "Peningkatan keterlibatan peserta",
      "Penguatan kolaborasi tim yang nyata",
      "Rencana aksi paska pelatihan",
      "Perubahan perilaku yang dapat diobservasi"
    ],
    color: "#E27B38"
  },
  coach: {
    id: "coach",
    title: "BinaCoach",
    iconType: "coach",
    subtitle: "Executive & Performance Coaching",
    tagline: "Coaching Kepemimpinan dan Kinerja",
    challenges: [
      "Pemimpin kuat teknis tapi lemah leadership",
      "Individu potensial yang sulit berkembang",
      "Manajer yang kehilangan arahan strategis",
      "Karyawan tanpa kejelasan tujuan"
    ],
    description: "Pelatihan umum seringkali tidak cukup untuk kebutuhan spesifik individu. Coaching memungkinkan perubahan yang lebih personal dan berkelanjutan.",
    benefits: [
      "Berpikir lebih jernih & terarah",
      "Membangun rasa tanggung jawab mandiri",
      "Memperkuat pola pikir kepemimpinan",
      "Meningkatkan performa individu secara drastis"
    ],
    results: [
      "Peningkatan efektivitas kepemimpinan",
      "Kejelasan tujuan & arah pengembangan",
      "Rencana pengembangan pribadi terukur",
      "Peningkatan performa & akuntabilitas"
    ],
    color: "#4A90E2"
  },
  journey: {
    id: "journey",
    title: "BinaJourney",
    iconType: "journey",
    subtitle: "Beyond Travel. Real Transformation.",
    tagline: "Lebih dari Sekadar Perjalanan",
    challenges: [
      "Gathering yang hanya formalitas & wisata",
      "Minim refleksi dalam perjalanan bersama",
      "Tidak ada perubahan nyata paska perjalanan",
      "Hilangnya momentum kebersamaan"
    ],
    description: "Perjalanan transformasional yang mengintegrasikan refleksi, coaching, dan pertumbuhan personal untuk membawa perubahan nyata.",
    benefits: [
      "Menemukan kejelasan arah hidup & karir",
      "Memperkuat tujuan (purpose) hidup",
      "Membangun kesadaran diri yang mendalam",
      "Perbaikan pola pikir secara holistik"
    ],
    results: [
      "Peningkatan refleksi & kesadaran diri",
      "Komunitas pertumbuhan berkelanjutan",
      "Rencana transformasi pribadi paska travel",
      "Perubahan perilaku yang nyata di kantor"
    ],
    color: "#50B83C"
  },
  play: {
    id: "play",
    title: "BinaPlay",
    iconType: "play",
    subtitle: "Gamified Learning & Engagement",
    tagline: "Pembelajaran Gamifikasi",
    challenges: [
      "Kegiatan engagement yang monoton",
      "Kurang membangun koneksi yang kuat",
      "Sesi yang menyenangkan sesaat tanpa dampak",
      "Rendahnya partisipasi aktif karyawan"
    ],
    description: "BinaPlay menggunakan pendekatan gamifikasi untuk menjadikan proses pembelajaran dan engagement lebih menarik, energik, dan membekas.",
    benefits: [
      "Meningkatkan partisipasi aktif tim",
      "Memperkuat kolaborasi melalui permainan",
      "Retensi pembelajaran yang lebih tinggi",
      "Budaya kerja yang lebih positif & dinamis"
    ],
    results: [
      "Peningkatan engagement score",
      "Pengalaman belajar yang menyenangkan",
      "Koneksi tim yang jauh lebih solid",
      "Memori pembelajaran yang tahan lama"
    ],
    color: "#D35400"
  },
  academy: {
    id: "academy",
    title: "BinaAcademy",
    iconType: "academy",
    subtitle: "Structured Learning Programs",
    tagline: "Program Pembelajaran Terstruktur",
    challenges: [
      "Program pengembangan sporadis & tidak terukur",
      "Tanpa jalur pembelajaran (learning path) jelas",
      "Kurikulum yang tidak relevan dengan bisnis",
      "Pengembangan yang tidak berkelanjutan"
    ],
    description: "Membantu perusahaan membangun sistem pembelajaran yang terstruktur, terukur, dan relevan dengan kebutuhan bisnis masa depan.",
    benefits: [
      "Sistem pembelajaran yang terintegrasi",
      "Jalur pengembangan kompetensi yang jelas",
      "Program kepemimpinan yang sistematis",
      "Pengembangan yang selaras dengan strategi"
    ],
    results: [
      "Kurikulum & modul pembelajaran relevan",
      "Peningkatan kompetensi yang terukur",
      "Talent pool yang lebih siap pakai",
      "Budaya belajar yang berkelanjutan"
    ],
    color: "#8E44AD"
  },
  impact: {
    id: "impact",
    title: "BinaImpact",
    iconType: "impact",
    subtitle: "Measurement & ROI",
    tagline: "Pengukuran Dampak & Investasi",
    challenges: [
      "Dampak pengembangan yang tidak terukur",
      "Perubahan perilaku yang sulit dibuktikan",
      "Manfaat bisnis yang tidak terlihat (ROI)",
      "Sulit mengevaluasi efektivitas anggaran"
    ],
    description: "Memastikan setiap program pengembangan menghasilkan dampak nyata yang dapat diukur secara kuantitatif maupun kualitatif.",
    benefits: [
      "Memonitor perubahan perilaku secara nyata",
      "Mengevaluasi implementasi program",
      "Memastikan ROI dari setiap investasi HR",
      "Data-driven decision making untuk HR"
    ],
    results: [
      "Laporan efektivitas program komprehensif",
      "Analisis dampak & nilai investasi (ROI)",
      "Dashboard perkembangan & performa",
      "Rekomendasi perbaikan program berbasis data"
    ],
    color: "#16A085"
  },
  works: {
    id: "works",
    title: "BinaWorks",
    iconType: "works",
    subtitle: "Execution & Performance Acceleration",
    tagline: "Akselerasi Eksekusi dan Kinerja",
    challenges: [
      "Strategi yang gagal dieksekusi konsisten",
      "Tidak ada sistem akuntabilitas yang kuat",
      "Kurang pengawasan & monitoring harian",
      "Kehilangan momentum paska pelatihan"
    ],
    description: "BinaWorks membantu organisasi mengubah pembelajaran menjadi tindakan, strategi menjadi implementasi, dan rencana menjadi hasil nyata.",
    benefits: [
      "Percepatan eksekusi yang disiplin",
      "Penguatan akuntabilitas di setiap level",
      "Implementasi strategi yang berkelanjutan",
      "Peningkatan performa bisnis secara nyata"
    ],
    results: [
      "Pencapaian target kerja yang lebih cepat",
      "Sistem akuntabilitas yang terlembaga",
      "Budaya eksekusi yang disiplin & konsisten",
      "Monitoring performa yang transparan"
    ],
    color: "#2C3E50"
  }
}

export type EcosystemData = typeof ECOSYSTEM_DATA;

export const ECOSYSTEM_DATA_EN: EcosystemData = {
  insight: {
    id: "insight",
    title: "BinaInsights",
    iconType: "insights",
    subtitle: "Self Awareness & Insights Discovery",
    tagline: "Self-awareness and meaning discovery",
    challenges: [
      "Hidden conflict across teams",
      "Ineffective communication",
      "Low sense of belonging",
      "Leaders who do not fully understand team dynamics"
    ],
    description: "Organizations often only see surface symptoms without understanding the deeper behavioral roots, mindsets, and motivations at play.",
    benefits: [
      "More targeted development decisions",
      "Stronger collaboration and team synergy",
      "Reduced destructive internal conflict",
      "Improved leadership effectiveness"
    ],
    results: [
      "Character and team dynamics mapping",
      "Individual leadership profiles",
      "Organizational culture analysis",
      "Insight and development data dashboard"
    ],
    color: "#D9A441"
  },
  lab: {
    id: "lab",
    title: "BinaLab",
    iconType: "lab",
    subtitle: "Experiential Workshops",
    tagline: "Experience-based workshops",
    challenges: [
      "Training that feels too theoretical and dull",
      "Low participant engagement",
      "Content that is quickly forgotten after the session",
      "Limited real behavior change"
    ],
    description: "BinaLab delivers experience-based learning so participants become more engaged, reflective, and aware of their behavior in a safe setting.",
    benefits: [
      "Participants become more engaged and reflective",
      "Clearer connection between content and workplace reality",
      "Learning experiences that leave a stronger memory",
      "Improved self-awareness around behavior"
    ],
    results: [
      "Higher participant engagement",
      "Practical team collaboration improvement",
      "Post-training action plans",
      "Observable behavior change"
    ],
    color: "#E27B38"
  },
  coach: {
    id: "coach",
    title: "BinaCoach",
    iconType: "coach",
    subtitle: "Executive & Performance Coaching",
    tagline: "Leadership and performance coaching",
    challenges: [
      "Technically strong leaders with weak leadership habits",
      "High-potential individuals who struggle to grow",
      "Managers who lose strategic direction",
      "Employees without clear purpose"
    ],
    description: "General training is often not enough for individual needs. Coaching enables more personal and sustainable change.",
    benefits: [
      "Clearer and more directed thinking",
      "Stronger personal ownership",
      "More mature leadership mindset",
      "Significant individual performance improvement"
    ],
    results: [
      "Improved leadership effectiveness",
      "Clearer goals and development direction",
      "Measurable personal development plans",
      "Higher performance and accountability"
    ],
    color: "#4A90E2"
  },
  journey: {
    id: "journey",
    title: "BinaJourney",
    iconType: "journey",
    subtitle: "Beyond Travel. Real Transformation.",
    tagline: "More than a trip",
    challenges: [
      "Gatherings that become formalities or tourism only",
      "Limited reflection during shared journeys",
      "No meaningful change after the trip",
      "Lost momentum after people return"
    ],
    description: "A transformational journey that integrates reflection, coaching, and personal growth to create meaningful change.",
    benefits: [
      "Clearer life and career direction",
      "Stronger personal purpose",
      "Deeper self-awareness",
      "More holistic mindset improvement"
    ],
    results: [
      "Stronger reflection and self-awareness",
      "Sustainable growth community",
      "Post-travel personal transformation plan",
      "Visible behavior change back at work"
    ],
    color: "#50B83C"
  },
  play: {
    id: "play",
    title: "BinaPlay",
    iconType: "play",
    subtitle: "Gamified Learning & Engagement",
    tagline: "Gamified learning",
    challenges: [
      "Monotonous engagement activities",
      "Weak connection building",
      "Fun sessions with little lasting impact",
      "Low active employee participation"
    ],
    description: "BinaPlay uses gamification to make learning and engagement more energizing, memorable, and meaningful.",
    benefits: [
      "Higher active team participation",
      "Stronger collaboration through play",
      "Better learning retention",
      "A more positive and dynamic work culture"
    ],
    results: [
      "Improved engagement scores",
      "Enjoyable learning experiences",
      "Much stronger team connection",
      "Longer-lasting learning memory"
    ],
    color: "#D35400"
  },
  academy: {
    id: "academy",
    title: "BinaAcademy",
    iconType: "academy",
    subtitle: "Structured Learning Programs",
    tagline: "Structured learning programs",
    challenges: [
      "Sporadic and unmeasured development programs",
      "No clear learning path",
      "Curriculum that is disconnected from business needs",
      "Development that does not continue"
    ],
    description: "Helps companies build structured, measurable, and future-relevant learning systems.",
    benefits: [
      "Integrated learning systems",
      "Clear competency development pathways",
      "Systematic leadership programs",
      "Development aligned with strategy"
    ],
    results: [
      "Relevant curriculum and learning modules",
      "Measurable competency improvement",
      "A more ready talent pool",
      "Sustainable learning culture"
    ],
    color: "#8E44AD"
  },
  impact: {
    id: "impact",
    title: "BinaImpact",
    iconType: "impact",
    subtitle: "Measurement & ROI",
    tagline: "Impact and investment measurement",
    challenges: [
      "Unmeasured development impact",
      "Behavior change that is difficult to prove",
      "Invisible business benefits or ROI",
      "Difficulty evaluating budget effectiveness"
    ],
    description: "Ensures every development program produces real impact that can be measured quantitatively and qualitatively.",
    benefits: [
      "Monitor real behavior change",
      "Evaluate program implementation",
      "Ensure ROI from every HR investment",
      "Support data-driven HR decisions"
    ],
    results: [
      "Comprehensive program effectiveness reports",
      "Impact and ROI analysis",
      "Development and performance dashboard",
      "Data-based improvement recommendations"
    ],
    color: "#16A085"
  },
  works: {
    id: "works",
    title: "BinaWorks",
    iconType: "works",
    subtitle: "Execution & Performance Acceleration",
    tagline: "Execution and performance acceleration",
    challenges: [
      "Strategies that fail to be executed consistently",
      "No strong accountability system",
      "Limited daily supervision and monitoring",
      "Lost momentum after training"
    ],
    description: "BinaWorks helps organizations turn learning into action, strategy into implementation, and plans into measurable results.",
    benefits: [
      "Disciplined execution acceleration",
      "Stronger accountability at every level",
      "Sustainable strategy implementation",
      "Real business performance improvement"
    ],
    results: [
      "Faster achievement of work targets",
      "Institutionalized accountability systems",
      "Disciplined and consistent execution culture",
      "Transparent performance monitoring"
    ],
    color: "#2C3E50"
  }
}

export function getEcosystemData(locale: Locale) {
  return locale === "en" ? ECOSYSTEM_DATA_EN : ECOSYSTEM_DATA;
}
