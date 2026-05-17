"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, X, Zap, Shield, Target, TrendingUp, CheckCircle2, ChevronRight } from "lucide-react"
import { ECOSYSTEM_DATA } from "@/data/ecosystem"
import { PixelIcon } from "@/components/pixel-icon"
import { Tag } from "@/components/ui/tag"

export default function EcosystemPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const products = Object.values(ECOSYSTEM_DATA)

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] font-sans overflow-x-hidden">

      {/* Immersive Hero Section - Reconstructed for High Visibility */}
      <section className="w-full px-4 md:px-8 pt-20 md:pt-26 mb-8 md:mb-16">
        <div className="relative w-full h-[80vh] md:h-[85vh] rounded-[32px] md:rounded-[48px] bg-[#030712] overflow-hidden flex items-center justify-center border border-white/5 shadow-2xl">
          
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
              backgroundImage: `radial-gradient(circle, #D4AF37 1.5px, transparent 1.5px)`,
              backgroundSize: '100px 100px',
              backgroundPosition: '-0.75px -0.75px'
            }} />
          </div>

          {/* 3. Heartbeat Ecosystem Icons - Responsive Lowered Arc */}
          <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden flex items-center justify-center">
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
              // Responsive radius scaling
              const responsiveR = typeof window !== 'undefined' && window.innerWidth < 768 
                ? icon.r * 0.6 
                : icon.r;
                
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
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-sm"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                }}
                animate={{ 
                  y: [0, -40, 0],
                  x: [0, 10, -10, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{ 
                  duration: 4 + Math.random() * 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* 4. BinaHub Large Background Text */}
          <div className="absolute -bottom-[15%] left-1/2 -translate-x-1/2 z-[4] select-none pointer-events-none">
            <h2 className="text-[20vw] font-black text-white/10 tracking-tighter leading-none whitespace-nowrap">
              BinaHub
            </h2>
          </div>

          {/* 5. The Curved Horizon Arc - Lowered to sit right above the text */}
          <div className="absolute -bottom-[58%] left-1/2 -translate-x-1/2 w-[160%] aspect-[4/1] rounded-[100%] bg-gradient-to-t from-[#0A1A3A] to-transparent border-t border-[#D4AF37]/30 shadow-[0_-20px_100px_rgba(212,175,55,0.2)] z-[5]" />

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
                <Tag className="text-white/40 bg-white/5 border border-white/10 px-6 py-2 uppercase tracking-[0.3em]">THE INTEGRATED HUB</Tag>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.85] text-white mb-10">
                People. Learning. <br />
                <span className="text-[#D4AF37] font-normal italic">Elevated.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-2xl mx-auto">
                Menyatukan <span className="text-white">Potensi Manusia</span> dan <span className="text-white">Teknologi</span> dalam satu ekosistem terpadu untuk transformasi nyata.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The "Cycle Breaker" Section */}
      <section className="py-16 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* The Failure Path */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#F8F9FB] p-6 md:p-16 rounded-[32px] md:rounded-[48px] border border-black/[0.03]"
            >
              <h3 className="text-3xl font-light mb-10 text-[#0A1A3A]">Mengapa Program <br /><span className="font-bold text-red-500 underline decoration-red-500/30 underline-offset-8">Sering Gagal?</span></h3>
              <div className="space-y-6">
                {[
                  "Tidak menyentuh akar permasalahan (Root Cause)",
                  "Hanya teoritis & tidak relevan dengan bisnis",
                  "Momentum hilang paska sesi pelatihan",
                  "Dampak perubahan tidak terukur secara nyata",
                  "Terhenti di ruang kelas tanpa eksekusi"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
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
              className="bg-[#0A1A3A] p-6 md:p-16 rounded-[32px] md:rounded-[48px] text-white relative overflow-hidden flex flex-col justify-center border border-[#D4AF37]/20 shadow-2xl"
            >
              {/* Background Ornaments (Increased Visibility) */}
              <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
                   style={{ 
                     backgroundImage: 'radial-gradient(rgba(212,175,55,0.4) 1px, transparent 1px)', 
                     backgroundSize: '24px 24px' 
                   }} 
              />
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/30 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/15 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 opacity-40" />
              
              {/* Decorative Corner '+' */}
              <div className="absolute top-10 left-10 w-6 h-6 opacity-40">
                <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#D4AF37]" />
                <div className="absolute top-0 left-1/2 w-[1.5px] h-full bg-[#D4AF37]" />
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl font-light mb-10 text-white">Jawaban di Dalam <br /><span className="text-[#D4AF37] font-bold italic">Satu Ekosistem.</span></h3>
                <p className="text-white/90 font-light leading-relaxed mb-10 text-lg">
                  Setiap pilar BinaHub dirancang untuk saling melengkapi, memastikan transformasi yang berkesinambungan dari penggalian akar masalah hingga akselerasi kinerja nyata.
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                    <div className="text-[#D4AF37] font-bold text-4xl tracking-tighter mb-2">8</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-bold">Integrated Pillars</div>
                  </div>
                  <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                    <div className="text-[#D4AF37] font-bold text-4xl tracking-tighter mb-2">∞</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-bold">Human Synergy</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Ecosystem Bento Grid */}
      <section className="py-16 md:py-32 px-6 md:px-12 lg:px-20 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <Tag>EXPLORE THE HUB</Tag>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight mt-6 md:mt-10 text-[#0A1A3A]">8 Pilar Transformasi.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                layoutId={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-black/[0.04] cursor-pointer hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="mb-10 group-hover:scale-110 transition-transform duration-500">
                    <PixelIcon type={product.iconType} size={48} />
                  </div>
                  <h3 className="text-2xl font-light mb-2 text-[#0A1A3A] group-hover:text-[#D4AF37] transition-colors">{product.title}</h3>
                  <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-bold mb-8">{product.subtitle}</p>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-black/40 group-hover:text-black transition-colors">
                    PELAJARI DETAIL <ChevronRight size={16} />
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-black/[0.01] rounded-full group-hover:bg-[#D4AF37]/5 transition-all duration-700" />
              </motion.div>
            ))}
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          >
            <div
              className="absolute inset-0 bg-[#0A1A3A]/90 backdrop-blur-xl"
              onClick={() => setSelectedProduct(null)}
            />

            <motion.div
              layoutId={selectedProduct.id}
              className="relative w-full max-w-6xl bg-white rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            >
              {/* Product Header Side - Now Navy */}
              <div
                className="w-full md:w-1/3 p-6 md:p-12 text-white flex flex-col justify-between relative overflow-hidden shrink-0 bg-[#0A1A3A]"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-10 -translate-y-10" />
                <div className="relative z-10">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-[32px] inline-block mb-10 border border-white/20">
                    <PixelIcon type={selectedProduct.iconType} size={64} />
                  </div>
                  <h2 className="text-5xl font-light tracking-tighter mb-4 leading-none text-white">{selectedProduct.title}</h2>
                  <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-8">{selectedProduct.subtitle}</p>
                  <p className="text-white/90 text-xl font-light leading-relaxed italic border-l-2 border-[#D4AF37] pl-8">
                    "{selectedProduct.tagline}"
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="mt-12 md:mt-0 flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:text-[#D4AF37] transition-colors group"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform" /> TUTUP DETAIL
                </button>
              </div>

              {/* Product Content Side */}
              <div className="flex-1 p-6 md:p-20 overflow-y-auto custom-scrollbar bg-white">
                <div className="space-y-20">
                  {/* Context */}
                  <div>
                    <h4 className="text-[10px] font-bold tracking-[0.5em] text-black/30 uppercase mb-8">Filosofi & Pendekatan</h4>
                    <p className="text-3xl text-black/90 font-light leading-relaxed tracking-tight">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    {/* Challenges */}
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.5em] text-black/30 uppercase mb-8">Tantangan yang Dijawab</h4>
                      <div className="space-y-6">
                        {selectedProduct.challenges.map((c: string, i: number) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                              <X size={14} className="text-red-500" />
                            </div>
                            <p className="text-black/80 font-light leading-relaxed">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.5em] text-black/30 uppercase mb-8">Tujuan & Manfaat</h4>
                      <div className="space-y-6">
                        {selectedProduct.benefits.map((b: string, i: number) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0 mt-1">
                              <Target size={14} className="text-[#D4AF37]" />
                            </div>
                            <p className="text-black/80 font-light leading-relaxed">{b}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-[#F8F9FB] p-6 md:p-12 rounded-[32px] md:rounded-[48px] border border-black/[0.04] shadow-sm">
                    <h4 className="text-[10px] font-bold tracking-[0.5em] text-black/30 uppercase mb-10">Hasil & Output Nyata</h4>
                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                      {selectedProduct.results.map((r: string, i: number) => (
                        <div key={i} className="flex gap-4 items-center group">
                          <div className="w-2 h-2 rounded-full bg-green-500 group-hover:scale-150 transition-transform" />
                          <p className="text-xs font-bold text-black/80 uppercase tracking-widest leading-relaxed">{r}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slim & Full Width CTA Section */}
      <section className="relative w-full py-16 bg-[#0A1A3A] border-y border-white/5 overflow-hidden">
        {/* Ornaments */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full">
            <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#D4AF37" strokeWidth="0.5" />
            <line x1="0" y1="80%" x2="100%" y2="20%" stroke="#D4AF37" strokeWidth="0.5" />
          </svg>
          <div className="absolute top-1/2 left-10 w-2 h-2 bg-[#D4AF37] rotate-45" />
          <div className="absolute top-1/2 right-10 w-2 h-2 bg-[#D4AF37] rotate-45" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-2">
              Mulai Transformasi <span className="text-[#D4AF37] italic">Sekarang.</span>
            </h2>
            <p className="text-white/50 text-sm font-light uppercase tracking-[0.2em]">
              Partnering in your journey towards excellence.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/insight"
              className="group inline-flex h-14 px-10 bg-[#D4AF37] text-[#0A1A3A] rounded-full text-[11px] font-bold tracking-[0.3em] hover:bg-white transition-all items-center justify-center uppercase"
            >
              MULAI ASESMEN <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="hidden lg:flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-white/20 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}



