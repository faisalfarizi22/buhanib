"use client"

import Link from "next/link"
import { Languages } from "lucide-react"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname, locales, switchLocalePath, type Locale } from "@/i18n/config"

type LanguageSwitcherProps = {
  variant?: "desktop" | "mobile"
  onNavigate?: () => void
}

const LANGUAGE_LABELS: Record<Locale, string> = {
  id: "ID",
  en: "EN",
}

export function LanguageSwitcher({ variant = "desktop", onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname() || "/"
  const activeLocale = getLocaleFromPathname(pathname)
  const isMobile = variant === "mobile"

  return (
    <div
      className={
        isMobile
          ? "flex w-full items-center justify-between gap-3 rounded-[14px] border border-[#0B2C6B]/8 bg-white/78 px-3 py-3"
          : "hidden h-12 items-center gap-1 rounded-full border border-white/70 bg-white/94 px-1 shadow-[0_16px_38px_-28px_rgba(11,44,107,0.42)] backdrop-blur-xl lg:flex"
      }
      aria-label="Language selector"
    >
      {isMobile && (
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B2C6B]/58">
          <Languages size={15} className="text-[#D9A441]" />
          Bahasa
        </div>
      )}
      <div className={isMobile ? "grid grid-cols-2 gap-1" : "flex items-center gap-1"}>
        {locales.map((locale) => {
          const isActive = locale === activeLocale

          return (
            <Link
              key={locale}
              href={switchLocalePath(pathname, locale)}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              title={locale === "id" ? "Tampilkan dalam Bahasa Indonesia" : "Show in English"}
              className={`inline-flex h-9 min-w-10 items-center justify-center rounded-full px-3 text-[10px] font-black uppercase tracking-[0.12em] transition-all ${
                isActive
                  ? "bg-[#0B2C6B] text-[#D9A441] shadow-[0_12px_26px_-20px_rgba(11,44,107,0.9)]"
                  : "text-[#0B2C6B]/54 hover:bg-[#0B2C6B]/7 hover:text-[#0B2C6B]"
              }`}
            >
              {LANGUAGE_LABELS[locale]}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
