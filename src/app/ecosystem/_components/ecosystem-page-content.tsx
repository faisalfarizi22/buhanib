"use client"

import type { MouseEvent } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, Check, ChevronRight, Target, TrendingUp, X } from "lucide-react"
import { getEcosystemData, type EcosystemData } from "@/data/ecosystem"
import { PixelIcon, type IconType } from "@/components/pixel-icon"
import { Tag } from "@/components/ui/tag"
import BinaHubClickable from "@/components/BinaHubClickable"
import { WorkflowSection } from "@/app/_sections/workflow-section"
import { useLocale } from "@/i18n/use-locale"

type EcosystemProduct = EcosystemData[keyof EcosystemData] & {
  iconType: IconType
}

const AMBIENT_PIXELS = [
  { x: "12%", y: "18%", duration: 4.2 },
  { x: "28%", y: "66%", duration: 5.4 },
  { x: "44%", y: "26%", duration: 6.1 },
  { x: "63%", y: "74%", duration: 4.9 },
  { x: "82%", y: "32%", duration: 6.6 },
  { x: "18%", y: "82%", duration: 5.7 },
  { x: "37%", y: "48%", duration: 4.6 },
  { x: "52%", y: "58%", duration: 6.3 },
  { x: "71%", y: "18%", duration: 5.2 },
  { x: "89%", y: "78%", duration: 6.8 },
  { x: "8%", y: "54%", duration: 4.8 },
  { x: "24%", y: "36%", duration: 5.9 },
  { x: "59%", y: "39%", duration: 4.4 },
  { x: "76%", y: "63%", duration: 6.5 },
  { x: "93%", y: "49%", duration: 5.1 },
]

const SERVICE_CATEGORIES: Record<string, string> = {
  insight: "Diagnose",
  academy: "Develop",
  lab: "Develop",
  coach: "Develop",
  play: "Develop",
  journey: "Develop",
  works: "Execute",
  impact: "Measure",
}

const COPY = {
  id: {
    heroTag: "THE INTEGRATED HUB",
    heroDesc: <>Menyatukan <span className="text-white">Potensi Manusia</span> dan <span className="text-white">Teknologi</span> dalam satu layanan terpadu untuk transformasi nyata.</>,
    failureTitle: <>Mengapa inisiatif pengembangan <br /><span className="font-bold text-[#C85A2A] underline decoration-[#C85A2A]/30 underline-offset-8">sering kehilangan dampak?</span></>,
    failureItems: [
      "Diagnosis awal berhenti di gejala, bukan akar masalah",
      "Desain program tidak terhubung dengan prioritas bisnis",
      "Momentum perubahan melemah setelah sesi selesai",
      "Perubahan perilaku tidak diikuti mekanisme eksekusi",
      "Dampak tidak diukur dengan indikator yang jelas"
    ],
    synergyTitle: <>Jawaban di Dalam <br /><span className="text-[#D9A441] font-bold italic">Satu Layanan Terintegrasi.</span></>,
    synergyDesc: "Setiap layanan BinaHub dirancang untuk saling melengkapi, memastikan transformasi yang berkesinambungan dari penggalian akar masalah hingga akselerasi kinerja nyata.",
    exploreTag: "EXPLORE THE HUB",
    exploreTitle: <>Solusi Pembelajaran & <br />Pengembangan Terintegrasi.</>,
    detailBadge: "Pilih Layanan Berdasarkan Kebutuhan",
    learnDetail: "PELAJARI DETAIL",
    focus: "Focus",
    closeDetail: "TUTUP DETAIL",
    tabs: { overview: "Overview", challenges: "Tantangan", outcome: "Outcome", output: "Output" },
    overviewTitle: "Filosofi & Pendekatan",
    challengesTitle: "Tantangan yang Dijawab",
    outcomeTitle: "Tujuan & Manfaat",
    outputTitle: "Hasil & Output Nyata",
    outputDesc: "Artifact yang membantu pengambilan keputusan dan eksekusi.",
  },
  en: {
    heroTag: "THE INTEGRATED HUB",
    heroDesc: <>Uniting <span className="text-white">Human Potential</span> and <span className="text-white">Technology</span> in one integrated service ecosystem for real transformation.</>,
    failureTitle: <>Why do development initiatives <br /><span className="font-bold text-[#C85A2A] underline decoration-[#C85A2A]/30 underline-offset-8">often lose impact?</span></>,
    failureItems: [
      "Initial diagnosis stops at symptoms, not root causes",
      "Program design is disconnected from business priorities",
      "Change momentum weakens after the session ends",
      "Behavior change is not followed by execution mechanisms",
      "Impact is not measured with clear indicators"
    ],
    synergyTitle: <>The answer sits inside <br /><span className="text-[#D9A441] font-bold italic">one integrated service.</span></>,
    synergyDesc: "Every BinaHub service is designed to complement the others, ensuring continuous transformation from root-cause discovery to real performance acceleration.",
    exploreTag: "EXPLORE THE HUB",
    exploreTitle: <>Integrated Learning & <br />Development Solutions.</>,
    detailBadge: "Choose a Service Based on Your Need",
    learnDetail: "LEARN MORE",
    focus: "Focus",
    closeDetail: "CLOSE DETAIL",
    tabs: { overview: "Overview", challenges: "Challenges", outcome: "Outcome", output: "Output" },
    overviewTitle: "Philosophy & Approach",
    challengesTitle: "Challenges Addressed",
    outcomeTitle: "Goals & Benefits",
    outputTitle: "Real Outcomes & Outputs",
    outputDesc: "Artifacts that support decision making and execution.",
  },
}

