"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { localizePath } from "@/i18n/config";
import { useLocale } from "@/i18n/use-locale";

const COPY = {
  id: {
    title: "Membantu Organisasi Bertumbuh",
    desc: "BinaHub membantu perusahaan membangun pemimpin yang efektif, tim yang unggul, dan budaya kerja yang adaptif melalui pendekatan terintegrasi yang didukung AI.",
    journey: "Perjalanan Anda Dimulai dari sini",
    cta: "Mulai Diagnosa",
    secondaryCta: "Lihat Perspektif",
  },
  en: {
    title: "Helping Organizations Grow",
    desc: "BinaHub helps companies build effective leaders, high-performing teams, and adaptive work cultures through an integrated, AI-supported approach.",
    journey: "Your journey starts here",
    cta: "Start Diagnostic",
    secondaryCta: "View Perspective",
  },
};

interface HeroSectionProps {
  heroReady: boolean;
}

const ORBIT_ICONS = [
  { src: "/icon/iconinsight.png", label: "BinaInsight", angle: 0 },
  { src: "/icon/iconacademy.png", label: "BinaAcademy", angle: 45 },
  { src: "/icon/iconcoach.png", label: "BinaCoach", angle: 90 },
  { src: "/icon/iconlab.png", label: "BinaLab", angle: 135 },
  { src: "/icon/iconplay.png", label: "BinaPlay", angle: 180 },
  { src: "/icon/iconimpact.png", label: "BinaImpact", angle: 225 },
  { src: "/icon/iconjourney.png", label: "BinaJourney", angle: 270 },
  { src: "/icon/iconworks.png", label: "BinaWorks", angle: 315 },
] as const;

