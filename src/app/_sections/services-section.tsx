"use client";

import { Tag } from "@/components/ui/tag";
import { PixelIcon } from "@/components/pixel-icon";
import { StackingServiceCards } from "@/components/stacking-service-cards";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 md:py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <PixelIcon type="ecosystem" size={40} />
            <div className="mt-4">
              <Tag>EKOSISTEM</Tag>
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              Solusi Pembelajaran &<br />Pengembangan Terintegrasi.
            </h2>
          </div>
          <p className="text-sm text-black/45 leading-relaxed max-w-xs">
            Delapan modul pembelajaran AI-Powered Human Synergy kami dirancang siap pakai dan saling
            melengkapi.
          </p>
        </div>

        <StackingServiceCards />
      </div>
    </section>
  );
}
