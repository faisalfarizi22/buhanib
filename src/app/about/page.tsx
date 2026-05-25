"use client"

import { motion } from "framer-motion"
import { Compass, Target, ArrowRight, Zap, Shield, Heart, Globe, Cpu, UserCheck, Leaf } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tag } from "@/components/ui/tag"
import { Counter } from "@/components/ui/counter"
import { CoreValuesSection } from "@/components/core-values-section"

const challenges = [
  "Hilangnya banyak jenis pekerjaan",
  "Meningkatnya tekanan dan burnout",
  "Krisis kepemimpinan di era digital",
  "Menurunnya kualitas hubungan manusia",
  "Organisasi yang kehilangan makna & nilai"
];

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

const HERO_STATS = [
  { value: 15, label: "Tahun Kiprah", suffix: "+" },
  { value: 10, label: "Ribu Peserta", suffix: "k+" },
  { value: 80, label: "Organisasi Mitra", suffix: "+" },
];

const premiumEase = [0.22, 1, 0.36, 1] as const;

export default function AboutPage() {
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

  return (
    <div className="bg-[#F5F7FA] text-[#4A4C54] font-sans antialiased overflow-x-hidden">

      {/* Hero Section */}
      <section className="w-full px-4 md:px-8 pt-20 md:pt-28 mb-8 md:mb-16">
        <div className="relative w-full h-[65vh] sm:h-[72vh] md:h-[80vh] min-h-[480px] rounded-[20px] md:rounded-[28px] overflow-hidden flex items-center border border-white/10 shadow-2xl shadow-black/15 bg-[#071A33]">
          <div className="absolute inset-0 z-0">
            <img
              src="/bg-about.png"
              alt="About BinaHub"
              className="w-full h-full object-cover scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[#061A3A]/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/90 via-[#0B2C6B]/50 to-[#0B2C6B]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-black/5" />
            <div className="absolute left-[32%] top-[42%] h-72 w-72 rounded-full bg-[#D9A63A]/8 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-5xl px-8 md:px-16 lg:px-24">
            <Tag className="mb-8 text-[11px] tracking-[0.28em] uppercase text-white/35">
              Tentang BinaHub
            </Tag>

            <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-[-0.055em] text-white">
              Memanusiawikan
              <span className="block text-[#D9A63A]">
                Masa Depan.
              </span>
            </h1>

            <div className="mt-10 flex max-w-xl gap-6">
              <div className="mt-1 h-24 w-px shrink-0 bg-[#D9A63A]" />
              <p className="text-base md:text-lg leading-[1.75] text-white/86">
                BinaHub hadir sebagai mitra transformasi dan kapabilitas masa depan
                di era perubahan yang belum pernah terjadi sebelumnya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Perjalanan Kami */}
      <section
        id="perjalanan"
        className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#FAFAF8]"
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
              <Tag>PERJALANAN KAMI</Tag>

              <h2 className="mt-6 max-w-[620px] text-4xl md:text-5xl lg:text-[56px] font-light tracking-[-0.045em] leading-[1.08] text-[#0B2C6B]">
                Berakar pada{" "}
                <span className="font-medium italic text-[#D9A441]">
                  Pengembangan Manusia.
                </span>
              </h2>

              <div className="mt-10 space-y-8 text-[15px] md:text-base text-black/68 font-light leading-[1.85]">
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
                  kecerdasan buatan (AI). Kami memadukan pengembangan SDM, stimulasi
                  keputusan global bersama{" "}
                  <strong className="font-medium text-black/80">BSKSims</strong>{" "}
                  asal Amerika Serikat, kepemimpinan adaptif, dan teknologi canggih
                  dalam satu ekosistem transformasi yang utuh.
                </p>
              </div>

              <div className="mt-14 pt-10 border-t border-black/7">
                <div className="grid grid-cols-3 gap-4 md:gap-10 overflow-hidden">
                  {HERO_STATS.map((stat, i) => (
                    <div key={i} className="min-w-0">
                      <div className="text-3xl sm:text-4xl md:text-5xl text-[#0B2C6B] font-light tracking-[-0.04em] leading-none">
                        <Counter end={stat.value} suffix={stat.suffix} trigger />
                      </div>
                      <div className="mt-3 text-[10px] md:text-[11px] text-black/42 tracking-[0.18em] uppercase font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/journey"
                  className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#D9A441]/35 px-5 py-3 text-[11px] font-semibold text-[#B8841F] hover:border-[#0B2C6B]/30 hover:text-[#0B2C6B] hover:bg-white transition-all duration-300 tracking-[0.18em] uppercase group"
                >
                  Baca Kisah Lengkap
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] border border-black/5 bg-[#0B1F46] shadow-[0_40px_120px_-30px_rgba(11,44,107,0.18)]">
                
                <Image
                  src="/asset/bsksims2.png"
                  alt="Perjalanan Kami BinaHub"
                  fill
                  className="object-cover object-[60%_center] scale-[1.02]"
                />

                {/* subtle cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/18 via-transparent to-white/5" />

                {/* ambient glow */}
                <div className="absolute -bottom-24 right-[-40px] h-64 w-64 rounded-full bg-[#D9A441]/10 blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Siapa Kami (The Context Section) */}
     <section className="relative overflow-hidden bg-[#F7F8FA] px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-[#0B2C6B]/5 blur-3xl" />
        <div className="absolute right-[-8%] bottom-[-20%] h-[420px] w-[420px] rounded-full bg-[#D9A441]/8 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-light leading-[1.08] tracking-[-0.05em] text-[#0B2C6B]">
              Era Transformasi
              <span className="block font-medium italic">Tanpa Batas.</span>
            </h2>

            <p className="mt-10 text-base leading-[1.85] text-black/65">
              Perkembangan AI, otomatisasi, dan digitalisasi membuka peluang inovasi
              yang besar, namun sekaligus membawa tantangan nyata bagi kemanusiaan.
            </p>

            <p className="mt-8 text-lg leading-[1.75] font-medium text-black/82">
              Kami percaya bahwa masa depan tidak hanya membutuhkan organisasi yang
              lebih cerdas secara teknologi, tetapi juga lebih{" "}
              <span className="text-[#D9A441]">matang secara manusiawi.</span>
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {challenges.map((item, index) => {
              const isLast = index === challenges.length - 1;

              return (
                <div
                  key={item}
                  className={`group rounded-[24px] border border-black/5 bg-white p-6 md:p-7 shadow-[0_18px_60px_-35px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D9A441]/30 hover:shadow-[0_28px_80px_-40px_rgba(11,44,107,0.35)] ${
                              isLast ? "md:col-span-2 min-h-[116px]" : "min-h-[136px]"
                            }`}
                >
                  <div className="flex h-full flex-col justify-center">
                    <div className="flex items-start gap-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E84A5F]/10">
                        <span className="h-2 w-2 rounded-full bg-[#E84A5F]" />
                      </div>

                      <div>
                        <span className="mb-4 block text-[11px] font-semibold tracking-[0.18em] text-[#D9A441]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-sm md:text-[15px] font-semibold uppercase leading-[1.7] tracking-[0.035em] text-[#111827]">
                          {item}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Positioning & Capabilities Grid */}
      <section className="relative overflow-hidden py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[radial-gradient(circle_at_top_left,rgba(11,44,107,0.04),transparent_34%),radial-gradient(circle_at_top_right,rgba(217,164,65,0.075),transparent_30%),linear-gradient(to_bottom,#FFFFFF,#F8F9FA)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-28 bg-[linear-gradient(90deg,rgba(11,44,107,0.035),transparent)]" />

        <div className="relative max-w-[1428px] mx-auto overflow-x-hidden">
          <div className="grid lg:grid-cols-[0.94fr_1fr] gap-10 lg:gap-20 items-end mb-14 lg:mb-18">
            <div>
              <Tag>OUR POSITIONING</Tag>

              <h2 className="mt-6 md:mt-8 max-w-[620px] text-4xl md:text-5xl lg:text-[62px] font-light tracking-[-0.055em] leading-[1.02] text-[#0B2C6B]">
                Mitra transformasi
                <span className="block">& kapabilitas</span>
                <span className="block font-medium">masa depan.</span>
              </h2>
            </div>

            <p className="max-w-[520px] text-base md:text-lg text-black/64 font-light leading-[1.85] lg:pb-3">
              Kami memadukan lima pilar utama untuk memastikan organisasi Anda tidak
              hanya bertahan, tetapi bertumbuh secara utuh di tengah perubahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {CAPABILITIES.map((cap, i) => {
              const isFeatured = i === 0;
              const texture = CAPABILITY_TEXTURES[i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ delay: i * 0.08, duration: 0.65, ease: "easeOut" }}
                  className={`group relative min-h-[360px] overflow-hidden rounded-[22px] border p-7 md:p-8 lg:min-h-[370px] xl:min-h-[390px] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${
                    isFeatured
                      ? "border-[#0A2A63]/10 bg-[#082D70] text-white shadow-[0_28px_80px_-44px_rgba(11,44,107,0.78)] hover:bg-[#062763] hover:shadow-[0_34px_96px_-48px_rgba(11,44,107,0.86)]"
                      : "border-white bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,251,253,0.96))] text-[#1D2433] shadow-[0_24px_70px_-52px_rgba(11,44,107,0.32)] hover:border-[#D9A441]/25 hover:bg-white hover:shadow-[0_30px_92px_-50px_rgba(11,44,107,0.42)]"
                  }`}
                >
                 {/* Ambient texture */}
                  <div
                    className={`pointer-events-none absolute inset-0 z-[2] transition-all duration-500 ${
                      isFeatured
                        ? "opacity-[0.42] group-hover:opacity-[0.5]"
                        : "opacity-[0.28] group-hover:opacity-[0.36]"
                    }`}
                  >
                    <Image
                      src={texture}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 20vw"
                      className={`object-cover scale-110 -translate-y-5 ${
                        isFeatured
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
                    className={`pointer-events-none absolute inset-0 z-[1] ${
                      isFeatured
                        ? "bg-[linear-gradient(180deg,rgba(8,45,112,0.2)_0%,rgba(8,45,112,0.58)_48%,rgba(8,45,112,0.96)_100%)]"
                        : "bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.56)_48%,rgba(255,255,255,0.94)_100%)]"
                    }`}
                  />

                  {/* Subtle gold accent */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#D9A441]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex min-h-[304px] flex-col lg:min-h-[314px] xl:min-h-[334px]">
                    <div
                      className={`flex h-[54px] w-[54px] items-center justify-center rounded-[16px] border shadow-[0_14px_36px_-22px_rgba(11,44,107,0.42)] transition-all duration-500 ${
                        isFeatured
                          ? "border-white/10 bg-white/92 text-[#0A2A63] group-hover:bg-[#D9A441]"
                          : "border-black/5 bg-white/90 text-[#0B2C6B] group-hover:border-[#D9A441]/30 group-hover:bg-[#D9A441]"
                      }`}
                    >
                      {cap.icon}
                    </div>

                    <div className="mt-auto">
                      <span className="mb-5 block text-[11px] font-semibold tracking-[0.2em] text-[#D9A441]">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <h4
                        className={`mb-4 text-sm md:text-[15px] font-semibold tracking-[0.16em] uppercase leading-[1.55] transition-colors ${
                          isFeatured ? "text-white" : "text-[#1D2433]"
                        }`}
                      >
                        {cap.title}
                      </h4>

                      <div className="mb-4 h-px w-7 bg-[#D9A441]" />

                      <p
                        className={`text-sm font-light leading-[1.75] transition-colors ${
                          isFeatured ? "text-white/72" : "text-black/62"
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
            <Tag>VISI & MISI</Tag>
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
              className="col-span-12 md:col-span-8 md:row-span-2 lg:-translate-y-1 bg-[#0B2C6B] rounded-xl text-white relative overflow-hidden group shadow-2xl shadow-[#0B2C6B]/20 min-h-[440px] flex flex-col justify-between"
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
                  <h3 className="text-[11px] font-bold tracking-[0.4em] text-white/50 uppercase mb-5">Visi Kami</h3>
                  <h4 className="text-4xl md:text-5xl font-light leading-[1.15] tracking-tight mb-6">
                    Masa depan di mana <span className="italic font-normal">kemanusiaan</span> dan kemajuan berjalan beriringan.
                  </h4>
                  <p className="text-white/60 font-light italic">A future where humanity and progress grow in harmony.</p>
                </div>

                <div className="mt-8">
                  <p className="text-xs md:text-sm text-white/82 font-light leading-relaxed max-w-2xl bg-white/[0.04] backdrop-blur-md p-5 rounded-2xl border border-white/10">
                    BinaHub percaya bahwa kemajuan dan kemanusiaan bukanlah dua hal yang saling bertentangan. Teknologi, AI, dan transformasi organisasi seharusnya menjadi sarana untuk <span className="text-[#D9A441] font-semibold">meningkatkan kualitas kehidupan manusia.</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side Mission Bento Cards (2 cards on the right) */}
            {MISI_PILLARS.slice(0, 2).map((pillar, index) => {
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
                className={`group/mission relative col-span-12 md:col-span-4 p-8 py-10 min-h-[190px] overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-center ${
                  isFeaturedMission
                    ? "bg-[#183F82] border-[#183F82] text-white shadow-[#0B2C6B]/14 hover:border-[#D9A441]/35"
                    : "bg-white border-black/[0.04] hover:border-[#D9A441]/30"
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${MISSION_TEXTURES[missionIndex]} ${
                    isFeaturedMission ? "opacity-[0.18]" : "opacity-[0.06]"
                  }`}
                />
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isFeaturedMission
                      ? "opacity-100 bg-[radial-gradient(circle_at_82%_18%,rgba(217,164,65,0.1),transparent_34%)]"
                      : "opacity-0"
                  }`}
                />
                <motion.div
                  whileHover={{ y: -2, rotate: -3 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className={`relative z-10 w-10 h-10 rounded-xl border flex items-center justify-center mb-4 transition-colors duration-700 ${
                    isFeaturedMission
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
            {MISI_PILLARS.slice(2, 5).map((pillar, index) => {
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
                className={`group/mission relative col-span-12 md:col-span-4 p-8 py-10 min-h-[190px] overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-center ${
                  isFeaturedMission
                    ? "bg-[#183F82] border-[#183F82] text-white shadow-[#0B2C6B]/14 hover:border-[#D9A441]/35"
                    : "bg-white border-black/[0.04] hover:border-[#D9A441]/30"
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${MISSION_TEXTURES[missionIndex]} ${
                    isFeaturedMission ? "opacity-[0.18]" : "opacity-[0.06]"
                  }`}
                />
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isFeaturedMission
                      ? "opacity-100 bg-[radial-gradient(circle_at_82%_18%,rgba(217,164,65,0.1),transparent_34%)]"
                      : "opacity-0"
                  }`}
                />
                <motion.div
                  whileHover={{ y: -2, rotate: -3 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className={`relative z-10 w-10 h-10 rounded-xl border flex items-center justify-center mb-4 transition-colors duration-700 ${
                    isFeaturedMission
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
