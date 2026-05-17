import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SCALE_ITEMS = [
  { val: 1, label: "SANGAT TIDAK SETUJU", color: "text-[#EF4444]", bg: "bg-[#FEF2F2]", border: "border-[#FEE2E2]" },
  { val: 2, label: "TIDAK SETUJU", color: "text-[#F59E0B]", bg: "bg-[#FFFBEB]", border: "border-[#FEF3C7]" },
  { val: 3, label: "NETRAL / 50:50", color: "text-[#64748B]", bg: "bg-[#F8FAFC]", border: "border-[#F1F5F9]" },
  { val: 4, label: "SETUJU", color: "text-[#3B82F6]", bg: "bg-[#EFF6FF]", border: "border-[#DBEAFE]" },
  { val: 5, label: "SANGAT SETUJU", color: "text-[#10B981]", bg: "bg-[#ECFDF5]", border: "border-[#D1FAE5]" },
];

interface InstructionStepProps {
  onNext: () => void;
  onPrev: () => void;
}

export function InstructionStep({ onNext, onPrev }: InstructionStepProps) {
  return (
    <motion.div
      key="instruction"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-4xl px-6 py-12 flex flex-col items-center"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-light text-[#0A1A3A] mb-4">Instruksi Pengisian</h2>
        <p className="text-black/40 text-sm font-medium tracking-wide max-w-xl mx-auto leading-relaxed">
          Berikan penilaian sesuai kondisi di tempat kerja Anda saat ini. <br />
          Kejujuran Anda sangat krusial bagi akurasi laporan.
        </p>
      </div>

      <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-2xl mb-10">
        <div className="space-y-4">
          {SCALE_ITEMS.map((item) => (
            <div 
              key={item.val} 
              className={`flex items-center p-3 rounded-2xl border ${item.bg} ${item.border}`}
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-lg text-[#0A1A3A] mr-4 md:mr-6 shrink-0 border border-black/5">
                {item.val}
              </div>
              <div className={`text-[11px] font-medium uppercase tracking-[0.15em] ${item.color}`}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 w-full max-w-2xl">
        <button 
          onClick={onPrev} 
          className="px-8 h-14 border border-black/10 rounded-xl text-[11px] font-bold tracking-widest text-black/50 hover:bg-black/5 transition-all uppercase flex items-center gap-2"
        >
          <ArrowLeft size={14} /> Kembali
        </button>
        <button 
          onClick={onNext} 
          className="flex-1 h-14 bg-[#0A1A3A] text-white rounded-xl text-[11px] font-bold tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 uppercase shadow-lg shadow-black/10"
        >
          Saya Mengerti, Mulai <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