function AnimatedHeading({ text, ready }: { text: string; ready: boolean }) {
  const words = text.split(" ");
  const accentWord = words.at(-1) ?? "";
  const firstLine = words.slice(0, -1).join(" ");
  const lines = [firstLine, accentWord];

  const charDelay = 30;
  let charOffset = 0;

  return (
    <h1 className="max-w-[780px] text-center text-[clamp(1.85rem,8.6vw,2.45rem)] font-normal leading-[1.04] tracking-[-0.025em] text-[#071A33] md:text-left md:text-[clamp(3.25rem,4.75vw,4.85rem)] md:tracking-[-0.035em]">
      {lines.map((line, lineIndex) => {
        const currentOffset = charOffset;
        charOffset += line.length;

        return (
          <span
            key={lineIndex}
            className={lineIndex === 1 ? "mt-1 block whitespace-nowrap font-light italic text-[#D9A441] md:mt-2" : "block whitespace-nowrap"}
          >
            {line.split(" ").map((word, wordIndex) => (
              <span
                key={`${lineIndex}-${wordIndex}`}
                className="mr-[0.22em] inline-block whitespace-nowrap last:mr-0"
              >
                {word.split("").map((char, charIndex) => (
                  <span
                    key={`${lineIndex}-${wordIndex}-${charIndex}`}
                    className="inline-block transition-[opacity,transform] duration-500 ease-out"
                    style={{
                      opacity: ready ? 1 : 0,
                      transform: ready ? "translateX(0)" : "translateX(-18px)",
                      transitionDelay: `${200 + (currentOffset + wordIndex + charIndex) * charDelay}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </span>
        );
      })}
    </h1>
  );
}

function HeroContourLines() {
  const paths = Array.from({ length: 18 }, (_, index) => {
    const y = 710 + index * 14;
    const x = -20 + index * 4;
    return `M${x} ${y} C120 ${y - 86} 216 ${y - 96} 328 ${y - 26} C430 ${y + 36} 548 ${y + 30} 670 ${y - 18}`;
  });

  return (
    <svg
      className="hero-contour-lines absolute bottom-0 left-0 h-[34%] w-[52%] opacity-70 md:h-[42%] md:w-[44%]"
      viewBox="0 0 720 900"
      preserveAspectRatio="xMinYMax meet"
    >
      {paths.map((path, index) => (
        <path
          key={path}
          className="hero-contour-line"
          d={path}
          fill="none"
          stroke="#D9A441"
          strokeDasharray="1 9"
          strokeLinecap="round"
          strokeOpacity={0.18 + index * 0.018}
          strokeWidth="1.35"
        />
      ))}
    </svg>
  );
}

const LITE_FLOW_PATHS = Array.from({ length: 20 }, (_, index) => {
  const y = 575 + index * 18;
  const wave = index % 2 === 0 ? 1 : -1;
  const startX = -240 + (index % 5) * 22;
  const midX = 570 + index * 9;
  const endX = 1620 - (index % 4) * 16;

  return `M${startX} ${y} C125 ${y - 26 + wave * 8} 330 ${y - 10 + wave * 6} ${midX} ${y + 26} C825 ${y + 70} 1065 ${y + 108 - wave * 5} ${endX} ${y + 154}`;
});

function HeroLiteLines() {
  return (
    <svg
      className="hero-lite-lines absolute inset-0 h-full w-full mix-blend-multiply"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="heroLiteLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F8E6B2" stopOpacity="0.24" />
          <stop offset="42%" stopColor="#D9A441" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#8A560A" stopOpacity="0.82" />
        </linearGradient>
      </defs>
      <g className="hero-lite-line-drift">
        {LITE_FLOW_PATHS.map((path, index) => (
          <path
            key={path}
            className={`hero-lite-line hero-lite-line-${(index % 5) + 1}`}
            d={path}
            fill="none"
            pathLength="1"
            stroke="url(#heroLiteLine)"
            strokeLinecap="round"
            strokeOpacity={0.36 + index * 0.012}
            strokeWidth={0.85 + index * 0.035}
          />
        ))}
      </g>
    </svg>
  );
}

function HeroImageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-white" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_48%,rgba(217,164,65,0.08),transparent_28%),linear-gradient(180deg,#FFFFFF_0%,#FFFFFF_58%,#FAFBFC_100%)]" />
      <HeroContourLines />
      <HeroLiteLines />
    </div>
  );
}

function HeroOrbitVisual() {
  function handleLogoMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    event.currentTarget.style.setProperty("--logo-tilt-x", `${(-y * 28).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--logo-tilt-y", `${(x * 32).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--logo-lift-x", `${(x * 18).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--logo-lift-y", `${(y * 18).toFixed(2)}px`);
  }

  function handleLogoLeave(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--logo-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--logo-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--logo-lift-x", "0px");
    event.currentTarget.style.setProperty("--logo-lift-y", "0px");
  }

  return (
    <div className="hero-orbit-stage relative mx-auto aspect-square w-full max-w-[410px] sm:max-w-[470px] md:max-w-[620px] lg:max-w-[720px] xl:max-w-[780px]">
      <svg className="hero-orbit-rings absolute inset-0 h-full w-full" viewBox="0 0 640 640" aria-hidden="true">
        <defs>
          <linearGradient id="heroOrbitGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8E6B2" stopOpacity="0.08" />
            <stop offset="42%" stopColor="#D9A441" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#8A560A" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <g className="hero-orbit-ring-spin">
          <circle cx="320" cy="320" r="254" fill="none" stroke="url(#heroOrbitGold)" strokeDasharray="160 80 28 48" strokeWidth="1.2" />
          <circle cx="320" cy="320" r="224" fill="none" stroke="url(#heroOrbitGold)" strokeDasharray="18 12" strokeOpacity="0.55" strokeWidth="1" />
        </g>
        <g className="hero-orbit-ring-spin hero-orbit-ring-spin-reverse">
          <circle cx="320" cy="320" r="278" fill="none" stroke="url(#heroOrbitGold)" strokeDasharray="220 72 12 34" strokeOpacity="0.6" strokeWidth="0.85" />
          <circle cx="320" cy="320" r="196" fill="none" stroke="url(#heroOrbitGold)" strokeDasharray="80 52" strokeOpacity="0.42" strokeWidth="0.8" />
        </g>
        {[0, 60, 126, 188, 244, 306].map((angle) => {
          const radians = (angle * Math.PI) / 180;
          const x = 320 + Math.cos(radians) * 254;
          const y = 320 + Math.sin(radians) * 254;
          return <circle key={angle} cx={x} cy={y} r="5" fill="#F7D982" opacity="0.8" />;
        })}
      </svg>

      <div className="hero-orbit-icons absolute inset-0">
        {ORBIT_ICONS.map((icon, index) => (
          <div
            key={icon.label}
            className="hero-orbit-icon-slot absolute left-1/2 top-1/2"
            style={{
              ["--orbit-angle" as string]: `${icon.angle}deg`,
              ["--orbit-delay" as string]: `${index * -1.4}s`,
            }}
          >
            <div className="hero-orbit-icon-counter">
              <div className="group/icon flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/88 shadow-[0_18px_42px_-28px_rgba(11,44,107,0.4)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#D9A441]/60 hover:bg-white hover:shadow-[0_0_34px_rgba(217,164,65,0.5)] md:h-15 md:w-15 lg:h-[76px] lg:w-[76px]">
                <Image
                  src={icon.src}
                  alt=""
                  width={36}
                  height={36}
                  className="h-6 w-6 object-contain opacity-90 transition duration-300 group-hover/icon:scale-110 group-hover/icon:opacity-100 md:h-7 md:w-7 lg:h-9 lg:w-9"
                  loading="eager"
                />
                <span className="sr-only">{icon.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="hero-tilt-logo relative h-[52%] w-[52%] min-w-[188px] max-w-[410px]"
          onPointerMove={handleLogoMove}
          onPointerLeave={handleLogoLeave}
        >
          <Image
            src="/3D-logo-2.webp"
            alt="Logo 3D BinaHub"
            fill
            sizes="(min-width: 1280px) 410px, (min-width: 1024px) 374px, (min-width: 768px) 322px, 210px"
            className="relative z-10 h-full w-full object-contain drop-shadow-[0_44px_34px_rgba(7,26,51,0.28)]"
            priority
          />
          <span className="absolute inset-x-[12%] bottom-[4%] h-12 rounded-full bg-[#071A33]/24 blur-3xl" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function FadeIn({
  children,
  delay,
  ready,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  ready: boolean;
  className?: string;
}) {
  return (
    <div
      className={`transition-[opacity,transform,filter] duration-1000 ease-out ${className ?? ""}`}
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(18px)",
        filter: ready ? "blur(0)" : "blur(12px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function HeroSection({ heroReady }: HeroSectionProps) {
  const locale = useLocale();
  const copy = COPY[locale];

  return (
    <section id="home-hero" className="relative z-0 -mt-24 w-full overflow-x-hidden bg-white md:-mt-28">
      <div className="relative min-h-[calc(100svh+6rem)] overflow-hidden bg-white text-[#071A33] md:min-h-[112svh]">
        <HeroImageBackground />

        <div className="relative z-10 flex min-h-[calc(100svh+6rem)] flex-col items-center justify-start px-6 pb-20 pt-[16rem] text-center md:min-h-[112svh] md:justify-center md:px-12 md:pb-8 md:pt-48 md:text-left lg:px-20 xl:px-28">
          <div className="grid w-full max-w-[1580px] items-center gap-8 md:grid-cols-[minmax(0,0.82fr)_minmax(500px,1.18fr)] md:gap-8 lg:gap-10 xl:gap-12">
            <div className="relative z-10 flex w-full max-w-[780px] flex-col items-center md:items-start">
              <AnimatedHeading text={copy.title} ready={heroReady} />

              <FadeIn ready={heroReady} delay={850}>
                <p className="mx-auto mt-8 max-w-[690px] text-balance text-center text-[14px] font-normal leading-[1.65] tracking-[-0.005em] text-[#30405C] md:mx-0 md:mt-6 md:text-left md:text-lg lg:text-[19px]">
                  {copy.desc}
                </p>
              </FadeIn>

              <FadeIn ready={heroReady} delay={1150}>
                <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-2.5 md:mt-8 md:justify-start md:gap-4">
                  <Link
                    href={localizePath("/insight", locale)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-[9px] bg-[#0B2C6B] px-5 text-[10px] font-extrabold uppercase tracking-[0.11em] text-white shadow-[0_22px_56px_-30px_rgba(11,44,107,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#071A33] hover:shadow-[0_28px_64px_-34px_rgba(11,44,107,0.9)] md:h-12 md:gap-3 md:px-8 md:text-[12px] md:tracking-[0.14em]"
                  >
                    {copy.cta}
                    <ChevronRight size={14} strokeWidth={2.2} className="md:h-4 md:w-4" />
                  </Link>
                  <Link
                    href={localizePath("/perspektif", locale)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-[9px] border border-[#0B2C6B]/20 bg-white/58 px-5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#071A33] shadow-[0_18px_54px_-38px_rgba(11,44,107,0.5)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0B2C6B]/40 hover:bg-white md:h-12 md:gap-3 md:px-8 md:text-[12px] md:tracking-[0.14em]"
                  >
                    {copy.secondaryCta}
                    <ArrowRight size={14} strokeWidth={2.1} className="md:h-4 md:w-4" />
                  </Link>
                </div>
              </FadeIn>
            </div>

            <div className="pointer-events-auto absolute inset-x-0 bottom-8 z-0 mx-auto w-full max-w-[430px] px-1 md:static md:z-auto md:max-w-none md:px-0 md:justify-self-end">
              <FadeIn ready={heroReady} delay={650} className="w-full">
                <HeroOrbitVisual />
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
