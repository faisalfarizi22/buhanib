"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PAIN_POINTS = [
  {
    title: "Program berjalan, tetapi dampaknya belum terbaca.",
    desc: "Training, workshop, dan engagement sering dilakukan. Tantangannya adalah membuktikan apa yang benar-benar berubah setelah program selesai.",
    image: "/asset/pain1.png",
  },
  {
    title: "Tim bergerak cepat, tetapi akar masalah tetap samar.",
    desc: "Target melambat, komunikasi tersendat, atau engagement menurun sering hanya gejala. Organisasi membutuhkan cara membaca penyebabnya dengan lebih jernih.",
    image: "/asset/pain2.png",
  },
  {
    title: "AI mempercepat sistem. Manusia menentukan arah.",
    desc: "Tools bisa mempercepat pekerjaan, tetapi kesiapan belajar, kepemimpinan, adaptasi, dan makna kerja tetap menentukan kualitas transformasi.",
    image: "/asset/pain3.png",
  },
  {
    title: "BinaHub membaca sinyal, merancang jalan, dan mengukur dampak.",
    desc: "Kami menghubungkan assessment, learning ecosystem, coaching, simulasi, dan impact measurement dalam satu alur transformasi yang lebih terukur.",
    image: "/asset/pain4.png",
    imagePosition: "object-[center_22%] max-[1023px]:object-[62%_24%] max-[767px]:object-[68%_24%]",
  },
];

export function PainPointSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % PAIN_POINTS.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F5F7FA] px-3 pt-[92px] pb-3 sm:px-4 md:pt-[106px] md:pb-4 xl:pt-[108px]">
      <div
        className="relative min-h-[calc(100svh-104px)] overflow-hidden rounded-[20px] bg-[#081A38] text-white sm:min-h-[680px] md:min-h-[700px] md:rounded-[28px] lg:min-h-[clamp(540px,calc(100svh-116px),720px)] xl:min-h-[clamp(560px,calc(100svh-120px),780px)] min-[1440px]:min-h-[clamp(560px,calc(100svh-126px),820px)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(217,164,65,0.18),transparent_28%),radial-gradient(circle_at_18%_70%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(120deg,#06152F_0%,#0B2C6B_52%,#07101F_100%)]" />
        {PAIN_POINTS.map((item, index) => (
          item.image ? (
            <motion.img
              key={item.image}
              src={item.image}
              alt=""
              animate={{ opacity: active === index ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`absolute inset-0 h-full w-full object-cover max-[1023px]:object-[66%_center] max-[767px]:object-[68%_center] ${item.imagePosition || "object-center"}`}
            />
          ) : null
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,21,47,0.88)_0%,rgba(6,21,47,0.68)_34%,rgba(6,21,47,0.24)_58%,rgba(6,21,47,0)_82%)] max-[1023px]:bg-[linear-gradient(90deg,rgba(6,21,47,0.90)_0%,rgba(6,21,47,0.74)_44%,rgba(6,21,47,0.30)_72%,rgba(6,21,47,0)_100%)] max-[767px]:bg-[linear-gradient(180deg,rgba(6,21,47,0.92)_0%,rgba(6,21,47,0.74)_46%,rgba(6,21,47,0.28)_78%,rgba(6,21,47,0.08)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[68%] opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(90deg,black_0%,black_58%,transparent_100%)] max-[1023px]:w-[74%] max-[767px]:inset-x-0 max-[767px]:top-0 max-[767px]:h-[62%] max-[767px]:w-full max-[767px]:[background-size:64px_64px] max-[767px]:[mask-image:linear-gradient(180deg,black_0%,black_56%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/34 to-transparent max-[767px]:h-1/3" />

        <div className="relative z-10 flex min-h-[inherit] flex-col justify-between px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-14 xl:px-16 min-[1440px]:px-20 min-[1440px]:py-16">
          <div className="flex items-center justify-end gap-8">
            <div className="flex items-center gap-2.5 md:gap-3">
              {PAIN_POINTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 max-[767px]:h-1 ${
                    active === index ? "w-10 bg-[#D9A441] md:w-12" : "w-4 bg-white/20 hover:bg-white/36 md:w-5"
                  }`}
                  aria-label={`Lihat pain point ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="overflow-hidden py-8 sm:py-10 md:py-12 max-[767px]:pb-20">
            <motion.div
              animate={{ x: `-${active * 100}%` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex"
            >
              {PAIN_POINTS.map((item) => (
                <article key={item.title} className="w-full shrink-0 pr-4 sm:pr-10 md:pr-16">
                  <h2 className="max-w-[980px] text-[clamp(2.15rem,10.5vw,4.25rem)] font-light leading-[1.03] tracking-[-0.055em] sm:max-w-[760px] md:text-[clamp(3.55rem,7vw,5rem)] lg:max-w-[880px] lg:text-[clamp(4.1rem,6.4vw,5.35rem)] xl:max-w-[960px] min-[1440px]:max-w-5xl min-[1440px]:text-[86px]">
                    {item.title}
                  </h2>
                  <p className="mt-6 max-w-[560px] text-sm font-light leading-[1.75] text-white/66 sm:text-base md:mt-8 md:max-w-2xl md:text-lg xl:text-xl">
                    {item.desc}
                  </p>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col gap-5 border-t border-white/10 pt-6 sm:pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-xs leading-relaxed text-white/48 sm:text-sm">
              BinaHub dimulai dari pertanyaan yang tepat, bukan dari paket program yang dipaksakan.
            </p>
            <a
              href="#home-hero"
              className="group relative inline-flex h-[52px] w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/[0.08] px-6 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_52px_-32px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-[#D9A441]/45 hover:bg-[#D9A441] hover:text-[#0B2C6B] hover:shadow-[0_24px_70px_-38px_rgba(217,164,65,0.75)] sm:h-14 sm:w-auto sm:px-8 sm:text-[11px] sm:tracking-[0.18em]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">Lihat Jawaban BinaHub</span>
              <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#D9A441] text-[#0B2C6B] transition-all duration-500 group-hover:bg-[#0B2C6B] group-hover:text-[#D9A441]">
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
