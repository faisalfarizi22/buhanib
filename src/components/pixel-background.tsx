"use client"

import { useEffect, useRef } from "react"

export default function PixelBackground({ ready = true }: { ready?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const offsetRef = useRef({ x: 0, y: 0 })
  const rotationRef = useRef(0)
  const revealRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let raf: number

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    const SYNERGY_GRID = [
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
      [0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    ]

    const render = (t: number) => {
      const W = window.innerWidth
      const H = window.innerHeight
      ctx.clearRect(0, 0, W, H)

      // Smooth reveal animation
      const targetReveal = ready ? 1 : 0
      revealRef.current += (targetReveal - revealRef.current) * 0.05
      
      if (revealRef.current < 0.001) {
        raf = requestAnimationFrame(render)
        return
      }

      const primaryNavy = { r: 220, g: 235, b: 255 }  // luminous white-blue
      const accentGold  = { r: 255, g: 210, b: 100 }  // bright warm gold

      const centerX = W * 0.62
      const centerY = H * 0.62
      const pixelSize = Math.max(14, W * 0.014)
      const depth = pixelSize * 0.2

      const startX = centerX - (12 * pixelSize) / 2
      const startY = centerY - (14 * pixelSize) / 2

      // AVOIDANCE & ROTATION LOGIC
      const dx = mouseRef.current.x - (centerX + offsetRef.current.x)
      const dy = mouseRef.current.y - (centerY + offsetRef.current.y)
      const dist = Math.sqrt(dx * dx + dy * dy)
      const threshold = 300

      let targetOffsetX = 0
      let targetOffsetY = 0
      let targetRotation = 0

      if (dist < threshold) {
        const force = (threshold - dist) / threshold
        targetOffsetX = -(dx / dist) * force * 120
        targetOffsetY = -(dy / dist) * force * 80
        targetRotation = -(dx / threshold) * force * 0.4
      }

      offsetRef.current.x += (targetOffsetX - offsetRef.current.x) * 0.08
      offsetRef.current.y += (targetOffsetY - offsetRef.current.y) * 0.08
      rotationRef.current += (targetRotation - rotationRef.current) * 0.08

      const walkSpeed = 0.008
      const bobAmp = pixelSize * 0.15
      const strideAmp = pixelSize * 0.4

      const renderPass = (isShadow: boolean) => {
        ctx.save()
        // Pivot around entity center
        ctx.translate(centerX + offsetRef.current.x, centerY + offsetRef.current.y)
        ctx.rotate(rotationRef.current)
        
        // Scale in effect
        const scale = 0.8 + 0.2 * revealRef.current
        ctx.scale(scale, scale)
        
        ctx.translate(-(centerX + offsetRef.current.x), -(centerY + offsetRef.current.y))

        SYNERGY_GRID.forEach((row, r) => {
          row.forEach((cell, c) => {
            if (cell === 0) return

            const legPhase = Math.sin(t * walkSpeed)
            let x = startX + c * pixelSize + offsetRef.current.x
            let y = startY + r * pixelSize + offsetRef.current.y + Math.abs(legPhase) * bobAmp

            if (r >= 10) {
              const isLeftLeg = c < 6
              const stride = (isLeftLeg ? legPhase : -legPhase) * strideAmp * ((r - 9) / 4)
              x += stride
            }

            if (isShadow) {
              const shadowOffsetX = pixelSize * 0.4
              const shadowOffsetY = pixelSize * 0.6
              ctx.fillStyle = `rgba(0, 0, 0, ${0.05 * revealRef.current})`
              ctx.fillRect(x + shadowOffsetX, y + shadowOffsetY, pixelSize - 2, pixelSize - 2)
            } else {
              const color = cell === 1 ? primaryNavy : accentGold
              const breathing = cell === 1
                ? (0.55 + 0.35 * Math.sin(t * 0.0015 + r * 0.2 + c * 0.1))
                : (0.85 + 0.15 * Math.sin(t * 0.005 + r * 0.5))

              const opacity = breathing * revealRef.current

              // Side faces — slightly dimmer
              ctx.fillStyle = `rgba(${color.r * 0.75}, ${color.g * 0.75}, ${color.b * 0.75}, ${opacity * 0.8})`
              ctx.beginPath()
              ctx.moveTo(x + pixelSize - 2, y); ctx.lineTo(x + pixelSize - 2 + depth, y + depth)
              ctx.lineTo(x + pixelSize - 2 + depth, y + pixelSize - 2 + depth); ctx.lineTo(x + pixelSize - 2, y + pixelSize - 2)
              ctx.fill()
              ctx.beginPath()
              ctx.moveTo(x, y + pixelSize - 2); ctx.lineTo(x + depth, y + pixelSize - 2 + depth)
              ctx.lineTo(x + pixelSize - 2 + depth, y + pixelSize - 2 + depth); ctx.lineTo(x + pixelSize - 2, y + pixelSize - 2)
              ctx.fill()

              ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
              ctx.fillRect(Math.floor(x), Math.floor(y), pixelSize - 2, pixelSize - 2)

              // Highlight — stronger glow on top-left
              ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.45})`
              ctx.fillRect(Math.floor(x), Math.floor(y), pixelSize - 2, 2)
              ctx.fillRect(Math.floor(x), Math.floor(y), 2, pixelSize - 2)
            }
          })
        })
        ctx.restore()
      }

      renderPass(true)
      renderPass(false)

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [ready])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{
        background: "transparent",
        imageRendering: "pixelated"
      }}
    />
  )
}
