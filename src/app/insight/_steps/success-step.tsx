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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-2xl text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 rounded-[32px] bg-emerald-50 text-emerald-500 flex items-center justify-center mb-10 mx-auto shadow-2xl shadow-emerald-500/10 border border-emerald-100"
        >
          <Check size={48} strokeWidth={3} />
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-light text-[#0A1A3A] mb-6 leading-tight">
          Terima Kasih, <span className="text-[#D4AF37] italic font-medium">{name.split(" ")[0]}!</span>
        </h2>
        
        <p className="text-[#0A1A3A]/60 text-lg md:text-xl mb-12 leading-relaxed font-light">
          Asesmen untuk <strong>{company}</strong> telah berhasil kami terima. Hasil analisa strategis lengkap akan dikirimkan langsung ke <strong>Email & WhatsApp</strong> Anda segera setelah tim kami melakukan validasi.
        </p>

        <div className="bg-[#F8F9FB] rounded-3xl p-6 border border-black/[0.03] flex items-start gap-4 text-left mb-12">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
            <Bell size={20} className="text-[#D4AF37]" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-[#0A1A3A] uppercase tracking-widest mb-1">Notifikasi</span>
            <p className="text-[12px] text-black/40 leading-relaxed font-medium">
              Pastikan untuk memeriksa folder <strong>Inbox</strong> atau <strong>Spam</strong> pada email korporasi Anda dalam 1x24 jam ke depan.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="h-16 px-12 bg-[#0A1A3A] text-white rounded-2xl text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-[#0A1A3A]/20 group"
          >
            KEMBALI KE BERANDA <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="flex items-center gap-3 px-6 text-[10px] font-bold text-[#D4AF37] tracking-[0.3em] uppercase">
            <Mail size={16} /> halo@binahub.id
          </div>
        </div>
      </div>
    </motion.div>
  );
}
