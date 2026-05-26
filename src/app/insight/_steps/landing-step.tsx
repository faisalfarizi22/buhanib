"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, BarChart3, Radar, Sparkles } from "lucide-react";
import { DIMENSIONS } from "../questions";
import { PixelIcon } from "@/components/pixel-icon";
import { Tag } from "@/components/ui/tag";

interface LandingStepProps {
  onStart: () => void;
}

const DIMENSION_COPY: Record<string, string> = {
  Insights: "Menemukan akar masalah performa, bukan sekadar gejala di permukaan.",
  Lab: "Mengukur kesiapan kompetensi dan kemampuan problem solving tim.",
  Coach: "Mengidentifikasi bottleneck kepemimpinan, feedback, dan growth mindset.",
  Play: "Membaca energi, motivasi, engagement, dan kualitas koneksi tim.",
  Academy: "Menilai struktur learning path dan budaya belajar organisasi.",
  Works: "Memetakan kejelasan KPI, proses kerja, dan disiplin eksekusi.",
  Impact: "Melihat bukti dampak program dan ROI pengembangan SDM.",
};

const SAMPLE_SCORES = [
  { label: "Insights", value: 82, signal: "Data performa sudah kuat", tone: "bg-[#D9A441]" },
  { label: "Lab", value: 71, signal: "Kompetensi perlu ditajamkan", tone: "bg-[#8FA3C7]" },
  { label: "Coach", value: 64, signal: "Bottleneck leadership terdeteksi", tone: "bg-[#C86B2B]" },
  { label: "Play", value: 76, signal: "Energi tim relatif positif", tone: "bg-[#6EA27B]" },
  { label: "Academy", value: 68, signal: "Learning path belum konsisten", tone: "bg-[#0B2C6B]" },
  { label: "Works", value: 61, signal: "Ritme eksekusi perlu diperjelas", tone: "bg-[#C86B2B]" },
  { label: "Impact", value: 57, signal: "Dampak program belum terukur", tone: "bg-[#B9471D]" },
];

