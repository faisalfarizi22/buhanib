"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CORE_VALUES } from "@/data/core-values";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const VALUE_TEXTURES = [
  "bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.28),transparent_18%),radial-gradient(ellipse_at_72%_30%,rgba(217,164,65,0.16),transparent_34%),repeating-linear-gradient(90deg,rgba(255,255,255,0.13)_0_1px,transparent_1px_22px),repeating-linear-gradient(0deg,rgba(255,255,255,0.1)_0_1px,transparent_1px_22px)]",
  "bg-[radial-gradient(circle_at_26%_30%,rgba(255,255,255,0.3),transparent_17%),radial-gradient(ellipse_at_76%_72%,rgba(217,164,65,0.12),transparent_36%),repeating-radial-gradient(circle_at_26%_30%,rgba(255,255,255,0.2)_0_1px,transparent_1px_13px)]",
  "bg-[radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.26),transparent_20%),radial-gradient(ellipse_at_22%_78%,rgba(217,164,65,0.12),transparent_38%),linear-gradient(135deg,transparent_0%,transparent_43%,rgba(255,255,255,0.22)_44%,transparent_45%),repeating-linear-gradient(145deg,rgba(255,255,255,0.14)_0_1px,transparent_1px_18px)]",
  "bg-[radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.24),transparent_18%),radial-gradient(ellipse_at_20%_22%,rgba(217,164,65,0.13),transparent_34%),repeating-linear-gradient(155deg,rgba(255,255,255,0.16)_0_1px,transparent_1px_15px)]",
  "bg-[radial-gradient(circle_at_76%_24%,rgba(255,255,255,0.26),transparent_18%),radial-gradient(ellipse_at_24%_76%,rgba(217,164,65,0.14),transparent_36%),repeating-linear-gradient(45deg,rgba(255,255,255,0.14)_0_1px,transparent_1px_16px),linear-gradient(120deg,transparent_0%,transparent_58%,rgba(255,255,255,0.16)_59%,transparent_60%)]",
];

const VALUE_TEXTURE_IMAGES = [
  "/asset/human-texture-humanity.png",
  "/asset/human-texture-integrity.png",
  "/asset/human-texture-impact.png",
  "/asset/human-texture-growth.png",
  "/asset/human-texture-excellence.png",
];

function ValueIcon({
  icon,
  size,
  className,
}: {
  icon: React.ReactElement;
  size: number;
  className?: string;
}) {
  if (!React.isValidElement<{ size?: number; className?: string }>(icon)) {
    return null;
  }

  return React.cloneElement(icon, { size, className });
}

function getIndonesianText(text: string) {
  return text.split("(")[0].trim();
}

