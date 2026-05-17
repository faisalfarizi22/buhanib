"use client";

import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { PixelIcon } from "@/components/pixel-icon";

interface MethodologySectionProps {
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function MethodologySection({ onMouseMove }: MethodologySectionProps) {
  const glassStyle = {
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    background: "rgba(255,255,255,0.75)",
  };

  return (
    <section
      id="methodology"
      className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <PixelIcon type="methodology" size={40} />
            <div className="mt-4">
              <Tag>METODOLOGI</Tag>
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              Berdayakan tim Anda.<br />Transformasikan budaya Anda.
            </h2>
          </div>
          <p className="text-sm text-black/45 leading-relaxed max-w-xs">
            Pendekatan kami menggabungkan wawasan psikologi, teknologi, dan interaksi manusia untuk
            menciptakan ekosistem pembelajaran yang relevan dan berdampak nyata.
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden border border-black/[0.07] flex flex-col md:block md:relative"
          onMouseMove={onMouseMove}
        >
          <div className="relative w-full h-[280px] md:h-[480px] shrink-0">
            <Image
              src="/asset/Metodologi.png"
              alt="BinaHub Methodology"
              fill
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col gap-3 p-4 md:absolute md:bottom-4 md:right-4 md:p-0 md:w-80">
            <div className="rounded-xl border border-white/50 p-6" style={glassStyle}>
              <Tag>PENDEKATAN</Tag>
              <h3 className="mt-3 text-lg font-light mb-2">Pengembangan Holistik</h3>
              <p className="text-xs text-black/50 leading-relaxed">
                Membangun dari dalam. Fokus pada kesadaran diri (self-awareness) sebagai fondasi
                dari kepemimpinan yang tangguh di era digital.
              </p>
            </div>

            <div className="rounded-xl border border-white/50 p-6" style={glassStyle}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-xs text-black/40 tracking-widest uppercase">TERUKUR</span>
              </div>
              <p className="text-sm text-black/50 leading-relaxed">
                Setiap program dirancang dengan indikator keberhasilan yang jelas untuk memastikan
                ROI yang optimal bagi organisasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
