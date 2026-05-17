"use client";

import { useCallback, useState } from "react";
import { IntroAnimation } from "@/components/intro-animation";
import { HeroSection } from "./_sections/hero-section";
import { PlatformSection } from "./_sections/platform-section";
import { ServicesSection } from "./_sections/services-section";
import { MethodologySection } from "./_sections/methodology-section";
import { WorkflowSection } from "./_sections/workflow-section";
import { MarqueeSection } from "./_sections/marquee-section";
import { CTASection } from "./_sections/cta-section";
import { CoreValuesSection } from "@/components/core-values-section";

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  const handleIntroDone = useCallback(() => {
    setHeroReady(true);
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="bg-white text-[#0F172A] min-h-screen font-sans antialiased">
      <IntroAnimation onDone={handleIntroDone} />
      <HeroSection heroReady={heroReady} />
      <PlatformSection onMouseMove={handleMouse} />
      <CoreValuesSection />
      <ServicesSection />
      <MethodologySection onMouseMove={handleMouse} />
      <WorkflowSection onMouseMove={handleMouse} />
      <MarqueeSection />
      <CTASection />
    </div>
  );
}
