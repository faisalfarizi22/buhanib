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
    "w-full resize-none rounded-[12px] border border-black/10 bg-black/[0.02] px-5 py-4 text-base font-medium text-[#0B2C6B] placeholder:text-black/10 transition-all focus:border-[#0B2C6B] focus:bg-white focus:outline-none";

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
        className="space-y-8 rounded-[16px] border border-black/[0.04] bg-white p-8 text-left shadow-[0_18px_54px_-44px_rgba(11,44,107,0.34)] md:p-12"
      >
        <div className="space-y-3">
          <label className="block text-[10px] font-medium text-[#0B2C6B]/60 uppercase tracking-widest px-1">
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
          <label className="block text-[10px] font-medium text-[#0B2C6B]/60 uppercase tracking-widest px-1">
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
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-[12px] border border-[#0B2C6B]/10 bg-white text-[11px] font-bold uppercase tracking-widest text-[#0B2C6B]/60 transition-all hover:bg-black/[0.03] hover:text-[#0B2C6B]"
          >
            <ArrowLeft size={16} /> KEMBALI
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex h-14 flex-[2] items-center justify-center gap-3 rounded-[12px] bg-[#0B2C6B] text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-[#0B2C6B]/10 transition-all hover:bg-black disabled:opacity-70"
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
