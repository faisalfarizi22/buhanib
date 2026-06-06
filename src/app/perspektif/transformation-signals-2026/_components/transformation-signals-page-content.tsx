import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  LineChart,
} from "lucide-react";
import { defaultLocale, hasLocale, localizePath } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Transformation Signals 2026 | BinaHub Perspektif",
  description:
    "Sepuluh sinyal perubahan dunia kerja Indonesia 2026 dan implikasinya bagi strategi transformasi manusia, organisasi, dan AI.",
};

const SIGNALS = [
  {
    group: "Economic Pressure",
    title: "Daya beli melemah",
    status: "Terbukti",
    signal:
      "Konsumen semakin berhati-hati menjaga keamanan finansial ketika upah riil dan penghasilan terasa tertahan.",
    evidence:
      "Analisis NEXT Indonesia Center menyebut upah Agustus 2025 naik 1,94% yoy, sementara inflasi 2,31% yoy, sehingga upah riil terkontraksi 0,37%. IPSI BPS juga sempat turun dari 120,2 pada Juni 2025 ke 112,9 pada September 2025.",
    implication:
      "Organisasi tidak bisa lagi mengandalkan asumsi daya beli yang stabil. Strategi people development perlu semakin dekat dengan produktivitas, prioritas bisnis, dan kemampuan tim merespons tekanan pasar.",
    sources: ["NEXT Indonesia Center", "BPS - Indeks Penghasilan Saat Ini"],
  },
  {
    group: "Economic Pressure",
    title: "Tekanan efisiensi dan margin",
    status: "Terbukti",
    signal:
      "Banyak perusahaan mulai menahan ekspansi, merapikan struktur, dan mencari cara bekerja yang lebih hemat tanpa kehilangan kinerja.",
    evidence:
      "PMI manufaktur Indonesia April 2026 tercatat kontraksi di 49,1. Pelemahan rupiah, tekanan pasar modal, dan konfirmasi pelaku HR tentang efisiensi memperkuat sinyal ini.",
    implication:
      "Dalam fase defensif, pelatihan yang terlalu generik makin sulit dibenarkan. Program perlu langsung terkait dengan prioritas kapabilitas, perubahan perilaku, dan ukuran dampak.",
    sources: ["S&P Global PMI", "PMSM Indonesia", "Data pasar keuangan"],
  },
  {
    group: "Transformation Gap",
    title: "Skill gap dan talent mismatch",
    status: "Terbukti",
    signal:
      "Kebutuhan kerja bergerak ke problem solving, analisis, digital skills, dan kemampuan praktis, sementara suplai talenta belum selalu siap.",
    evidence:
      "Survei PwC 2025 menyebut 57% perusahaan di Indonesia melihat kurangnya digital skills sebagai hambatan ekspansi. PMSM Indonesia juga menyoroti lulusan baru yang masih terlalu teoretis.",
    implication:
      "Learning strategy perlu berpindah dari transfer materi ke pembentukan kapabilitas. Simulasi, coaching, project-based learning, dan assessment menjadi semakin penting.",
    sources: ["PwC Hopes and Fears 2025 Indonesia", "PMSM Indonesia", "World Bank"],
  },
  {
    group: "Transformation Gap",
    title: "Bingung transformasi AI",
    status: "Terbukti dengan nuansa",
    signal:
      "Tekanan adopsi AI meningkat, tetapi banyak organisasi masih berhenti di eksperimen, workshop, dan pilot yang belum mengubah proses inti.",
    evidence:
      "Survei regional menempatkan Indonesia sebagai first mover AI di ASEAN, namun data adopsi menunjukkan integrasi mendalam ke proses bisnis masih terbatas. Sebagian besar inisiatif masih berada pada tahap eksplorasi.",
    implication:
      "AI transformation tidak cukup dimulai dari tools. Organisasi perlu kesiapan manusia, use case yang jelas, tata kelola, dan cara mengukur dampak kerja setelah AI masuk.",
    sources: ["The Business Times - Kantar", "IDC", "McKinsey", "Gartner"],
  },
  {
    group: "Economic Pressure",
    title: "Ketidakpastian ekonomi global",
    status: "Terbukti",
    signal:
      "Volatilitas kurs, energi, dan geopolitik membuat pengambilan keputusan bisnis semakin penuh skenario.",
    evidence:
      "Pelemahan rupiah, fluktuasi harga minyak Brent, ketegangan geopolitik, dan cadangan devisa yang tetap perlu dijaga menunjukkan tekanan eksternal yang terus memengaruhi perusahaan.",
    implication:
      "Pemimpin membutuhkan cara berpikir adaptif: membaca sinyal, membuat prioritas, dan menjaga tim tetap bergerak ketika kepastian makin mahal.",
    sources: ["Bank Indonesia", "Data komoditas energi", "Laporan pasar"],
  },
  {
    group: "Workforce Shift",
    title: "Ketidakpastian masa depan kerja",
    status: "Terbukti",
    signal:
      "Sebagian pekerja merasa lebih aman karena mampu memakai AI, sementara kelompok lain melihat masa depan kerja makin sulit ditebak.",
    evidence:
      "PwC 2025 menunjukkan pengguna GenAI harian di Indonesia merasa lebih aman terhadap pekerjaannya dibanding pengguna tidak rutin. CSIS juga melaporkan lebih dari 1,01 juta lulusan universitas menganggur pada awal 2025.",
    implication:
      "Kesenjangan rasa aman akan menjadi isu budaya. Organisasi perlu membantu pekerja memahami peran baru, bukan hanya meminta mereka beradaptasi sendiri.",
    sources: ["PwC Hopes and Fears 2025 Indonesia", "CSIS", "Data ketenagakerjaan"],
  },
  {
    group: "Workforce Shift",
    title: "Burnout dan mental fatigue",
    status: "Terbukti",
    signal:
      "Produktivitas tidak hanya ditentukan oleh skill, tetapi juga energi mental yang tersisa untuk berpikir, berkolaborasi, dan mengambil keputusan.",
    evidence:
      "Laporan SHRM 2025 menyebut 52% karyawan mengalami burnout. Workplace Wellbeing Score Indonesia 2025 menunjukkan kesejahteraan mental pekerja Indonesia berada di bawah rata-rata global.",
    implication:
      "Wellbeing perlu diperlakukan sebagai isu performa, bukan sekadar benefit. Desain kerja, kepemimpinan, dan ritme belajar perlu ikut dibenahi.",
    sources: ["SHRM 2025", "Workplace Wellbeing Score Indonesia 2025"],
  },
  {
    group: "Workforce Shift",
    title: "Tekanan biaya hidup",
    status: "Terbukti",
    signal:
      "Ketika pendapatan terasa tertinggal dari kenaikan harga, pekerja membawa tekanan finansial itu ke dalam energi dan fokus kerja.",
    evidence:
      "Upah buruh Februari 2026 disebut naik 3,09% yoy ke Rp3,29 juta per bulan, sementara inflasi Februari 2026 mencapai 4,76% yoy, sehingga upah riil tertekan.",
    implication:
      "Employee experience tidak bisa dilepaskan dari konteks ekonomi. Program engagement perlu lebih peka terhadap beban nyata pekerja.",
    sources: ["BPS", "Data inflasi dan upah buruh"],
  },
  {
    group: "Workforce Shift",
    title: "Entry-level makin sulit",
    status: "Terbukti",
    signal:
      "Posisi awal karier semakin tertekan oleh efisiensi, otomasi, AI, dan ekspektasi skill yang lebih tinggi sejak hari pertama.",
    evidence:
      "PMSM Indonesia mengonfirmasi fresh graduate semakin sulit mendapat pekerjaan. LPEM UI menambahkan pengangguran terdidik cenderung meningkat tajam saat ekonomi melemah.",
    implication:
      "Organisasi perlu memikirkan ulang pipeline talenta: onboarding, apprenticeship, learning sprint, dan akses pengalaman praktis menjadi lebih penting.",
    sources: ["PMSM Indonesia", "LPEM UI"],
  },
  {
    group: "Transformation Gap",
    title: "Anxiety adaptasi teknologi",
    status: "Plausible dan didukung",
    signal:
      "Pekerja diminta terus belajar teknologi baru, tetapi akses, waktu, dan dukungan belajar tidak selalu merata.",
    evidence:
      "Survei Graphie 2026 menyoroti kekurangan digital skills sebagai hambatan. PwC juga menunjukkan upskilling divide antara non-manajer dan eksekutif senior.",
    implication:
      "Upskilling perlu demokratis. Jika akses belajar hanya kuat di level atas, transformasi akan menciptakan jarak baru di dalam organisasi.",
    sources: ["Graphie 2026", "PwC Hopes and Fears 2025 Indonesia"],
  },
];

