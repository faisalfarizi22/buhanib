import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { DIMENSIONS } from "../questions";
import { PixelIcon } from "@/components/pixel-icon";
import { Tag } from "@/components/ui/tag";

interface LandingStepProps {
  onStart: () => void;
}

export function LandingStep({ onStart }: LandingStepProps) {
  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col pt-20 md:pt-26"
    >
      {/* Hero */}
      <section className="w-full px-4 md:px-8 mb-12">
        <div className="relative w-full h-[70vh] md:h-[80vh] rounded-[32px] md:rounded-[48px] overflow-hidden flex items-center justify-center border border-black/[0.03] shadow-2xl shadow-black/10">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/asset/Academy2.png"
              alt="Team Collaboration"
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[11px] uppercase tracking-widest font-medium mb-8 text-white/80 bg-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              BinaInsight Diagnostic
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6 text-white">
              Optimalkan Performa<br />Tim Anda Sekarang.
            </h1>
            <p className="text-white/80 text-base md:text-xl mx-auto mb-10 leading-relaxed max-w-2xl font-light">
              Diagnostik mendalam berbasis data untuk mengukur 7 dimensi kritikal yang menentukan
              produktivitas organisasi Anda.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={onStart}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center h-14 md:h-16 px-10 md:px-12 bg-white text-black rounded-full text-[13px] font-bold tracking-widest hover:bg-[#F8F9FB] transition-all overflow-hidden uppercase shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  MULAI DIAGNOSTIK
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <a
                href="#about-insight"
                className="text-white/60 hover:text-white text-[11px] font-bold tracking-widest uppercase transition-colors"
              >
                Pelajari Lebih Lanjut ↓
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 text-white/40 text-[10px] font-medium tracking-[0.2em] uppercase border-t border-white/10 pt-8">
              <span>±5–7 Menit</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span>49 Indikator</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span>Laporan Instan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why BinaInsight */}
      <section id="about-insight" className="py-12 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-4">
              Value Proposition
            </div>
            <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8">
              Mengapa Tim Anda Membutuhkan {" "}
              <span className="italic">BinaInsight?</span>
            </h2>
            <p className="text-black/50 text-lg leading-relaxed mb-10 font-light">
              Banyak organisasi beroperasi tanpa benar-benar memahami hambatan performa mereka.
              BinaInsight memberikan kejernihan melalui data yang objektif dan terukur.
            </p>
            <div className="space-y-8">
              {[
                { title: "Identifikasi Akar Masalah", desc: "Temukan masalah sesungguhnya, bukan sekadar gejala di permukaan." },
                { title: "Metrik Terukur", desc: "Dapatkan skor kuantitatif di 7 dimensi pengembangan SDM." },
                { title: "Rekomendasi Strategis", desc: "Insight yang dapat langsung dieksekusi oleh tim manajemen." },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#F8F9FB] flex items-center justify-center shrink-0 border border-black/[0.03] group-hover:bg-[#0A1A3A] group-hover:text-white transition-all duration-300">
                    <Check size={20} className={i === 0 ? "text-[#D4AF37]" : ""} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-wide text-black uppercase mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-black/40 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-[#F8F9FB] rounded-[32px] md:rounded-[48px] flex items-center justify-center p-6 md:p-12 overflow-hidden border border-black/[0.05] relative group">
              <img
                src="/asset/Play.png"
                alt="Team Analysis"
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-30 group-hover:grayscale-0"
              />
              <div className="relative z-10 w-full aspect-square bg-white rounded-3xl shadow-2xl p-4 md:p-8 flex flex-col justify-center border border-black/[0.03]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-black/5 rounded-full w-full" />
                  <div className="h-4 bg-black/5 rounded-full w-3/4" />
                  <div className="h-4 bg-[#D4AF37]/20 rounded-full w-full" />
                  <div className="h-4 bg-black/5 rounded-full w-1/2" />
                </div>
                <div className="mt-8 flex justify-between items-end">
                  <div className="h-20 w-8 bg-[#D4AF37] rounded-t-lg" />
                  <div className="h-12 w-8 bg-black/5 rounded-t-lg" />
                  <div className="h-28 w-8 bg-black/10 rounded-t-lg" />
                  <div className="h-16 w-8 bg-[#0A1A3A] rounded-t-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Dimensions Bento Grid */}
      <section className="py-16 md:py-32 px-6 md:px-12 lg:px-20 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <Tag>7 DIMENSIONS</Tag>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mt-6 md:mt-10 text-[#0A1A3A]">Spektrum Pengukuran.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIMENSIONS.map((dim, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-black/[0.04] hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="mb-10 group-hover:scale-110 transition-transform duration-500">
                    <PixelIcon type={dim.toLowerCase() as any} size={48} />
                  </div>
                  <h4 className="text-2xl font-light mb-3 text-[#0A1A3A] group-hover:text-[#D4AF37] transition-colors">{dim}</h4>
                  <p className="text-sm text-black/40 font-light leading-relaxed">
                    Menganalisis efektivitas {dim.toLowerCase()} dalam mendukung akselerasi target organisasi.
                  </p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-black/[0.01] rounded-full group-hover:bg-[#D4AF37]/5 transition-all duration-700" />
              </motion.div>
            ))}

            {/* Assessment Start Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#0A1A3A] p-6 md:p-10 rounded-[32px] md:rounded-[40px] flex flex-col justify-between text-white relative overflow-hidden group shadow-2xl shadow-[#0A1A3A]/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 blur-3xl rounded-full translate-x-10 -translate-y-10" />
              <h4 className="text-2xl font-light leading-tight relative z-10">
                Temukan Blind Spot <br /><span className="text-[#D4AF37] font-bold italic">Kepemimpinan Anda.</span>
              </h4>
              <button
                onClick={onStart}
                className="mt-12 h-14 w-full bg-white text-black rounded-2xl text-[11px] font-bold tracking-widest uppercase relative z-10 hover:bg-[#D4AF37] hover:text-white transition-colors shadow-lg"
              >
                <span>MULAI SEKARANG</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Slim & Premium CTA Section */}
      <section className="w-full px-4 md:px-8 mb-16">
        <div className="relative w-full py-8 md:py-0 md:h-40 rounded-[32px] md:rounded-[40px] bg-[#0A1A3A] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-16 border border-white/5 shadow-2xl shadow-[#0A1A3A]/10">
          {/* Background Ornaments */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          </div>
          <div className="absolute top-1/2 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <div className="absolute top-1/2 right-0 w-32 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/50" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
            <h3 className="text-xl md:text-3xl font-light text-white tracking-tight">
              Siap Bertransformasi <br className="md:hidden" />
              <span className="text-[#D4AF37] font-bold italic">Berbasis Data?</span>
            </h3>
          </div>

          <div className="relative z-10 flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 text-white/40 text-[10px] font-bold tracking-widest uppercase border-r border-white/10 pr-8">
              <span>±7 MENIT</span>
              <span>49 INDIKATOR</span>
            </div>
            <button
              onClick={onStart}
              className="group flex items-center gap-4 px-8 h-14 bg-white text-black rounded-full text-xs font-bold tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-4">
                MULAI DIAGNOSTIK
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
