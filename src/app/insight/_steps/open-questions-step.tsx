import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { FormData } from "../_types";

interface OpenQuestionsStepProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

export function OpenQuestionsStep({
  formData,
  onChange,
  onSubmit,
  onPrev,
  isSubmitting,
}: OpenQuestionsStepProps) {
  const textareaClass =
    "w-full bg-black/[0.02] border border-black/10 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-[#0A1A3A] focus:bg-white transition-all resize-none font-medium text-[#0A1A3A] placeholder:text-black/10";

  return (
    <motion.div
      key="open-questions"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-2xl px-4 py-12"
    >
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 md:p-12 rounded-[40px] border border-black/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.06)] space-y-8 text-left"
      >
        <div className="space-y-3">
          <label className="block text-[10px] font-medium text-[#0A1A3A]/60 uppercase tracking-widest px-1">
            Apa tantangan terbesar tim Anda saat ini?
          </label>
          <textarea
            rows={4}
            value={formData.challenge}
            onChange={(e) => onChange({ challenge: e.target.value })}
            className={textareaClass}
            placeholder="Tuliskan tantangan utama..."
          />
        </div>

        <div className="space-y-3">
          <label className="block text-[10px] font-medium text-[#0A1A3A]/60 uppercase tracking-widest px-1">
            Target utama (3-6 bulan)?
          </label>
          <textarea
            rows={4}
            value={formData.target}
            onChange={(e) => onChange({ target: e.target.value })}
            className={textareaClass}
            placeholder="Tuliskan target strategis..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-black/[0.05]">
          <button
            type="button"
            onClick={onPrev}
            className="flex-1 h-14 border border-[#0A1A3A]/10 bg-white rounded-2xl text-[11px] font-bold tracking-widest text-[#0A1A3A]/60 hover:bg-black/[0.03] hover:text-[#0A1A3A] transition-all uppercase flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} /> KEMBALI
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-[2] h-14 bg-[#0A1A3A] text-white rounded-2xl text-[11px] font-bold tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-70 uppercase shadow-lg shadow-[#0A1A3A]/10 group"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                MEMPROSES DATA...{" "}
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              </span>
            ) : (
              <span className="flex items-center gap-3">
                SUBMIT & SELESAI <Send size={16} />
              </span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