export function CoreValuesSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % CORE_VALUES.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const value = CORE_VALUES[active];

  return (
    <section
      id="values"
      className="relative overflow-hidden border-t border-black/[0.04] bg-[radial-gradient(circle_at_top_left,rgba(11,44,107,0.035),transparent_32%),linear-gradient(to_bottom,#F5F7FA,#FFFFFF)] px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="pointer-events-none absolute right-[-12%] top-[18%] h-[420px] w-[420px] rounded-full bg-[#D9A441]/6 blur-3xl" />
      <div className="pointer-events-none absolute left-[-10%] bottom-[-18%] h-[420px] w-[420px] rounded-full bg-[#0B2C6B]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: premiumEase }}
          className="mb-14 grid gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-end"
        >
          <div>
            <div className="inline-flex items-center rounded-full bg-black/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-black/42">
              NILAI-NILAI UTAMA
            </div>
            <h2 className="mt-6 text-4xl sm:text-7xl md:text-7xl lg:text-[88px] font-light leading-none tracking-[-0.04em] text-[#0B2C6B]">
              H.U.M.A.N
            </h2>
          </div>

          <p className="max-w-xl text-base font-light leading-[1.85] text-black/62 md:text-lg">
            Lima prinsip yang menjaga transformasi tetap berakar pada martabat
            manusia, integritas, dampak, pertumbuhan, dan kualitas yang bermakna.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div
            className="grid gap-3"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {CORE_VALUES.map((item, index) => {
              const isActive = active === index;

              return (
                <motion.button
                  key={item.num}
                  type="button"
                  onClick={() => setActive(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  animate={isActive ? { x: 2, scale: 1.01 } : { x: 0, scale: 1 }}
                  whileHover={{ y: -2 }}
                  transition={{ delay: index * 0.07, duration: 0.65, ease: premiumEase }}
                  className={`group relative min-h-[84px] overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? "border-[#D9A441]/40 bg-white shadow-[0_18px_60px_-42px_rgba(11,44,107,0.42),0_0_32px_-24px_rgba(217,164,65,0.7)]"
                      : "border-black/[0.055] bg-white/54 hover:border-[#D9A441]/24 hover:bg-white/78"
                  }`}
                >
                  <motion.div
                    className="pointer-events-none absolute inset-0"
                    initial={false}
                    animate={{ opacity: isActive ? 0.42 : 0 }}
                    transition={{ duration: 0.7, ease: premiumEase }}
                  >
                    <Image
                      src={VALUE_TEXTURE_IMAGES[index]}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 34vw"
                      className="object-cover opacity-100 saturate-[0.85] contrast-110"
                    />
                  </motion.div>
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-white/50 via-white/20 to-transparent transition-opacity duration-700 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[#D9A441]"
                    animate={{ opacity: isActive ? [0.45, 0.72, 0.45] : 0 }}
                    transition={{ duration: 3.8, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                  />

                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-700 ${
                        isActive
                          ? "border-[#0B2C6B]/10 bg-[#0B2C6B] text-[#D9A441]"
                          : "border-black/7 bg-black/[0.025] text-[#0B2C6B]/45 group-hover:text-[#0B2C6B]"
                      }`}
                    >
                      <ValueIcon icon={item.icon} size={18} />
                    </div>

                    <div className="min-w-0">
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9A441]">
                        {item.num}
                      </span>
                      <h3
                        className={`text-base font-medium leading-snug transition-colors duration-700 md:text-lg ${
                          isActive ? "text-[#0B2C6B]" : "text-[#0B2C6B]/62"
                        }`}
                      >
                        <span className="text-[#D9A441]">{item.title[0]}</span>
                        {item.title.slice(1)}
                      </h3>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={value.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, ease: premiumEase }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative min-h-[470px] overflow-hidden rounded-2xl border border-[#0B2C6B]/10 bg-[#07182F] p-8 text-white shadow-[0_20px_60px_-30px_rgba(11,44,107,0.18)] md:p-12 lg:p-14"
          >
            <motion.div
              key={`texture-${active}`}
              className="pointer-events-none absolute inset-[-3%]"
              initial={{ opacity: 0, y: 6, scale: 1.01 }}
              animate={{
                opacity: [0.88, 0.98, 0.88],
                y: [6, -6, 6],
                scale: [1.01, 1.025, 1.01],
              }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={VALUE_TEXTURE_IMAGES[active]}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover brightness-110 contrast-105"
              />
            </motion.div>
            <motion.div
              className={`pointer-events-none absolute inset-[-3%] opacity-[0.06] mix-blend-overlay ${VALUE_TEXTURES[active]}`}
              animate={{ y: [4, -4, 4], scale: [1, 1.012, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-soft-light bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.65)_0_1px,transparent_1px_4px)]" />
            <motion.div
              className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full bg-[#D9A441]/7 blur-3xl"
              animate={{ opacity: [0.32, 0.54, 0.32], scale: [1, 1.06, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="pointer-events-none absolute right-[-12%] top-[18%] h-px w-[56%] rotate-[-18deg] bg-gradient-to-r from-transparent via-white/14 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(217,164,65,0.08),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.035),transparent_34%),linear-gradient(to_top,rgba(5,16,36,0.34),rgba(8,24,47,0.02))]" />

            <div className="relative z-10 flex h-full min-h-[374px] flex-col">
              <div className="flex items-start justify-between gap-6">
                <motion.div
                  whileHover={{ y: -2, rotate: -3 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-[#D9A441]"
                >
                  <ValueIcon icon={value.icon} size={22} />
                </motion.div>

                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/34">
                  {value.num}
                </span>
              </div>

              <div className="mt-auto max-w-2xl">
                <motion.h3
                  key={value.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: premiumEase }}
                  className="text-4xl font-light leading-[1.05] tracking-[-0.04em] text-white md:text-6xl"
                >
                  <span className="text-[#D9A441]">{value.title[0]}</span>
                  {value.title.slice(1)}
                </motion.h3>

                <motion.p
                  key={value.fullText}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.55, ease: premiumEase }}
                  className="mt-7 max-w-xl text-[17px] font-light leading-[1.8] text-white/82"
                >
                  {getIndonesianText(value.fullText)}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
