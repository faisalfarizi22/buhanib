"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { localizePath } from "@/i18n/config";
import { useLocale } from "@/i18n/use-locale";

const COPY = {
  id: {
    signals: [
      {
        title: "Target naik. Kepastian turun.",
        desc: "Tekanan biaya, daya beli, dan volatilitas pasar membuat keputusan bisnis makin hati-hati, sementara target tetap harus bergerak.",
        image: "/asset/slide-5.png",
      },
      {
        title: "Energi kerja menipis.",
        desc: "Burnout, biaya hidup, karier awal yang makin sulit, dan tuntutan belajar baru mengubah cara orang hadir di pekerjaannya.",
        image: "/asset/slide-6.png",
      },
      {
        title: "AI cepat. Kapabilitas tertinggal.",
        desc: "Banyak inisiatif AI sudah dimulai, tetapi belum semuanya mengubah proses, keputusan, dan cara kerja sehari-hari.",
        image: "/asset/slide-7.png",
      },
      {
        title: "Workshop selesai. Perubahan belum tentu terjadi.",
        desc: "BinaHub membantu membaca sinyal, merancang intervensi, dan mengukur dampak agar pembelajaran benar-benar masuk ke perilaku kerja.",
        image: "/asset/slide-8.png",
        imagePosition: "object-[center_22%] max-[1023px]:object-[62%_24%] max-[767px]:object-[68%_24%]",
      },
    ],
    summary: "Membaca tekanan bisnis, perubahan energi kerja, dan gap transformasi sebelum menentukan langkah yang benar-benar berdampak.",
    cta: "Lihat Sinyal Perubahan",
    indicator: "Lihat transformation signal",
  },
  en: {
    signals: [
      {
        title: "Targets rise. Certainty drops.",
        desc: "Cost pressure, purchasing power shifts, and market volatility make business decisions more cautious while targets keep moving.",
        image: "/asset/slide-5.png",
      },
      {
        title: "Work energy is thinning.",
        desc: "Burnout, living costs, harder early careers, and new learning demands are changing how people show up at work.",
        image: "/asset/slide-6.png",
      },
      {
        title: "AI moves fast. Capability lags.",
        desc: "Many AI initiatives have started, but not all have changed processes, decisions, and daily ways of working.",
        image: "/asset/slide-7.png",
      },
      {
        title: "The workshop ends. Change may not.",
        desc: "BinaHub helps read signals, design interventions, and measure impact so learning truly turns into workplace behavior.",
        image: "/asset/slide-8.png",
        imagePosition: "object-[center_22%] max-[1023px]:object-[62%_24%] max-[767px]:object-[68%_24%]",
      },
    ],
    summary: "Reading business pressure, shifting work energy, and transformation gaps before choosing moves that truly matter.",
    cta: "View Transformation Signals",
    indicator: "View transformation signal",
  },
};

