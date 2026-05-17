import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-black/[0.05] bg-white overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-8 group">
              <div className="relative h-10 w-44 transition-transform group-hover:scale-105 duration-300">
                <Image 
                  src="/full-logo.png" 
                  alt="BinaHub Logo" 
                  fill 
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-[#0A1A3A]/60 text-lg font-light leading-relaxed max-w-md">
              Mendorong pertumbuhan organisasi melalui pengembangan SDM strategis dan keunggulan ekosistem digital.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold tracking-[0.25em] text-[#0A1A3A] uppercase mb-8 opacity-40">
              Navigasi
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Tentang Kami", href: "/about" },
                { label: "Ekosistem", href: "/ecosystem" },
                { label: "Metodologi", href: "#methodology" },
                { label: "Mulai Asesmen", href: "/insight" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-[#0A1A3A]/60 hover:text-[#D4AF37] transition-colors font-medium flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#D4AF37]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-bold tracking-[0.25em] text-[#0A1A3A] uppercase mb-8 opacity-40">
              Kontak & Kehadiran
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#0A1A3A]/40 uppercase tracking-widest mb-1">Lokasi Kantor</span>
                  <p className="text-[#0A1A3A]/70 leading-relaxed font-light">
                    Kawasan Bisnis Sudirman, District 8 <br />
                    Jakarta Selatan, 12190
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#0A1A3A]/40 uppercase tracking-widest mb-1">Email Pertanyaan</span>
                  <p className="text-[#0A1A3A]/70 font-medium">halo@binahub.id</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#0A1A3A]/40 uppercase tracking-widest mb-1">WhatsApp Layanan</span>
                  <p className="text-[#0A1A3A]/70 font-medium">+62 812-1234-5678</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-black/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[10px] text-black/20 tracking-wider flex items-center gap-2">
            © {year} <span className="font-bold text-[#0A1A3A]">Bina<span className="text-[#D4AF37]">Hub</span></span>. PT BINA HUB BERDIKARI.
          </div>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[10px] text-black/25 hover:text-[#D4AF37] transition-colors tracking-widest font-bold uppercase">Kebijakan Privasi</Link>
            <Link href="#" className="text-[10px] text-black/25 hover:text-[#D4AF37] transition-colors tracking-widest font-bold uppercase">Syarat & Ketentuan</Link>
          </div>
          <div className="text-[10px] text-black/10 tracking-[0.4em] font-black uppercase">
            People. Learning. Elevated.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
