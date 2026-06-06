"use client";

import { useEffect } from "react";
import Link from "next/link";
import { localizePath } from "@/i18n/config";
import { useLocale } from "@/i18n/use-locale";

const COPY = {
  id: {
    eyebrow: "Terjadi Kesalahan",
    heading: "Maaf, ada yang tidak berjalan semestinya",
    body: "Sistem kami mengalami kendala sesaat. Silakan coba muat ulang halaman ini atau kembali ke beranda.",
    retry: "Coba Lagi",
    home: "Kembali ke Beranda",
  },
  en: {
    eyebrow: "Something Went Wrong",
    heading: "Sorry, something did not work as expected",
    body: "Our system ran into a temporary issue. Please try reloading this page or return to the homepage.",
    retry: "Try Again",
    home: "Back to Home",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const copy = COPY[locale];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden bg-[#F5F7FA] px-6 py-28 text-center">
      <div className="pointer-events-none absolute inset-x-[18%] top-0 h-40 bg-[#0B2C6B]/[0.04] blur-3xl" />
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.4em] text-[#D9A441]">
        {copy.eyebrow}
      </p>
      <h1 className="mb-5 text-4xl font-light tracking-tight text-[#0B2C6B] md:text-5xl">
        {copy.heading}
      </h1>
      <p className="mb-10 max-w-md text-base leading-relaxed text-[#0B2C6B]/55">
        {copy.body}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#0B2C6B] px-7 text-[11px] font-bold uppercase tracking-[0.14em] text-[#D9A441] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D9A441] hover:text-[#0B2C6B]"
        >
          {copy.retry}
        </button>
        <Link
          href={localizePath("/", locale)}
          className="inline-flex h-12 items-center justify-center rounded-full border border-[#0B2C6B]/15 px-7 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B2C6B]/70 transition-all duration-300 hover:border-[#0B2C6B]/30 hover:text-[#0B2C6B]"
        >
          {copy.home}
        </Link>
      </div>
    </section>
  );
}