const SIGNALS_EN: typeof SIGNALS = [
  {
    group: "Economic Pressure",
    title: "Purchasing power weakens",
    status: "Validated",
    signal: "Consumers are becoming more cautious in protecting financial security as real wages and income feel constrained.",
    evidence: "NEXT Indonesia Center analysis noted August 2025 wages rose 1.94% yoy while inflation reached 2.31% yoy, contracting real wages by 0.37%. BPS' Current Income Index also fell from 120.2 in June 2025 to 112.9 in September 2025.",
    implication: "Organizations can no longer rely on stable purchasing power assumptions. People development strategy needs to be closer to productivity, business priorities, and team capability to respond to market pressure.",
    sources: ["NEXT Indonesia Center", "BPS - Current Income Index"],
  },
  {
    group: "Economic Pressure",
    title: "Efficiency and margin pressure",
    status: "Validated",
    signal: "Many companies are slowing expansion, cleaning up structures, and seeking more efficient ways of working without losing performance.",
    evidence: "Indonesia's manufacturing PMI in April 2026 was contractionary at 49.1. Rupiah weakness, capital market pressure, and HR practitioner confirmation around efficiency reinforce this signal.",
    implication: "In a defensive phase, overly generic training becomes harder to justify. Programs need to connect directly to capability priorities, behavior change, and impact measures.",
    sources: ["S&P Global PMI", "PMSM Indonesia", "Financial market data"],
  },
  {
    group: "Transformation Gap",
    title: "Skill gap and talent mismatch",
    status: "Validated",
    signal: "Work needs are shifting toward problem solving, analysis, digital skills, and practical capability, while talent supply is not always ready.",
    evidence: "PwC 2025 reported that 57% of companies in Indonesia see lack of digital skills as an expansion barrier. PMSM Indonesia also highlighted new graduates who remain too theoretical.",
    implication: "Learning strategy needs to move from content transfer to capability building. Simulation, coaching, project-based learning, and assessment become increasingly important.",
    sources: ["PwC Hopes and Fears 2025 Indonesia", "PMSM Indonesia", "World Bank"],
  },
  {
    group: "Transformation Gap",
    title: "AI transformation confusion",
    status: "Validated with nuance",
    signal: "Pressure to adopt AI is increasing, but many organizations are still stuck in experiments, workshops, and pilots that have not changed core processes.",
    evidence: "Regional surveys place Indonesia as an AI first mover in ASEAN, but adoption data shows deep integration into business processes remains limited. Most initiatives are still exploratory.",
    implication: "AI transformation cannot start only from tools. Organizations need human readiness, clear use cases, governance, and ways to measure work impact after AI enters the workflow.",
    sources: ["The Business Times - Kantar", "IDC", "McKinsey", "Gartner"],
  },
  {
    group: "Economic Pressure",
    title: "Global economic uncertainty",
    status: "Validated",
    signal: "Currency, energy, and geopolitical volatility make business decision making increasingly scenario-driven.",
    evidence: "Rupiah weakness, Brent oil price fluctuation, geopolitical tension, and pressure to maintain foreign exchange reserves show external pressure continues to affect companies.",
    implication: "Leaders need adaptive thinking: reading signals, setting priorities, and keeping teams moving when certainty becomes more expensive.",
    sources: ["Bank Indonesia", "Energy commodity data", "Market reports"],
  },
  {
    group: "Workforce Shift",
    title: "Uncertainty around the future of work",
    status: "Validated",
    signal: "Some workers feel safer because they can use AI, while others see the future of work as increasingly unpredictable.",
    evidence: "PwC 2025 showed daily GenAI users in Indonesia feel more secure about their jobs than non-regular users. CSIS also reported more than 1.01 million university graduates unemployed in early 2025.",
    implication: "The security gap will become a culture issue. Organizations need to help workers understand new roles, not merely ask them to adapt alone.",
    sources: ["PwC Hopes and Fears 2025 Indonesia", "CSIS", "Labor market data"],
  },
  {
    group: "Workforce Shift",
    title: "Burnout and mental fatigue",
    status: "Validated",
    signal: "Productivity is shaped not only by skills, but also by the mental energy left for thinking, collaborating, and making decisions.",
    evidence: "SHRM 2025 reported 52% of employees experience burnout. Indonesia's 2025 Workplace Wellbeing Score shows worker mental wellbeing below the global average.",
    implication: "Wellbeing needs to be treated as a performance issue, not merely a benefit. Work design, leadership, and learning rhythm all need improvement.",
    sources: ["SHRM 2025", "Workplace Wellbeing Score Indonesia 2025"],
  },
  {
    group: "Workforce Shift",
    title: "Cost-of-living pressure",
    status: "Validated",
    signal: "When income feels left behind by rising prices, workers bring that financial pressure into their work energy and focus.",
    evidence: "Worker wages in February 2026 reportedly rose 3.09% yoy to Rp3.29 million per month, while February 2026 inflation reached 4.76% yoy, putting real wages under pressure.",
    implication: "Employee experience cannot be separated from economic context. Engagement programs need to be more sensitive to workers' real burdens.",
    sources: ["BPS", "Inflation and labor wage data"],
  },
  {
    group: "Workforce Shift",
    title: "Entry-level roles become harder",
    status: "Validated",
    signal: "Early career positions are increasingly pressured by efficiency, automation, AI, and higher skill expectations from day one.",
    evidence: "PMSM Indonesia confirmed that fresh graduates are finding it harder to get jobs. LPEM UI added that educated unemployment tends to rise sharply when the economy weakens.",
    implication: "Organizations need to rethink talent pipelines: onboarding, apprenticeship, learning sprints, and access to practical experience become more important.",
    sources: ["PMSM Indonesia", "LPEM UI"],
  },
  {
    group: "Transformation Gap",
    title: "Technology adaptation anxiety",
    status: "Plausible and supported",
    signal: "Workers are asked to keep learning new technology, but access, time, and learning support are not always evenly distributed.",
    evidence: "Graphie 2026 highlighted lack of digital skills as a barrier. PwC also showed an upskilling divide between non-managers and senior executives.",
    implication: "Upskilling needs to be democratic. If learning access is strong only at the top, transformation will create a new internal distance.",
    sources: ["Graphie 2026", "PwC Hopes and Fears 2025 Indonesia"],
  },
];

