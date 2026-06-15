"use client"

import { motion } from "framer-motion"
import { Compass, Target, ArrowRight, Zap, Shield, Heart, Globe, Cpu, UserCheck, Leaf } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { localizePath } from "@/i18n/config"
import { useLocale } from "@/i18n/use-locale"
import { Tag } from "@/components/ui/tag"
import { CoreValuesSection } from "@/components/core-values-section"

const CAPABILITY_TEXTURES = [
  "/asset/human-grid.png",
  "/asset/architecture-lines.png",
  "/asset/wave-pattern.png",
  "/asset/leadership-corridor.png",
  "/asset/ai-globe.png",
];

const MISI_PILLARS = [
  {
    icon: <UserCheck size={20} />,
    title: "People Development",
    desc: "Membangun kapabilitas masa depan dengan memastikan manusia tetap menjadi inti dari setiap transformasi.",
    delay: 120,
  },
  {
    icon: <Target size={20} />,
    title: "Adaptive Leadership",
    desc: "Mengembangkan kepemimpinan yang dibangun dengan kecerdasan, integritas, kebijaksanaan, dan empati.",
    delay: 160,
  },
  {
    icon: <Leaf size={20} />,
    title: "Healthy Culture",
    desc: "Menciptakan budaya kerja yang sehat dan bertumbuh di tengah otomatisasi dan era digitalisasi AI.",
    delay: 200,
  },
  {
    icon: <Compass size={20} />,
    title: "Future Capability Partner",
    desc: "Membantu organisasi mendesain sistem yang adaptif, resilien, dan siap menyongsong perubahan era global.",
    delay: 240,
  },
  {
    icon: <Cpu size={20} />,
    title: "AI-Powered Insights",
    desc: "Memadukan AI dan data analitik modern sebagai pendorong utama dalam pengambilan keputusan strategis yang presisi.",
    delay: 280,
  },
];

const MISSION_TEXTURES = [
  "bg-[radial-gradient(circle_at_22%_26%,rgba(255,255,255,0.32),transparent_18%),linear-gradient(135deg,transparent_0%,transparent_45%,rgba(255,255,255,0.36)_46%,transparent_47%),repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_1px,transparent_1px_18px)]",
  "bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.34),transparent_16%),repeating-radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.24)_0_1px,transparent_1px_12px)]",
  "bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.28),transparent_20%),repeating-linear-gradient(150deg,rgba(255,255,255,0.2)_0_1px,transparent_1px_16px)]",
  "bg-[linear-gradient(130deg,transparent_0%,transparent_44%,rgba(255,255,255,0.32)_45%,transparent_46%),repeating-linear-gradient(0deg,rgba(255,255,255,0.15)_0_1px,transparent_1px_20px)]",
  "bg-[radial-gradient(circle_at_78%_28%,rgba(255,255,255,0.3),transparent_18%),repeating-linear-gradient(45deg,rgba(255,255,255,0.18)_0_1px,transparent_1px_14px)]",
];

const CAPABILITIES = [
  { title: "Pengembangan Manusia", icon: <Heart size={20} />, desc: "Menumbuhkan potensi utuh individu." },
  { title: "Transformasi Organisasi", icon: <Globe size={20} />, desc: "Membangun sistem yang adaptif & resilien." },
  { title: "Pembelajaran Strategis", icon: <Zap size={20} />, desc: "Edukasi yang relevan dengan masa depan." },
  { title: "Kepemimpinan", icon: <Shield size={20} />, desc: "Membentuk pemimpin berintegritas tinggi." },
  { title: "Kesiapan Era AI", icon: <Cpu size={20} />, desc: "Tetap relevan di tengah disrupsi teknologi." }
];

