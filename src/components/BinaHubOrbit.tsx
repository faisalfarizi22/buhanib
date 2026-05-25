"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";
import { PixelIcon } from "@/components/pixel-icon";

interface OrbitItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: string;
  position: string;
  side: "left" | "right";
}

const orbitItems: OrbitItem[] = [
  {
    id: "insight",
    title: "BinaInsights",
    subtitle: "Self Awareness & Insights Discovery",
    description: "Menggali potensi tersembunyi individu dan memetakan dinamika kolaborasi tim secara mendalam.",
    iconType: "insights",
    position: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    side: "left"
  },
  {
    id: "lab",
    title: "BinaLab",
    subtitle: "Experiential Workshops",
    description: "Pembelajaran aktif berbasis lokakarya pengalaman untuk membangun perilaku baru.",
    iconType: "lab",
    position: "top-1/4 left-0 -translate-x-[110%] -translate-y-1/2",
    side: "left"
  },
  {
    id: "coach",
    title: "BinaCoach",
    subtitle: "Executive & Performance Coaching",
    description: "Bimbingan kepemimpinan intensif untuk melahirkan kejelasan arah dan akuntabilitas mandiri.",
    iconType: "coach",
    position: "bottom-1/4 left-0 -translate-x-[110%] translate-y-1/2",
    side: "left"
  },
  {
    id: "journey",
    title: "BinaJourney",
    subtitle: "Beyond travel. Real transformation.",
    description: "Perjalanan luar ruang transformatif untuk kejelasan tujuan hidup dan penyelarasan karir.",
    iconType: "journey",
    position: "bottom-0 left-[16%] -translate-x-1/2 translate-y-[110%]",
    side: "left"
  },
  {
    id: "works",
    title: "BinaWorks",
    subtitle: "Execution & Performance Acceleration",
    description: "Akselerasi eksekusi lapangan untuk memastikan rencana strategis terwujud menjadi hasil nyata.",
    iconType: "works",
    position: "bottom-0 right-[16%] translate-x-1/2 translate-y-[110%]",
    side: "right"
  },
  {
    id: "impact",
    title: "BinaImpact",
    subtitle: "Measurement & ROI",
    description: "Pengukuran kuantitatif tingkat keberhasilan dampak dan nilai balik investasi (ROI) program HR.",
    iconType: "impact",
    position: "bottom-1/4 right-0 translate-x-[110%] translate-y-1/2",
    side: "right"
  },
  {
    id: "academy",
    title: "BinaAcademy",
    subtitle: "Structured Learning Programs",
    description: "Penyusunan kurikulum dan jalur belajar berkelanjutan yang selaras dengan sasaran bisnis.",
    iconType: "academy",
    position: "top-1/4 right-0 translate-x-[110%] -translate-y-1/2",
    side: "right"
  },
  {
    id: "play",
    title: "BinaPlay",
    subtitle: "Gamified Learning & Team Engagement",
    description: "Aktivitas pembelajaran berbasis gamifikasi interaktif untuk mempererat sinergi tim.",
    iconType: "play",
    position: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    side: "right"
  }
];

interface BinaHubOrbitProps {
  onProductClick?: (productId: string) => void;
}

