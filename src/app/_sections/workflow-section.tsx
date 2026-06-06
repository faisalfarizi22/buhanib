"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "@/components/ui/tag";
import { PixelIcon } from "@/components/pixel-icon";
import { useLocale } from "@/i18n/use-locale";

const COPY = {
  id: {
    tag: "ALUR KERJA",
    title: "Transformasi sebagai perjalanan, bukan rangkaian sesi.",
    desc: "Empat langkah ini menjaga proses tetap sederhana bagi peserta, tetapi cukup dalam untuk menghasilkan perubahan perilaku dan dampak yang dapat dibuktikan.",
    steps: [
      {
        n: "diagnose",
        title: "Diagnose",
        desc: "Memahami kondisi saat ini dan tantangan unik organisasi Anda.",
        detail: "Melalui BinaInsights, kami menggali karakter, dinamika tim, dan akar permasalahan organisasi. Tahap ini membantu menemukan blind spot kepemimpinan sebelum intervensi dirancang.",
        image: "/asset/Diagnose.png",
      },
      {
        n: "design",
        title: "Design",
        desc: "Merancang intervensi yang disesuaikan dengan kebutuhan spesifik tim.",
        detail: "BinaAcademy merancang kurikulum dan jalur pembelajaran yang menjawab kebutuhan bisnis. Setiap program disusun sebagai sistem, bukan kelas lepas yang cepat dilupakan.",
        image: "/asset/Design.png",
      },
      {
        n: "develop",
        title: "Develop",
        desc: "Membangun kapabilitas melalui pembelajaran transformatif.",
        detail: "BinaLab dan BinaCoach membangun perubahan perilaku melalui pengalaman, refleksi, dan coaching. Fokusnya adalah kapasitas internal yang bertahan setelah program selesai.",
        image: "/asset/Develop.png",
      },
      {
        n: "deliver",
        title: "Deliver",
        desc: "Memastikan hasil nyata dan dampak yang berkelanjutan.",
        detail: "BinaImpact dan BinaWorks memastikan pembelajaran berubah menjadi tindakan, strategi menjadi eksekusi, dan transformasi menghasilkan bukti yang dapat dilihat.",
        image: "/asset/Deliver.png",
      },
    ],
  },
  en: {
    tag: "WORKFLOW",
    title: "Transformation as a journey, not a series of sessions.",
    desc: "These four steps keep the process simple for participants while remaining deep enough to create behavior change and measurable impact.",
    steps: [
      {
        n: "diagnose",
        title: "Diagnose",
        desc: "Understand your current condition and your organization's unique challenges.",
        detail: "Through BinaInsights, we uncover character patterns, team dynamics, and organizational root causes. This stage helps reveal leadership blind spots before interventions are designed.",
        image: "/asset/Diagnose.png",
      },
      {
        n: "design",
        title: "Design",
        desc: "Design interventions tailored to the specific needs of your team.",
        detail: "BinaAcademy designs curriculum and learning paths that answer business needs. Every program is built as a system, not a one-off class that is quickly forgotten.",
        image: "/asset/Design.png",
      },
      {
        n: "develop",
        title: "Develop",
        desc: "Build capability through transformative learning.",
        detail: "BinaLab and BinaCoach build behavior change through experience, reflection, and coaching. The focus is internal capacity that lasts after the program ends.",
        image: "/asset/Develop.png",
      },
      {
        n: "deliver",
        title: "Deliver",
        desc: "Ensure real outcomes and sustainable impact.",
        detail: "BinaImpact and BinaWorks ensure learning turns into action, strategy becomes execution, and transformation produces visible proof.",
        image: "/asset/Deliver.png",
      },
    ],
  },
};

interface WorkflowSectionProps {
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function WorkflowSection({ onMouseMove }: WorkflowSectionProps) {
  const locale = useLocale();
  const copy = COPY[locale];
  const steps = copy.steps;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];

  return (
    <section
      id="alur-kerja"
      className="relative overflow-hidden border-t border-black/[0.06] px-6 py-20 md:px-12 md:py-32 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-20 h-[320px] w-[600px] bg-[#0B2C6B]/[0.035] blur-[130px]" />
        <div className="absolute right-0 bottom-10 h-[280px] w-[560px] bg-[#D9A441]/[0.055] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.9fr_0.7fr] md:items-end">
          <div>
            <PixelIcon type="workflow" size={40} />
            <div className="mt-4">
              <Tag>{copy.tag}</Tag>
            </div>
            <h2 className="mt-5 text-4xl font-light leading-[1.05] tracking-tight text-[#0B2C6B] md:text-5xl">
              {copy.title}
            </h2>
          </div>
          <p className="text-sm font-light leading-relaxed text-black/58 md:text-base">
            {copy.desc}
          </p>
        </div>

        <div
          className="rounded-[14px] border border-black/[0.07] bg-white p-4 shadow-[0_20px_64px_-56px_rgba(11,44,107,0.42)] md:p-6"
          onMouseMove={onMouseMove}
        >
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[260px] overflow-hidden rounded-[12px] bg-[#071B3D] sm:min-h-[340px] md:min-h-[460px] xl:min-h-[520px] 2xl:min-h-[580px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep.n}
                  src={activeStep.image}
                  alt={activeStep.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover saturate-[0.86] brightness-[0.92]"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#061A3B]/72 via-[#061A3B]/18 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="block h-px w-12 bg-[#D9A441]/70" />
                <h3 className="mt-3 text-4xl font-light tracking-tight text-white md:text-5xl">
                  {activeStep.title}
                </h3>
              </div>
            </div>

            <div className="flex flex-col justify-between p-2 md:p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.n}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="pb-8"
                >
                  <p className="text-xl font-light leading-relaxed text-[#0B2C6B]/86 md:text-2xl">
                    {activeStep.desc}
                  </p>
                  <p className="mt-6 text-base font-light leading-[1.85] text-black/58">
                    {activeStep.detail}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="relative">
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
                  {steps.map((step, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={step.n}
                        onClick={() => setActiveIndex(index)}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`group relative rounded-[12px] border p-4 text-left transition-all duration-500 ${
                          isActive
                            ? "border-[#D9A441]/45 bg-[#FFF8EA] shadow-[0_18px_54px_-44px_rgba(217,164,65,0.8)]"
                            : "border-black/[0.06] bg-[#F5F7FA] hover:border-[#0B2C6B]/16 hover:bg-white"
                        }`}
                      >
                        <span
                          className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                            isActive ? "bg-[#0B2C6B] text-[#D9A441]" : "bg-white text-[#0B2C6B]/46"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <h4 className={`mt-5 text-sm font-semibold ${isActive ? "text-[#0B2C6B]" : "text-black/62"}`}>
                          {step.title}
                        </h4>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
