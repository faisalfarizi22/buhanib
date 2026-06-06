import type { Metadata } from "next";
import { headers } from "next/headers";
import { defaultLocale, hasLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const localeHeader = headerList.get("x-binahub-locale");
  const locale = hasLocale(localeHeader) ? localeHeader : defaultLocale;
  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "From BDN to BinaHub" : "Dari BDN ke BinaHub",
    description: isEnglish
      ? "A bridge from Bina Daya Nugraha's 16-year legacy toward the BinaHub transformation ecosystem."
      : "Jembatan dari legacy 16 tahun Bina Daya Nugraha menuju ekosistem transformasi BinaHub.",
    alternates: { canonical: isEnglish ? "/en/from-bdn-to-binahub" : "/from-bdn-to-binahub" },
    openGraph: {
      title: isEnglish ? "From BDN to BinaHub | BinaHub" : "Dari BDN ke BinaHub | BinaHub",
      description: isEnglish
        ? "A bridge from Bina Daya Nugraha's legacy toward the BinaHub transformation ecosystem."
        : "Jembatan dari legacy Bina Daya Nugraha menuju ekosistem transformasi BinaHub.",
      url: isEnglish ? "/en/from-bdn-to-binahub" : "/from-bdn-to-binahub",
    },
  };
}

export default function FromBdnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
