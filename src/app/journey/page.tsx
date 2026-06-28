"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { PixelIcon } from "@/components/pixel-icon";
import { useLocale } from "@/i18n/use-locale";

const chapters = [
  {
    label: "Chapter 01",
    year: "2010",
    title: "Berakar pada Pembelajaran",
    emphasis: "Berbasis Pengalaman",
    image: "/BDN.png",
    imageAlt: "BDN Team Building 2010",
    imageMode: "contain",
    kicker: "Heritage Since 2010",
    drop: "B",
    body: [
      <>
        inaHub tidak lahir di ruang hampa. Akar kami tertanam kuat dalam dedikasi panjang <span className="font-bold">BDN (Bina Daya Nugraha)</span> — perusahaan pelatihan dan penyelenggara program Team Building, yang telah mewarnai industri pengembangan SDM di Indonesia sejak tahun 2010.
      </>,
      <>Di awal dekade, kami menyadari bahwa pembelajaran terbaik tidak terjadi hanya dengan mendengarkan teori di dalam ruang kelas yang kaku. Manusia belajar secara mendalam ketika mereka bergerak, berinteraksi, menghadapi tantangan bersama, dan merefleksikan pengalaman tersebut secara langsung.</>,
    ],
  },
  {
    label: "Chapter 02",
    year: "10.000+",
    title: "Kepercayaan dari",
    emphasis: "80+ Organisasi Nasional",
    image: "/gallery/2.jpg",
    imageAlt: "10.000+ Alumni BinaHub",
    imageMode: "cover",
    kicker: "Track Record",
    drop: "S",
    body: [
      <>
        elama lebih dari 15 tahun berkiprah, BDN telah diberikan kehormatan untuk mendampingi lebih dari <span className="font-bold">10.000 peserta</span> dari berbagai sektor industri. Dari jajaran direksi BUMN, manajer perusahaan multinasional swasta, institusi pendidikan terkemuka, hingga lembaga nirlaba.
      </>,
      <>Setiap modul pembelajaran diuji langsung di lapangan, membentuk mentalitas kolaborasi tangguh, dan melahirkan sinergi tim yang kokoh. Pengalaman nyata inilah yang menjadi bahan bakar utama dalam memahami anatomi budaya organisasi di Indonesia secara mendalam.</>,
    ],
  },
  {
    label: "Chapter 03",
    year: "Global",
    title: "Simulasi Bisnis Global",
    emphasis: "",
    image: "/asset/bsksims-representatives.webp",
    imageAlt: "BSKSims Strategic Partnerships",
    imageMode: "cover",
    kicker: "Global Simulation",
    drop: "K",
    body: [
      <>
        omitmen kami dalam membawa standar terbaik diwujudkan dengan menjadi mitra resmi di Indonesia dari <span className="font-bold">BSKSims (www.bsksims.com)</span> — penyedia platform simulasi keputusan strategis terkemuka asal Amerika Serikat.
      </>,
      <>Melalui kolaborasi global ini, kami mengintegrasikan teknologi simulasi bisnis ke dalam sistem pengembangan kepemimpinan dan asesmen talenta di Indonesia. Simulasi interaktif ini memaksa para pemimpin masa depan untuk mengambil keputusan taktis secara presisi di tengah dinamika pasar digital yang dinamis dan kompetitif.</>,
    ],
  },
  {
    label: "Chapter 04",
    year: "AI Era",
    title: "Lahirnya BinaHub:",
    emphasis: "Memanusiawikan Masa Depan",
    image: "/3D-logo.webp",
    imageAlt: "BinaHub Future Capability Partner",
    imageMode: "logo",
    kicker: "Future Capability",
    drop: "D",
    body: [
      <>unia kerja terus bergerak dengan kecepatan disrupsi yang luar biasa. Masuknya era kecerdasan buatan (AI) dan otomatisasi membawa tantangan baru bagi eksistensi manusia di dalam organisasi.</>,
      <>
        BinaHub lahir sebagai <span className="font-bold">sister company</span> BDN untuk menjawab tantangan makro ini. Jika BDN berfokus penuh pada pelatihan berbasis pengalaman (<span className="font-bold">experiential learning</span>), BinaHub hadir melangkah lebih jauh sebagai <span className="font-bold">mitra transformasi organisasi menyeluruh</span> yang menyinergikan kapasitas manusia, kedalaman budaya kerja, kekuatan ekosistem teknologi, dan ketepatan data analitik AI.
      </>,
    ],
  },
];

