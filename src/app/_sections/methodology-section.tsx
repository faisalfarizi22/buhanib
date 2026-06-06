"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  type LucideIcon,
  PlayCircle,
  Search,
  Target,
} from "lucide-react";
import { useLocale } from "@/i18n/use-locale";

type ArchitectureTab = {
  title: string;
  code: string;
  detail: string;
  summary: string;
  color: string;
  imageSrc: string;
};

type OperatingStepItem = {
  title: string;
  icon: LucideIcon;
  description: string;
};

interface MethodologySectionProps {
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ARCHITECTURE_TABS = [
  {
    title: "Human Capability",
    code: "ICEO",
    detail: "Insight -> Capability -> Execution -> Outcomes",
    summary:
      "Membantu individu, tim, dan pemimpin membangun kemampuan yang dibutuhkan untuk menghasilkan perubahan yang nyata.",
    color: "#0B5EB7",
    imageSrc: "/asset/ICEO.png",
  },
  {
    title: "Transformation Ownership",
    code: "OWN",
    detail: "Ownership -> Way of Working -> Nurturing",
    summary:
      "Membangun sponsorship, governance, champion internal, dan budaya perbaikan berkelanjutan agar transformasi tidak bergantung pada konsultan.",
    color: "#0B2C6B",
    imageSrc: "/asset/OWN.png",
  },
  {
    title: "System Enablement",
    code: "4P",
    detail: "Purpose -> Process -> Platform -> Performance",
    summary:
      "Memastikan strategi, proses kerja, teknologi, AI, dan sistem kinerja mendukung perubahan yang diinginkan.",
    color: "#0B8F84",
    imageSrc: "/asset/4P.png",
  },
] satisfies ArchitectureTab[];

const SLIDE_DURATION_MS = 6200;

const OPERATING_STEPS = [
  {
    title: "Assess",
    icon: Search,
    description: "Memahami kondisi saat ini, tantangan, peluang, dan tingkat kesiapan transformasi.",
  },
  {
    title: "Align",
    icon: Target,
    description: "Menyelaraskan tujuan bisnis, sponsor perubahan, prioritas, dan indikator keberhasilan.",
  },
  {
    title: "Activate",
    icon: PlayCircle,
    description: "Mengembangkan kapabilitas, memperkuat sistem, dan menjalankan inisiatif perubahan.",
  },
  {
    title: "Accelerate",
    icon: BarChart3,
    description: "Mengukur dampak, memperkuat adopsi, dan memperluas keberhasilan ke skala yang lebih besar.",
  },
] satisfies OperatingStepItem[];

const COPY = {
  id: {
    tabs: ARCHITECTURE_TABS,
    steps: OPERATING_STEPS,
    title: "Why most transformations fail",
    desc: "Sebagian besar transformasi tidak gagal karena kurangnya pelatihan atau teknologi. Transformasi gagal ketika kemampuan manusia, sistem organisasi, dan kepemilikan perubahan berkembang secara terpisah dan tidak selaras.",
    architecture: "Transformation Architecture",
    integrated: "Integrated through",
    os: "BinaHub Transformation Operating System",
    show: "Tampilkan",
  },
  en: {
    tabs: [
      {
        title: "Human Capability",
        code: "ICEO",
        detail: "Insight -> Capability -> Execution -> Outcomes",
        summary: "Helps individuals, teams, and leaders build the capabilities needed to create real change.",
        color: "#0B5EB7",
        imageSrc: "/asset/ICEO.png",
      },
      {
        title: "Transformation Ownership",
        code: "OWN",
        detail: "Ownership -> Way of Working -> Nurturing",
        summary: "Builds sponsorship, governance, internal champions, and continuous improvement culture so transformation does not depend on consultants.",
        color: "#0B2C6B",
        imageSrc: "/asset/OWN.png",
      },
      {
        title: "System Enablement",
        code: "4P",
        detail: "Purpose -> Process -> Platform -> Performance",
        summary: "Ensures strategy, work processes, technology, AI, and performance systems support the desired change.",
        color: "#0B8F84",
        imageSrc: "/asset/4P.png",
      },
    ],
    steps: [
      {
        title: "Assess",
        icon: Search,
        description: "Understand the current condition, challenges, opportunities, and transformation readiness level.",
      },
      {
        title: "Align",
        icon: Target,
        description: "Align business goals, change sponsors, priorities, and success indicators.",
      },
      {
        title: "Activate",
        icon: PlayCircle,
        description: "Develop capabilities, strengthen systems, and execute change initiatives.",
      },
      {
        title: "Accelerate",
        icon: BarChart3,
        description: "Measure impact, strengthen adoption, and scale success more broadly.",
      },
    ],
    title: "Why most transformations fail",
    desc: "Most transformations do not fail because of a lack of training or technology. They fail when human capability, organizational systems, and change ownership develop separately and remain misaligned.",
    architecture: "Transformation Architecture",
    integrated: "Integrated through",
    os: "BinaHub Transformation Operating System",
    show: "Show",
  },
};

export function MethodologySection({ onMouseMove }: MethodologySectionProps) {
  const locale = useLocale();
  const copy = COPY[locale];
  const tabs = copy.tabs;
  const steps = copy.steps;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabs[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % tabs.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(interval);
  }, [tabs.length]);

