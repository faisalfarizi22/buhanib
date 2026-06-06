import type { Metadata } from "next";
import { headers } from "next/headers";
import { defaultLocale, hasLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const localeHeader = headerList.get("x-binahub-locale");
  const locale = hasLocale(localeHeader) ? localeHeader : defaultLocale;
  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "Contact Us" : "Hubungi Kami",
    description: isEnglish
      ? "Connect with the BinaHub team to discuss your people and organizational transformation needs."
      : "Terhubung dengan tim BinaHub untuk mendiskusikan kebutuhan transformasi SDM dan organisasi Anda.",
    alternates: { canonical: isEnglish ? "/en/contact" : "/contact" },
    openGraph: {
      title: isEnglish ? "Contact Us | BinaHub" : "Hubungi Kami | BinaHub",
      description: isEnglish
        ? "Connect with the BinaHub team to discuss your transformation needs."
        : "Terhubung dengan tim BinaHub untuk mendiskusikan kebutuhan transformasi Anda.",
      url: isEnglish ? "/en/contact" : "/contact",
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