const chaptersEn: typeof chapters = [
  {
    label: "Chapter 01",
    year: "2010",
    title: "Rooted in Learning",
    emphasis: "Through Experience",
    image: "/BDN.png",
    imageAlt: "BDN Team Building 2010",
    imageMode: "contain",
    kicker: "Heritage Since 2010",
    drop: "B",
    body: [
      <>
        inaHub was not born in a vacuum. Our roots are firmly planted in the long dedication of <span className="font-bold">BDN (Bina Daya Nugraha)</span> -- a training company and team building program organizer that has contributed to Indonesia&apos;s people development industry since 2010.
      </>,
      <>At the beginning of the decade, we realized that the best learning does not happen only by listening to theory in a rigid classroom. People learn deeply when they move, interact, face challenges together, and reflect on those experiences directly.</>,
    ],
  },
  {
    label: "Chapter 02",
    year: "10,000+",
    title: "Trusted by",
    emphasis: "80+ National Organizations",
    image: "/gallery/2.jpg",
    imageAlt: "10,000+ BinaHub Alumni",
    imageMode: "cover",
    kicker: "Track Record",
    drop: "O",
    body: [
      <>
        ver more than 15 years, BDN has had the honor of accompanying more than <span className="font-bold">10,000 participants</span> across industries: state-owned enterprise directors, multinational managers, leading education institutions, and nonprofit organizations.
      </>,
      <>Every learning module was tested directly in the field, shaping resilient collaboration and strong team synergy. These real experiences became the foundation for understanding the anatomy of organizational culture in Indonesia.</>,
    ],
  },
  {
    label: "Chapter 03",
    year: "Global",
    title: "Global Business Simulation",
    emphasis: "",
    image: "/asset/bsksims-representatives.webp",
    imageAlt: "BSKSims Strategic Partnerships",
    imageMode: "cover",
    kicker: "Global Simulation",
    drop: "O",
    body: [
      <>
        ur commitment to bringing the best standards is reflected in becoming the official partner in Indonesia for <span className="font-bold">BSKSims (www.bsksims.com)</span> -- a leading strategic decision simulation platform from the United States.
      </>,
      <>Through this global collaboration, we integrate business simulation technology into leadership development and talent assessment systems in Indonesia. The interactive simulation pushes future leaders to make precise tactical decisions amid dynamic and competitive digital markets.</>,
    ],
  },
  {
    label: "Chapter 04",
    year: "AI Era",
    title: "The Birth of BinaHub:",
    emphasis: "Humanizing the Future",
    image: "/3D-logo.webp",
    imageAlt: "BinaHub Future Capability Partner",
    imageMode: "logo",
    kicker: "Future Capability",
    drop: "T",
    body: [
      <>he world of work continues to move at extraordinary disruption speed. The rise of artificial intelligence and automation brings new challenges for human existence inside organizations.</>,
      <>
        BinaHub was born as BDN&apos;s <span className="font-bold">sister company</span> to answer this macro challenge. If BDN focused fully on experience-based training (<span className="font-bold">experiential learning</span>), BinaHub goes further as a <span className="font-bold">holistic organizational transformation partner</span> that connects human capacity, cultural depth, technology ecosystem strength, and AI data analytics precision.
      </>,
    ],
  },
];

const BDN_LOGOS = [
  { name: "Acer", src: "/partner/acer.png" },
  { name: "Astra Honda Motor", src: "/partner/AHM.svg" },
  { name: "AirNav Indonesia", src: "/partner/airnav.webp" },
  { name: "Aldena", src: "/partner/Aldena.png" },
  { name: "Alkagra", src: "/partner/alkagra.png" },
  { name: "Castrol", src: "/partner/castrol.png" },
  { name: "Chandra Asri", src: "/partner/chandraasri.png" },
  { name: "Ciputra", src: "/partner/ciputra.png" },
  { name: "Dattabot", src: "/partner/dattabot.png" },
  { name: "DDI", src: "/partner/ddi.png" },
  { name: "Holcim", src: "/partner/holcim.png" },
  { name: "IBCSD", src: "/partner/ibcsd.png" },
  { name: "Indosat", src: "/partner/indosat.png" },
  { name: "Kiroyan", src: "/partner/kiroyan.png" },
  { name: "MS Coal", src: "/partner/mscoal.png" },
  { name: "Prowell Energy", src: "/partner/prowellenergy.png" },
  { name: "Safran", src: "/partner/safran.svg" },
  { name: "Sampoerna", src: "/partner/sampurna.png" },
  { name: "Sarana Jaya", src: "/partner/saranajaya.webp" },
  { name: "Siap Siaga", src: "/partner/siapsiaga.png" },
  { name: "Sqiva", src: "/partner/Sqiva.png" },
  { name: "Swisscontact", src: "/partner/swisscontact.png" },
  { name: "Syngenta", src: "/partner/syngenta.png" },
  { name: "Telin", src: "/partner/Telin.png" },
  { name: "Telkom Infra", src: "/partner/Telkomimetra.png" },
  { name: "Transcorp", src: "/partner/transcorp.svg" },
  { name: "Umira", src: "/partner/umira.png" },
];