const GROUP_META = [
  {
    title: "Economic Pressure",
    short: "Pressure",
    desc: "Daya beli, margin, efisiensi, dan volatilitas global menekan prioritas organisasi.",
    icon: LineChart,
  },
  {
    title: "Workforce Shift",
    short: "Workforce",
    desc: "Burnout, tekanan biaya hidup, dan masa depan kerja mengubah energi serta rasa aman pekerja.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Transformation Gap",
    short: "Gap",
    desc: "AI, skill mismatch, dan upskilling divide membuat transformasi perlu desain yang lebih manusiawi.",
    icon: BarChart3,
  },
];

const GROUP_META_EN: typeof GROUP_META = [
  {
    title: "Economic Pressure",
    short: "Pressure",
    desc: "Purchasing power, margins, efficiency, and global volatility are pressuring organizational priorities.",
    icon: LineChart,
  },
  {
    title: "Workforce Shift",
    short: "Workforce",
    desc: "Burnout, cost-of-living pressure, and the future of work are changing worker energy and security.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Transformation Gap",
    short: "Gap",
    desc: "AI, skill mismatch, and the upskilling divide require a more human-centered transformation design.",
    icon: BarChart3,
  },
];

const HOME_PAIN_SIGNALS = [
  {
    title: "Target naik. Kepastian turun.",
    desc: "Tekanan bisnis dan pasar menjadi konteks awal sebelum membaca sinyal lebih detail.",
    image: "/asset/slide-5.png",
  },
  {
    title: "Energi kerja menipis.",
    desc: "Perubahan energi pekerja menjadi sinyal budaya yang perlu dibaca lebih awal.",
    image: "/asset/slide-6.png",
  },
  {
    title: "AI cepat. Kapabilitas tertinggal.",
    desc: "Adopsi teknologi perlu disambungkan dengan kesiapan manusia dan cara kerja.",
    image: "/asset/slide-7.png",
  },
  {
    title: "Workshop selesai. Perubahan belum tentu terjadi.",
    desc: "Briefing ini mengarah pada respons: diagnosis, desain, eksekusi, dan pengukuran.",
    image: "/asset/slide-8.png",
  },
];