const PARTNER_LOGOS = [
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

const ABOUT_COPY = {
  id: {
    heroTag: "Tentang BinaHub",
    heroTitle: "Memanusiawikan",
    heroAccent: "Masa Depan.",
    heroDesc: "BinaHub hadir sebagai mitra transformasi dan kapabilitas masa depan di era perubahan.",
    whoTag: "SIAPA KAMI",
    whoTitle: <>Mitra transformasi<span className="block font-medium italic">yang berpusat pada manusia.</span></>,
    whoP1: "BinaHub membantu organisasi membaca perubahan, mengembangkan kapabilitas manusia, dan merancang transformasi yang tidak berhenti pada aktivitas pelatihan.",
    whoP2: <>Kami percaya masa depan membutuhkan organisasi yang cerdas secara teknologi, sekaligus <span className="text-[#D9A441]">matang secara manusiawi.</span></>,
    challenges: [
      "Hilangnya banyak jenis pekerjaan",
      "Meningkatnya tekanan dan burnout",
      "Krisis kepemimpinan di era digital",
      "Menurunnya kualitas hubungan manusia",
      "Organisasi yang kehilangan makna & nilai"
    ],
    journeyTag: "LEGACY & PERJALANAN",
    journeyTitle: <>Berakar pada{" "}<span className="font-medium italic text-[#D9A441]">Pengembangan Manusia.</span></>,
    journeyP1: <>BinaHub lahir sebagai <i>sister company</i> dari{" "}<strong className="font-medium text-black/80">BDN (Bina Daya Nugraha)</strong>{" "}-- spesialis pelatihan berbasis pengalaman yang telah berkiprah sejak tahun 2010 dan menjangkau lebih dari 10.000+ peserta dari 80+ organisasi nasional.</>,
    journeyP2: <>Sebagai kelanjutan strategis, BinaHub melangkah lebih jauh untuk mendampingi organisasi menghadapi era otomatisasi dan disrupsi kecerdasan buatan (AI). Kami memadukan pengembangan SDM, simulasi keputusan global bersama{" "}<strong className="font-medium text-black/80">BSKSims</strong>{" "}asal Amerika Serikat, kepemimpinan adaptif, dan teknologi canggih dalam satu ekosistem transformasi yang utuh.</>,
    journeyCta: "Perjalanan Kami",
    bdnCta: "Dari BDN ke BinaHub",
    proofEyebrow: "Rekam Jejak BDN",
    proofTitle: "Pengalaman yang menjadi fondasi lahirnya BinaHub",
    proofDesc: "Sebelum BinaHub hadir, tim kami telah mendampingi berbagai organisasi melalui Bina Daya Nugraha sejak 2010. Pengalaman tersebut menjadi salah satu fondasi lahirnya BinaHub.",
    proofStats: [
      { value: "15+", label: "Tahun Pengalaman" },
      { value: "10k+", label: "Peserta" },
      { value: "80+", label: "Organisasi Nasional" },
    ],
    positionTag: "POSISI KAMI",
    positionTitle: <>Mitra transformasi<span className="block">& kapabilitas</span><span className="block font-medium">masa depan.</span></>,
    positionDesc: "Peran kami adalah membantu organisasi menghubungkan arah bisnis, kapabilitas manusia, budaya kerja, dan kesiapan teknologi dalam satu sistem transformasi yang dapat dijalankan.",
    capabilities: [
      { title: "Pengembangan Manusia", desc: "Menumbuhkan potensi utuh individu." },
      { title: "Transformasi Organisasi", desc: "Membangun sistem yang adaptif & resilien." },
      { title: "Pembelajaran Strategis", desc: "Edukasi yang relevan dengan masa depan." },
      { title: "Kepemimpinan", desc: "Membentuk pemimpin berintegritas tinggi." },
      { title: "Kesiapan Era AI", desc: "Tetap relevan di tengah disrupsi teknologi." }
    ],
    visionTag: "VISI & MISI",
    visionEyebrow: "Visi Kami",
    visionTitle: <>Masa depan di mana <span className="italic font-normal">kemanusiaan</span> dan kemajuan berjalan beriringan.</>,
    visionSub: "A future where humanity and progress grow in harmony.",
    visionDesc: <>BinaHub percaya bahwa kemajuan dan kemanusiaan bukanlah dua hal yang saling bertentangan. Teknologi, AI, dan transformasi organisasi seharusnya menjadi sarana untuk <span className="text-[#D9A441] font-semibold">meningkatkan kualitas kehidupan manusia.</span></>,
    missionPillars: [
      "Membangun kapabilitas masa depan dengan memastikan manusia tetap menjadi inti dari setiap transformasi.",
      "Mengembangkan kepemimpinan yang dibangun dengan kecerdasan, integritas, kebijaksanaan, dan empati.",
      "Menciptakan budaya kerja yang sehat dan bertumbuh di tengah otomatisasi dan era digitalisasi AI.",
      "Membantu organisasi mendesain sistem yang adaptif, resilien, dan siap menyongsong perubahan era global.",
      "Memadukan AI dan data analitik modern sebagai pendorong utama dalam pengambilan keputusan strategis yang presisi."
    ],
  },
  en: {
    heroTag: "About BinaHub",
    heroTitle: "Humanizing",
    heroAccent: "The Future.",
    heroDesc: "BinaHub is a transformation and future capability partner for an era of continuous change.",
    whoTag: "WHO WE ARE",
    whoTitle: <>A transformation partner<span className="block font-medium italic">centered on people.</span></>,
    whoP1: "BinaHub helps organizations read change, develop human capability, and design transformation that goes beyond training activities.",
    whoP2: <>We believe the future needs organizations that are technologically intelligent and <span className="text-[#D9A441]">humanly mature.</span></>,
    challenges: [
      "The disappearance of many types of work",
      "Rising pressure and burnout",
      "Leadership crisis in the digital era",
      "Declining quality of human relationships",
      "Organizations losing meaning and values"
    ],
    journeyTag: "LEGACY & JOURNEY",
    journeyTitle: <>Rooted in{" "}<span className="font-medium italic text-[#D9A441]">Human Development.</span></>,
    journeyP1: <>BinaHub was born as a <i>sister company</i> of{" "}<strong className="font-medium text-black/80">BDN (Bina Daya Nugraha)</strong>{" "}-- an experience-based training specialist active since 2010, reaching more than 10,000 participants across 80+ national organizations.</>,
    journeyP2: <>As a strategic continuation, BinaHub goes further in helping organizations face automation and artificial intelligence disruption. We combine people development, global decision simulation with{" "}<strong className="font-medium text-black/80">BSKSims</strong>{" "}from the United States, adaptive leadership, and advanced technology into one complete transformation ecosystem.</>,
    journeyCta: "Our Journey",
    bdnCta: "From BDN to BinaHub",
    proofEyebrow: "BDN Track Record",
    proofTitle: "Experience that became the foundation for BinaHub",
    proofDesc: "Before BinaHub was established, our team accompanied diverse organizations through Bina Daya Nugraha since 2010. That experience became one of the foundations for BinaHub.",
    proofStats: [
      { value: "15+", label: "Years of Experience" },
      { value: "10k+", label: "Participants" },
      { value: "80+", label: "National Organizations" },
    ],
    positionTag: "OUR POSITION",
    positionTitle: <>Transformation partner<span className="block">& future</span><span className="block font-medium">capability builder.</span></>,
    positionDesc: "Our role is to help organizations connect business direction, human capability, work culture, and technology readiness into one executable transformation system.",
    capabilities: [
      { title: "Human Development", desc: "Growing the whole potential of individuals." },
      { title: "Organizational Transformation", desc: "Building adaptive and resilient systems." },
      { title: "Strategic Learning", desc: "Education that stays relevant to the future." },
      { title: "Leadership", desc: "Shaping leaders with strong integrity." },
      { title: "AI Era Readiness", desc: "Staying relevant amid technological disruption." }
    ],
    visionTag: "VISION & MISSION",
    visionEyebrow: "Our Vision",
    visionTitle: <>A future where <span className="italic font-normal">humanity</span> and progress move together.</>,
    visionSub: "A future where humanity and progress grow in harmony.",
    visionDesc: <>BinaHub believes progress and humanity are not opposing forces. Technology, AI, and organizational transformation should become a way to <span className="text-[#D9A441] font-semibold">improve the quality of human life.</span></>,
    missionPillars: [
      "Build future capability by ensuring people remain at the center of every transformation.",
      "Develop leadership built on intelligence, integrity, wisdom, and empathy.",
      "Create a healthy work culture that grows amid automation and the AI digital era.",
      "Help organizations design adaptive, resilient systems ready for global change.",
      "Combine AI and modern data analytics as key drivers for precise strategic decisions."
    ],
  },
};

const premiumEase = [0.22, 1, 0.36, 1] as const;

function BdnProofLogos({
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
  const midpoint = Math.ceil(PARTNER_LOGOS.length / 2);
  const topLogos = PARTNER_LOGOS.slice(0, midpoint);
  const bottomLogos = PARTNER_LOGOS.slice(midpoint);
  const marqueeRows = [
    { logos: [...topLogos, ...topLogos], direction: ["0%", "-50%"], duration: 42 },
    { logos: [...bottomLogos, ...bottomLogos], direction: ["-50%", "0%"], duration: 48 },
  ];

  return (
    <div className="mt-14 border-y border-[#0B2C6B]/8 py-8 md:mt-[72px] md:py-10">
      <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:gap-12">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#D9A441]">
            {eyebrow}
          </p>
          <h3 className="mt-4 max-w-xl text-3xl font-light leading-[1.08] tracking-[-0.04em] text-[#0B2C6B] md:text-4xl lg:text-[42px]">
            {title}
          </h3>
          <p className="mt-5 max-w-xl text-[15px] font-light leading-[1.75] text-black/62 md:text-lg">
            {description}
          </p>
          <div className="mt-7 grid grid-cols-3 gap-3 border-t border-[#0B2C6B]/8 pt-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-light leading-none tracking-[-0.04em] text-[#0B2C6B] md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[9px] font-bold uppercase leading-snug tracking-[0.16em] text-black/36">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden py-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FAFAF8] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FAFAF8] to-transparent" />
          <div className="space-y-4">
            {marqueeRows.map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="flex w-max items-center gap-5 md:gap-6"
                animate={{ x: row.direction }}
                transition={{ duration: row.duration, repeat: Infinity, ease: "linear" }}
              >
                {row.logos.map((logo, index) => (
                  <div
                    key={`${logo.name}-${rowIndex}-${index}`}
                    className="group flex h-14 w-28 shrink-0 items-center justify-center border border-black/[0.035] bg-white/54 px-4 transition-colors duration-300 hover:bg-white md:h-16 md:w-32"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={132}
                      height={48}
                      sizes="144px"
                      className="max-h-8 w-auto max-w-full object-contain grayscale opacity-38 transition duration-300 group-hover:grayscale-0 group-hover:opacity-90"
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const locale = useLocale();
  const copy = ABOUT_COPY[locale];
  const [featuredMissionIndex, setFeaturedMissionIndex] = useState(1);
  const [visionGlow, setVisionGlow] = useState({ x: 50, y: 50 });
  const [isMissionPaused, setIsMissionPaused] = useState(false);

  useEffect(() => {
    if (isMissionPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setFeaturedMissionIndex((current) => (current + 1) % MISI_PILLARS.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [isMissionPaused]);

  const localizedCapabilities = CAPABILITIES.map((capability, index) => ({
    ...capability,
    title: copy.capabilities[index]?.title ?? capability.title,
    desc: copy.capabilities[index]?.desc ?? capability.desc,
  }));

  const localizedMissionPillars = MISI_PILLARS.map((pillar, index) => ({
    ...pillar,
    desc: copy.missionPillars[index] ?? pillar.desc,
  }));

  return (
    <div className="bg-[#F5F7FA] text-[#4A4C54] font-sans antialiased overflow-x-hidden">

      {/* Hero Section */}
      <section className="w-full px-4 pt-20 md:px-8 md:pt-28 md:mb-16">
        <div className="relative flex min-h-[76svh] w-full items-center overflow-hidden rounded-[14px] border border-white/10 bg-[#071A33] shadow-[0_24px_78px_-56px_rgba(11,44,107,0.48)] sm:h-[72vh] md:h-[80vh] md:min-h-[480px] md:rounded-[18px]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/bg-about.png"
              alt="About BinaHub"
              fill
              priority
              sizes="100vw"
              className="object-cover scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[#061A3A]/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/90 via-[#0B2C6B]/50 to-[#0B2C6B]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-black/5" />
            <div className="absolute left-[28%] top-[42%] h-56 w-96 bg-[#D9A63A]/7 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-5xl px-6 py-12 md:px-16 lg:px-24">
            <Tag className="mb-6 text-[10px] uppercase tracking-[0.22em] text-white/44 md:mb-8 md:text-[11px] md:tracking-[0.28em]">
              {copy.heroTag}
            </Tag>

            <h1 className="max-w-4xl text-[clamp(2rem,9.2vw,3rem)] font-light leading-[1.04] tracking-[-0.025em] text-white md:text-[clamp(3.25rem,4.75vw,4.85rem)] md:tracking-[-0.035em]">
              {copy.heroTitle}
              <span className="block text-[#D9A63A]">
                {copy.heroAccent}
              </span>
            </h1>

            <div className="mt-7 flex max-w-xl gap-4 md:mt-10 md:gap-6">
              <div className="mt-1 hidden h-24 w-px shrink-0 bg-[#D9A63A] sm:block" />
              <p className="text-sm leading-[1.65] text-white/86 md:text-lg md:leading-[1.75]">
                {copy.heroDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Siapa Kami (The Context Section) */}
      <section id="siapa-kami" className="relative overflow-hidden bg-[#F7F8FA] px-6 py-20 md:px-12 md:py-24 lg:px-20 lg:py-28">
        <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-start lg:gap-16 xl:gap-24">
          <div className="max-w-2xl">
            <Tag>{copy.whoTag}</Tag>

            <h2 className="mt-6 text-3xl font-light leading-[1.08] tracking-[-0.04em] text-[#0B2C6B] md:text-4xl lg:text-5xl lg:tracking-[-0.05em]">
              {copy.whoTitle}
            </h2>
          </div>

          <div className="max-w-2xl md:pt-12 lg:pt-14">
            <p className="text-[15px] leading-[1.8] text-black/65 md:text-base md:leading-[1.85]">
              {copy.whoP1}
            </p>

            <p className="mt-6 text-base font-medium leading-[1.75] text-black/82 md:text-lg">
              {copy.whoP2}
            </p>
          </div>
        </div>
      </section>

      {/* Perjalanan Kami */}
      <section
        id="perjalanan"
        className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[#FAFAF8]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-16 xl:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <Tag>{copy.journeyTag}</Tag>

              <h2 className="mt-6 max-w-[620px] text-4xl md:text-5xl lg:text-[56px] font-light tracking-[-0.045em] leading-[1.08] text-[#0B2C6B]">
                {copy.journeyTitle}
              </h2>

              {locale === "en" && (
                <div className="mt-10 space-y-7 text-[15px] md:text-base text-black/68 font-light leading-[1.85]">
                  <p>{copy.journeyP1}</p>
                  <p>{copy.journeyP2}</p>
                </div>
              )}

              <div className={`mt-10 space-y-7 text-[15px] md:text-base text-black/68 font-light leading-[1.85] ${locale === "en" ? "hidden" : ""}`}>
                <p>
                  BinaHub lahir sebagai <i>sister company</i> dari{" "}
                  <strong className="font-medium text-black/80">
                    BDN (Bina Daya Nugraha)
                  </strong>{" "}
                  — spesialis pelatihan berbasis pengalaman yang telah berkiprah
                  sejak tahun 2010 dan menjangkau lebih dari 10.000+ peserta dari
                  80+ organisasi nasional.
                </p>

                <p>
                  Sebagai kelanjutan strategis, BinaHub melangkah lebih jauh untuk
                  mendampingi organisasi menghadapi era otomatisasi dan disrupsi
                  kecerdasan buatan (AI). Kami memadukan pengembangan SDM, simulasi
                  keputusan global bersama{" "}
                  <strong className="font-medium text-black/80">BSKSims</strong>{" "}
                  asal Amerika Serikat, kepemimpinan adaptif, dan teknologi canggih
                  dalam satu ekosistem transformasi yang utuh.
                </p>
              </div>

              <div className="mt-10 border-t border-black/7 pt-8">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={localizePath("/journey", locale)}
                    className="inline-flex items-center gap-3 rounded-full border border-[#D9A441]/35 px-5 py-3 text-[11px] font-semibold text-[#B8841F] hover:border-[#0B2C6B]/30 hover:text-[#0B2C6B] hover:bg-white transition-all duration-300 tracking-[0.18em] uppercase group"
                  >
                    {copy.journeyCta}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    href={localizePath("/from-bdn-to-binahub", locale)}
                    className="inline-flex items-center gap-3 rounded-full border border-[#0B2C6B]/15 px-5 py-3 text-[11px] font-semibold text-[#0B2C6B]/70 hover:border-[#D9A441]/35 hover:text-[#B8841F] hover:bg-white transition-all duration-300 tracking-[0.18em] uppercase group"
                  >
                    {copy.bdnCta}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-[14px] border border-black/5 bg-[#0B1F46] shadow-[0_40px_120px_-30px_rgba(11,44,107,0.18)]">

                <Image
                  src="/asset/bsksims2.png"
                  alt="Perjalanan Kami BinaHub"
                  fill
                  className="object-cover object-[60%_center] scale-[1.02]"
                />

                {/* subtle cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/18 via-transparent to-white/5" />

                {/* ambient glow */}
                <div className="absolute -bottom-24 right-[-40px] h-48 w-80 bg-[#D9A441]/8 blur-3xl" />
              </div>
            </motion.div>
          </div>

          <BdnProofLogos
            eyebrow={copy.proofEyebrow}
            title={copy.proofTitle}
            description={copy.proofDesc}
            stats={copy.proofStats}
          />
        </div>
      </section>

      {/* Positioning & Capabilities Grid */}
      <section className="relative overflow-hidden py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[linear-gradient(to_bottom,#FFFFFF,#F8F9FA)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-28 bg-[linear-gradient(90deg,rgba(11,44,107,0.035),transparent)]" />

        <div className="relative max-w-[1428px] mx-auto overflow-x-hidden">
          <div className="grid lg:grid-cols-[0.94fr_1fr] gap-10 lg:gap-20 items-end mb-14 lg:mb-18">
            <div>
              <Tag>{copy.positionTag}</Tag>

              <h2 className="mt-6 md:mt-8 max-w-[620px] text-4xl md:text-5xl lg:text-5xl xl:text-[62px] font-light tracking-[-0.055em] leading-[1.02] text-[#0B2C6B]">
                {copy.positionTitle}
              </h2>
            </div>

            <p className="max-w-[560px] text-base md:text-lg text-black/64 font-light leading-[1.85] lg:pb-3">
              {copy.positionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {localizedCapabilities.map((cap, i) => {
              const isFeatured = i === 0;
              const texture = CAPABILITY_TEXTURES[i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ delay: i * 0.08, duration: 0.65, ease: "easeOut" }}
                  className={`group relative min-h-[250px] overflow-hidden rounded-[12px] border p-6 transition-all duration-500 hover:-translate-y-1 md:min-h-[260px] lg:min-h-[300px] ${isFeatured
                      ? "border-[#0A2A63]/10 bg-[#082D70] text-white shadow-[0_24px_66px_-44px_rgba(11,44,107,0.68)] hover:bg-[#062763] hover:shadow-[0_30px_78px_-50px_rgba(11,44,107,0.74)]"
                      : "border-black/[0.045] bg-[#FCFCFB] text-[#1D2433] shadow-[0_18px_54px_-48px_rgba(11,44,107,0.28)] hover:border-[#D9A441]/25 hover:bg-white hover:shadow-[0_24px_72px_-56px_rgba(11,44,107,0.36)]"
                    }`}
                >
                  {/* Ambient texture */}
                  <div
                    className={`pointer-events-none absolute inset-0 z-[2] transition-all duration-500 ${isFeatured
                        ? "opacity-[0.42] group-hover:opacity-[0.5]"
                        : "opacity-[0.28] group-hover:opacity-[0.36]"
                      }`}
                  >
                    <Image
                      src={texture}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 20vw"
                      className={`object-cover scale-110 -translate-y-5 ${isFeatured
                          ? "object-center mix-blend-multiply grayscale brightness-0 contrast-125"
                          : "object-top mix-blend-multiply grayscale brightness-95 contrast-150"
                        }`}
                    />
                    {isFeatured && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#071F4D]/80 to-transparent" />
                    )}
                  </div>

                  {/* Soft overlay, lower area kept cleaner for text */}
                  <div
                    className={`pointer-events-none absolute inset-0 z-[1] ${isFeatured
                        ? "bg-[linear-gradient(180deg,rgba(8,45,112,0.2)_0%,rgba(8,45,112,0.58)_48%,rgba(8,45,112,0.96)_100%)]"
                        : "bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.56)_48%,rgba(255,255,255,0.94)_100%)]"
                      }`}
                  />

                  {/* Subtle gold accent */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-36 w-64 bg-[#D9A441]/8 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex min-h-[200px] flex-col md:min-h-[210px] lg:min-h-[250px]">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-[10px] border shadow-[0_14px_36px_-22px_rgba(11,44,107,0.42)] transition-all duration-500 ${isFeatured
                          ? "border-white/10 bg-white/92 text-[#0A2A63] group-hover:bg-[#D9A441]"
                          : "border-black/5 bg-white/90 text-[#0B2C6B] group-hover:border-[#D9A441]/30 group-hover:bg-[#D9A441]"
                        }`}
                    >
                      {cap.icon}
                    </div>

                    <div className="mt-auto">
                      <span className="mb-5 block h-px w-8 bg-[#D9A441]" />

                      <h4
                        className={`mb-3 text-xs md:text-[13px] font-semibold tracking-[0.14em] uppercase leading-[1.55] transition-colors ${isFeatured ? "text-white" : "text-[#1D2433]"
                          }`}
                      >
                        {cap.title}
                      </h4>

                      <div className="mb-4 h-px w-7 bg-[#D9A441]" />

                      <p
                        className={`text-sm font-light leading-[1.7] transition-colors ${isFeatured ? "text-white/72" : "text-black/62"
                          }`}
                      >
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Vision & Mission - Bento Style */}
      <section id="visi" className="py-16 md:py-32 px-6 md:px-12 lg:px-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Tag>{copy.visionTag}</Tag>
          </div>

          <div className="grid md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* Vision - Large Card (Spans col-8, row-2) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: premiumEase }}
              whileHover={{ y: -4, scale: 1.01 }}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setVisionGlow({
                  x: ((event.clientX - rect.left) / rect.width) * 100,
                  y: ((event.clientY - rect.top) / rect.height) * 100,
                });
              }}
              className="col-span-12 md:col-span-8 md:row-span-2 lg:-translate-y-1 bg-[#0B2C6B] rounded-xl text-white relative overflow-hidden group shadow-[0_24px_76px_-54px_rgba(11,44,107,0.62)] min-h-[440px] flex flex-col justify-between"
            >
              {/* Background photo */}
              <div className="absolute inset-0 z-0">
                <motion.div
                  className="absolute inset-[-3%]"
                  animate={{
                    y: [0, -8, 0],
                    scale: [1.03, 1.05, 1.03],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/asset/visi-card.png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover object-center brightness-90 contrast-110 saturate-75"
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-[#0B2C6B] mix-blend-multiply"
                  animate={{ opacity: [0.72, 0.78, 0.72] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071F4D]/92 via-[#0B2C6B]/58 to-[#0B2C6B]/18" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071F4D]/80 via-[#0B2C6B]/28 to-transparent" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at ${visionGlow.x}% ${visionGlow.y}%, rgba(255,255,255,0.08), transparent 45%)`,
                  }}
                />
              </div>

              <div className="relative z-10 flex flex-col h-full p-10 md:p-12 lg:p-14 justify-between flex-1">
                <div>
                  <Target size={40} className="text-[#D9A441] mb-8" />
                  <h3 className="text-[11px] font-bold tracking-[0.4em] text-white/50 uppercase mb-5">{copy.visionEyebrow}</h3>
                  <h4 className="text-4xl md:text-5xl font-light leading-[1.15] tracking-tight mb-6">
                    {copy.visionTitle}
                  </h4>
                  <p className="text-white/60 font-light italic">{copy.visionSub}</p>
                </div>

                <div className="mt-8">
                  <p className="max-w-2xl rounded-[12px] border border-white/10 bg-white/[0.055] p-5 text-xs font-light leading-relaxed text-white/82 md:text-sm">
                    {copy.visionDesc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side Mission Bento Cards (2 cards on the right) */}
            {localizedMissionPillars.slice(0, 2).map((pillar, index) => {
              const missionIndex = index;
              const isFeaturedMission = featuredMissionIndex === missionIndex;

              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  onMouseEnter={() => setIsMissionPaused(true)}
                  onMouseLeave={() => setIsMissionPaused(false)}
                  transition={{ delay: missionIndex * 0.08, duration: 0.7, ease: premiumEase }}
                  className={`group/mission relative col-span-12 flex min-h-[190px] flex-col justify-center overflow-hidden rounded-[12px] border p-8 py-10 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-md md:col-span-4 ${isFeaturedMission
                      ? "bg-[#183F82] border-[#183F82] text-white shadow-[#0B2C6B]/14 hover:border-[#D9A441]/35"
                      : "bg-white border-black/[0.04] hover:border-[#D9A441]/30"
                    }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${MISSION_TEXTURES[missionIndex]} ${isFeaturedMission ? "opacity-[0.18]" : "opacity-[0.06]"
                      }`}
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isFeaturedMission
                        ? "opacity-100 bg-[radial-gradient(circle_at_82%_18%,rgba(217,164,65,0.1),transparent_34%)]"
                        : "opacity-0"
                      }`}
                  />
                  <motion.div
                    whileHover={{ y: -2, rotate: -3 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className={`relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] border transition-colors duration-700 ${isFeaturedMission
                        ? "border-white/12 bg-white/[0.06] text-[#D9A441]"
                        : "border-black/10 text-[#0B2C6B]"
                      }`}
                  >
                    {pillar.icon}
                  </motion.div>
                  <h3 className={`relative z-10 text-lg font-light mb-1.5 transition-colors duration-700 ${isFeaturedMission ? "text-white" : "text-[#0B2C6B]"}`}>
                    {pillar.title}
                  </h3>
                  <p className={`relative z-10 text-xs leading-relaxed transition-colors duration-700 ${isFeaturedMission ? "text-white/68" : "text-black/58"}`}>
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}

            {/* Bottom Mission Bento Cards (3 cards at the bottom) */}
            {localizedMissionPillars.slice(2, 5).map((pillar, index) => {
              const missionIndex = index + 2;
              const isFeaturedMission = featuredMissionIndex === missionIndex;

              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  onMouseEnter={() => setIsMissionPaused(true)}
                  onMouseLeave={() => setIsMissionPaused(false)}
                  transition={{ delay: missionIndex * 0.08, duration: 0.7, ease: premiumEase }}
                  className={`group/mission relative col-span-12 flex min-h-[190px] flex-col justify-center overflow-hidden rounded-[12px] border p-8 py-10 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-md md:col-span-4 ${isFeaturedMission
                      ? "bg-[#183F82] border-[#183F82] text-white shadow-[#0B2C6B]/14 hover:border-[#D9A441]/35"
                      : "bg-white border-black/[0.04] hover:border-[#D9A441]/30"
                    }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${MISSION_TEXTURES[missionIndex]} ${isFeaturedMission ? "opacity-[0.18]" : "opacity-[0.06]"
                      }`}
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isFeaturedMission
                        ? "opacity-100 bg-[radial-gradient(circle_at_82%_18%,rgba(217,164,65,0.1),transparent_34%)]"
                        : "opacity-0"
                      }`}
                  />
                  <motion.div
                    whileHover={{ y: -2, rotate: -3 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className={`relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] border transition-colors duration-700 ${isFeaturedMission
                        ? "border-white/12 bg-white/[0.06] text-[#D9A441]"
                        : "border-black/10 text-[#0B2C6B]"
                      }`}
                  >
                    {pillar.icon}
                  </motion.div>
                  <h3 className={`relative z-10 text-lg font-light mb-1.5 transition-colors duration-700 ${isFeaturedMission ? "text-white" : "text-[#0B2C6B]"}`}>
                    {pillar.title}
                  </h3>
                  <p className={`relative z-10 text-xs leading-relaxed transition-colors duration-700 ${isFeaturedMission ? "text-white/68" : "text-black/58"}`}>
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nilai-Nilai Utama (H.U.M.A.N) */}
      <div id="nilai">
        <CoreValuesSection />
      </div>

    </div>
  )
}
