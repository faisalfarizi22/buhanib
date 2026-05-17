"use client";

import React from "react";
import { useInView } from "@/hooks/use-in-view";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ children, className = "", delay = 0 }: BentoCardProps) {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-black/[0.07] bg-[#F8F9FB] overflow-hidden transition-all duration-700 hover:border-black/[0.15] hover:bg-[#ebeae4] ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s ease, background-color 0.3s ease`,
      }}
    >
      {/* Hover glow spot */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
