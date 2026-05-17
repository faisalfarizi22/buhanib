"use client";

import { useEffect, useRef, useState } from "react";
import { Tag } from "@/components/ui/tag";
import { SERVICES } from "@/data/services";

const STICKY_TOP = 80;
const STICKY_STEP = 16;
const SCALE_STEP = 0.04;
const OFFSET_STEP = 8;

export function StackingServiceCards() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [depth, setDepth] = useState<number[]>(SERVICES.map(() => 0));

  useEffect(() => {
    function onScroll() {
      const nextDepth = SERVICES.map((_, i) => {
        let count = 0;
        for (let j = i + 1; j < SERVICES.length; j++) {
          const el = cardRefs.current[j];
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= STICKY_TOP + j * STICKY_STEP + 2) count++;
        }
        return count;
      });
      setDepth(nextDepth);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-col" style={{ perspective: "1400px", perspectiveOrigin: "50% 0%" }}>
      {SERVICES.map((service, i) => {
        const d = depth[i];
        const scale = 1 - d * SCALE_STEP;
        const translateY = d * OFFSET_STEP;

        return (
          <div
            key={service.label}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="sticky mb-4"
            style={{ top: `${STICKY_TOP + i * STICKY_STEP}px`, zIndex: 10 + i }}
          >
            <div
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: "top center",
                transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                willChange: "transform",
              }}
            >
              <div className="group relative bg-[#F8F9FB] rounded-2xl border border-black/[0.07] overflow-hidden cursor-pointer">

                {/* Mobile: image top */}
                {service.img && (
                  <div className="relative w-full h-52 pointer-events-none md:hidden">
                    <img
                      src={service.img}
                      alt={service.label}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      style={{
                        maskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 85%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 85%)",
                      }}
                    />
                  </div>
                )}

                {/* Desktop: image right */}
                {service.img && (
                  <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 pointer-events-none">
                    <img
                      src={service.img}
                      alt={service.label}
                      className="w-full h-full object-cover object-center"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to right, #faf9f7 0%, transparent 55%)" }}
                    />
                  </div>
                )}

                {/* Text content */}
                <div className="relative z-10 p-8">
                  <div className="md:max-w-[60%]">
                    <div className="flex items-start justify-between mb-6">
                      <Tag>{service.label}</Tag>
                    </div>
                    <h3 className="text-xl font-light mb-3">{service.title}</h3>
                    <p className="text-sm text-black/45 leading-relaxed mb-8 max-w-sm">{service.desc}</p>
                  </div>
                  <div className="flex gap-8 pt-6 border-t border-black/[0.06] md:max-w-[60%]">
                    {service.stats.map((s) => (
                      <div key={s.l}>
                        <div className="text-2xl font-light">{s.v}</div>
                        <div className="text-[11px] text-black/35 tracking-widest mt-0.5 uppercase">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