const HOME_PAIN_SIGNALS_EN: typeof HOME_PAIN_SIGNALS = [
  {
    title: "Targets rise. Certainty drops.",
    desc: "Business and market pressure provide the starting context before reading the signals in more detail.",
    image: "/asset/slide-5.png",
  },
  {
    title: "Work energy is thinning.",
    desc: "Shifting worker energy becomes a culture signal that needs to be read earlier.",
    image: "/asset/slide-6.png",
  },
  {
    title: "AI moves fast. Capability lags.",
    desc: "Technology adoption needs to be connected with human readiness and ways of working.",
    image: "/asset/slide-7.png",
  },
  {
    title: "The workshop ends. Change may not.",
    desc: "This briefing points toward a response: diagnosis, design, execution, and measurement.",
    image: "/asset/slide-8.png",
  },
];

const COPY = {
  id: {
    back: "Perspektif",
    heroDesc: "Sepuluh sinyal perubahan untuk membantu leaders membaca tekanan ekonomi, pergeseran tenaga kerja, dan gap transformasi sebelum menentukan agenda people development.",
    snapshot: "Briefing snapshot",
    snapshotItems: [["10", "signals"], ["3", "pressure areas"], ["2026", "planning lens"]],
    connected: "Connected from Home",
    connectedTitle: "Dari pain point menuju briefing.",
    connectedDesc: "Empat pesan di Home menjadi pintu masuk. Halaman ini membuka konteksnya lebih dalam agar leaders bisa melihat pola, bukti, dan implikasi strategisnya.",
    homeSignal: "Home Signal",
    summary: "Executive summary",
    summaryTitle: "Tiga tekanan besar sedang bergerak bersamaan.",
    signalsLabel: "signals",
    priority: "Priority signals",
    priorityTitle: "What leaders should discuss first.",
    priorityDesc: "Tiga sinyal ini paling dekat dengan keputusan strategi organisasi: efisiensi, kapabilitas, dan kesiapan AI.",
    leadershipImplication: "Leadership implication",
    register: "Signal register",
    registerTitle: "The complete briefing.",
    registerDesc: "Dibuat untuk diagnosis strategis: tiap sinyal memuat pola, bukti, implikasi, dan sumber ringkas. Bukti ditempatkan lebih tenang agar halaman tidak terasa seperti spreadsheet.",
    evidence: "Evidence",
    response: "Recommended response",
    responseTitle: "Build a people transformation operating system.",
    responseDesc: "Ketika sinyal berubah cepat, organisasi butuh alur yang menghubungkan diagnosis, desain intervensi, pengalaman belajar, eksekusi, dan pengukuran dampak.",
    responseItems: ["Diagnose capability gaps", "Design targeted interventions", "Develop adaptive leaders", "Measure impact and execution"],
    startDiagnosis: "Mulai Diagnosa",
    viewServices: "Lihat Layanan",
  },
  en: {
    back: "Perspective",
    heroDesc: "Ten change signals to help leaders read economic pressure, workforce shifts, and transformation gaps before setting a people development agenda.",
    snapshot: "Briefing snapshot",
    snapshotItems: [["10", "signals"], ["3", "pressure areas"], ["2026", "planning lens"]],
    connected: "Connected from Home",
    connectedTitle: "From pain point to briefing.",
    connectedDesc: "The four messages on Home become the entry point. This page opens the context more deeply so leaders can see patterns, evidence, and strategic implications.",
    homeSignal: "Home Signal",
    summary: "Executive summary",
    summaryTitle: "Three major pressures are moving at once.",
    signalsLabel: "signals",
    priority: "Priority signals",
    priorityTitle: "What leaders should discuss first.",
    priorityDesc: "These three signals are closest to organizational strategy decisions: efficiency, capability, and AI readiness.",
    leadershipImplication: "Leadership implication",
    register: "Signal register",
    registerTitle: "The complete briefing.",
    registerDesc: "Built for strategic diagnosis: each signal contains pattern, evidence, implication, and concise sources. Evidence is placed calmly so the page does not feel like a spreadsheet.",
    evidence: "Evidence",
    response: "Recommended response",
    responseTitle: "Build a people transformation operating system.",
    responseDesc: "When signals change quickly, organizations need a flow that connects diagnosis, intervention design, learning experience, execution, and impact measurement.",
    responseItems: ["Diagnose capability gaps", "Design targeted interventions", "Develop adaptive leaders", "Measure impact and execution"],
    startDiagnosis: "Start Diagnosis",
    viewServices: "View Services",
  },
};

