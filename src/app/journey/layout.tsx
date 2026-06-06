import type { Metadata } from "next";
import { headers } from "next/headers";
import { defaultLocale, hasLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const localeHeader = headerList.get("x-binahub-locale");
  const locale = hasLocale(localeHeader) ? localeHeader : defaultLocale;
  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "Our Journey" : "Perjalanan Kami",
    description: isEnglish
      ? "The roots, momentum, and evolution of BinaHub from BDN toward a future transformation ecosystem."
      : "Akar pengalaman, momentum, dan evolusi BinaHub dari BDN menuju ekosistem transformasi masa depan.",
    alternates: { canonical: isEnglish ? "/en/journey" : "/journey" },
    openGraph: {
      title: isEnglish ? "Our Journey | BinaHub" : "Perjalanan Kami | BinaHub",
      description: isEnglish
        ? "The roots and evolution of BinaHub from BDN toward a future transformation ecosystem."
        : "Akar pengalaman dan evolusi BinaHub dari BDN menuju ekosistem transformasi masa depan.",
      url: isEnglish ? "/en/journey" : "/journey",
    },
  };
}

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