export function PainPointSection() {
  const locale = useLocale();
  const copy = COPY[locale];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % copy.signals.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [copy.signals.length]);

  return (
    <section id="pain-point" className="relative w-full overflow-hidden bg-[#F5F7FA] px-4 py-6 md:px-0 md:py-0">
      <div className="relative min-h-[620px] overflow-hidden rounded-[18px] bg-[#081A38] text-white shadow-[0_24px_78px_-58px_rgba(11,44,107,0.42)] max-[499px]:min-h-[434px] md:min-h-screen md:rounded-none md:shadow-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(217,164,65,0.18),transparent_28%),radial-gradient(circle_at_18%_70%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(120deg,#06152F_0%,#0B2C6B_52%,#07101F_100%)]" />
        {copy.signals.map((item, index) => (
          <motion.img
            key={item.image}
            src={item.image}
            alt=""
            animate={{ opacity: active === index ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`absolute inset-0 h-full w-full object-cover saturate-[1.08] contrast-[1.08] max-[1023px]:object-[66%_center] max-[767px]:object-[70%_top] ${item.imagePosition || "object-center"}`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,247,250,0.64)_0%,rgba(245,247,250,0.38)_30%,rgba(245,247,250,0.09)_62%,rgba(245,247,250,0)_100%)] max-[767px]:bg-[linear-gradient(180deg,rgba(245,247,250,0.28)_0%,rgba(245,247,250,0.18)_34%,rgba(245,247,250,0.34)_62%,rgba(245,247,250,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_42%,rgba(6,21,47,0.10),transparent_28%),linear-gradient(90deg,rgba(6,21,47,0.10)_0%,rgba(6,21,47,0.04)_42%,rgba(6,21,47,0.00)_78%)]" />
        <div className="absolute inset-y-0 left-0 w-[68%] opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(90deg,black_0%,black_58%,transparent_100%)] max-[1023px]:w-[74%] max-[767px]:inset-x-0 max-[767px]:top-0 max-[767px]:h-[62%] max-[767px]:w-full max-[767px]:[background-size:64px_64px] max-[767px]:[mask-image:linear-gradient(180deg,black_0%,black_56%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#F5F7FA]/72 via-[#F5F7FA]/24 to-transparent max-[767px]:h-[58%]" />

        <div className="relative z-10 flex min-h-[620px] flex-col justify-between px-5 pb-6 pt-8 max-[499px]:min-h-[434px] max-[499px]:justify-end max-[499px]:pb-4 max-[499px]:pt-4 sm:px-8 sm:pb-8 md:min-h-screen md:px-12 md:pb-12 md:pt-[132px] lg:px-14 xl:px-16 min-[1440px]:px-20 min-[1440px]:pb-16 min-[1440px]:pt-[144px]">
          <div className="flex items-center justify-end gap-8 max-[499px]:absolute max-[499px]:right-5 max-[499px]:top-5">
            <div className="flex items-center gap-2.5 md:gap-3">
              {copy.signals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 max-[767px]:h-1 ${
                    active === index ? "w-10 bg-[#D9A441] md:w-12" : "w-4 bg-[#0B2C6B]/20 hover:bg-[#0B2C6B]/36 md:w-5"
                  }`}
                  aria-label={`${copy.indicator} ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="overflow-hidden py-8 sm:py-10 md:py-12 max-[499px]:py-0 max-[767px]:pb-12">
            <motion.div
              animate={{ x: `-${active * 100}%` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex"
            >
              {copy.signals.map((item) => (
                <article key={item.title} className="w-full shrink-0 pr-4 sm:pr-10 md:pr-16">
                  <h2 className="max-w-[860px] text-[clamp(2.35rem,12vw,4rem)] font-light leading-[0.98] tracking-[-0.05em] text-[#050913] drop-shadow-[0_14px_42px_rgba(245,247,250,0.52)] max-[499px]:max-w-[330px] max-[499px]:text-[clamp(2rem,10vw,2.85rem)] sm:max-w-[700px] md:text-[clamp(2.65rem,5.2vw,3.8rem)] lg:max-w-[780px] lg:text-[clamp(3.05rem,4.85vw,4.12rem)] xl:max-w-[860px] min-[1440px]:max-w-[920px] min-[1440px]:text-[63px]">
                    {item.title}
                  </h2>
                  <p className="mt-5 max-w-[560px] text-sm font-light leading-[1.72] text-[#050913]/72 max-[499px]:mt-3 max-[499px]:max-w-[310px] max-[499px]:text-xs max-[499px]:leading-[1.55] sm:text-base md:mt-7 md:max-w-2xl md:text-lg xl:text-xl">
                    {item.desc}
                  </p>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col gap-5 border-t border-[#0B2C6B]/12 pt-6 max-[499px]:mt-4 max-[499px]:gap-3 max-[499px]:pt-4 sm:pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-xs leading-relaxed text-[#050913]/54 max-[499px]:hidden sm:text-sm">
              {copy.summary}
            </p>
            <Link
              href={localizePath("/perspektif/transformation-signals-2026", locale)}
              className="group relative inline-flex h-[52px] w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-[#0B2C6B]/18 bg-white/50 px-6 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B2C6B] shadow-[0_16px_46px_-34px_rgba(11,44,107,0.42)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#D9A441]/45 hover:bg-[#D9A441] hover:text-[#0B2C6B] hover:shadow-[0_20px_58px_-42px_rgba(217,164,65,0.64)] max-[499px]:h-11 max-[499px]:max-w-[250px] max-[499px]:justify-between max-[499px]:px-4 max-[499px]:text-[8.5px] sm:h-14 sm:w-auto sm:px-8 sm:text-[11px] sm:tracking-[0.18em]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">{copy.cta}</span>
              <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#D9A441] text-[#0B2C6B] transition-all duration-500 group-hover:bg-[#0B2C6B] group-hover:text-[#D9A441]">
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
