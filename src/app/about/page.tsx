"use client"

import { motion } from "framer-motion"
import { Compass, Target, Sparkles, ArrowRight, CheckCircle2, Quote, Zap, Shield, Heart, Globe, Cpu } from "lucide-react"
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { PixelIcon } from "@/components/pixel-icon"

const CHALLENGES = [
  "Hilangnya banyak jenis pekerjaan",
  "Meningkatnya tekanan dan burnout",
  "Krisis kepemimpinan di era digital",
  "Menurunnya kualitas hubungan manusia",
  "Organisasi yang kehilangan makna & nilai"
];

const CAPABILITIES = [
  { title: "Pengembangan Manusia", icon: <Heart size={20} />, desc: "Menumbuhkan potensi utuh individu." },
  { title: "Transformasi Organisasi", icon: <Globe size={20} />, desc: "Membangun sistem yang adaptif & resilien." },
  { title: "Pembelajaran Strategis", icon: <Zap size={20} />, desc: "Edukasi yang relevan dengan masa depan." },
  { title: "Kepemimpinan", icon: <Shield size={20} />, desc: "Membentuk pemimpin berintegritas tinggi." },
  { title: "Kesiapan Era AI", icon: <Cpu size={20} />, desc: "Tetap relevan di tengah disrupsi teknologi." }
];

