"use client";

import type { ReactNode, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronRight, Mail, MapPin, Phone } from "lucide-react";

const FOOTER_GROUPS = [
  {
    title: "Tentang",
    links: [
      { label: "Siapa Kami", href: "/about#siapa-kami" },
      { label: "Dari BDN ke BinaHub", href: "/from-bdn-to-binahub" },
      { label: "Visi & Nilai", href: "/about#visi" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "Mengapa Program Gagal", href: "/ecosystem#latar-belakang" },
      { label: "Alur Kerja", href: "/ecosystem#alur-kerja" },
      { label: "Peta Layanan", href: "/ecosystem#solusi" },
      { label: "Pilih Kebutuhan", href: "/ecosystem#detail" },
    ],
  },
  {
    title: "Perspektif",
    links: [
      { label: "Cara Pandang", href: "/perspektif" },
      { label: "Transformation Signals", href: "/perspektif/transformation-signals-2026" },
      { label: "Pendekatan", href: "/perspektif#pendekatan" },
    ],
  },
];

const POPULAR_LINKS = [
  { label: "Diagnosa Performa", href: "/insight" },
  { label: "Hubungi Kami", href: "/contact" },
  { label: "Transformation Signals", href: "/perspektif/transformation-signals-2026" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/binahub.id",
    icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@binahub.id",
    icon: TiktokIcon,
  },
] as const;

type CtaConfig = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  variant: "home" | "navy" | "blue";
};

const CTA_BY_PATH: Record<string, CtaConfig> = {
  "/": {
    title: (
      <>
        Mulai manusiakan
        <br />
        masa depan Anda.
      </>
    ),
    description:
      "Hubungi kami untuk konsultasi strategis dan mulailah perjalanan transformasi organisasi Anda.",
    primary: { label: "Diagnosa Performa", href: "/insight" },
    secondary: { label: "Pelajari Lebih Lanjut", href: "/about" },
    variant: "home",
  },
  "/about": {
    eyebrow: "LANGKAH LANJUT",
    title: "Mulai dari membaca kondisi organisasi Anda.",
    description:
      "Gunakan Diagnosa Performa untuk memetakan prioritas transformasi sebelum menentukan intervensi yang tepat.",
    primary: { label: "Diagnosa Performa", href: "/insight" },
    secondary: { label: "Hubungi Kami", href: "/contact" },
    variant: "navy",
  },
  "/ecosystem": {
    title: (
      <>
        Mulai Transformasi <span className="italic text-[#D9A441]">Sekarang.</span>
      </>
    ),
    description: "Partnering in your journey towards excellence.",
    primary: { label: "Konsultasi Gratis", href: "/contact" },
    variant: "blue",
  },
  "/journey": {
    eyebrow: "MULAI BERSAMA KAMI",
    title: "Siap melangkah ke babak berikutnya?",
    primary: { label: "Hubungi Kami", href: "/contact" },
    secondary: { label: "Mulai Diagnosa Performa", href: "/insight" },
    variant: "navy",
  },
  "/from-bdn-to-binahub": {
    eyebrow: "LANGKAH BERIKUTNYA",
    title: "Ingin tahu apakah BinaHub tepat untuk organisasi Anda?",
    description:
      "Mulai dengan sesi Organizational Readiness Diagnostic untuk memahami tantangan spesifik organisasi Anda dan mengevaluasi kecocokan pendekatan kami.",
    primary: { label: "Jadwalkan Readiness Session", href: "/insight" },
    variant: "navy",
  },
  "/perspektif/transformation-signals-2026": {
    eyebrow: "RECOMMENDED RESPONSE",
    title: "Build a people transformation operating system.",
    description:
      "Hubungkan diagnosis, desain intervensi, pengalaman belajar, eksekusi, dan pengukuran dampak dalam satu alur transformasi.",
    primary: { label: "Mulai Diagnosa", href: "/insight" },
    secondary: { label: "Lihat Ekosistem", href: "/ecosystem" },
    variant: "navy",
  },
};

