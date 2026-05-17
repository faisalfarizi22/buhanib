import Image from "next/image";
import Link from "next/link";

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden"
    >
      <Image
        src="/bg-cta.png"
        alt="BinaHub CTA Background"
        fill
        className="object-cover object-center opacity-60"
      />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mb-6">
          Mulai manusiakan<br />masa depan Anda.
        </h2>
        <p className="text-sm text-black/45 leading-relaxed mb-10">
          Hubungi kami untuk konsultasi strategis dan mulailah perjalanan transformasi organisasi
          Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="mailto:info@binahub.id"
            className="px-8 py-4 bg-[#0A1A3A] text-white text-sm rounded-xl hover:bg-[#0F172A] transition-colors tracking-widest font-medium"
          >
            HUBUNGI KAMI
          </Link>
          <Link
            href="#platform"
            className="px-8 py-4 border border-black/10 text-black/60 text-sm rounded-xl hover:bg-black/[0.02] transition-colors tracking-widest font-medium"
          >
            PELAJARI LEBIH LANJUT
          </Link>
        </div>
      </div>
    </section>
  );
}
