"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Check, Target, AlertCircle, TrendingUp, Sparkles } from "lucide-react"

export interface ServiceData {
  id: string
  title: string
  subtitle: string
  description?: string
  challenges: string[]
  challengeContext?: string
  benefitsTitle?: string
  benefits: string[]
  results: string[]
  color?: string
}

export default function ServiceLayout({ data }: { data: ServiceData }) {
  const accentColor = data.color || "#D9A441"

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#4A4C54] font-sans selection:bg-[#0B2C6B] selection:text-white pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Back Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            href="/ecosystem" 
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-black/40 hover:text-black transition-colors uppercase"
          >
            <ArrowLeft size={16} /> Kembali ke Ekosistem
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 text-[10px] uppercase tracking-widest font-bold mb-6 text-black/60 bg-white">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
            Ekosistem BinaHub
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-6">
            {data.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-black/50 tracking-wide">
            {data.subtitle}
          </h2>
          {data.description && (
            <p className="mt-8 text-lg text-black/70 leading-relaxed max-w-3xl font-light">
              {data.description}
            </p>
          )}
        </motion.section>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-12">
          
          {/* Left Column: Challenges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-5 space-y-12"
          >
            <div className="rounded-[14px] border border-black/[0.05] bg-[#FCFCFB] p-6 shadow-[0_14px_44px_-38px_rgba(11,44,107,0.24)] md:p-10">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-[12px] border border-red-100 bg-red-50 text-red-500">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-2xl font-medium mb-6">Tantangan yang Sering Dialami</h3>
              {data.challengeContext && (
                <p className="text-sm text-black/60 mb-6 leading-relaxed font-light">
                  {data.challengeContext}
                </p>
              )}
              <ul className="space-y-4">
                {data.challenges.map((challenge, i) => (
                   <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span className="text-sm text-black/70 font-light leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Solutions & Results */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-7 space-y-8"
          >
            {/* Benefits */}
            <div className="group relative overflow-hidden rounded-[14px] border border-black/[0.04] bg-[#0B2C6B] p-6 text-white md:p-10">
              <div className="absolute right-0 top-0 h-52 w-80 translate-x-20 -translate-y-20 opacity-16 blur-[80px]" style={{ backgroundColor: accentColor }} />
              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-[12px] border border-white/10 bg-white/12 text-white">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-medium mb-6">{data.benefitsTitle || "Tujuan dan Manfaat"}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {data.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-[12px] border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10">
                      <Check size={18} className="shrink-0 mt-0.5" style={{ color: accentColor }} />
                      <span className="text-[13px] text-white/80 font-light leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="rounded-[14px] border border-black/[0.05] bg-[#FCFCFB] p-6 shadow-[0_14px_44px_-38px_rgba(11,44,107,0.24)] md:p-10">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-[12px] border border-black/5 bg-[#F5F7FA] text-black">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-2xl font-medium mb-6">Hasil yang Ingin Dicapai</h3>
              <div className="space-y-4">
                {data.results.map((result, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[10px] font-bold text-black/40 group-hover:bg-[#0B2C6B] group-hover:text-white transition-colors border border-black/5">
                      0{i + 1}
                    </div>
                    <span className="text-sm font-medium text-black/80">{result}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-20 rounded-[16px] border border-black/[0.04] bg-white p-6 text-center shadow-[0_20px_68px_-54px_rgba(11,44,107,0.28)] sm:p-10 md:p-16 lg:p-20"
        >
          <div className="w-16 h-16 rounded-full bg-[#F5F7FA] mx-auto flex items-center justify-center mb-8 text-[#D9A441]">
            <Sparkles size={32} />
          </div>
          <h3 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">Siap Untuk Bertransformasi?</h3>
          <p className="text-black/50 text-lg mb-10 max-w-xl mx-auto font-light">
            Mari diskusikan bagaimana {data.title} dapat disesuaikan dengan kebutuhan unik organisasi Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {data.id === "insight" ? (
              <Link 
                href="/insight" 
                className="h-14 px-10 bg-[#0B2C6B] text-white rounded-full text-[11px] font-bold tracking-widest hover:scale-105 transition-transform flex items-center justify-center uppercase shadow-xl shadow-black/10"
              >
                Mulai Diagnostik Gratis
              </Link>
            ) : (
              <Link 
                href="/#contact" 
                className="h-14 px-10 bg-[#0B2C6B] text-white rounded-full text-[11px] font-bold tracking-widest hover:scale-105 transition-transform flex items-center justify-center uppercase shadow-xl shadow-black/10"
              >
                Jadwalkan Konsultasi
              </Link>
            )}
            <Link 
              href="/ecosystem" 
              className="h-14 px-10 border border-black/10 bg-white text-black rounded-full text-[11px] font-bold tracking-widest hover:bg-[#F5F7FA] transition-colors flex items-center justify-center uppercase"
            >
              Lihat Ekosistem Lainnya
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
