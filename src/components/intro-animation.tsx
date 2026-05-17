"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const LETTER_IN_DUR = 1200  // Faster entry
const HOLD_DURATION = 400   // Shorter hold
const LETTERS_IN_TOTAL = LETTER_IN_DUR + HOLD_DURATION

const LETTER_OUT_DUR = 400   // Faster exit
const LETTERS_OUT_TOTAL = LETTER_OUT_DUR

const CURTAIN_DELAY = LETTERS_IN_TOTAL + 100
const CURTAIN_DURATION = 1000  // Faster curtain retraction
const ANIM_TOTAL = CURTAIN_DELAY + LETTERS_OUT_TOTAL + 1400

// Exported: moment the curtain finishes retracting — when the bg is fully visible
export const INTRO_DURATION_MS = CURTAIN_DELAY + CURTAIN_DURATION
// Exported: ms before curtain fully done to start hero animations (overlap for smoothness)
export const HERO_REVEAL_MS = CURTAIN_DELAY + CURTAIN_DURATION - 150

type Phase = "idle" | "in" | "out" | "done"

export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle")
  const [curtainUp, setCurtainUp] = useState(false)

  useEffect(() => {
    // Tiny delay so the browser has painted before we start transitioning
    const t0 = setTimeout(() => setPhase("in"), 80)
    const t1 = setTimeout(() => setPhase("out"), LETTERS_IN_TOTAL)
    const t2 = setTimeout(() => setCurtainUp(true), CURTAIN_DELAY)
    const t3 = setTimeout(() => onDone(), HERO_REVEAL_MS)
    const t4 = setTimeout(() => setPhase("done"), ANIM_TOTAL)

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onDone])

  if (phase === "done") return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">

      {/* Gradient curtain — retracts upward */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          bottom: curtainUp ? "100%" : "0%",
          transition: curtainUp ? "bottom 1.3s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
          background: "#F8F9FB",
        }}
      />

      {/* Intro Image */}
      <div className="absolute inset-0 flex items-center justify-center px-12 z-10">
        <div
          className="relative w-full max-w-2xl md:max-w-5xl aspect-[16/9] md:aspect-[3/1]"
          style={{
            opacity: phase === "idle" ? 0 : phase === "in" ? 1 : 0,
            filter: `blur(${phase === "idle" ? 40 : phase === "in" ? 0 : 20}px)`,
            transform: `
              translateY(${phase === "idle" ? 40 : phase === "in" ? 0 : -30}px) 
              scale(${phase === "idle" ? 0.95 : phase === "in" ? 1 : 1.05})
            `,
            transition: phase === "out"
              ? `opacity ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,0.2,1),
                 filter ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,0.2,1),
                 transform ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,0.2,1)`
              : phase === "in"
                ? `opacity ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1),
                 filter ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1),
                 transform ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1)`
                : "none",
            willChange: "opacity, filter, transform",
          }}
        >
          <img
            src="/intro2.png"
            alt="BinaHub Intro"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

    </div>
  )
}
