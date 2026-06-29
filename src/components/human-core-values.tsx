"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { localizePath } from "@/i18n/config";
import { useLocale } from "@/i18n/use-locale";

const HUMAN_VALUES = [
  { letter: "H", rest: "umanity", word: "Humanity", boldWord: <><strong>H</strong>umanity</> },
  { letter: "U", rest: "ncompromising Integrity", word: "Uncompromising Integrity", boldWord: <><strong>U</strong>ncompromising Integrity</> },
  { letter: "M", rest: "eaningful Impact", word: "Meaningful Impact", boldWord: <><strong>M</strong>eaningful Impact</> },
  { letter: "A", rest: "daptive Growth", word: "Adaptive Growth", boldWord: <><strong>A</strong>daptive Growth</> },
  { letter: "N", rest: "oble Excellence", word: "Noble Excellence", boldWord: <><strong>N</strong>oble Excellence</> },
];

export function HumanCoreValuesSection() {
  const locale = useLocale();
  const copy = locale === "en"
    ? {
        eyebrow: "Core Values",
        intro: "Five principles that keep transformation human, ethical, impactful, growth-oriented, and meaningful.",
        detail: "Value Details",
      }
    : {
        eyebrow: "Nilai Utama",
        intro: "Lima prinsip yang menjaga transformasi tetap manusiawi, berintegritas, berdampak, bertumbuh, dan bermakna.",
        detail: "Detail Nilai",
      };
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 48%"],
  });

  const introX = useTransform(scrollYProgress, [0, 0.62], ["0%", "-112%"]);
  const valuesX = useTransform(scrollYProgress, [0.22, 0.56], ["22%", "0%"]);
  const valuesOpacity = useTransform(scrollYProgress, [0.22, 0.32], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.82) {
      setStage(6);
      return;
    }

    if (latest < 0.24) {
      setStage(0);
      return;
    }

    const revealStage = Math.min(5, Math.max(1, Math.ceil((latest - 0.24) / 0.1)));
    setStage(revealStage);
  });

  const isFinal = stage >= 6;

  return (
    <section
      id="values"
      ref={sectionRef}
      className="relative z-10 h-[82vh] w-full bg-[#F5F7FA] md:h-[88vh] lg:h-[92vh]"
    >
      <div className="sticky top-[calc(50vh-150px)] flex min-h-[300px] items-center overflow-hidden bg-[#F5F7FA] px-4 py-6 md:top-[calc(50vh-150px)] md:min-h-[300px] md:px-0 md:py-0">
        <div
          className={`relative flex min-h-[240px] w-full items-center overflow-hidden rounded-[18px] border px-5 py-7 shadow-[0_18px_58px_-46px_rgba(11,44,107,0.34)] transition-colors duration-700 ${
            isFinal
              ? "border-[#D9A441]/22 bg-[#071A33] text-white"
              : "border-[#0B2C6B]/8 bg-white text-[#0B2C6B]"
          }`}
        >
          <Image
            src="/asset/human-texture-light-home.png"
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ${
              isFinal ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src="/asset/human-texture-dark-home.png"
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className={`object-cover brightness-[0.82] contrast-110 saturate-[0.92] transition-opacity duration-700 ${
              isFinal ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            isFinal ? "bg-[#071A33]/62 opacity-100" : "bg-white/50 opacity-100"
          }`} />

          <div className="relative z-10 mx-auto flex w-full max-w-[1720px] flex-col gap-7">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D9A441]">
                {copy.eyebrow}
              </p>
            </div>

            <div className="relative min-h-[128px] md:min-h-[152px]">
              <motion.div
                style={{ x: introX }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <p
                  className={`mx-auto max-w-2xl text-center text-lg font-light leading-relaxed transition-colors duration-700 md:text-2xl ${
                    isFinal ? "text-white/62" : "text-[#0B2C6B]/72"
                  }`}
                >
                  {copy.intro}
                </p>
              </motion.div>

              <motion.div
                style={{ x: valuesX, opacity: valuesOpacity }}
                className="absolute inset-0 flex items-center"
              >
                <div
                  className={`grid w-full items-start gap-3 sm:gap-5 ${
                    isFinal ? "grid-cols-5" : "grid-cols-2 sm:grid-cols-5"
                  } ${isFinal ? "md:pr-44 lg:pr-48 xl:pr-52" : ""}`}
                >
                  {HUMAN_VALUES.map((value, index) => {
                    const isVisible = stage > index;

                    return (
                      <motion.div
                        key={value.letter}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          y: isVisible ? 0 : 14,
                        }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className={`min-w-0 text-center transition-[min-height] duration-700 ${
                          isFinal ? "min-h-[116px] md:min-h-[132px]" : "min-h-[54px] sm:min-h-[76px]"
                        }`}
                      >
                        <span
                          className={`block leading-none transition-all duration-700 ${
                            isFinal
                              ? "scale-105 text-[clamp(2.7rem,14vw,5.1rem)] font-medium tracking-[0.015em] text-[#D9A441] sm:text-[clamp(4rem,9vw,6.4rem)] lg:text-[8rem]"
                              : "text-[clamp(1.05rem,4.4vw,1.8rem)] font-light text-[#0B2C6B] sm:text-[clamp(0.98rem,1.72vw,1.52rem)] lg:text-[1.74rem] xl:text-[1.92rem]"
                          }`}
                          style={{
                            textShadow: "none",
                          }}
                        >
                          {isFinal ? value.letter : value.boldWord}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ opacity: isFinal ? 1 : 0, x: isFinal ? 0 : 18 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-y-0 right-5 z-20 hidden items-center md:flex lg:right-12"
          >
            <Link
              href={localizePath("/about#nilai", locale)}
              className={`pointer-events-auto inline-flex h-11 shrink-0 items-center justify-center rounded-full px-5 text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-500 ${
                isFinal
                  ? "bg-[#D9A441] text-[#071A33] hover:bg-white"
                  : "bg-[#0B2C6B] text-white"
              }`}
            >
              {copy.detail}
            </Link>
          </motion.div>

          <motion.div
            animate={{ opacity: isFinal ? 1 : 0, y: isFinal ? 0 : 10 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-5 bottom-5 z-20 md:hidden"
          >
            <Link
              href={localizePath("/about#nilai", locale)}
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#D9A441] px-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#071A33]"
            >
              {copy.detail}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
