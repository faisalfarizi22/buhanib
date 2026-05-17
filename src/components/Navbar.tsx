"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Tentang Kami", href: "/about" },
  { label: "Ekosistem", href: "/ecosystem" },
  { label: "Metodologi", href: "/#methodology" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div id="global-navbar" className="fixed top-0 inset-x-0 z-[100] flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-5xl pointer-events-auto"
      >
        <nav
          className={`relative flex items-center justify-between px-6 py-3 md:py-4 rounded-[24px] border transition-all duration-500 ${scrolled
              ? "bg-white/80 backdrop-blur-xl border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
              : "bg-white/40 backdrop-blur-md border-white/20 shadow-none"
            }`}
        >
          <Link href="/" className="flex items-center group">
            <div className="relative h-8 md:h-10 w-32 md:w-40 transition-transform group-hover:scale-105 duration-300">
              <Image
                src="/full-logo.png"
                alt="BinaHub Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-[11px] font-bold text-[#0A1A3A]/60 hover:text-[#0A1A3A] transition-colors tracking-widest uppercase group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/insight"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#0A1A3A] text-[#D4AF37] rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#0F172A] hover:scale-105 transition-all shadow-lg shadow-black/10 active:scale-95"
            >
              Assessment Gratis
              <ChevronRight size={14} />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 rounded-full bg-[#0A1A3A]/5 flex items-center justify-center text-[#0A1A3A] hover:bg-[#0A1A3A]/10 transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="md:hidden absolute top-full left-4 right-4 mt-4 p-4 bg-white/95 backdrop-blur-2xl rounded-[32px] border border-black/[0.05] shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-[#0A1A3A]/5 text-[#0A1A3A] font-bold text-[12px] tracking-widest uppercase transition-all"
                  >
                    {link.label}
                    <ChevronRight size={16} className="text-[#D4AF37]" />
                  </Link>
                ))}
                <div className="h-px bg-black/[0.05] my-2 mx-4" />
                <Link
                  href="/insight"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-5 bg-[#0A1A3A] text-[#D4AF37] rounded-2xl font-bold text-[12px] tracking-widest uppercase shadow-xl"
                >
                  MULAI BINAINSIGHT
                  <ChevronRight size={18} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
