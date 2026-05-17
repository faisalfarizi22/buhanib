"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "@/components/ui/tag";
import { BentoCard } from "@/components/ui/bento-card";
import { PixelIcon } from "@/components/pixel-icon";
import { X } from "lucide-react";

const WORKFLOW_STEPS = [
  {
    n: "01",
    title: "Diagnose",
    desc: "Memahami kondisi saat ini dan tantangan unik organisasi Anda.",
    detail: "Melalui pendekatan BinaInsights, kami melakukan penggalian mendalam terhadap karakter, dinamika tim, dan akar permasalahan organisasi. Kami memetakan kesiapan menghadapi perubahan dan mengidentifikasi blind spot kepemimpinan untuk memastikan intervensi yang tepat sasaran.",
    image: "/asset/Diagnose.png",
    delay: 0,
  },
  {
    n: "02",
    title: "Design",
    desc: "Merancang intervensi yang disesuaikan dengan kebutuhan spesifik tim.",
    detail: "BinaAcademy merancang kurikulum dan jalur pembelajaran yang sistematis. Kami tidak memberikan solusi generik; setiap program dirancang khusus untuk menjawab tantangan strategis bisnis Anda, menggabungkan metode pembelajaran modern dengan nilai kemanusiaan.",
    image: "/asset/Design.png",
    delay: 80,
  },
  {
    n: "03",
    title: "Develop",
    desc: "Membangun kapabilitas melalui pembelajaran transformatif.",
    detail: "Menggunakan BinaLab dan BinaCoach, kami memfasilitasi transformasi perilaku melalui pengalaman nyata dan coaching eksekutif. Fokus kami adalah membangun kapasitas internal yang berkelanjutan, memperkuat integritas, dan mengasah ketajaman kepemimpinan.",
    image: "/asset/Develop.png",
    delay: 140,
  },
  {
    n: "04",
    title: "Deliver",
    desc: "Memastikan hasil nyata dan dampak yang berkelanjutan.",
    detail: "Melalui BinaImpact dan BinaWorks, kami mengukur efektivitas transformasi dan mengakselerasi eksekusi strategi. Kami memastikan bahwa pembelajaran diubah menjadi tindakan nyata yang memberikan hasil bisnis berkelanjutan dan dampak positif bagi ekosistem organisasi.",
    image: "/asset/Deliver.png",
    delay: 200,
  },
];

interface WorkflowSectionProps {
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function WorkflowSection({ onMouseMove }: WorkflowSectionProps) {
  const [selectedStep, setSelectedStep] = useState<typeof WORKFLOW_STEPS[0] | null>(null);

  return (
    <section
      id="workflow"
      className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <PixelIcon type="workflow" size={40} />
          <div className="mt-4">
            <Tag>ALUR KERJA</Tag>
          </div>
          <h2 className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
            Transformasi dalam<br />empat langkah tepat.
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
          onMouseMove={onMouseMove}
        >
          {WORKFLOW_STEPS.map((step) => (
            <div 
              key={step.n} 
              onClick={() => setSelectedStep(step)}
              className="cursor-pointer group/card"
            >
              <BentoCard
                className="relative overflow-hidden flex flex-col min-h-[400px] h-full"
                delay={step.delay}
              >
                <div className="relative z-10 p-7">
                  <span className="text-[11px] text-black/20 tracking-widest block font-mono">
                    {step.n}
                  </span>
                </div>

                {/* Step Image */}
                <div className="relative z-10 px-7">
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/[0.03] border border-black/[0.05]">
                    <motion.img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-700 ease-out"
                    />
                  </div>
                </div>

                <div className="relative z-10 px-7 pb-7 mt-auto pt-8">
                  <h3 className="text-2xl font-light mb-2">{step.title}</h3>
                  <p className="text-sm text-black/45 leading-relaxed">{step.desc}</p>
                  <div className="mt-4 overflow-hidden h-0 group-hover/card:h-6 transition-all duration-500 opacity-0 group-hover/card:opacity-100">
                    <span className="text-[10px] font-medium tracking-widest text-[#D4AF37] uppercase flex items-center gap-2">
                      Klik untuk detail <span className="text-lg">→</span>
                    </span>
                  </div>
                </div>
              </BentoCard>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Expanded View */}
      <AnimatePresence>
        {selectedStep && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStep(null)}
              className="fixed inset-0 bg-white/80 backdrop-blur-md z-[200] cursor-zoom-out"
            />

            {/* Content Container */}
            <div className="fixed inset-0 flex items-center justify-center p-6 md:p-12 z-[201] pointer-events-none">
              <motion.div
                layoutId={`card-${selectedStep.n}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#F8F9FB] border border-black/[0.08] rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl pointer-events-auto flex flex-col md:flex-row shadow-black/5"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedStep(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/50 backdrop-blur border border-black/5 hover:bg-white transition-colors z-20"
                >
                  <X size={20} className="text-black/60" />
                </button>

                {/* Left Side: Image */}
                <div className="w-full md:w-1/2 aspect-video md:aspect-auto">
                  <img 
                    src={selectedStep.image} 
                    alt={selectedStep.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right Side: Text */}
                <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                  <span className="text-[11px] text-[#D4AF37] tracking-widest font-mono mb-4 block">
                    STEP {selectedStep.n}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
                    {selectedStep.title}
                  </h3>
                  <div className="w-12 h-[2px] bg-[#D4AF37] mb-8" />
                  <p className="text-lg text-black/60 leading-relaxed font-light">
                    {selectedStep.detail}
                  </p>
                  
                  <div className="mt-12 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full border border-black/10 flex items-center justify-center text-xs font-mono">
                      {selectedStep.n}
                    </div>
                    <div className="text-[10px] tracking-widest text-black/30 uppercase">
                      BinaHub Transformation Framework
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