export default function AboutPage() {
  return (
    <div className="bg-[#F8F9FB] text-[#0F172A] font-sans antialiased overflow-x-hidden">
      
      {/* Hero Section - Matching BinaInsight Style */}
      <section className="w-full px-4 md:px-8 pt-26 mb-16">
        <div className="relative w-full h-[70vh] md:h-[80vh] rounded-[32px] md:rounded-[48px] overflow-hidden flex items-center border border-black/[0.03] shadow-2xl shadow-black/10">
          <div className="absolute inset-0 z-0">
            <img 
              src="/bg-about.png" 
              alt="About BinaHub" 
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-[#0A1A3A]/70 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A3A] via-[#0A1A3A]/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="mb-8">
                <Tag>TENTANG BINAHUB</Tag>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.9] text-white mb-10">
                Memanusiawikan <br />
                <span className="text-[#D4AF37] font-normal">Masa Depan.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-2xl border-l-2 border-[#D4AF37] pl-8">
                BinaHub hadir sebagai mitra transformasi manusia dan kapabilitas masa depan di era perubahan yang belum pernah terjadi sebelumnya.
              </p>
            </motion.div>
          </div>

          {/* Floating Highlight */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-16 right-16 hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-white max-w-xs shadow-2xl shadow-black/20">
              <div className="mb-4">
                <PixelIcon type="about" size={48} />
              </div>
              <p className="text-sm font-light leading-relaxed text-white/90">
                Dunia bergerak jauh lebih cepat dibanding kemampuan kita untuk beradaptasi. Kami hadir untuk menutup celah tersebut secara manusiawi.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Context Section - Modern Typography */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight text-[#0A1A3A]">
                Era Transformasi <br />
                <span className="font-medium italic">Tanpa Batas.</span>
              </h2>
              <div className="mt-10 space-y-6 text-lg text-black/70 font-light">
                <p>
                  Perkembangan AI, otomatisasi, dan digitalisasi membuka peluang inovasi yang besar, namun sekaligus membawa tantangan nyata bagi kemanusiaan.
                </p>
                <p className="text-black/90 font-medium">
                  Kami percaya bahwa masa depan tidak hanya membutuhkan organisasi yang lebih cerdas secara teknologi, tetapi juga lebih <span className="text-[#D4AF37]">matang secara manusiawi.</span>
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-4">
              {CHALLENGES.map((challenge, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#F8F9FB] p-8 rounded-2xl border border-black/[0.03] flex items-start gap-4 hover:border-[#D4AF37]/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </div>
                  <span className="text-sm font-bold text-black/80 uppercase tracking-wide">{challenge}</span>
                </motion.div>
              ))}
              <div className="bg-[#0A1A3A] p-8 rounded-2xl text-white flex flex-col justify-center">
                <p className="text-sm font-light italic opacity-80 leading-relaxed">
                  &quot;Kemajuan tanpa arah dapat melahirkan dehumanisasi.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Bento Style */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Tag>VISI & MISI</Tag>
          </div>
          
          <div className="grid md:grid-cols-12 gap-6 h-full md:h-[600px]">
            {/* Vision - Large Card */}
            <motion.div 
              whileHover={{ scale: 0.99 }}
              className="md:col-span-7 bg-[#0A1A3A] rounded-[48px] p-12 md:p-16 text-white relative overflow-hidden group shadow-2xl shadow-[#0A1A3A]/20 h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full translate-x-20 -translate-y-20 group-hover:bg-[#D4AF37]/10 transition-colors duration-1000" />
              <div className="relative z-10 flex flex-col h-full">
                <Target size={40} className="text-[#D4AF37] mb-12" />
                <h3 className="text-[11px] font-bold tracking-[0.4em] text-white/50 uppercase mb-6">Visi Kami</h3>
                <h4 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-8">
                  Masa depan di mana <span className="italic font-normal">kemanusiaan</span> dan kemajuan berjalan selaras.
                </h4>
                <div className="mt-auto pt-8 border-t border-white/10">
                  <p className="text-white/60 font-light italic">A future where humanity and progress grow in harmony.</p>
                </div>
              </div>
            </motion.div>

            {/* Mission - Tall Card */}
            <motion.div 
              whileHover={{ scale: 0.99 }}
              className="md:col-span-5 bg-white rounded-[48px] p-12 md:p-16 border border-black/[0.05] shadow-2xl shadow-black/[0.02] group h-full flex flex-col"
            >
              <div className="relative z-10 flex flex-col h-full">
                <Compass size={40} className="text-[#0A1A3A] mb-12" />
                <h3 className="text-[11px] font-bold tracking-[0.4em] text-black/40 uppercase mb-6">Misi Kami</h3>
                <h4 className="text-3xl md:text-4xl font-light leading-[1.1] text-[#0A1A3A] tracking-tight mb-8">
                  Mendorong transformasi manusia dan organisasi untuk <span className="text-[#D4AF37]">memanusiawikan masa depan.</span>
                </h4>
                <div className="mt-auto pt-8 border-t border-black/5">
                  <p className="text-black/60 font-light italic">Driving human and organizational transformation to humanize the future.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Positioning & Capabilities Grid */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <Tag>OUR POSITIONING</Tag>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight mt-8 leading-[1.1] text-[#0A1A3A]">
                Mitra transformasi & <br />
                <span className="font-medium">kapabilitas masa depan.</span>
              </h2>
            </div>
            <p className="text-lg text-black/70 font-light leading-relaxed max-w-lg">
              Kami memadukan lima pilar utama untuk memastikan organisasi Anda tidak hanya bertahan, tetapi bertumbuh secara utuh di tengah perubahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#F8F9FB] p-10 rounded-[40px] border border-black/[0.03] hover:bg-[#0A1A3A] hover:text-white transition-all duration-500 hover:shadow-2xl hover:shadow-[#0A1A3A]/20"
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#D4AF37] group-hover:text-[#0A1A3A] transition-colors">
                  {cap.icon}
                </div>
                <h4 className="text-sm font-bold tracking-widest uppercase mb-4">{cap.title}</h4>
                <p className="text-xs font-light leading-relaxed opacity-70 group-hover:opacity-90 transition-opacity">
                  {cap.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - Minimalist & Bold */}
      <section className="py-40 px-6 md:px-12 lg:px-20 bg-[#F8F9FB] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none flex items-center justify-center">
          <span className="text-[25vw] font-black text-black/[0.02] select-none tracking-tighter">HUMAN</span>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="inline-block p-4 rounded-3xl bg-white shadow-xl shadow-black/5">
              <Quote className="text-[#D4AF37]" size={40} />
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-[#0A1A3A] leading-[1.3] tracking-tight">
              &quot;Bagi kami, memanusiakan masa depan bukan berarti menolak kemajuan. Melainkan memastikan bahwa di tengah kemajuan tersebut, <span className="italic font-normal text-[#D4AF37]">manusia tetap menjadi inti</span> dari setiap transformasi.&quot;
            </h2>
            
            <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-6">
              <Link
                href="/ecosystem"
                className="group h-16 px-12 bg-[#0A1A3A] text-white rounded-full text-[11px] font-bold tracking-[0.3em] hover:scale-105 transition-all items-center justify-center uppercase shadow-2xl shadow-[#0A1A3A]/20 flex"
              >
                Jelajahi Ekosistem <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="text-[10px] tracking-[0.5em] text-black/60 uppercase font-bold">
                People. Learning. Elevated.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}