const SAMPLE_OVERALL = Math.round(SAMPLE_SCORES.reduce((sum, item) => sum + item.value, 0) / SAMPLE_SCORES.length);
const SAMPLE_PRIORITY = [...SAMPLE_SCORES].sort((a, b) => a.value - b.value)[0];

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
      <section className="w-full px-4 mb-12">
        <div className="relative w-full min-h-[620px] md:h-[78svh] rounded-[32px] md:rounded-[48px] overflow-hidden flex items-center justify-center border border-black/[0.03] shadow-2xl shadow-black/10">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/asset/bg-insight.png"
              alt="Team Collaboration"
              className="w-full h-full object-cover object-center scale-105 saturate-[0.94] brightness-[1.12]"
            />
            <div className="absolute inset-0 bg-[#061A3A]/22 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/82 via-[#0B2C6B]/38 to-[#0B2C6B]/6" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-black/5" />
            <div className="absolute left-[58%] top-[30%] h-72 w-72 rounded-full bg-[#D9A63A]/10 blur-3xl" />
          </div>

          <div className="relative z-10 grid w-full items-center justify-items-start gap-8 px-6 py-14 md:grid-cols-[60%_40%] md:px-12 lg:px-14 xl:px-16">
            <div className="text-left w-full max-w-[980px]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/18 text-[11px] uppercase tracking-widest font-medium mb-8 text-white/84 bg-white/10 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] animate-pulse" />
                BinaInsight Diagnostic
              </div>
              <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-[4.45rem] xl:text-[4.9rem] font-light tracking-tight leading-[1.04] mb-6 text-white">
                Diagnosis performa <br />{" "}
                <span className="text-[#D9A441] font-light italic">berbasis data.</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mb-10 leading-relaxed">
                Diagnostik mendalam berbasis data untuk menemukan blind spot performa,
                membaca kesiapan transformasi, dan menentukan prioritas pengembangan tim.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
                <button
                  onClick={onStart}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center h-14 md:h-16 px-10 md:px-12 bg-[#0B2C6B] text-[#D9A441] rounded-full text-[13px] font-bold tracking-widest hover:bg-[#08245A] transition-all overflow-hidden uppercase shadow-xl shadow-[#0B2C6B]/30 border border-[#D9A441]/20"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    MULAI DIAGNOSTIK
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <a
                  href="#about-insight"
                  className="rounded-full border border-white/18 px-6 py-4 text-white/72 hover:text-white hover:bg-white/10 text-[11px] font-bold tracking-widest uppercase transition-colors"
                >
                  Lihat Preview Hasil
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-white/54 text-[10px] font-medium tracking-[0.2em] uppercase border-t border-white/10 pt-8">
                <span>5-7 Menit</span>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <span>49 Indikator</span>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <span>7 Dimensi</span>
              </div>
            </div>

            <DiagnosticPreview />
          </div>
        </div>
      </section>

      {/* Why BinaInsight */}
      <section id="about-insight" className="py-12 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
          <div>
            <div className="text-[10px] font-bold tracking-[0.3em] text-[#D9A441] uppercase mb-4">
              Product Experience
            </div>
            <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8 text-[#0B2C6B]">
              Apa yang akan Anda dapatkan dari <span className="italic">BinaInsight?</span>
            </h2>
            <p className="text-black/58 text-lg leading-relaxed mb-10 font-light">
              BinaInsight membantu organisasi melihat performa secara lebih jernih:
              apa yang sudah kuat, apa yang menghambat, dan area mana yang perlu diprioritaskan.
            </p>
            <div className="space-y-7">
              {[
                { title: "Skor 7 dimensi yang presisi", desc: "Insights, Lab, Coach, Play, Academy, Works, dan Impact dihitung dari 49 indikator." },
                { title: "Kategori kesiapan organisasi", desc: "Hasil diklasifikasikan menjadi Pemula, Berkembang, Profesional, atau Unggulan." },
                { title: "Rekomendasi prioritas", desc: "Laporan menampilkan area terendah, analisis singkat, dan aksi pengembangan yang relevan." },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F7FA] flex items-center justify-center shrink-0 border border-black/[0.03] group-hover:bg-[#0B2C6B] group-hover:text-white transition-all duration-300">
                    <Check size={20} className={i === 0 ? "text-[#D9A441]" : ""} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-wide text-black uppercase mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-black/48 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/4.5] bg-[#F5F7FA] rounded-[32px] md:rounded-[48px] flex items-center justify-center p-6 md:p-10 overflow-hidden border border-black/[0.05] relative group">
              <img
                src="/asset/Play.png"
                alt="Team Analysis"
                className="absolute inset-0 w-full h-full object-cover opacity-18 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-24 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/86 via-white/64 to-[#0B2C6B]/10" />
              <ReportPreview />
            </div>
          </div>
        </div>
      </section>

      {/* 7 Dimensions Framework */}
      <section className="py-16 md:py-24 lg:py-24 xl:py-32 px-6 md:px-12 lg:px-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <Tag>7 DIMENSIONS</Tag>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mt-6 md:mt-10 text-[#0B2C6B]">Spektrum Pengukuran.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-black/54">
              Setiap dimensi membaca sinyal berbeda dari performa manusia, sistem kerja, dan dampak pembelajaran.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[30px] bg-[#0B2C6B] p-7 text-white shadow-2xl shadow-[#0B2C6B]/20 md:p-9 lg:col-span-4"
            >
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D9A441]/20 blur-3xl" />
              <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between">
                <div>
                  <Sparkles size={28} className="mb-8 text-[#D9A441]" />
                  <h4 className="text-3xl font-light leading-tight">
                    Temukan Blind Spot <br /><span className="text-[#D9A441] font-bold italic">Kepemimpinan Anda.</span>
                  </h4>
                  <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-white/68">
                    Tujuh dimensi ini membaca hubungan antara data, kompetensi, budaya, eksekusi, dan dampak nyata.
                  </p>
                </div>
                <button
                  onClick={onStart}
                  className="mt-10 h-14 w-full bg-white text-[#0B2C6B] rounded-2xl text-[11px] font-bold tracking-widest uppercase hover:bg-[#D9A441] transition-colors shadow-lg"
                >
                  MULAI SEKARANG
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-8">
              {DIMENSIONS.map((dim, i) => (
                <motion.div
                  key={dim}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`group relative overflow-hidden rounded-[26px] border border-black/[0.04] bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5 ${
                    i === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="relative z-10 flex gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F5F7FA] transition-transform duration-500 group-hover:-translate-y-1">
                      <PixelIcon type={dim.toLowerCase() as any} size={34} />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9A441]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-xl font-light text-[#0B2C6B] transition-colors group-hover:text-[#D9A441]">{dim}</h4>
                      </div>
                      <p className="max-w-2xl text-sm font-light leading-relaxed text-black/50">
                        {DIMENSION_COPY[dim]}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[#D9A441]/0 via-[#D9A441]/30 to-[#D9A441]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Focused CTA Section */}
      <section className="w-full px-4 md:px-8 mb-16">
        <div className="relative w-full py-10 md:h-48 rounded-[32px] md:rounded-[40px] bg-[#0B2C6B] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-16 border border-white/5 shadow-2xl shadow-[#0B2C6B]/10">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          </div>
          <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-transparent to-[#D9A441]/50" />
          <div className="absolute top-1/2 right-0 w-32 h-px bg-gradient-to-l from-transparent to-[#D9A441]/50" />

          <div className="relative z-10">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#D9A441]">
              5-7 menit • 49 indikator • laporan terkirim
            </p>
            <h3 className="text-2xl md:text-4xl font-light text-white tracking-tight">
              Dalam 7 menit, temukan area yang paling <span className="text-[#D9A441] font-bold italic">menghambat performa tim.</span>
            </h3>
          </div>

          <button
            onClick={onStart}
            className="relative z-10 group flex items-center gap-4 px-8 h-14 bg-white text-[#0B2C6B] rounded-full text-xs font-bold tracking-widest hover:bg-[#D9A441] transition-all shadow-xl"
          >
            MULAI DIAGNOSTIK
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </motion.div>
  );
}

function DiagnosticPreview() {
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: -x * 12,
      y: y * 10,
      active: true,
    });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0, active: false })}
      className="hidden md:block w-full justify-self-start max-w-[400px] [perspective:1400px]"
    >
      <motion.div
        animate={{
          y: [0, -7, 0],
          rotateX: tilt.y + 5,
          rotateY: tilt.x - 10,
          rotateZ: tilt.active ? 0 : [-1.1, 0.7, -1.1],
          x: tilt.active ? tilt.x * 1.2 : 0,
          scale: tilt.active ? 1.015 : 1,
        }}
        transition={{
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          rotateX: { type: "spring", stiffness: 120, damping: 20 },
          rotateY: { type: "spring", stiffness: 120, damping: 20 },
          x: { type: "spring", stiffness: 120, damping: 20 },
          scale: { type: "spring", stiffness: 120, damping: 20 },
        }}
        className="relative [transform-style:preserve-3d] will-change-transform"
      >
        <div className="absolute inset-5 translate-x-10 translate-y-8 rounded-[30px] border border-white/10 bg-white/[0.08] shadow-2xl shadow-black/10 backdrop-blur-md [transform:translateZ(-92px)]" />
        <div className="absolute inset-3 translate-x-5 translate-y-4 rounded-[30px] border border-white/12 bg-[#D9A441]/[0.08] shadow-2xl shadow-black/10 backdrop-blur-md [transform:translateZ(-48px)]" />

        <div className="relative rounded-[32px] border border-white/16 bg-white/[0.11] p-4 shadow-[0_34px_90px_-42px_rgba(0,0,0,0.65)] backdrop-blur-xl [transform-style:preserve-3d]">
          <div className="mb-4 flex items-center justify-between [transform:translateZ(34px)]">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/52">Preview</span>
            <span className="rounded-full bg-[#D9A441]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#D9A441]">Live Map</span>
          </div>
          <div className="rounded-[24px] bg-white p-5 shadow-[0_18px_48px_-34px_rgba(11,44,107,0.45)] [transform:translateZ(72px)]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5F7FA]">
                <Radar size={19} className="text-[#0B2C6B]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0B2C6B]">Hasil Penilaian</p>
                <p className="text-xs text-black/40">Simulasi output assessment</p>
              </div>
            </div>
            <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
              <div className="rounded-2xl bg-[#0B2C6B] p-4 text-white shadow-xl shadow-[#0B2C6B]/18">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/44">Overall</p>
                <p className="mt-2 text-4xl font-light">{SAMPLE_OVERALL}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#D9A441]">Profesional</p>
              </div>
              <div className="rounded-2xl bg-[#F5F7FA] p-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/34">Prioritas</p>
                <p className="mt-2 text-lg font-light text-[#0B2C6B]">{SAMPLE_PRIORITY.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-black/46">{SAMPLE_PRIORITY.signal}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {SAMPLE_SCORES.slice(0, 3).map((item) => (
                <div key={item.label} className="rounded-2xl bg-[#F5F7FA] p-3">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-black/34">{item.label}</p>
                  <p className="mt-1 text-lg font-light text-[#0B2C6B]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ReportPreview() {
  return (
    <div className="relative z-10 w-full rounded-[30px] border border-black/[0.04] bg-white p-5 md:p-7 shadow-2xl shadow-black/10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D9A441]">Sample Report</p>
          <h3 className="mt-2 text-2xl font-light text-[#0B2C6B]">Priority Map</h3>
        </div>
        <BarChart3 className="text-[#0B2C6B]" size={26} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[#0B2C6B] p-4 text-white">
          <p className="text-[9px] font-bold uppercase tracking-widest text-white/38">Overall Score</p>
          <p className="mt-1 text-3xl font-light">{SAMPLE_OVERALL}/100</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#D9A441]">Profesional</p>
        </div>
        <div className="rounded-2xl bg-[#F5F7FA] p-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-black/34">Lowest Signal</p>
          <p className="mt-1 text-2xl font-light text-[#0B2C6B]">{SAMPLE_PRIORITY.label}</p>
          <p className="mt-1 text-[10px] leading-relaxed text-black/46">{SAMPLE_PRIORITY.signal}</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-1.5">
        {SAMPLE_SCORES.map((item) => (
          <div key={item.label} className="flex h-24 items-end rounded-xl bg-[#F5F7FA] px-1.5 pb-1.5">
            <div className={`w-full rounded-lg ${item.tone}`} style={{ height: `${Math.max(item.value, 24)}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1.5 text-center">
        {SAMPLE_SCORES.map((item) => (
          <span key={item.label} className="truncate text-[8px] font-bold uppercase tracking-wider text-black/34">
            {item.label.slice(0, 3)}
          </span>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {[
          ["Kategori assessment", "Profesional"],
          ["Prioritas intervensi", SAMPLE_PRIORITY.label],
          ["Output laporan", "Analisis + 5 rekomendasi"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-2xl border border-black/[0.04] px-4 py-3">
            <span className="text-sm text-black/58">{label}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B2C6B]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
