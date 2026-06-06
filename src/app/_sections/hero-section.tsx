"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelBackground from "@/components/pixel-background";
import { localizePath } from "@/i18n/config";
import { useLocale } from "@/i18n/use-locale";

const COPY = {
  id: {
    titles: [
      { white: "AI Power", gold: "Human synergy" },
      { white: "AI for", gold: "Human Growth" },
      { white: "Building Adaptive", gold: "Organizations" },
      { white: "Human-Centered", gold: "Intelligence" },
      { white: "AI That", gold: "Develops People" },
      { white: "Technology With", gold: "Human Direction" },
    ],
    desc: "Menciptakan masa depan organisasi yang adaptif terhadap teknologi dan bertumbuh secara manusiawi.",
    journey: "Perjalanan Anda Dimulai dari sini",
    cta: "Mulai",
    scroll: "Scroll",
  },
  en: {
    titles: [
      { white: "AI Power", gold: "Human Synergy" },
      { white: "AI for", gold: "Human Growth" },
      { white: "Building Adaptive", gold: "Organizations" },
      { white: "Human-Centered", gold: "Intelligence" },
      { white: "AI That", gold: "Develops People" },
      { white: "Technology With", gold: "Human Direction" },
    ],
    desc: "Creating a future-ready organization that adapts to technology while growing in a deeply human way.",
    journey: "Your journey starts here",
    cta: "Start",
    scroll: "Scroll",
  },
};

interface HeroSectionProps {
  heroReady: boolean;
}

export function HeroSection({ heroReady }: HeroSectionProps) {
  const locale = useLocale();
  const copy = COPY[locale];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % copy.titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [copy.titles.length]);

  return (
    <section id="home-hero" className="relative z-0 w-full overflow-x-hidden bg-[#F5F7FA] px-4 pt-20 mb-8 md:px-8 md:pt-28 md:mb-16">
      <div className="relative h-[65vh] min-h-[480px] w-full overflow-hidden rounded-[14px] border border-white/10 bg-[#071A33] shadow-[0_24px_78px_-56px_rgba(11,44,107,0.48)] max-[499px]:h-[50vh] max-[499px]:min-h-[336px] sm:h-[72vh] md:h-[80vh] md:rounded-[18px]">
        {/* Background Image */}
        <Image
          src="/asset/hero2.png"
          alt="BinaHub Hero Background"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dark scrim */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: "rgba(10,8,6,0.35)" }}
        />

        {/* Left readability atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-[2] bg-[linear-gradient(90deg,rgba(7,21,46,0.88)_0%,rgba(7,21,46,0.62)_42%,rgba(7,21,46,0.18)_72%,transparent_100%)]" />

        {/* Subtle human-tech dust */}
        <div className="absolute right-[8%] top-[18%] z-[3] h-[42%] w-[36%] pointer-events-none opacity-35">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_42%,rgba(217,164,65,0.18),transparent_34%),radial-gradient(circle_at_78%_62%,rgba(255,255,255,0.10),transparent_28%)]" />
          <div className="absolute left-1/4 top-1/2 h-px w-3/4 -rotate-12 bg-gradient-to-r from-transparent via-[#D9A441]/35 to-transparent" />
          <div className="absolute left-1/2 top-1/3 h-px w-1/2 rotate-6 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[4]"
          style={{
            background:
              "radial-gradient(ellipse 90% 85% at 50% 40%, transparent 35%, rgba(8,6,4,0.60) 100%)",
          }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-[5]"
          style={{
            height: "60%",
            background:
              "linear-gradient(to top, rgba(10,8,6,0.94) 0%, rgba(10,8,6,0.50) 45%, transparent 100%)",
          }}
        />

        {/* Pixel entity canvas */}
        <PixelBackground ready={heroReady} />

        {/* Hero Content */}
        <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col px-4 sm:px-6 md:px-16 pb-8 max-[499px]:pb-5 sm:pb-10 md:pb-16 lg:pb-20 xl:pb-24 max-w-5xl">
          <div
            className="mb-4 sm:mb-6 relative h-[90px] max-[499px]:h-[72px] sm:h-[150px] md:h-[180px] lg:h-[200px] xl:h-[220px]"
            style={{
              opacity: heroReady ? 1 : 0,
              filter: heroReady ? "blur(0px)" : "blur(24px)",
              transform: heroReady ? "translateY(0px)" : "translateY(32px)",
              transition:
                "opacity 1s cubic-bezier(0.16,1,0.3,1) 0ms, filter 1s cubic-bezier(0.16,1,0.3,1) 0ms, transform 1s cubic-bezier(0.16,1,0.3,1) 0ms",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.h1
                key={titleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 text-3xl max-[499px]:text-[2rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-8xl font-light text-white leading-[1.1] tracking-tight"
              >
                {copy.titles[titleIndex].white} <br />
                <span className="italic font-sans" style={{ color: "#D9A441" }}>
                  {copy.titles[titleIndex].gold}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          <p
            className="text-sm max-[499px]:text-xs sm:text-base md:text-lg text-white/70 max-w-xl mb-8 max-[499px]:mb-4 sm:mb-12 leading-relaxed"
            style={{
              opacity: heroReady ? 1 : 0,
              filter: heroReady ? "blur(0px)" : "blur(16px)",
              transform: heroReady ? "translateY(0px)" : "translateY(24px)",
              transition:
                "opacity 1s cubic-bezier(0.16,1,0.3,1) 100ms, filter 1s cubic-bezier(0.16,1,0.3,1) 100ms, transform 1s cubic-bezier(0.16,1,0.3,1) 100ms",
            }}
          >
            {copy.desc}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 max-[499px]:mb-0 sm:mb-8"
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0px)" : "translateY(20px)",
              transition:
                "opacity 1s cubic-bezier(0.16,1,0.3,1) 300ms, transform 1s cubic-bezier(0.16,1,0.3,1) 300ms",
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-white/60 text-sm italic hidden md:flex items-center tracking-wide shrink-0">
                {copy.journey} <ArrowRight className="inline ml-2.5" size={16}/>
              </span>

              <Link
                href={localizePath("/insight", locale)}
                className="group relative inline-flex h-12 max-[499px]:h-10 shrink-0 items-center justify-center gap-3 overflow-hidden rounded-full border border-[#D9A441]/30 bg-[#D9A441] px-7 max-[499px]:px-5 text-[11px] max-[499px]:text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B2C6B] shadow-[0_18px_44px_-26px_rgba(217,164,65,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_24px_56px_-28px_rgba(217,164,65,0.85)] active:scale-95"
              >
                {copy.cta}
                <ChevronRight size={14} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="hidden md:flex absolute bottom-10 right-10 z-30 flex-col items-center gap-2"
          style={{
            opacity: heroReady ? 1 : 0,
            transition: "opacity 1.5s ease 1s",
          }}
        >
          <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-medium">
            {copy.scroll}
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/55 animate-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