export default function BinaHubOrbit({ onProductClick }: BinaHubOrbitProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section 
      className="relative w-full overflow-hidden flex items-center justify-center rounded-xl border border-white/10 py-36 px-4"
      style={{ minHeight: "820px", background: "#030712" }}
      aria-label="BinaHub Orbit Map"
    >
      {/* 1. Tech Grid Lines */}
      <div 
        className="absolute inset-0 z-[1] opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />

      {/* 2. Gold Dot Matrix */}
      <div
        className="absolute inset-0 z-[2] opacity-25 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #D9A441 1.2px, transparent 1.2px)`,
          backgroundSize: "80px 80px",
          backgroundPosition: "-0.6px -0.6px"
        }}
      />

      {/* 3. Radial Glow Center */}
      <div className="absolute inset-0 z-[3] pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(11,44,107,0.55) 0%, transparent 70%)" }}
        />
      </div>

      {/* 4. Subtle Corner Accents (Engineered and minimal) */}
      <div className="absolute top-0 right-0 w-[320px] h-[320px] rounded-full bg-[#D9A441]/5 blur-[80px] pointer-events-none z-[3]" />
      <div className="absolute bottom-0 left-0 w-[260px] h-[260px] rounded-full bg-[#0B2C6B]/15 blur-[60px] pointer-events-none z-[3]" />

      {/* 5. Animated floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#D9A441]/30 rounded-sm z-[4] pointer-events-none"
          style={{
            left: `${10 + (i * 7.5) % 80}%`,
            top: `${15 + (i * 11) % 70}%`,
          }}
          animate={{
            y: [0, -24, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Scaling wrapper to make the entire orbit diagram responsive across different viewports */}
      <div className="relative w-[1120px] h-[680px] flex items-center justify-center shrink-0 scale-[0.58] sm:scale-[0.7] md:scale-[0.78] lg:scale-[0.9] xl:scale-100 transition-all duration-550 origin-center">
        {/* Orbit Track Circles */}
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5 border-dashed pointer-events-none z-[4] animate-[spin_120s_linear_infinite]" />
        <div className="absolute w-[680px] h-[680px] rounded-full border border-white/[0.04] pointer-events-none z-[4]" />

        {/* Central Double Arc */}
        {/* Left Arc - Navy/blue */}
        <div className="absolute w-[470px] h-[470px] rounded-full border-[28px] border-transparent border-l-[#0B2C6B]/60 border-b-[#0B2C6B]/60 rotate-45 pointer-events-none z-[4]" />
        {/* Right Arc - Gold */}
        <div className="absolute w-[470px] h-[470px] rounded-full border-[28px] border-transparent border-r-[#D9A441]/50 border-t-[#D9A441]/50 rotate-45 pointer-events-none z-[4]" />

        {/* Central Orb Container */}
        <div className="absolute w-[480px] h-[480px] flex items-center justify-center pointer-events-none z-[5]">
          
          {/* Core Dark Center Disc with gold ring */}
          <div className="w-[280px] h-[280px] rounded-full shadow-2xl flex flex-col items-center justify-center z-10 pointer-events-auto border border-[#D9A441]/30"
            style={{ background: "linear-gradient(135deg, #0B2C6B 0%, #050f24 100%)" }}
          >
            <span className="text-[10px] font-bold text-[#D9A441] tracking-[0.25em] uppercase mb-1">Ecosystem</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">BinaHub</h2>
            <div className="w-1.5 h-1.5 bg-[#D9A441] rounded-full my-4" />
            <p className="text-[9px] font-semibold text-white/40 tracking-wider text-center max-w-[180px] leading-relaxed uppercase">
              Integrated Learning &amp; Development
            </p>
          </div>

          {/* Outer Tech Orbit Labels */}
          <div className="absolute top-1/2 left-[12%] -translate-y-1/2 -rotate-90 text-white/10 font-bold text-[10px] tracking-[0.3em] select-none">
            INTEGRATED SYSTEM
          </div>
          <div className="absolute top-1/2 right-[12%] -translate-y-1/2 rotate-90 text-[#D9A441]/40 font-bold text-[10px] tracking-[0.3em] select-none">
            HUMAN CAPACITY
          </div>
        </div>

        {/* Interactive Orbit Center Canvas */}
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
          
          {/* 8 Orbital Cards */}
          {orbitItems.map((item) => {
            const isHovered = hoveredItem === item.id;
            
            return (
              <div
                key={item.id}
                className={`absolute ${item.position} z-30 cursor-pointer select-none group`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onProductClick?.(item.id)}
              >
                <div 
                  className={`
                    relative flex items-center gap-4 p-5 rounded-lg transition-all duration-500
                    ${item.side === "left" ? "flex-row text-left" : "flex-row-reverse text-right"}
                    ${isHovered
                      ? "scale-[1.02] border-[#D9A441]"
                      : "border-white/10"
                    }
                    border min-w-[310px] max-w-[310px]
                  `}
                  style={{
                    background: isHovered
                      ? "#0B2C6B"
                      : "#060e20",
                  }}
                >
                  {/* Connecting Anchor Point Line to Center */}
                  <div 
                    className={`
                      absolute top-1/2 ${item.side === "left" ? "left-full" : "right-full"} 
                      w-12 h-[1px] -z-10
                      ${isHovered ? "bg-[#D9A441] h-[1.5px]" : "bg-white/15"}
                      transition-all duration-500
                    `} 
                  />

                  {/* Active Indicator Light */}
                  <div 
                    className={`
                      absolute top-1/2 -translate-y-1/2 ${item.side === "left" ? "left-full" : "right-full"} 
                      w-2 h-2 rounded-full -mr-1
                      ${isHovered ? "bg-[#D9A441] scale-125" : "bg-white/20"}
                      transition-all duration-500
                    `}
                  />

                  {/* Icon Circle wrapper */}
                  <div 
                    className={`
                      w-12 h-12 rounded-lg flex items-center justify-center shrink-0
                      ${isHovered ? "bg-[#D9A441]" : "bg-white/5"}
                      transition-all duration-500 shadow-sm
                    `}
                  >
                    <PixelIcon type={item.iconType as any} size={28} />
                  </div>
                  
                  {/* Text Content block */}
                  <div className="flex flex-col overflow-hidden">
                    <h3 className="font-bold text-base text-white tracking-tight group-hover:text-[#D9A441] transition-colors leading-tight mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest truncate mb-1.5">
                      {item.subtitle}
                    </p>
                    <p className="text-[10px] text-white/55 leading-normal line-clamp-2 font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover Click Label Badge */}
                  <div 
                    className={`
                      absolute -bottom-2.5 left-1/2 -translate-x-1/2 
                      bg-[#D9A441] text-white text-[8px] font-bold px-3 py-1 rounded-md uppercase tracking-widest
                      opacity-0 translate-y-1 scale-90 transition-all duration-300 pointer-events-none
                      ${isHovered ? "opacity-100 translate-y-0 scale-100" : ""}
                    `}
                  >
                    Klik Detail <ArrowRight className="inline ml-1" size={10} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
