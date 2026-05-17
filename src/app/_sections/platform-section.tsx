"use client";

import Image from "next/image";
import { UserCheck, Leaf, Target } from "lucide-react";
import { Tag } from "@/components/ui/tag";
import { BentoCard } from "@/components/ui/bento-card";
import { PixelIcon } from "@/components/pixel-icon";

const PILLARS = [
  {
    icon: <UserCheck size={20} />,
    title: "People Development",
    desc: "Membangun kapabilitas masa depan dengan memastikan manusia tetap menjadi inti dari setiap transformasi.",
    delay: 120,
  },
  {
    icon: <Target size={20} />,
    title: "Adaptive Leadership",
    desc: "Mengembangkan kepemimpinan yang dibangun dengan kecerdasan, integritas, kebijaksanaan, dan empati.",
    delay: 160,
  },
  {
    icon: <Leaf size={20} />,
    title: "Healthy Culture",
    desc: "Menciptakan budaya kerja yang sehat dan bertumbuh di tengah otomatisasi dan era digitalisasi AI.",
    delay: 200,
  },
];

interface PlatformSectionProps {
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function PlatformSection({ onMouseMove }: PlatformSectionProps) {
  return (
    <section id="platform" className="py-16 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <PixelIcon type="about" size={40} />
          <div className="mt-4">
            <Tag>TENTANG KAMI</Tag>
          </div>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
            Mitra Transformasi Manusia &<br />Kapabilitas Masa Depan.
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-3" onMouseMove={onMouseMove}>
          {/* Vision card */}
          <BentoCard
            className="col-span-12 p-8 min-h-[400px] flex flex-col justify-end relative overflow-hidden"
            delay={0}
          >
            <Image
              src="/asset/Insight.png"
              alt="BinaHub Transformation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0" />
            <div className="relative z-10">
              <Tag className="!text-white/60 !bg-white/10">VISI KAMI</Tag>
              <h3 className="text-2xl font-light mt-4 mb-3 text-white">
                Masa depan di mana kemanusiaan dan kemajuan berjalan selaras.
              </h3>
              <p className="text-sm text-white/70 leading-relaxed max-w-md">
                BinaHub percaya bahwa kemajuan dan kemanusiaan bukanlah dua hal yang saling
                bertentangan. Teknologi, AI, dan transformasi organisasi seharusnya menjadi sarana
                untuk meningkatkan kualitas kehidupan manusia.
              </p>
            </div>
          </BentoCard>

          {/* Pillar cards */}
          {PILLARS.map((pillar) => (
            <BentoCard
              key={pillar.title}
              className="col-span-12 md:col-span-4 p-8 min-h-[240px]"
              delay={pillar.delay}
            >
              <div className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center mb-5">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-light mb-2">{pillar.title}</h3>
              <p className="text-sm text-black/45 leading-relaxed">{pillar.desc}</p>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