export default function LayananPage() {
  const locale = useLocale()
  const copy = COPY[locale]
  const [selectedProduct, setSelectedProduct] = useState<EcosystemProduct | null>(null)
  const [activeDetailTab, setActiveDetailTab] = useState<"overview" | "challenges" | "outcome" | "output">("overview")
  const products = Object.values(getEcosystemData(locale)) as EcosystemProduct[]
  const primaryProductIds = new Set(["insight", "academy", "works"])

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  const openProduct = (product: EcosystemProduct) => {
    setSelectedProduct(product)
    setActiveDetailTab("overview")
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#4A4C54] font-sans overflow-x-hidden">

      {/* Immersive Hero Section - Reconstructed for High Visibility */}
      <section className="w-full px-4 md:px-8 pt-20 md:pt-28 mb-8 md:mb-16">
        <div className="relative flex h-[75vh] min-h-[500px] max-h-[900px] w-full items-center justify-center overflow-hidden rounded-[16px] border border-white/5 bg-[#030712] shadow-lg sm:h-[80vh] md:h-[85vh]">

          {/* 1. Technical Grid Lines (High Visibility) */}
          <div className="absolute inset-0 z-[1] opacity-20"
            style={{
              backgroundImage: `
                   linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                   linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                 `,
              backgroundSize: '100px 100px'
            }}
          />

          {/* 2. Agitated Intersections (Visible Ornaments) */}
          <div className="absolute inset-0 z-[2] pointer-events-none opacity-40">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle, #D9A441 1.5px, transparent 1.5px)`,
              backgroundSize: '100px 100px',
              backgroundPosition: '-0.75px -0.75px'
            }} />
          </div>

          {/* 3. Heartbeat Ecosystem Icons - Hidden on mobile, visible md+ */}
          <div className="hidden md:flex absolute inset-0 z-[6] pointer-events-none overflow-hidden items-center justify-center">
            {[
              { type: 'insights' as const, angle: -175, r: 520, s: 44 },
              { type: 'lab' as const, angle: -145, r: 560, s: 40 },
              { type: 'coach' as const, angle: -125, r: 530, s: 52 },
              { type: 'journey' as const, angle: -100, r: 580, s: 42 },
              { type: 'play' as const, angle: -75, r: 540, s: 48 },
              { type: 'academy' as const, angle: -50, r: 500, s: 40 },
              { type: 'impact' as const, angle: -25, r: 560, s: 46 },
              { type: 'works' as const, angle: 5, r: 580, s: 42 },
            ].map((icon, i) => {
              const rad = (icon.angle * Math.PI) / 180;
              const responsiveR = icon.r;

              const x = Math.cos(rad) * responsiveR;
              const y = Math.sin(rad) * (responsiveR * 0.75);

              return (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ x, y: y + 120, opacity: 0 }}
                  animate={{
                    opacity: 0.35,
                    scale: [1, 1.15, 1],
                    y: [y + 120, y + 110, y + 120]
                  }}
                  transition={{
                    scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                    y: { duration: 4 + i % 3, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 1.5 }
                  }}
                  style={{
                    width: icon.s,
                    height: icon.s,
                    marginLeft: -icon.s / 2,
                    marginTop: -icon.s / 2,
                  }}
                >
                  <PixelIcon type={icon.type} size={icon.s} />
                </motion.div>
              );
            })}

            {/* Agitated Small Pixels */}
            {AMBIENT_PIXELS.map((pixel, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-[#D9A441]/40 rounded-sm"
                initial={{
                  x: pixel.x,
                  y: pixel.y,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, 10, -10, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: pixel.duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* 4. BinaHub Large Background Text */}
          <div className="absolute -bottom-[15%] left-1/2 -translate-x-1/2 z-[4] select-none pointer-events-none">
            <h2 className="text-[20vw] font-black text-white/[0.045] tracking-tighter leading-none whitespace-nowrap">
              BinaHub
            </h2>
          </div>

          {/* 5. The Curved Horizon Arc - Flat, clean navy gradient */}
          <div className="absolute -bottom-[58%] left-1/2 -translate-x-1/2 w-[160%] aspect-[4/1] rounded-[100%] bg-gradient-to-t from-[#0B2C6B] to-transparent border-t border-[#D9A441]/25 z-[5]" />

          {/* 6. Hero Content (Highest Layer) */}
          <div className="relative z-[10] max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex justify-center mb-12">
                <PixelIcon type="ecosystem" size={56} />
              </div>


              <div className="mb-6">
                <Tag className="text-white/40 bg-white/5 border border-white/10 px-6 py-2 uppercase tracking-[0.3em]">{copy.heroTag}</Tag>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-tight text-white mb-6 sm:mb-10 text-center">
                People{" "}
                <span className="text-white/24 font-light">/</span>
                {" "}Learning{" "}
                <span className="text-white/24 font-light">/</span>
                {" "}<span className="text-[#D9A441] font-normal italic">Elevated</span>
              </h1>

              <p className="text-lg md:text-2xl text-white/62 font-light leading-[1.75] max-w-3xl mx-auto">
                {copy.heroDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The "Cycle Breaker" Section */}
      <section id="latar-belakang" className="py-16 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* The Failure Path */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[14px] border border-black/[0.08] bg-[#F5F7FA] p-6 md:p-16"
            >
              <h3 className="text-3xl font-light mb-10 text-[#0B2C6B]">{copy.failureTitle}</h3>
              <div className="space-y-6">
                {copy.failureItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#C85A2A]/10 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B9471D]" />
                    </div>
                    <p className="text-black/80 font-light text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* The BinaHub Synergy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col justify-center overflow-hidden rounded-[14px] border border-[#D9A441]/20 bg-[#0B2C6B] p-6 text-white md:p-16"
            >
              {/* Background Ornaments (Subtle Grid) */}
              <div className="absolute inset-0 z-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Decorative Corner '+' */}
              <div className="absolute top-10 left-10 w-6 h-6 opacity-40">
                <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#D9A441]" />
                <div className="absolute top-0 left-1/2 w-[1.5px] h-full bg-[#D9A441]" />
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl font-light mb-10 text-white">{copy.synergyTitle}</h3>
                <p className="text-white/90 font-light leading-relaxed mb-10 text-lg">
                  {copy.synergyDesc}
                </p>
                {/* Stats removed as requested */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WorkflowSection onMouseMove={handleMouse} />

      {/* Interactive Service Map */}
      <section id="solusi" className="px-6 pb-14 pt-16 md:px-12 md:pb-20 md:pt-32 lg:px-20 lg:pb-24 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <Tag>{copy.exploreTag}</Tag>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight mt-6 md:mt-10 text-[#0B2C6B]">
              {copy.exploreTitle}
            </h2>
          </div>

          {/* Interactive ecosystem map */}
          <div className="hidden md:block mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="relative mx-auto w-full max-w-[95vw] overflow-hidden rounded-[14px] border border-black/5 bg-white shadow-md xl:max-w-7xl 2xl:max-w-[1440px]"
            >
              <BinaHubClickable
                onProductClick={(productId) => {
                  const product = products.find(p => p.id === productId);
                  if (product) openProduct(product);
                }}
              />
            </motion.div>
          </div>
          {/* Visual Divider / Section Separator */}
          <div id="detail" className="relative flex items-center justify-center my-20 scroll-mt-28">
            {/* Left line */}
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-[#0B2C6B]/20" />

            {/* Center icon / detail badge */}
            <div className="mx-6 px-6 py-2.5 bg-white border border-[#0B2C6B]/10 rounded-full shadow-sm flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] animate-ping" />
              <span className="text-[10px] font-bold text-[#0B2C6B]/60 tracking-[0.25em] uppercase">
                {copy.detailBadge}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
            </div>

            {/* Right line */}
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-black/10 to-[#0B2C6B]/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => {
              const isPrimary = primaryProductIds.has(product.id)

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  layoutId={product.id}
                  onClick={() => openProduct(product)}
                  className={`group relative cursor-pointer overflow-hidden rounded-[12px] border border-black/[0.08] bg-white transition-all duration-300 hover:border-black/15 hover:shadow-md ${isPrimary
                      ? "p-7 md:p-10 lg:col-span-2 min-h-[300px]"
                      : "p-6 md:p-8"
                    }`}
                >
                  {isPrimary && (
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(217,164,65,0.13),transparent_34%),linear-gradient(135deg,rgba(11,44,107,0.045),transparent_42%)]" />
                  )}
                  <div className="relative z-10">
                    <div className="mb-10 transition-transform duration-300 group-hover:-translate-y-1">
                      <PixelIcon type={product.iconType} size={isPrimary ? 58 : 48} />
                    </div>
                    <span className="mb-4 inline-flex rounded-full bg-[#D9A441]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#B9851F]">
                      {SERVICE_CATEGORIES[product.id] || "Develop"}
                    </span>
                    <h3 className={`${isPrimary ? "text-3xl md:text-4xl" : "text-2xl"} font-bold mb-2 text-[#0B2C6B] group-hover:text-[#D9A441] transition-colors`}>{product.title}</h3>
                    <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-bold mb-8">{product.subtitle}</p>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-black/40 group-hover:text-black transition-colors">
                      {copy.learnDetail} <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>


        </div>
      </section>

      {/* Product Detail Modal Immersive */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-12"
          >
            <div
              className="absolute inset-0 bg-[#0B2C6B]/88 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            />

            <motion.div
              layoutId={selectedProduct.id}
              className="relative flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-[14px] bg-white shadow-lg md:max-h-[85vh] md:flex-row"
            >
              {/* Product Header Side - Now Navy */}
              <div
                className="w-full md:w-2/5 lg:w-1/3 p-5 sm:p-6 md:p-12 text-white flex flex-col justify-between relative overflow-hidden shrink-0 bg-[#0B2C6B]"
              >
                <div className="absolute right-0 top-0 h-52 w-80 translate-x-10 -translate-y-10 bg-white/8 blur-[80px]" />
                <div className="relative z-10">
                  <div className="bg-white/5 p-5 sm:p-8 rounded-lg inline-block mb-6 sm:mb-10 border border-white/10">
                    <PixelIcon type={selectedProduct.iconType} size={64} />
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-light tracking-tighter mb-4 leading-none text-white">{selectedProduct.title}</h2>
                  <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#D9A441] mb-8">{selectedProduct.subtitle}</p>
                  {selectedProduct.tagline && (
                    <div className="mt-10 rounded-[12px] border border-white/10 bg-white/[0.045] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/36 mb-3">{copy.focus}</p>
                      <p className="text-sm font-light leading-relaxed text-white/74">{selectedProduct.tagline}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="mt-12 md:mt-0 flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:text-[#D9A441] transition-colors group"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform" /> {copy.closeDetail}
                </button>
              </div>

              {/* Product Content Side */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                <div className="sticky top-0 z-20 border-b border-black/[0.06] bg-white px-6 py-4 shadow-[0_10px_34px_-30px_rgba(11,44,107,0.26)] md:px-12">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "overview", label: copy.tabs.overview },
                      { id: "challenges", label: copy.tabs.challenges },
                      { id: "outcome", label: copy.tabs.outcome },
                      { id: "output", label: copy.tabs.output },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveDetailTab(tab.id as typeof activeDetailTab)}
                        className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${activeDetailTab === tab.id
                            ? "bg-[#0B2C6B] text-white"
                            : "bg-[#F5F7FA] text-black/42 hover:text-[#0B2C6B]"
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 md:p-12">
                  <AnimatePresence mode="wait">
                    {activeDetailTab === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.32 }}
                        className="space-y-10"
                      >
                        <div>
                          <h4 className="text-[10px] font-bold tracking-[0.42em] text-black/30 uppercase mb-7">{copy.overviewTitle}</h4>
                          <p className="text-xl md:text-2xl text-black/75 font-light leading-relaxed">
                            {selectedProduct.description}
                          </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {selectedProduct.benefits.slice(0, 2).map((benefit: string, i: number) => (
                            <div key={i} className="rounded-[12px] border border-[#D9A441]/18 bg-[#D9A441]/[0.055] p-5">
                              <Check size={18} className="mb-4 text-[#B9851F]" />
                              <p className="text-sm font-medium leading-relaxed text-black/72">{benefit}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeDetailTab === "challenges" && (
                      <motion.div
                        key="challenges"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.32 }}
                      >
                        <h4 className="text-[10px] font-bold tracking-[0.42em] text-black/30 uppercase mb-8">{copy.challengesTitle}</h4>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {selectedProduct.challenges.map((c: string, i: number) => (
                            <div key={i} className="flex gap-4 rounded-[12px] border border-[#D9A441]/16 bg-[#FFF8EA] p-5">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#D9A441]/14">
                                <AlertCircle size={16} className="text-[#B9851F]" />
                              </div>
                              <p className="text-sm text-black/76 font-light leading-relaxed">{c}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeDetailTab === "outcome" && (
                      <motion.div
                        key="outcome"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.32 }}
                      >
                        <h4 className="text-[10px] font-bold tracking-[0.42em] text-black/30 uppercase mb-8">{copy.outcomeTitle}</h4>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {selectedProduct.benefits.map((b: string, i: number) => (
                            <div key={i} className="flex gap-4 rounded-[12px] border border-[#0B2C6B]/10 bg-[#F5F7FA] p-5">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#0B2C6B]">
                                <Target size={15} className="text-[#D9A441]" />
                              </div>
                              <p className="text-sm text-black/76 font-light leading-relaxed">{b}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeDetailTab === "output" && (
                      <motion.div
                        key="output"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.32 }}
                        className="rounded-[14px] border border-[#0B2C6B]/10 bg-[#F5F7FA] p-6 md:p-8"
                      >
                        <div className="mb-8 flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-white text-[#0B2C6B] shadow-sm">
                            <TrendingUp size={22} />
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold tracking-[0.42em] text-black/30 uppercase">{copy.outputTitle}</h4>
                            <p className="mt-1 text-sm text-black/48">{copy.outputDesc}</p>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {selectedProduct.results.map((r: string, i: number) => (
                            <div key={i} className="flex items-center gap-4 rounded-[12px] bg-white p-4">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#D9A441]/12 text-[10px] font-bold text-[#B9851F]">
                                0{i + 1}
                              </div>
                              <p className="text-xs font-bold text-black/80 uppercase tracking-widest leading-relaxed">{r}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

