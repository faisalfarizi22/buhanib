"use client";

import { useState, useEffect } from "react";
import { PixelIcon } from "./pixel-icon";
import { CORE_VALUES } from "@/data/core-values";

export function CoreValuesSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  function selectStep(i: number) {
    if (i === active) return;
    setVisible(false);
    setTimeout(() => { setActive(i); setVisible(true); }, 180);
  }

  // Auto-advance every 4.5s
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % CORE_VALUES.length);
        setVisible(true);
      }, 180);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const value = CORE_VALUES[active];

  return (
    <section id="values" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#F8F9FB]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <PixelIcon type="core" size={40} />
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04] uppercase">
            NILAI-NILAI UTAMA
          </div>
          <h2 className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
            H.U.M.A.N
          </h2>
          <p className="mt-4 text-sm text-black/40 tracking-widest uppercase">
            Prinsip-prinsip utama BinaHub
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
          {/* Clickable value cards */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            {CORE_VALUES.map((s, i) => (
              <button
                key={s.num}
                onClick={() => selectStep(i)}
                className="flex-1 text-left rounded-2xl border transition-all duration-200 p-5"
                style={{
                  background: active === i ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
                  borderColor: active === i ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.06)",
                  boxShadow: active === i ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
                }}
              >
                <div className="flex gap-4 items-start">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-light shrink-0 transition-colors duration-200"
                    style={{
                      background: active === i ? "#0A1A3A" : "rgba(0,0,0,0.04)",
                      color: active === i ? "#fff" : "rgba(0,0,0,0.35)",
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-sm font-medium transition-colors duration-200 mb-0.5"
                      style={{ color: active === i ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.5)" }}
                    >
                      {s.title}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>{s.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div
            className="lg:col-span-3 rounded-2xl border border-black/[0.06] p-6 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden"
            style={{ background: "rgba(255,255,255,1)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", minHeight: "360px" }}
          >
            {/* Faded background icon */}
            <div
              className="absolute text-black/[0.03] pointer-events-none transition-all duration-500 ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.8)" }}
            >
              <div style={{ transform: "scale(10)" }}>{value.icon}</div>
            </div>

            {/* Content */}
            <div
              className="relative z-10 max-w-lg transition-all duration-300 ease-out flex flex-col items-center"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)" }}
            >
              <div className="w-16 h-16 rounded-full bg-[#0A1A3A] text-white flex items-center justify-center mb-8 shadow-xl shadow-black/10">
                {value.icon}
              </div>
              <h3 className="text-3xl font-light mb-6 text-[#0F172A]">{value.title}</h3>
              <p className="text-[#0F172A]/60 leading-relaxed text-lg">
                {value.fullText.split("(")[0].trim()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
