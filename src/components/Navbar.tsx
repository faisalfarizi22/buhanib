"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronDown, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  {
    label: "Tentang Kami",
    href: "/about",
    submenu: [
      { label: "Perjalanan kami", href: "/journey" },
      { label: "Siapa kami", href: "/about#siapa-kami" },
      { label: "Visi & Misi", href: "/about#visi" },
      { label: "Nilai-nilai", href: "/about#nilai" },
      { label: "Gallery", href: "/gallery" },
      { label: "Kontak", href: "/contact" },
    ]
  },
  {
    label: "Layanan",
    href: "/ecosystem",
    submenu: [
      { label: "Latar belakang", href: "/ecosystem#latar-belakang" },
      { label: "Solusi Pembelajaran dan Pengembangan Terintegrasi", href: "/ecosystem#solusi" },
    ]
  },
  {
    label: "Perspektif",
    href: "/perspektif",
    submenu: [
      { label: "Pendekatan", href: "/perspektif#pendekatan" },
      { label: "Alur kerja", href: "/perspektif#alur-kerja" },
    ]
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash
      if (hash) {
        if (hash === "#chatbot") return
        const id = hash.replace("#", "")
        const element = document.getElementById(id)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }, 350) // Tiny delay to ensure DOM is fully ready
        }
      }
    }

    scrollToHash()

    // Also listen to hashchange events for same-page transitions
    window.addEventListener("hashchange", scrollToHash)
    return () => window.removeEventListener("hashchange", scrollToHash)
  }, [pathname])

  return (
    <div id="global-navbar" className="fixed inset-x-0 top-0 z-[100] flex justify-center p-4 pointer-events-none md:p-7">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, scale: scrolled ? 0.985 : 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl pointer-events-auto"
      >
        <nav
          className={`relative flex items-center justify-between rounded-[22px] border px-5 py-3 transition-all duration-500 md:px-6 md:py-3.5 ${scrolled
              ? "border-white/35 bg-white/88 shadow-[0_20px_60px_-25px_rgba(11,44,107,0.22)] backdrop-blur-2xl"
              : "border-white/30 bg-white/76 shadow-[0_18px_50px_-32px_rgba(11,44,107,0.16)] backdrop-blur-xl"
            }`}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(120deg,rgba(255,255,255,0.72),rgba(255,255,255,0.28),rgba(217,164,65,0.04))]" />
          <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D9A441]/20 to-transparent" />

          <Link href="/" className="group relative z-10 flex items-center mr-6">
            <div className="relative h-8 w-32 transition-transform duration-500 group-hover:-translate-y-0.5 md:h-9 md:w-36">
              <Image
                src="/full-logo.png"
                alt="BinaHub Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="relative z-10 hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1.5 py-3.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#0B2C6B]/66 transition-colors hover:text-[#0B2C6B]"
                >
                  {link.label}
                  {link.submenu && (
                    <ChevronDown size={12} strokeWidth={1.8} className={`text-[#0B2C6B]/45 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180 text-[#D9A441]' : ''}`} />
                  )}
                  <span className="absolute bottom-2.5 left-0 h-px w-0 bg-[#D9A441] transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Desktop Dropdown */}
                {link.submenu && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full mt-1 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/40 bg-white/88 py-2 shadow-[0_24px_70px_-42px_rgba(11,44,107,0.35)] backdrop-blur-2xl"
                      >
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B2C6B]/64 transition-all hover:translate-x-0.5 hover:bg-[#F5F7FA]/80 hover:text-[#0B2C6B]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="relative z-10 flex items-center gap-4">
            <Link
              href="/insight"
              className="hidden items-center gap-2 rounded-full bg-[#0B2C6B] px-4 py-2 text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#D9A441] shadow-[0_14px_34px_-22px_rgba(11,44,107,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#08245A] hover:shadow-[0_18px_42px_-24px_rgba(11,44,107,0.95)] active:scale-95 md:flex"
            >
              Diagnosa Performa (Gratis)
              <ChevronRight size={12} strokeWidth={2} />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B2C6B]/5 text-[#0B2C6B] transition-colors hover:bg-[#0B2C6B]/10 md:hidden"
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
              className="absolute left-4 right-4 top-full mt-4 max-h-[70vh] overflow-y-auto rounded-[28px] border border-white/40 bg-white/90 p-4 shadow-[0_24px_80px_-40px_rgba(11,44,107,0.38)] backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const isExpanded = activeMobileDropdown === link.label;
                  return (
                    <div key={link.label} className="flex flex-col">
                      {link.submenu ? (
                        <button
                          onClick={() => setActiveMobileDropdown(isExpanded ? null : link.label)}
                          className="flex w-full items-center justify-between rounded-2xl px-6 py-4 text-left text-[12px] font-bold uppercase tracking-widest text-[#0B2C6B] transition-all hover:bg-[#0B2C6B]/5"
                        >
                          {link.label}
                          <ChevronDown size={16} className={`text-[#D9A441] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between rounded-2xl px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-[#0B2C6B] transition-all hover:bg-[#0B2C6B]/5"
                        >
                          {link.label}
                          <ChevronRight size={16} className="text-[#D9A441]" />
                        </Link>
                      )}
                      
                      {link.submenu && (
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col pl-6 pr-2 pb-2 pt-1 gap-1.5 border-l-2 border-[#D9A441]/30 ml-8 mb-2">
                                {/* Option to visit the main page */}
                                <Link
                                  href={link.href}
                                  onClick={() => setOpen(false)}
                                  className="px-4 py-2 text-[9px] font-bold text-[#D9A441] hover:text-white hover:bg-[#D9A441] rounded-xl transition-all tracking-widest uppercase border border-[#D9A441]/20 bg-[#D9A441]/5 text-center sm:text-left"
                                >
                                  Kunjungi Halaman Utama
                                </Link>
                                {link.submenu.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 text-[10px] font-bold text-[#0B2C6B]/60 hover:text-[#0B2C6B] hover:bg-[#F5F7FA] rounded-xl transition-colors tracking-widest uppercase"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                })}
                <div className="h-px bg-black/[0.05] my-2 mx-4" />
                <Link
                  href="/insight"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0B2C6B] py-5 text-[12px] font-bold uppercase tracking-widest text-[#D9A441] shadow-xl"
                >
                  DIAGNOSA PERFORMA (GRATIS)
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
