"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import PixelBackground from "@/components/pixel-background";

const HERO_STATS = [
  { value: 50, label: "Perusahaan", suffix: "+" },
  { value: 15, label: "Ribu Alumni", suffix: "k+" },
  { value: 98, label: "Tingkat Keberhasilan", suffix: "%" },
];

interface HeroSectionProps {
  heroReady: boolean;
}

export function HeroSection({ heroReady }: HeroSectionProps) {
  return (
    <section className="px-4 pt-[100px] pb-4 bg-white">
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{ minHeight: "calc(100vh - 108px)" }}
      >
        {/* Background Image */}
        <Image
          src="/bg-hero.png"
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

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 90% 85% at 50% 40%, transparent 35%, rgba(8,6,4,0.60) 100%)",
          }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-[3]"
          style={{
            height: "60%",
            background:
              "linear-gradient(to top, rgba(10,8,6,0.94) 0%, rgba(10,8,6,0.50) 45%, transparent 100%)",
          }}
        />

        {/* Pixel entity canvas */}
        <PixelBackground ready={heroReady} />

        {/* Hero Content */}
        <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col px-6 md:px-16 pb-10 md:pb-16 max-w-5xl">
          <h1
            className="text-4xl sm:text-7xl md:text-8xl font-light text-white leading-[1.0] tracking-tight mb-6"
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              opacity: heroReady ? 1 : 0,
              filter: heroReady ? "blur(0px)" : "blur(24px)",
              transform: heroReady ? "translateY(0px)" : "translateY(32px)",
              transition:
                "opacity 1s cubic-bezier(0.16,1,0.3,1) 0ms, filter 1s cubic-bezier(0.16,1,0.3,1) 0ms, transform 1s cubic-bezier(0.16,1,0.3,1) 0ms",
            }}
          >
            AI Powered <br />
            <span className="italic" style={{ color: "#D4AF37" }}>
              Human Synergy
            </span>
          </h1>

          <p
            className="text-base md:text-lg text-white/60 max-w-xl mb-8 leading-relaxed"
            style={{
              opacity: heroReady ? 1 : 0,
              filter: heroReady ? "blur(0px)" : "blur(16px)",
              transform: heroReady ? "translateY(0px)" : "translateY(24px)",
              transition:
                "opacity 1s cubic-bezier(0.16,1,0.3,1) 100ms, filter 1s cubic-bezier(0.16,1,0.3,1) 100ms, transform 1s cubic-bezier(0.16,1,0.3,1) 100ms",
            }}
          >
            Membangun masa depan di mana organisasi tidak hanya cerdas secara
            teknologi, tetapi juga matang secara manusiawi.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-3 mb-14"
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0px)" : "translateY(20px)",
              transition:
                "opacity 1s cubic-bezier(0.16,1,0.3,1) 300ms, transform 1s cubic-bezier(0.16,1,0.3,1) 300ms",
            }}
          >
            <Link
              href="/insight"
              className="px-7 py-3.5 bg-white text-[#0A1A3A] text-sm rounded-xl hover:bg-white/90 transition-all tracking-widest font-semibold flex items-center gap-2 group"
            >
              MULAI TRANSFORMASI{" "}
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="#ecosystem"
              className="px-7 py-3.5 border border-white/20 text-white/65 text-sm rounded-xl hover:bg-white/5 hover:border-white/30 transition-all tracking-widest font-medium"
            >
              PELAJARI EKOSISTEM
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 sm:gap-12">
            {HERO_STATS.map((stat, i) => (
              <div
                key={i}
                style={{
                  opacity: heroReady ? 1 : 0,
                  filter: heroReady ? "blur(0px)" : "blur(16px)",
                  transform: heroReady ? "translateY(0px)" : "translateY(20px)",
                  transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${200 + i * 80}ms, filter 0.8s cubic-bezier(0.16,1,0.3,1) ${200 + i * 80}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${200 + i * 80}ms`,
                }}
              >
                <div className="text-3xl sm:text-4xl text-white font-light tracking-tight">
                  <Counter end={stat.value} suffix={stat.suffix} trigger={heroReady} />
                </div>
                <div className="text-xs text-white/40 tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
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
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/55 animate-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