function FooterContent({ year }: { year: number }) {
  return (
    <>
      <div className="md:hidden">
        <div className="mb-8">
          <Link href="/" className="group mb-7 inline-block">
            <div className="relative h-12 w-48 transition-transform duration-500 group-hover:-translate-y-0.5">
              <Image
                src="/full-logo.png"
                alt="BinaHub Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>

          <p className="max-w-[430px] text-sm font-light leading-[1.65] text-[#0B2C6B]/64">
            Transformasi manusia, kepemimpinan, dan kapabilitas untuk masa depan yang terus berubah.
          </p>

          <SocialLinks />

          <FooterAccordion
            title="Tentang"
            defaultHref="/about"
            links={FOOTER_GROUPS[0].links}
          />
          <FooterAccordion
            title="Layanan"
            defaultHref="/ecosystem"
            links={FOOTER_GROUPS[1].links}
          />
          <FooterAccordion
            title="Perspektif"
            defaultHref="/perspektif"
            links={FOOTER_GROUPS[2].links}
          />
          <FooterAccordion title="Popular Links" links={POPULAR_LINKS} />

          <div className="mt-8 grid gap-4 text-sm font-medium leading-relaxed text-[#0B2C6B]/82">
            <div>
              <p>Kencana Tower, Level Mezzanine</p>
              <p>Business Park Kebon Jeruk, Jakarta Barat 11620</p>
            </div>
            <div className="space-y-1">
              <a href="mailto:info@binahub.id" className="flex items-center gap-2 transition-colors hover:text-[#D9A441]">
                <Mail size={15} />
                info@binahub.id
              </a>
              <a href="tel:02129601514" className="flex items-center gap-2 transition-colors hover:text-[#D9A441]">
                <Phone size={15} />
                021-29601514
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/[0.09] pt-6">
          <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[10px] tracking-wider text-black/35">
            &copy; {year}{" "}
            <span className="font-bold text-[#0B2C6B]">
              Bina<span className="text-[#D9A441]">Hub</span>
            </span>
            . PT Binahub Solusi Transformasi.
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="group mb-9 inline-block">
              <div className="relative h-12 w-48 transition-transform duration-500 group-hover:-translate-y-0.5">
                <Image
                  src="/full-logo.png"
                  alt="BinaHub Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="mb-5 max-w-[430px] text-[16px] font-light leading-[1.75] text-[#0B2C6B]/64 md:text-[19px]">
              Transformasi manusia, kepemimpinan, dan kapabilitas untuk masa depan yang terus berubah.
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D9A441]/85">
              People. Learning. Elevated.
            </p>
            <SocialLinks />
          </div>

          <div className="lg:col-span-5">
            <h4 className="mb-7 text-[10px] font-bold uppercase tracking-[0.25em] text-[#0B2C6B]/40">
              Navigasi
            </h4>
            <div className="grid gap-8 sm:grid-cols-3">
              {FOOTER_GROUPS.map((group) => (
                <div key={group.title}>
                  <Link
                    href={
                      group.title === "Tentang"
                        ? "/about"
                        : group.title === "Layanan"
                          ? "/ecosystem"
                          : "/perspektif"
                    }
                    className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0B2C6B] transition-colors hover:text-[#D9A441]"
                  >
                    {group.title}
                    <ChevronRight size={13} />
                  </Link>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm font-light leading-relaxed text-[#0B2C6B]/58 transition-colors hover:text-[#0B2C6B]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.25em] text-[#0B2C6B]/40">
              Kontak & Kehadiran
            </h4>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#D9A441]/10">
                  <MapPin size={18} className="text-[#D9A441]" />
                </div>
                <div>
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#0B2C6B]/40">
                    Lokasi Kantor
                  </span>
                  <p className="max-w-[270px] text-sm font-light leading-[1.65] text-[#0B2C6B]/70">
                    Kencana Tower, Level Mezzanine, Jl. Raya Meruya Ilir No. 88<br />
                    Business Park Kebon Jeruk, Jakarta Barat 11620
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#D9A441]/10">
                  <Mail size={18} className="text-[#D9A441]" />
                </div>
                <div>
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#0B2C6B]/40">
                    Email
                  </span>
                  <a
                    href="mailto:info@binahub.id"
                    className="font-medium text-[#0B2C6B]/70 transition-colors hover:text-[#D9A441]"
                  >
                    info@binahub.id
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#D9A441]/10">
                  <Phone size={18} className="text-[#D9A441]" />
                </div>
                <div>
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#0B2C6B]/40">
                    Telepon
                  </span>
                  <a
                    href="tel:02129601514"
                    className="font-medium text-[#0B2C6B]/70 transition-colors hover:text-[#D9A441]"
                  >
                    021-29601514
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-black/[0.09] pt-10 md:flex-row">
          <div className="flex items-center gap-2 text-[10px] tracking-wider text-black/35">
            &copy; {year}{" "}
            <span className="font-bold text-[#0B2C6B]">
              Bina<span className="text-[#D9A441]">Hub</span>
            </span>
            . PT Binahub Solusi Transformasi.
          </div>
          <div className="flex items-center gap-8">
            <Link
              href="#"
              className="text-[10px] font-bold uppercase tracking-widest text-black/35 transition-colors hover:text-[#D9A441]"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="text-[10px] font-bold uppercase tracking-widest text-black/35 transition-colors hover:text-[#D9A441]"
            >
              Syarat & Ketentuan
            </Link>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-black/18">
            People. Learning. Elevated.
          </div>
        </div>
      </div>
    </>
  );
}

function FooterAccordion({
  title,
  links,
  defaultHref,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  defaultHref?: string;
}) {
  return (
    <details className="group border-b border-[#0B2C6B]/20 py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0B2C6B] marker:hidden">
        {defaultHref ? (
          <Link href={defaultHref} className="transition-colors hover:text-[#D9A441]" onClick={(event) => event.stopPropagation()}>
            {title}
          </Link>
        ) : (
          <span>{title}</span>
        )}
        <ChevronDown size={18} className="transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <ul className="grid gap-3 pb-1 pt-4 md:grid-cols-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm font-light leading-relaxed text-[#0B2C6B]/62 transition-colors hover:text-[#0B2C6B]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

function SocialLinks() {
  return (
    <div className="mt-7 flex items-center gap-3">
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;

        return (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#0B2C6B] text-[#0B2C6B] transition-colors hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-white"
          >
            <Icon width={17} height={17} />
          </Link>
        );
      })}
    </div>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M16.8 7.2h.01" />
    </svg>
  );
}

function TiktokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15.4 3.5c.3 2.2 1.6 3.8 3.8 4.2v3.1a7.2 7.2 0 0 1-3.7-1.2v5.9c0 3-2.2 5.1-5.2 5.1-2.8 0-5-2-5-4.8 0-3.2 2.8-5.3 6.1-4.7v3.2c-1.4-.4-2.8.3-2.8 1.6 0 1 .8 1.7 1.8 1.7 1.1 0 1.8-.7 1.8-2V3.5h3.2Z" />
    </svg>
  );
}

function FooterCta({ config }: { config: CtaConfig }) {
  const isHome = config.variant === "home";
  const isBlue = config.variant === "blue";
  const textClass = isHome ? "text-[#0B2C6B]" : "text-white";
  const descriptionClass = isHome ? "text-[#4A4C54]/62" : "text-white/68";
  const primaryClass = isHome
    ? "bg-[#0B2C6B] text-white shadow-[#0B2C6B]/16 hover:bg-[#071A33]"
    : isBlue
      ? "bg-[#D9A441] text-[#0B2C6B] hover:bg-white"
      : "bg-[#D9A441] text-[#071A33] hover:bg-white";
  const secondaryClass = isHome
    ? "border border-black/8 bg-white/82 text-[#0B2C6B] hover:border-[#0B2C6B]/24 hover:bg-white"
    : "border border-white/18 bg-white/5 text-white/82 hover:border-[#D9A441]/45 hover:text-[#D9A441]";

  return (
    <div className="relative z-10 mx-auto flex min-h-[280px] max-w-7xl flex-col items-center justify-center px-6 pb-8 pt-14 text-center md:min-h-[420px] md:px-12 md:pb-14 md:pt-28 lg:px-20">
      {config.eyebrow && (
        <p
          className={`mb-5 text-[10px] font-bold uppercase tracking-[0.26em] ${
            isHome ? "text-[#D9A441]" : "text-[#D9A441]"
          }`}
        >
          {config.eyebrow}
        </p>
      )}
      <h2 className={`max-w-4xl text-2xl font-light leading-[1.08] tracking-[-0.04em] md:text-5xl md:leading-[1.05] lg:text-6xl ${textClass}`}>
        {config.title}
      </h2>
      {config.description && (
        <p className={`mt-4 max-w-2xl text-sm font-light leading-relaxed md:mt-6 md:text-lg ${descriptionClass}`}>
          {config.description}
        </p>
      )}
      <div className="mt-7 flex w-full max-w-3xl flex-col items-center justify-center gap-3 sm:flex-row md:mt-10 md:gap-4">
        <Link
          href={config.primary.href}
          className={`group inline-flex h-12 items-center justify-center gap-3 rounded-full px-6 text-[10px] font-bold uppercase tracking-[0.18em] shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 md:h-14 md:px-8 md:text-[11px] md:tracking-[0.2em] ${primaryClass}`}
        >
          {config.primary.label}
          <ChevronRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
        {config.secondary && (
          <Link
            href={config.secondary.href}
            className={`group inline-flex h-11 items-center justify-center gap-3 rounded-full px-6 text-[10px] font-bold uppercase tracking-[0.16em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 md:h-12 md:px-7 md:text-[11px] md:tracking-[0.18em] ${secondaryClass}`}
          >
            {config.secondary.label}
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

const Footer = () => {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const ctaConfig = CTA_BY_PATH[pathname];

  if (!ctaConfig) {
    return (
      <footer className="relative overflow-hidden border-t border-black/[0.04] bg-[linear-gradient(to_bottom,#FFFFFF,#FAFBFC)] px-5 pb-8 pt-14 text-[#0B2C6B] md:px-12 md:pb-12 md:pt-24 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9A441]/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-[12%] top-0 h-20 bg-[#0B2C6B]/[0.025] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-180px] right-[-120px] h-[420px] w-[760px] bg-[#D9A441]/5 blur-[120px]" />
        <div className="pointer-events-none absolute left-[-180px] top-[18%] h-[320px] w-[680px] bg-[#0B2C6B]/[0.028] blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(11,44,107,0.55)_0_1px,transparent_1px_34px)] opacity-[0.035]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <FooterContent year={year} />
        </div>
      </footer>
    );
  }

  const sectionClass =
    ctaConfig.variant === "home"
      ? "bg-[#E7E7E4] text-[#0B2C6B]"
      : ctaConfig.variant === "blue"
        ? "bg-[#0B2C6B] text-white"
        : "bg-[#071A33] text-white";
  const bgByPath: Record<string, string> = {
    "/": "/bg-cta.png",
    "/about": "/cta-footer-bg-gold-waves.png",
    "/ecosystem": "/cta-footer-bg.png",
    "/journey": "/cta-footer-bg-gold-texture.png",
    "/from-bdn-to-binahub": "/cta-footer-bg-gold-texture.png",
    "/perspektif/transformation-signals-2026": "/cta-footer-bg.png",
  };
  const ctaBackground = bgByPath[pathname] ?? "/cta-footer-bg.png";
  const overlayClass =
    pathname === "/"
      ? "bg-white/0"
      : pathname === "/about" || pathname === "/journey"
        ? "bg-[#071A33]/30"
        : pathname === "/perspektif/transformation-signals-2026"
          ? "bg-[#071A33]/36"
          : "bg-[#071A33]/34";

  return (
    <footer className={`relative z-20 flex min-h-[620px] flex-col overflow-hidden md:min-h-[820px] ${sectionClass}`}>
      <Image
        src={ctaBackground}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className={`pointer-events-none absolute inset-0 ${overlayClass}`} />

      <FooterCta config={ctaConfig} />

      <div className="relative z-10 mt-auto px-3 pb-0 md:px-8">
        <div className="mx-auto max-w-[1720px] rounded-t-[14px] rounded-b-none bg-[#F7F6EF] px-5 py-7 shadow-[0_-26px_90px_-64px_rgba(0,0,0,0.55)] md:rounded-t-[18px] md:px-12 md:py-12 lg:px-20">
          <FooterContent year={year} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
