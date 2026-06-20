"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  drawAbout,
  drawCoreValues,
  drawEcosystem,
  drawMethodology,
  drawWorkflow,
  drawInsights,
  drawLab,
  drawCoach,
  drawJourney,
  drawPlay,
  drawAcademy,
  drawImpact,
  drawWorks
} from "./draw-functions";

export type IconType =
  | "about" 
  | "ecosystem" 
  | "methodology" 
  | "workflow" 
  | "core"
  | "insights"
  | "lab"
  | "coach"
  | "journey"
  | "play"
  | "academy"
  | "impact"
  | "works";

interface PixelIconProps {
  type: IconType;
  size?: number;
}

const PNG_ICON_SRC: Partial<Record<IconType, string>> = {
  insights: "/icon/iconinsight.png",
  lab: "/icon/iconlab.png",
  coach: "/icon/iconcoach.png",
  journey: "/icon/iconjourney.png",
  play: "/icon/iconplay.png",
  academy: "/icon/iconacademy.png",
  impact: "/icon/iconimpact.png",
  works: "/icon/iconworks.png",
};

export function PixelIcon({ type, size = 40 }: PixelIconProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  
  const pngSrc = PNG_ICON_SRC[type];

  useEffect(() => {
    if (pngSrc) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const draw = (t: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, size, size);
      ctx.imageSmoothingEnabled = false;

      switch (type) {
        case "about":       drawAbout(ctx, size, t);       break;
        case "ecosystem":   drawEcosystem(ctx, size, t);   break;
        case "methodology": drawMethodology(ctx, size, t); break;
        case "workflow":    drawWorkflow(ctx, size, t);    break;
        case "core":        drawCoreValues(ctx, size, t);  break;
        case "insights":    drawInsights(ctx, size, t);    break;
        case "lab":         drawLab(ctx, size, t);         break;
        case "coach":       drawCoach(ctx, size, t);       break;
        case "journey":     drawJourney(ctx, size, t);     break;
        case "play":        drawPlay(ctx, size, t);        break;
        case "academy":     drawAcademy(ctx, size, t);     break;
        case "impact":      drawImpact(ctx, size, t);      break;
        case "works":       drawWorks(ctx, size, t);       break;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [type, size, pngSrc]);

  if (pngSrc) {
    return (
      <Image
        src={pngSrc}
        alt={`${type} icon`}
        width={size}
        height={size}
        unoptimized
        style={{
          width: size,
          height: size,
          imageRendering: "pixelated",
          display: "block",
          flexShrink: 0,
          objectFit: "contain"
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size,
        height: size,
        imageRendering: "pixelated",
        display: "block",
        flexShrink: 0,
      }}
    />
  );
}
