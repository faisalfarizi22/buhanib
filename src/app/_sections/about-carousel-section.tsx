"use client";

import type { ReactNode } from "react";
import { useState, useEffect, useCallback } from "react";
import { PixelIcon } from "@/components/pixel-icon";
import { Tag } from "@/components/ui/tag";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { UserCheck, Target, Leaf, Compass, Lightbulb } from "lucide-react";
import { useLocale } from "@/i18n/use-locale";
import type { Locale } from "@/i18n/config";

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

const COPY = {
  id: {
    slides: [
      {
        id: 1,
        title: "Posisi Kami",
        lines: ["Mitra", "Transformasi &", "Kapabilitas Masa Depan."],
        type: "hero" as const,
        bgImage: "/asset/slide1.png",
      },
      {
        id: 2,
        title: "Visi Kami",
        lines: ["Masa depan di mana", "kemanusiaan dan kemajuan", "berjalan beriringan."],
        type: "vision" as const,
        bgImage: "/asset/slide2.png",
      },
      {
        id: 3,
        title: "Misi Kami",
        type: "pillars" as const,
        bgImage: "/asset/slide3.png",
        points: [
          { icon: <UserCheck size={22} />, title: "People Development" },
          { icon: <Target size={22} />, title: "Adaptive Leadership & Kemampuan Beradaptasi" },
          { icon: <Leaf size={22} />, title: "Healthy Culture" },
          { icon: <Compass size={22} />, title: "Future Capability Partner" },
          { icon: <Lightbulb size={22} />, title: "AI-Powered Insights" },
        ],
      },
    ] satisfies CarouselSlide[],
    heroDesc: "BinaHub membantu organisasi menata arah pengembangan manusia agar lebih relevan dengan perubahan bisnis, teknologi, dan budaya kerja.",
    visionDesc: "Kemajuan teknologi perlu berjalan bersama kualitas manusia: kesadaran, kepemimpinan, empati, dan keberanian belajar.",
    missionTitle: "Misi Kami",
    missionDesc: "Lima prinsip yang menjaga transformasi tetap manusiawi, adaptif, dan dapat diterjemahkan ke dalam cara kerja organisasi.",
    openSlide: "Buka slide",
  },
  en: {
    slides: [
      {
        id: 1,
        title: "Our Position",
        lines: ["Transformation", "Partner & Future", "Capability Builder."],
        type: "hero" as const,
        bgImage: "/asset/slide1.png",
      },
      {
        id: 2,
        title: "Our Vision",
        lines: ["A future where", "humanity and progress", "move together."],
        type: "vision" as const,
        bgImage: "/asset/slide2.png",
      },
      {
        id: 3,
        title: "Our Mission",
        type: "pillars" as const,
        bgImage: "/asset/slide3.png",
        points: [
          { icon: <UserCheck size={22} />, title: "People Development" },
          { icon: <Target size={22} />, title: "Adaptive Leadership & Adaptability" },
          { icon: <Leaf size={22} />, title: "Healthy Culture" },
          { icon: <Compass size={22} />, title: "Future Capability Partner" },
          { icon: <Lightbulb size={22} />, title: "AI-Powered Insights" },
        ],
      },
    ] satisfies CarouselSlide[],
    heroDesc: "BinaHub helps organizations shape human development direction so it stays relevant to business change, technology, and work culture.",
    visionDesc: "Technological progress needs to grow with human quality: awareness, leadership, empathy, and the courage to keep learning.",
    missionTitle: "Our Mission",
    missionDesc: "Five principles that keep transformation human, adaptive, and translatable into how organizations work.",
    openSlide: "Open slide",
  },
} satisfies Record<Locale, {
  slides: CarouselSlide[];
  heroDesc: string;
  visionDesc: string;
  missionTitle: string;
  missionDesc: string;
  openSlide: string;
}>;

const SLIDE_DURATIONS = [6000, 6000, 5000];

