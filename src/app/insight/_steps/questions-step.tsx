import { motion } from "framer-motion";
import { QUESTIONS } from "../questions";
import { LIKERT_OPTIONS } from "../_types";

interface QuestionsStepProps {
  step: number;
  answers: Record<number, number>;
  onAnswer: (qId: number, val: number) => void;
}

export function QuestionsStep({ step, answers, onAnswer }: QuestionsStepProps) {
  const pageIndex = step - 2;
  const pageQuestions = QUESTIONS.slice(pageIndex * 7, pageIndex * 7 + 7);

  return (
    <motion.div
      key={`page-${step}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-4xl px-4 py-6 flex flex-col items-center"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-light text-[#0A1A3A] leading-tight max-w-2xl">
          Sejauh mana Anda setuju dengan pernyataan berikut?
        </h2>
      </div>

      <div className="space-y-4 w-full max-w-3xl">
        {pageQuestions.map((q, idx) => {
          const globalIdx = pageIndex * 7 + idx + 1;
          const displayIdx = globalIdx < 10 ? `0${globalIdx}` : globalIdx;
          
          return (
            <div
              key={q.id}
              className="relative bg-white p-6 md:p-8 rounded-[40px] border border-black/[0.03] shadow-[0_10px_30px_rgba(0,0,0,0.02)] overflow-hidden"
            >
              {/* Scaled Background Number - Reduced by 30% */}
              <div className="absolute top-[-5px] left-[-2px] text-[70px] font-black text-black/[0.015] leading-none pointer-events-none select-none">
                {displayIdx}
              </div>

              <div className="relative z-10">
                <h3 className="text-base md:text-lg font-light text-[#0A1A3A] mb-5 text-left leading-relaxed px-2">
                  {q.text}
                </h3>

                <div className="grid grid-cols-5 gap-2 md:gap-4">
                  {LIKERT_OPTIONS.map((opt) => {
                    const isSelected = answers[q.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => onAnswer(q.id, opt.value)}
                        className={`flex flex-col items-center justify-center py-3 md:py-5 rounded-2xl border transition-all duration-300 ${isSelected
                            ? "bg-[#0A1A3A] border-[#0A1A3A] text-white shadow-[0_15px_30px_rgba(10,26,58,0.25)] scale-[1.03]"
                            : "bg-[#F5F7F9] border-black/[0.03] text-black/60 hover:bg-black/[0.05] hover:border-black/10"
                          }`}
                      >
                        <span className={`text-xl md:text-2xl font-bold mb-1 transition-colors ${isSelected ? "text-[#D4AF37]" : "text-[#0A1A3A]"}`}>
                          {opt.value}
                        </span>
                        <span className={`text-[6px] md:text-[7px] text-center leading-tight uppercase tracking-widest font-black transition-colors ${isSelected ? "text-white" : "text-black/30"}`}>
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
