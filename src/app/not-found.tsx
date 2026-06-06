import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { defaultLocale, hasLocale, localizePath } from "@/i18n/config";

const COPY = {
  id: {
    title: "Halaman Tidak Ditemukan",
    eyebrow: "Error 404",
    heading: "Halaman tidak ditemukan",
    body: "Halaman yang Anda cari mungkin telah dipindahkan, berganti nama, atau belum tersedia. Mari kembali ke jalur transformasi Anda.",
    home: "Kembali ke Beranda",
    services: "Lihat Layanan",
  },
  en: {
    title: "Page Not Found",
    eyebrow: "Error 404",
    heading: "Page not found",
    body: "The page you are looking for may have moved, been renamed, or is not available yet. Let's return to your transformation path.",
    home: "Back to Home",
    services: "View Services",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const localeHeader = headerList.get("x-binahub-locale");
  const locale = hasLocale(localeHeader) ? localeHeader : defaultLocale;

  return {
    title: COPY[locale].title,
    robots: { index: false, follow: false },
  };
}

export default async function NotFound() {
  const headerList = await headers();
  const localeHeader = headerList.get("x-binahub-locale");
  const locale = hasLocale(localeHeader) ? localeHeader : defaultLocale;
  const copy = COPY[locale];

  return (
    <section className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden bg-[#F5F7FA] px-6 py-28 text-center">
      <div className="pointer-events-none absolute inset-x-[18%] top-0 h-40 bg-[#0B2C6B]/[0.04] blur-3xl" />
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.4em] text-[#D9A441]">
        {copy.eyebrow}
      </p>
      <h1 className="mb-5 text-4xl font-light tracking-tight text-[#0B2C6B] md:text-6xl">
        {copy.heading}
      </h1>
      <p className="mb-10 max-w-md text-base leading-relaxed text-[#0B2C6B]/55">
        {copy.body}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href={localizePath("/", locale)}
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#0B2C6B] px-7 text-[11px] font-bold uppercase tracking-[0.14em] text-[#D9A441] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D9A441] hover:text-[#0B2C6B]"
        >
          {copy.home}
        </Link>
        <Link
          href={localizePath("/ecosystem", locale)}
          className="inline-flex h-12 items-center justify-center rounded-full border border-[#0B2C6B]/15 px-7 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B2C6B]/70 transition-all duration-300 hover:border-[#0B2C6B]/30 hover:text-[#0B2C6B]"
        >
          {copy.services}
        </Link>
      </div>
    </section>
  );
}
