import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Tentang Kami", href: "/about" },
  { label: "Layanan", href: "/ecosystem" },
  { label: "Perspektif", href: "/perspektif" },
  { label: "Mulai Diagnosa", href: "/insight" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-black/[0.04] bg-[linear-gradient(to_bottom,#FFFFFF,#FAFBFC)] px-6 pb-12 pt-24 md:px-12 lg:px-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9A441]/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-[12%] top-0 h-20 bg-[#0B2C6B]/[0.025] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-180px] right-[-120px] h-[520px] w-[520px] rounded-full bg-[#D9A441]/7 blur-[120px]" />
      <div className="pointer-events-none absolute left-[-180px] top-[18%] h-[420px] w-[420px] rounded-full bg-[#0B2C6B]/[0.035] blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[repeating-linear-gradient(90deg,rgba(11,44,107,0.55)_0_1px,transparent_1px_34px)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-24 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
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

            <p className="mb-5 max-w-[430px] text-[16px] md:text-[19px] font-light leading-[1.75] text-[#0B2C6B]/64">
              Transformasi manusia, kepemimpinan, dan kapabilitas untuk masa depan yang terus berubah.
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D9A441]/85">
              People. Learning. Elevated.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.25em] text-[#0B2C6B] opacity-40">
              Navigasi
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 font-medium text-[#0B2C6B]/60 transition-all duration-300 hover:translate-x-0.5 hover:text-[#0B2C6B]"
                  >
                    <ArrowRight
                      size={14}
                      className="-ml-4 text-[#D9A441] opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100"
                    />
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#D9A441]/70 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.25em] text-[#0B2C6B] opacity-40">
              Kontak & Kehadiran
            </h4>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D9A441]/10">
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D9A441]/10">
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D9A441]/10">
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

        <div className="flex flex-col items-center justify-between gap-6 border-t border-black/[0.055] pt-12 md:flex-row">
          <div className="flex items-center gap-2 text-[10px] tracking-wider text-black/35">
            © {year}{" "}
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
    </footer>
  );
};

export default Footer;
