import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-20 md:py-36 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden"
    >
      <Image
        src="/bg-cta.png"
        alt="BinaHub CTA Background"
        fill
        className="object-cover object-center opacity-60"
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mb-6 text-[#0B2C6B]">
          Mulai manusiakan<br />masa depan Anda.
        </h2>
        <p className="text-lg text-[#4A4C54]/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          Hubungi kami untuk konsultasi strategis dan mulailah perjalanan transformasi organisasi
          Anda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mx-auto">
          <Link
            href="/insight"
            className="group flex items-center justify-center gap-3 rounded-full bg-[#0B2C6B] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D9A441] hover:text-[#0B2C6B] active:scale-95"
          >
            DIAGNOSA PERFORMA
            <ChevronRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/about"
            className="group flex items-center justify-center gap-3 rounded-full border border-[#0B2C6B]/18 bg-white/72 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B2C6B] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D9A441]/45 hover:bg-white"
          >
            PELAJARI LEBIH LANJUT
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