const COPY = {
  id: {
    tag: "TENTANG KAMI",
    title: "Perjalanan",
    titleAccent: "Kami.",
    desc: "Menghubungkan rekam jejak pelatihan berbasis pengalaman selama 15 tahun menuju gerbang transformasi organisasi masa depan di era AI.",
    meta: "Sister company of PT Bina Daya Nugraha - Est 2010",
    quote: "Masa depan tidak hanya membutuhkan organisasi yang lebih cerdas secara teknologi, tetapi juga organisasi yang jauh lebih matang secara manusiawi.",
    cite: "BinaHub Filosofi Transformasi",
    proofEyebrow: "Arsip Rekam Jejak BDN",
    proofTitle: "Pengalaman yang menjadi fondasi lahirnya BinaHub.",
    proofDesc: "Selama lebih dari 15 tahun, Bina Daya Nugraha telah mendampingi berbagai organisasi dalam perjalanan pembelajaran, pengembangan kepemimpinan, dan transformasi organisasi. Sebagian organisasi berikut menjadi bagian dari perjalanan tersebut.",
    proofStats: [
      { value: "15+", label: "Tahun Pengalaman" },
      { value: "10.000+", label: "Peserta" },
      { value: "80+", label: "Organisasi Nasional" },
    ],
    chapters,
  },
  en: {
    tag: "ABOUT US",
    title: "Our",
    titleAccent: "Journey.",
    desc: "Connecting 15 years of experience-based learning track record to the gateway of future organizational transformation in the AI era.",
    meta: "Sister company of PT Bina Daya Nugraha - Est 2010",
    quote: "The future does not only need organizations that are more technologically intelligent, but also organizations that are far more humanly mature.",
    cite: "BinaHub Transformation Philosophy",
    proofEyebrow: "BDN Track Record Archive",
    proofTitle: "Experience that became the foundation for BinaHub.",
    proofDesc: "For more than 15 years, Bina Daya Nugraha has accompanied organizations through learning, leadership development, and organizational transformation journeys. The organizations below became part of that journey.",
    proofStats: [
      { value: "15+", label: "Years of Experience" },
      { value: "10,000+", label: "Participants" },
      { value: "80+", label: "National Organizations" },
    ],
    chapters: chaptersEn,
  },
};