export function AboutCarouselSection() {
  const locale = useLocale();
  const copy = COPY[locale];
  const slides = copy.slides;
  const [displaySlide, setDisplaySlide] = useState(0);

  const goToSlide = useCallback(
    (next: number) => {
      if (next === displaySlide) return;
      setDisplaySlide(next);
    },
    [displaySlide]
  );

  useEffect(() => {
    const duration = SLIDE_DURATIONS[displaySlide] ?? 6000;
    const timer = setTimeout(() => {
      goToSlide((displaySlide + 1) % slides.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [displaySlide, goToSlide, slides.length]);

  const slide = slides[displaySlide];
  const isPillars = slide.type === "pillars";

  return (
    <section id="platform" className="relative z-10 w-full bg-[#F5F7FA] px-4 py-10 md:px-8 md:py-16">
      <div className={`relative mx-auto flex max-w-[1720px] items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-[#071A33] shadow-[0_24px_78px_-56px_rgba(11,44,107,0.34)] transition-colors duration-700 ${
        isPillars
          ? "h-[660px] max-[499px]:h-[640px] sm:h-[620px] md:h-[620px] min-[1440px]:h-[660px]"
          : "h-[620px] max-[499px]:h-[590px] sm:h-[640px] md:h-[620px] min-[1440px]:h-[660px]"
      }`}>

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
            <Image
              src={slide.bgImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 z-[1] bg-[#061A3A]/40 mix-blend-multiply transition-colors duration-700" />
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(7,18,42,0.88)_0%,rgba(7,18,42,0.58)_48%,rgba(7,18,42,0.22)_100%)] transition-colors duration-700" />
        <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_78%_20%,rgba(217,164,65,0.12),transparent_28%),linear-gradient(180deg,rgba(10,26,58,0.08),rgba(10,26,58,0.78))]" />
        <div className="absolute inset-x-8 bottom-0 z-[4] h-px bg-gradient-to-r from-transparent via-[#D9A441]/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-start px-5 py-7 text-left sm:px-6 md:px-12 md:py-10 lg:px-16 min-[1440px]:max-w-7xl">

          <div className="mb-6 flex shrink-0 flex-col items-start md:mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/15 bg-white/[0.1] text-[#D9A441] md:h-11 md:w-11">
              <PixelIcon type="about" size={28} />
            </div>
            <div className="mt-4 md:mt-6">
              <Tag className="border border-white/20 bg-white/10 text-white uppercase">
                {slide.title}
              </Tag>
            </div>
          </div>

          <div className="flex min-h-0 w-full flex-1 items-center">
            <AnimatePresence mode="wait">

              {/* Slide 1 & 2: Multi-line left-aligned heading */}
              {(slide.type === "hero" || slide.type === "vision") && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="flex max-w-4xl flex-col items-start gap-0"
                >
                  {slide.lines.map((line, i) => (
                    <h2
                      key={i}
                      className="text-[clamp(2.4rem,11vw,4.5rem)] font-light leading-[1.06] tracking-tight text-white md:text-5xl lg:text-[3.5rem] xl:text-[4.5rem]"
                    >
                      {line}
                    </h2>
                  ))}
                  <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-white/62 md:mt-8 md:text-base">
                    {slide.type === "hero"
                      ? copy.heroDesc
                      : copy.visionDesc}
                  </p>
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
                  <div className="grid w-full gap-6 md:grid-cols-[0.78fr_1.22fr] md:items-center">
                    <div>
                      <h2 className="text-3xl font-light leading-tight tracking-tight text-white md:text-5xl">
                        {copy.missionTitle}
                      </h2>
                      <p className="mt-4 max-w-sm text-xs font-light leading-relaxed text-white/62 sm:text-sm md:mt-5">
                        {copy.missionDesc}
                      </p>
                    </div>
                    <div className="relative grid gap-2 sm:grid-cols-2 md:gap-3">
                      <div className="pointer-events-none absolute bottom-5 left-5 top-5 hidden w-px bg-gradient-to-b from-[#D9A441]/0 via-[#D9A441]/38 to-[#D9A441]/0 sm:block md:left-6" />
                      {slide.points.map((point, pIdx) => (
                        <motion.div
                          key={point.title}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12 + pIdx * 0.08, duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
                          className={`group relative flex min-h-[58px] items-center gap-2.5 rounded-[10px] border px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 sm:min-h-[68px] md:min-h-[78px] md:gap-4 md:px-4 ${
                            pIdx === 1
                              ? "border-[#D9A441]/42 bg-[#D9A441]/12"
                              : "border-white/10 bg-white/[0.055]"
                          }`}
                        >
                          <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 md:h-10 md:w-10 ${
                            pIdx === 1 ? "bg-[#D9A441] text-[#0A1A3A]" : "bg-white/10 text-[#D9A441]"
                          }`}>
                            {point.icon}
                          </div>
                          <div className="min-w-0">
                            <span className="mb-1.5 block h-px w-7 bg-[#D9A441]/70 md:mb-2 md:w-8" />
                            <span className="block text-[10px] font-semibold uppercase leading-snug tracking-[0.06em] text-white md:text-xs md:tracking-[0.08em]">{point.title}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="mt-6 flex w-full shrink-0 items-center gap-2 md:mt-10 md:max-w-sm md:gap-3">
            {slides.map((item, i) => (
              <button
                key={item.id}
                onClick={() => goToSlide(i)}
                className="group h-3 flex-1 py-1"
                aria-label={`${copy.openSlide} ${i + 1}: ${item.title}`}
              >
                <span className="relative block h-px overflow-hidden rounded-full bg-white/24 transition-colors group-hover:bg-white/42">
                  {displaySlide === i && (
                    <motion.span
                      key={displaySlide}
                      className="absolute inset-y-0 left-0 bg-[#D9A441]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: SLIDE_DURATIONS[i] / 1000, ease: "linear" }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
