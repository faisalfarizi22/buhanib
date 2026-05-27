import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Mail, ArrowRight, Bell } from "lucide-react";

interface SuccessStepProps {
  name: string;
  company: string;
}

export function SuccessStep({ name, company }: SuccessStepProps) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-4xl px-6 py-20 flex flex-col items-center"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 bg-[#D9A441]/4 blur-[120px]" />
      
      <div className="relative z-10 w-full max-w-2xl text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-[16px] border border-emerald-100 bg-emerald-50 text-emerald-500 shadow-[0_18px_52px_-42px_rgba(16,185,129,0.46)]"
        >
          <Check size={48} strokeWidth={3} />
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-light text-[#0B2C6B] mb-6 leading-tight">
          Terima Kasih, <span className="text-[#D9A441] italic font-medium">{name.split(" ")[0]}!</span>
        </h2>
        
        <p className="text-[#0B2C6B]/60 text-lg md:text-xl mb-12 leading-relaxed font-light">
          Asesmen untuk <strong>{company}</strong> telah berhasil kami terima. Hasil analisa strategis lengkap akan dikirimkan langsung ke <strong>Email & WhatsApp</strong> Anda segera setelah tim kami melakukan validasi.
        </p>

        <div className="mb-12 flex items-start gap-4 rounded-[14px] border border-black/[0.03] bg-[#F5F7FA] p-6 text-left">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
            <Bell size={20} className="text-[#D9A441]" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-[#0B2C6B] uppercase tracking-widest mb-1">Notifikasi</span>
            <p className="text-[12px] text-black/40 leading-relaxed font-medium">
              Pastikan untuk memeriksa folder <strong>Inbox</strong> atau <strong>Spam</strong> pada email korporasi Anda dalam 1x24 jam ke depan.
            </p>
          </div>
        </div>

        <div className="mb-12 rounded-[14px] border border-[#D9A441]/18 bg-[#D9A441]/[0.055] p-6 text-left">
          <span className="block text-[10px] font-bold text-[#D9A441] uppercase tracking-widest mb-4">
            Preview Area Analisis
          </span>
          <p className="text-sm text-[#0B2C6B]/62 leading-relaxed font-light mb-5">
            Berdasarkan struktur assessment, laporan Anda akan membaca pola yang berkaitan dengan:
          </p>
          <div className="flex flex-wrap gap-2">
            {["Leadership Alignment", "Execution Rhythm", "Learning Culture"].map((item) => (
              <span key={item} className="rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B2C6B]/58">
                {item}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="group flex h-16 items-center justify-center gap-3 rounded-[12px] bg-[#0B2C6B] px-12 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-[#0B2C6B]/20 transition-all hover:bg-black"
          >
            KEMBALI KE BERANDA <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="flex items-center gap-3 px-6 text-[10px] font-bold text-[#D9A441] tracking-[0.3em] uppercase">
            <Mail size={16} /> info@binahub.id
          </div>
        </div>
      </div>
    </motion.div>
  );
}
