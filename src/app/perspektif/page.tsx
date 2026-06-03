"use client";

import { MethodologySection } from "@/app/_sections/methodology-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PerspektifPage() {
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="bg-[#F5F7FA] text-[#4A4C54] min-h-screen font-sans antialiased pt-24">
      {/* Page Header */}
      <section className="relative overflow-hidden py-16 md:py-28 px-6 md:px-12 lg:px-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[320px] w-[740px] -translate-x-1/2 bg-[#D9A441]/[0.055] blur-[130px]" />
          <div className="absolute inset-0 opacity-[0.026] bg-[linear-gradient(90deg,transparent_0,transparent_96%,rgba(11,44,107,0.72)_100%)] bg-[length:82px_100%]" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mb-6 inline-flex rounded-full bg-black/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#0B2C6B]/52">
            Perspektif BinaHub
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.05] text-[#0B2C6B] mb-7">
            Transformasi gagal ketika <span className="italic font-normal text-[#D9A441]">manusia dilupakan.</span>
        </h1>
          <p className="text-lg md:text-xl text-[#4A4C54]/72 font-light leading-[1.85] max-w-3xl mx-auto">
            AI, data, dan sistem hanya bermakna ketika memperkuat cara manusia berpikir, belajar,
            bekerja sama, dan mengambil keputusan.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            ["Human before system", "Perubahan dimulai dari kesadaran, bukan dari tools."],
            ["Learning before automation", "Teknologi harus mempercepat pembelajaran, bukan menggantikannya."],
            ["Impact before activity", "Program bernilai ketika perilaku dan kinerja ikut berubah."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-[12px] border border-black/[0.06] bg-[#FCFCFB] p-6 shadow-[0_16px_48px_-42px_rgba(11,44,107,0.34)]">
              <span className="block h-px w-10 bg-[#D9A441]/60" />
              <h2 className="mt-5 text-xl font-medium tracking-tight text-[#0B2C6B]">{title}</h2>
              <p className="mt-3 text-sm font-light leading-relaxed text-black/56">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div
          className="relative overflow-hidden bg-[#07101F] bg-cover bg-center px-6 py-14 text-white shadow-[0_22px_70px_-54px_rgba(11,44,107,0.72)] md:px-12 md:py-18 lg:px-20"
          style={{ backgroundImage: "url('/asset/transformation-texture-bg.png')" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[#07101F]/42" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,31,0.78)_0%,rgba(7,16,31,0.46)_48%,rgba(7,16,31,0.18)_100%)]" />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#D9A441]">
                Executive Briefing
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight tracking-tight md:text-5xl">
                Transformation Signals 2026
              </h2>
              <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/62 md:text-base">
                Ringkasan strategis tentang tekanan ekonomi, workforce shift, dan gap transformasi yang perlu dibaca sebelum merancang agenda people development.
              </p>
            </div>
            <Link
              href="/perspektif/transformation-signals-2026"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#D9A441] px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B2C6B] transition-colors hover:bg-white"
            >
              Baca Briefing
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-hidden="true"
        className="h-8 bg-[#F5F7FA] md:h-10"
      >
      </section>

      <MethodologySection onMouseMove={handleMouse} />
    </div>
  );
}
