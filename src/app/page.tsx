"use client";

import { useCallback, useState } from "react";
import { IntroAnimation } from "@/components/intro-animation";
import { HeroSection } from "./_sections/hero-section";
import { AboutCarouselSection } from "./_sections/about-carousel-section";
import { GallerySection } from "./_sections/gallery-section";
import { ServicesSection } from "./_sections/services-section";
import { HumanCoreValuesSection } from "@/components/human-core-values";
import { MarqueeSection } from "./_sections/marquee-section";
import { CTASection } from "./_sections/cta-section";

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  const handleIntroDone = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <div className="bg-[#F5F7FA] text-[#4A4C54] min-h-screen font-sans antialiased">
      <IntroAnimation onDone={handleIntroDone} />
      <div className="relative w-full">
        <HeroSection heroReady={heroReady} />
        <AboutCarouselSection />
      </div>
      <GallerySection />
      <HumanCoreValuesSection />
      <ServicesSection />
      <MarqueeSection />
      <CTASection />
    </div>
  );
}
