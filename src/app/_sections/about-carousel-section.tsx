"use client";

import type { ReactNode } from "react";
import { useState, useEffect, useCallback } from "react";
import { PixelIcon } from "@/components/pixel-icon";
import { Tag } from "@/components/ui/tag";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, Target, Leaf, Compass, Lightbulb } from "lucide-react";

type PillarPoint = {
  icon: ReactNode;
  title: string;
};

type TextSlide = {
  id: number;
  title: string;
  lines: string[];
  type: "hero" | "vision";
  bgImage: string;
};

type PillarSlide = {
  id: number;
  title: string;
  type: "pillars";
  bgImage: string;
  points: PillarPoint[];
};

type CarouselSlide = TextSlide | PillarSlide;

const SLIDES: CarouselSlide[] = [
  {
    id: 1,
    title: "Posisi Kami",
    lines: ["Mitra", "Transformasi &", "Kapabilitas Masa Depan."],
    type: "hero",
    bgImage: "/asset/slide1.png",
  },
  {
    id: 2,
    title: "Visi Kami",
    lines: [
      "Masa depan di mana",
      "kemanusiaan dan kemajuan",
      "berjalan beriringan.",
    ],
    type: "vision",
    bgImage: "/asset/slide2.png",
  },
  {
    id: 3,
    title: "Misi Kami",
    type: "pillars",
    bgImage: "/asset/slide3.png",
    points: [
      { icon: <UserCheck size={22} />, title: "People Development" },
      { icon: <Target size={22} />, title: "Adaptive Leadership & Kemampuan Beradaptasi" },
      { icon: <Leaf size={22} />, title: "Healthy Culture" },
      { icon: <Compass size={22} />, title: "Future Capability Partner" },
      { icon: <Lightbulb size={22} />, title: "AI-Powered Insights" },
    ],
  },
];

const POPUP_POSITIONS = [
  "md:left-[3%] md:top-[6%]",
  "md:right-[2%] md:top-[14%]",
  "md:left-[24%] md:top-[43%]",
  "md:left-[2%] md:bottom-[2%]",
  "md:right-[9%] md:bottom-[6%]",
];

export function AboutCarouselSection() {
  const [displaySlide, setDisplaySlide] = useState(0);

  const goToSlide = useCallback(
    (next: number) => {
      if (next === displaySlide) return;
      setDisplaySlide(next);
    },
    [displaySlide]
  );

  useEffect(() => {
    const duration = displaySlide === 2 ? 5000 : 6000;
    const timer = setTimeout(() => {
      goToSlide((displaySlide + 1) % SLIDES.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [displaySlide, goToSlide]);

  const slide = SLIDES[displaySlide];

  return (
    <section id="platform" className="px-0 pb-0 bg-[#F5F7FA] relative z-10 w-full">
      <div className="relative overflow-hidden bg-[#0A1A3A] rounded-none min-h-[600px] py-24 md:py-32 flex items-center justify-center border-b-[5px] border-[#D9A441]">

        {/* Background image */}
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.045, x: 16 }}
            animate={{ opacity: 1, scale: 1.02, x: 0 }}
            exit={{ opacity: 0, scale: 1, x: -16 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={slide.bgImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 z-[1] bg-[#0A1A3A]/24 mix-blend-multiply" />
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(7,18,42,0.82)_0%,rgba(7,18,42,0.52)_45%,rgba(7,18,42,0.24)_100%)]" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-[#0A1A3A]/8 via-[#0A1A3A]/36 to-[#0A1A3A]/84" />
        <div className="absolute inset-x-0 bottom-0 z-[4] h-px bg-gradient-to-r from-transparent via-[#D9A441]/80 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 flex flex-col items-start text-left">

          <div className="mb-10 flex flex-col items-start">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.08] text-[#D9A441] backdrop-blur-md">
              <PixelIcon type="about" size={28} />
            </div>
            <div className="mt-6">
              <Tag className="bg-white/10 text-[#D9A441] border border-[#D9A441]/30 uppercase">{slide.title}</Tag>
            </div>
          </div>

          <div className="w-full min-h-[280px] flex items-center">
            <AnimatePresence mode="wait">

              {/* Slide 1 & 2: Multi-line left-aligned heading */}
              {(slide.type === "hero" || slide.type === "vision") && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-start gap-0"
                >
                  {slide.lines.map((line, i) => (
                    <h2
                      key={i}
                      className="text-4xl md:text-5xl lg:text-[4.5rem] font-light tracking-tight leading-[1.16] text-white"
                    >
                      {line}
                    </h2>
                  ))}
                </motion.div>
              )}

              {/* Slide 3: Diamond-scattered grid */}
              {slide.type === "pillars" && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <div className="relative w-full max-w-4xl min-h-[360px] md:min-h-[330px]">
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0.75 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="pointer-events-none absolute left-[10%] right-[10%] top-1/2 hidden h-px origin-center bg-gradient-to-r from-transparent via-[#D9A441]/28 to-transparent md:block"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="pointer-events-none absolute left-1/2 top-1/2 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D9A441]/18 bg-[#D9A441]/[0.035] md:block"
                    />
                    {slide.points.map((point, pIdx) => (
                      <motion.div
                        key={point.title}
                        initial={{ opacity: 0, y: 26, scale: 0.92, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        transition={{ delay: 0.18 + pIdx * 0.14, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                        className={`group relative mb-3 flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-white shadow-[0_22px_70px_-46px_rgba(0,0,0,0.82)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:absolute md:mb-0 md:w-[300px] ${POPUP_POSITIONS[pIdx]} ${
                          pIdx === 1
                            ? "border-[#D9A441]/45 bg-[#D9A441]/16"
                            : "border-white/14 bg-[#071B3D]/48 hover:border-white/24 hover:bg-[#0B2C6B]/48"
                        }`}
                      >
                        <span className="absolute -bottom-1.5 left-8 h-3 w-3 rotate-45 border-b border-r border-white/10 bg-inherit md:block" />
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${
                          pIdx === 1 ? "bg-[#D9A441] text-[#0A1A3A]" : "bg-white/10 text-[#D9A441]"
                        }`}>
                          {point.icon}
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#D9A441]/80">
                            {String(pIdx + 1).padStart(2, "0")}
                          </span>
                          <span className="mt-1 block text-sm font-semibold leading-snug tracking-tight">{point.title}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="mt-14 flex items-center gap-4">
            {SLIDES.map((item, i) => (
              <button
                key={item.id}
                onClick={() => goToSlide(i)}
                className="group flex items-center gap-3"
                aria-label={`Buka slide ${i + 1}: ${item.title}`}
              >
                <span className={`text-[10px] font-bold tracking-[0.22em] transition-colors duration-500 ${
                  displaySlide === i ? "text-[#D9A441]" : "text-white/34 group-hover:text-white/60"
                }`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`h-px transition-all duration-500 ${
                  displaySlide === i ? "w-14 bg-[#D9A441]" : "w-6 bg-white/25 group-hover:bg-white/45"
                }`} />
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