export default function JourneyPage() {
  const locale = useLocale();
  const copy = COPY[locale];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F6F8] pt-28 font-sans text-[#4A4C54] antialiased">
      <section className="px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[18px] bg-[#071A33] px-6 py-14 text-white shadow-[0_28px_86px_-68px_rgba(11,44,107,0.58)] md:px-12 md:py-18 lg:px-16">
          <Image
            src="/story-hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#071A33]/18" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,51,0.52)_0%,rgba(7,26,51,0.30)_48%,rgba(7,26,51,0.10)_100%)]" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="flex items-center gap-4">
                <PixelIcon type="about" size={34} />
                <Tag>{copy.tag}</Tag>
              </div>
              <h1 className="mt-8 text-5xl font-light leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl md:text-8xl lg:text-[112px]">
                {copy.title}
                <span className="block italic text-[#D9A441]">{copy.titleAccent}</span>
              </h1>
            </div>
            <div className="border-l border-[#D9A441]/70 pl-6 md:pl-8">
              <p className="max-w-2xl text-xl font-light leading-relaxed text-white/76 md:text-2xl">
                {copy.desc}
              </p>
              <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.24em] text-white/45">
                {copy.meta}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1360px]">
          <div className="relative">
            <div className="absolute left-[12px] top-10 hidden h-[calc(100%-5rem)] w-px bg-[#D9A441]/28 lg:block" />
            <div className="space-y-16 md:space-y-24">
              {copy.chapters.map((chapter, index) => (
                <div key={chapter.label} className="space-y-16 md:space-y-24">
                  <ChapterBlock chapter={chapter} index={index} />
                  {index === 1 && (
                    <BdnArchiveWall
                      eyebrow={copy.proofEyebrow}
                      title={copy.proofTitle}
                      description={copy.proofDesc}
                      stats={copy.proofStats}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 md:pb-28 lg:px-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[18px] bg-[#071A33] p-6 text-center text-white shadow-[0_34px_90px_-70px_rgba(7,26,51,0.86)] md:p-12 lg:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[#D9A441]">
            <Quote size={30} />
          </div>
          <blockquote className="mx-auto mt-8 max-w-4xl text-2xl font-light italic leading-relaxed tracking-[-0.02em] md:text-4xl">
            &ldquo;{copy.quote}&rdquo;
          </blockquote>
          <cite className="mt-8 block text-xs font-bold uppercase not-italic tracking-[0.24em] text-white/40">
            {copy.cite}
          </cite>
        </div>
      </section>
    </main>
  );
}

function BdnArchiveWall({
  eyebrow,
  title,
  description,
  stats,
}: {
  eyebrow: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65 }}
      className="relative overflow-hidden border border-[#0B2C6B]/10 bg-[#071A33] text-white shadow-[0_28px_90px_-70px_rgba(7,26,51,0.82)] lg:ml-12"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(217,164,65,0.18),transparent_30%),linear-gradient(120deg,rgba(255,255,255,0.06),transparent_42%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_42px)] opacity-20" />

      <div className="relative z-10 grid gap-7 p-6 md:p-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-10 lg:p-10">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D9A441]">
              {eyebrow}
            </p>
            <h3 className="mt-4 max-w-md text-3xl font-light leading-[1.08] tracking-[-0.04em] md:text-[42px]">
              {title}
            </h3>
            <p className="mt-5 max-w-lg text-sm font-light leading-[1.75] text-white/66 md:text-[15px]">
              {description}
            </p>
          </div>
          <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-light leading-none tracking-[-0.04em] text-[#D9A441] md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[9px] font-bold uppercase leading-snug tracking-[0.15em] text-white/36">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {BDN_LOGOS.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.025, 0.45), duration: 0.42 }}
              className="group flex h-[74px] items-center justify-center bg-[#081E3B]/88 px-5 transition-colors duration-300 hover:bg-white md:h-20"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={138}
                height={52}
                sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 180px"
                className="max-h-9 w-auto max-w-full object-contain grayscale invert opacity-48 transition duration-300 group-hover:invert-0 group-hover:grayscale-0 group-hover:opacity-95"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ChapterBlock({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[number];
  index: number;
}) {
  const imageFirst = index % 2 === 1;
  const isGlobalSimulation = index === 2;
  const textColumn = isGlobalSimulation ? "lg:col-span-5" : "lg:col-span-6";
  const imageColumn = isGlobalSimulation ? "lg:col-span-7" : "lg:col-span-6";
  const imageHeight = isGlobalSimulation ? "lg:h-[560px]" : "lg:h-[520px]";

  return (
    <article className="relative grid gap-10 lg:grid-cols-12 lg:gap-16 lg:pl-12">
      <span className="absolute left-[6px] top-6 hidden h-3 w-3 rounded-full bg-[#D9A441] ring-8 ring-[#F4F6F8] lg:block" />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className={`${textColumn} ${imageFirst ? "lg:order-2" : ""}`}
      >
        <div className="mb-8 flex items-center justify-between gap-5 border-b border-black/[0.06] pb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B8841F]">{chapter.label}</p>
            <p className="mt-2 text-sm font-medium text-[#0B2C6B]/48">{chapter.kicker}</p>
          </div>
          <p className="font-mono text-2xl text-[#0B2C6B]/28 md:text-4xl">{chapter.year}</p>
        </div>

        <h2 className="text-3xl font-light leading-tight tracking-[-0.035em] text-[#0B2C6B] md:text-5xl">
          {chapter.title}
          {chapter.emphasis && (
            <>
              <br />
              <span className="font-semibold italic text-[#0B2C6B]">{chapter.emphasis}</span>
            </>
          )}
        </h2>

        <div className="mt-8 space-y-6 text-base font-light leading-[1.85] text-black/66">
          <p>
            <span className="float-left mr-3 mt-2 font-sans text-6xl font-semibold leading-[0.78] text-[#D9A441]">
              {chapter.drop}
            </span>
            {chapter.body[0]}
          </p>
          <p>{chapter.body[1]}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className={`${imageColumn} ${imageFirst ? "lg:order-1" : ""}`}
      >
        <div className={`group relative h-[280px] overflow-hidden rounded-[16px] border border-black/[0.06] bg-white shadow-[0_22px_70px_-56px_rgba(11,44,107,0.42)] sm:h-[360px] ${imageHeight}`}>
          <div className="absolute right-5 top-5 z-20 rounded-full border border-black/[0.06] bg-white/88 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B2C6B]/52 backdrop-blur">
            {chapter.kicker}
          </div>

          {chapter.imageMode === "logo" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAF8] p-12">
              <Image
                src={chapter.image}
                alt={chapter.imageAlt}
                width={620}
                height={420}
                className="h-auto w-full max-w-[520px] object-contain"
              />
            </div>
          ) : chapter.imageMode === "contain" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAF8] p-10">
              <Image
                src={chapter.image}
                alt={chapter.imageAlt}
                width={620}
                height={420}
                className="max-h-[78%] w-auto object-contain opacity-86 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          ) : (
            <Image
              src={chapter.image}
              alt={chapter.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,26,51,0.20)_100%)]" />
        </div>
      </motion.div>
    </article>
  );
}