  return (
    <section
      id="pendekatan"
      onMouseMove={onMouseMove}
      className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#091315] bg-cover bg-center bg-no-repeat py-16 text-white md:py-20 lg:py-24"
      style={{ backgroundImage: "url('/asset/transformation-texture-bg.png')" }}
    >
      <style>
        {`
          @keyframes methodology-progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>
      <div className="pointer-events-none absolute inset-0 bg-[#07101F]/42" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,31,0.78)_0%,rgba(7,16,31,0.46)_48%,rgba(7,16,31,0.18)_100%)]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end"/>

      <div className="relative z-10 w-full px-5 md:px-10 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-5xl">
              {copy.title}
            </h2>
            <p className="max-w-3xl text-sm font-light leading-relaxed text-white/66 md:text-base lg:justify-self-end">
              {copy.desc}
            </p>
          </div>

          <div className="mt-14 border-t border-white/70 pt-7">
            <div className="flex items-center gap-4">
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
              <p className="text-sm font-bold text-white md:text-base">{copy.architecture}</p>
            </div>
          </div>

          <div className="mt-16 grid gap-10 xl:grid-cols-[0.38fr_0.62fr] xl:items-center">
            <div className="xl:pr-6">
              <div className="max-w-2xl transition duration-500">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/42">
                  {activeTab.code}
                </p>
                <h3 className="mt-3 text-2xl font-light leading-tight tracking-[-0.03em] text-white md:text-3xl">
                  {activeTab.title}
                </h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-white/64 md:text-base">
                  {activeTab.summary}
                </p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/46">
                  {activeTab.detail}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-3 grid grid-cols-3 gap-2">
                {tabs.map((item, index) => (
                  <ProgressIndicator
                    key={item.code}
                    item={item}
                    isActive={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
              <div className="relative overflow-hidden bg-white shadow-[0_28px_100px_-58px_rgba(0,0,0,0.72)]">
                <div className="relative min-h-[420px] md:min-h-[600px] xl:min-h-[720px]">
                  {tabs.map((item, index) => (
                    <ArchitectureSlide
                      key={item.code}
                      item={item}
                      isActive={activeIndex === index}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {tabs.map((item, index) => (
                  <button
                    key={item.code}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`min-h-[86px] rounded-[8px] border px-4 py-3 text-left transition duration-300 ${
                    activeIndex === index
                      ? "border-white/55 bg-white/[0.22] text-white shadow-[0_18px_70px_-42px_rgba(255,255,255,0.72)] backdrop-blur-2xl"
                      : "border-white/14 bg-white/[0.075] text-white/58 backdrop-blur-xl hover:border-white/35 hover:bg-white/[0.13] hover:text-white"
                  }`}
                >
                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
                        activeIndex === index ? "text-[#D9A441]" : "text-white/46"
                      }`}
                    >
                      {item.code}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-tight">{item.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div id="pendekatan-operating-system" className="mt-16 border-t border-white/16 pt-7">
            <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D9A441]">
                  {copy.integrated}
                </p>
                <h3 className="mt-3 max-w-xl text-3xl font-light leading-tight tracking-[-0.04em] md:text-4xl">
                  {copy.os}
                </h3>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {steps.map((step, index) => (
                  <OperatingStep key={step.title} step={step} index={index} />
                ))}
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}

function ArchitectureSlide({
  item,
  isActive,
}: {
  item: ArchitectureTab;
  isActive: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        isActive ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <Image
        src={item.imageSrc}
        alt={`BinaHub Transformation Architecture - ${item.title}`}
        fill
        sizes="(min-width: 1280px) 720px, 100vw"
        className="object-contain"
        priority={isActive}
      />
    </div>
  );
}

function ProgressIndicator({
  item,
  isActive,
  onClick,
}: {
  item: ArchitectureTab;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Tampilkan ${item.title}`}
      onClick={onClick}
      className="relative h-1 overflow-hidden rounded-full bg-white/24 transition hover:bg-white/40"
    >
      {isActive && (
        <span
          key={item.code}
          className="absolute inset-y-0 left-0 rounded-full bg-white"
          style={{ animation: `methodology-progress ${SLIDE_DURATION_MS}ms linear forwards` }}
        />
      )}
    </button>
  );
}

function OperatingStep({
  step,
  index,
}: {
  step: OperatingStepItem;
  index: number;
}) {
  const Icon = step.icon;

  return (
    <div className="group flex min-h-[150px] gap-4 rounded-[12px] border border-white/14 bg-white/[0.075] p-4 shadow-[0_18px_70px_-54px_rgba(0,0,0,0.85)] backdrop-blur-xl transition hover:border-white/34 hover:bg-white/[0.13]">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border border-white/18 bg-white/[0.16] text-white backdrop-blur-xl transition group-hover:border-[#D9A441]/60 group-hover:bg-[#D9A441]/22">
        <Icon size={18} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/36">
            0{index + 1}
          </span>
          {index < OPERATING_STEPS.length - 1 && <ArrowRight size={13} className="text-[#D9A441]" />}
        </div>
        <p className="mt-1 text-base font-semibold text-white">{step.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-white/54">{step.description}</p>
      </div>
    </div>
  );
}
