"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./BinaHubClickable.module.css";
import Link from "next/link";

const DESIGN_WIDTH = 1536;
const DESIGN_HEIGHT = 1024;

type Hotspot = {
  id: string;
  label: string;
  href: string;
  x: number;
  y: number;
  w: number;
  h: number;
  radius?: string;
  z?: number;
};

// Only the 8 service hotspots — all others are decorative and non-interactive
const hotspots: Hotspot[] = [
  {
    id: "bina-insights",
    label: "BinaInsights",
    href: "insight",
    x: 65,
    y: 138,
    w: 455,
    h: 188,
    radius: "8px",
    z: 5,
  },
  {
    id: "bina-lab",
    label: "BinaLab",
    href: "lab",
    x: 65,
    y: 360,
    w: 455,
    h: 170,
    radius: "8px",
    z: 5,
  },
  {
    id: "bina-coach",
    label: "BinaCoach",
    href: "coach",
    x: 65,
    y: 560,
    w: 455,
    h: 170,
    radius: "8px",
    z: 5,
  },
  {
    id: "bina-journey",
    label: "BinaJourney",
    href: "journey",
    x: 318,
    y: 724,
    w: 350,
    h: 150,
    radius: "8px",
    z: 5,
  },
  {
    id: "bina-play",
    label: "BinaPlay",
    href: "play",
    x: 1098,
    y: 145,
    w: 385,
    h: 175,
    radius: "8px",
    z: 5,
  },
  {
    id: "bina-academy",
    label: "BinaAcademy",
    href: "academy",
    x: 1095,
    y: 365,
    w: 390,
    h: 172,
    radius: "8px",
    z: 5,
  },
  {
    id: "bina-impact",
    label: "BinaImpact",
    href: "impact",
    x: 1098,
    y: 574,
    w: 390,
    h: 170,
    radius: "8px",
    z: 5,
  },
  {
    id: "bina-works",
    label: "BinaWorks",
    href: "works",
    x: 866,
    y: 728,
    w: 386,
    h: 150,
    radius: "8px",
    z: 5,
  },
];

function toPercent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

interface BinaHubClickableProps {
  debug?: boolean;
  onProductClick?: (productId: string) => void;
}

export default function BinaHubClickable({
  debug = false,
  onProductClick,
}: BinaHubClickableProps) {
  return (
    <section className={styles.wrapper} aria-label="BinaHub Ecosystem">
      <div className={styles.canvas}>
        <Image
          src="/binahub-ecosystem.png"
          alt="BinaHub Ecosystem"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />

        {hotspots.map((item) => {
          const style: CSSProperties = {
            left: toPercent(item.x, DESIGN_WIDTH),
            top: toPercent(item.y, DESIGN_HEIGHT),
            width: toPercent(item.w, DESIGN_WIDTH),
            height: toPercent(item.h, DESIGN_HEIGHT),
            borderRadius: item.radius ?? "18px",
            zIndex: item.z ?? 1,
          };

          if (onProductClick) {
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`Pelajari ${item.label}`}
                title={item.label}
                className={styles.hotspot}
                data-debug={debug ? "true" : undefined}
                style={style}
                onClick={() => onProductClick(item.href)}
              >
                <span className={styles.srOnly}>{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={`/${item.href}`}
              aria-label={`Pelajari ${item.label}`}
              title={item.label}
              className={styles.hotspot}
              data-debug={debug ? "true" : undefined}
              style={style}
            >
              <span className={styles.srOnly}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