export default async function TransformationSignalsPage() {
  const headerList = await headers();
  const localeHeader = headerList.get("x-binahub-locale");
  const locale = hasLocale(localeHeader) ? localeHeader : defaultLocale;
  const isEnglish = locale === "en";
  const signals = isEnglish ? SIGNALS_EN : SIGNALS;
  const groupMeta = isEnglish ? GROUP_META_EN : GROUP_META;
  const prioritySignals = [signals[1], signals[2], signals[3]];
  const homePainSignals = isEnglish ? HOME_PAIN_SIGNALS_EN : HOME_PAIN_SIGNALS;
  const copy = COPY[locale];

  return (
    <main className="min-h-screen bg-[#F4F6F8] pt-24 font-sans text-[#1F2328] antialiased">
      <section className="px-4 pb-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href={localizePath("/perspektif", locale)}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#5F646D] transition-colors hover:text-[#0B2C6B]"
          >
            <ArrowLeft size={14} />
            {copy.back}
          </Link>

          <div className="relative overflow-hidden rounded-[18px] bg-[#071A33] text-white shadow-[0_34px_100px_-72px_rgba(7,26,51,0.9)]">
            <Image
              src="/asset/slide-5.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-62 saturate-[1.04] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,51,0.96)_0%,rgba(7,26,51,0.78)_42%,rgba(7,26,51,0.34)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(217,164,65,0.22),transparent_26%),linear-gradient(0deg,rgba(7,26,51,0.52),transparent_46%)]" />

            <div className="relative z-10 grid gap-12 px-6 py-14 md:px-10 md:py-16 lg:grid-cols-[1fr_360px] lg:px-14">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#D9A441]">
                  Executive Briefing / 2026
                </div>
                <h1 className="mt-8 max-w-4xl text-5xl font-light leading-[0.98] tracking-[-0.052em] md:text-7xl lg:text-[88px]">
                  Transformation Signals for Indonesia&rsquo;s workforce.
                </h1>
                <p className="mt-7 max-w-3xl text-base font-light leading-[1.8] text-white/68 md:text-lg">
                  {copy.heroDesc}
                </p>
              </div>

              <aside className="rounded-[14px] border border-white/10 bg-white/[0.075] p-6 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/38">{copy.snapshot}</p>
                <div className="mt-8 grid grid-cols-3 gap-4 lg:grid-cols-1">
                  {copy.snapshotItems.map(([value, label]) => (
                    <div key={label} className="border-l border-[#D9A441]/50 pl-4">
                      <p className="text-4xl font-light tracking-[-0.04em]">{value}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">{label}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#B8841F]">{copy.connected}</p>
              <h2 className="mt-3 text-4xl font-light tracking-[-0.045em] text-[#0B2C6B] md:text-6xl">
                {copy.connectedTitle}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-black/54">
              {copy.connectedDesc}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {homePainSignals.map((item, index) => (
              <article key={item.title} className="group relative min-h-[300px] overflow-hidden rounded-[16px] bg-[#071A33] p-5 text-white shadow-[0_22px_70px_-58px_rgba(7,26,51,0.74)]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,51,0.18)_0%,rgba(7,26,51,0.62)_58%,rgba(7,26,51,0.92)_100%)]" />
                <div className="relative z-10 flex min-h-[260px] flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-[#D9A441]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/58">
                      {copy.homeSignal}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-light leading-tight tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-white/62">{item.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#B8841F]">{copy.summary}</p>
            <h2 className="mt-4 text-4xl font-light leading-tight tracking-[-0.045em] text-[#0B2C6B] md:text-6xl">
              {copy.summaryTitle}
            </h2>
          </div>
          <div className="grid gap-4">
            {groupMeta.map((group) => {
              const Icon = group.icon;
              const count = signals.filter((item) => item.group === group.title).length;

              return (
                <article key={group.title} className="grid gap-5 rounded-[14px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_54px_-48px_rgba(11,44,107,0.28)] md:grid-cols-[64px_1fr_96px] md:items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#FFF8EA] text-[#B8841F]">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#0B2C6B]">{group.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/58">{group.desc}</p>
                  </div>
                  <div className="rounded-full bg-[#F4F6F8] px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#0B2C6B]/58">
                    {count} {copy.signalsLabel}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#B8841F]">{copy.priority}</p>
              <h2 className="mt-3 text-4xl font-light tracking-[-0.045em] text-[#0B2C6B] md:text-6xl">
                {copy.priorityTitle}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-black/54">
              {copy.priorityDesc}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {prioritySignals.map((item, index) => (
              <article
                key={item.title}
                className="relative overflow-hidden rounded-[16px] border border-white/14 bg-[#071A33] p-7 text-white shadow-[0_22px_70px_-58px_rgba(7,26,51,0.72)]"
              >
                <Image
                  src="/cta-footer-bg.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center opacity-80"
                />
                <div className="absolute inset-0 bg-[#071A33]/38" />
                <div className="absolute inset-x-0 top-0 h-28 bg-white/[0.07] blur-2xl" />
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.02)_36%,rgba(7,26,51,0.28)_100%)]" />

                <div className="relative z-10 mb-10 flex items-center justify-between">
                  <span className="font-mono text-sm text-[#D9A441]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="rounded-full border border-white/14 bg-white/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/58 backdrop-blur-md">{item.group}</span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-light leading-tight tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-5 text-sm leading-[1.75] text-white/68">{item.signal}</p>
                  <div className="mt-7 border-t border-white/14 pt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A441]">{copy.leadershipImplication}</p>
                    <p className="mt-3 text-sm leading-[1.7] text-white/76">{item.implication}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="signals" className="px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#B8841F]">{copy.register}</p>
              <h2 className="mt-3 text-4xl font-light tracking-[-0.045em] text-[#0B2C6B] md:text-6xl">
                {copy.registerTitle}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-black/54">
              {copy.registerDesc}
            </p>
          </div>

          <div className="overflow-hidden rounded-[16px] border border-black/[0.06] bg-white shadow-[0_24px_80px_-64px_rgba(11,44,107,0.34)]">
            {signals.map((item, index) => (
              <article
                id={`signal-${index + 1}`}
                key={item.title}
                className="grid scroll-mt-28 gap-6 border-b border-black/[0.06] p-6 last:border-b-0 md:grid-cols-[88px_0.9fr_1.2fr] md:p-7 lg:p-8"
              >
                <div>
                  <p className="font-mono text-sm text-[#0B2C6B]/40">{String(index + 1).padStart(2, "0")}</p>
                  <span className="mt-4 inline-flex rounded-full bg-[#F4F6F8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B2C6B]/52">
                    {item.status}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B8841F]">{item.group}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#0B2C6B] md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.75] text-black/64">{item.signal}</p>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-[12px] bg-[#F7F8FA] p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B2C6B]/46">{copy.evidence}</p>
                    <p className="text-sm leading-[1.7] text-black/62">{item.evidence}</p>
                  </div>
                  <div className="rounded-[12px] border border-[#D9A441]/18 bg-[#FFF8EA] p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8841F]">{copy.leadershipImplication}</p>
                    <p className="text-sm leading-[1.7] text-black/70">{item.implication}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.sources.map((source) => (
                      <span
                        key={source}
                        className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3 py-1.5 text-xs text-[#5F646D]"
                      >
                        <ExternalLink size={12} />
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="response" className="px-6 py-12 md:px-12 md:py-16 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-[18px] bg-[#071A33] p-6 text-white md:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#D9A441]">{copy.response}</p>
              <h2 className="mt-4 text-4xl font-light tracking-[-0.045em] md:text-6xl">
                {copy.responseTitle}
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-white/60">
                {copy.responseDesc}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.responseItems.map((item) => (
                <div key={item} className="flex gap-3 rounded-[12px] border border-white/10 bg-white/[0.065] p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#D9A441]" size={18} />
                  <p className="text-sm font-medium leading-relaxed text-white/78">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={localizePath("/insight", locale)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D9A441] px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[#071A33] transition-colors hover:bg-white"
            >
              {copy.startDiagnosis}
              <ArrowRight size={14} />
            </Link>
            <Link
              href={localizePath("/ecosystem", locale)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.04] px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10"
            >
              {copy.viewServices}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
