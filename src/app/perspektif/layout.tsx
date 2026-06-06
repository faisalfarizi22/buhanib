import type { Metadata } from "next";
import { headers } from "next/headers";
import { defaultLocale, hasLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const localeHeader = headerList.get("x-binahub-locale");
  const locale = hasLocale(localeHeader) ? localeHeader : defaultLocale;
  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "Perspective" : "Perspektif",
    description: isEnglish
      ? "BinaHub's perspective on people, technology, and the future of work in Indonesia: ideas and insights for transformation leaders."
      : "Cara pandang BinaHub tentang manusia, teknologi, dan masa depan dunia kerja Indonesia - gagasan dan wawasan untuk para pemimpin transformasi.",
    alternates: { canonical: isEnglish ? "/en/perspektif" : "/perspektif" },
    openGraph: {
      title: isEnglish ? "Perspective | BinaHub" : "Perspektif | BinaHub",
      description: isEnglish
        ? "BinaHub ideas and insights on people, technology, and the future of work."
        : "Gagasan dan wawasan BinaHub tentang manusia, teknologi, dan masa depan dunia kerja.",
      url: isEnglish ? "/en/perspektif" : "/perspektif",
    },
  };
}

export default function PerspektifLayout({ children }: { children: React.ReactNode }) {
  return children;
}
