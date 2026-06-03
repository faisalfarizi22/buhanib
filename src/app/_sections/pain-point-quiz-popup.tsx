"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

const QUESTIONS = [
  "Prioritas bisnis terasa jelas sampai ke level tim.",
  "Tim punya energi yang cukup untuk menjalankan perubahan baru.",
  "Keputusan penting dibuat dengan data, bukan hanya intuisi.",
  "AI atau teknologi baru sudah masuk ke proses kerja sehari-hari.",
  "Program training berdampak pada perilaku kerja, bukan hanya selesai sebagai event.",
  "Manager mampu menerjemahkan strategi menjadi ritme eksekusi mingguan.",
  "Kolaborasi lintas fungsi berjalan tanpa terlalu banyak friksi.",
  "Talenta kunci punya jalur pengembangan yang terlihat jelas.",
  "Budaya kerja mendukung eksperimen, umpan balik, dan perbaikan cepat.",
  "Dampak program people development diukur dengan indikator yang jelas.",
];

const SERVICE_SOLUTIONS = [
  "BinaInsight untuk membaca akar masalah dan benchmark internal.",
  "BinaLab untuk membangun kapabilitas praktis yang langsung dipakai.",
  "BinaCoach untuk memperkuat leader dan decision maker.",
  "BinaWorks atau BinaImpact untuk memastikan perubahan masuk ke eksekusi dan terukur.",
];

type QuizResult = {
  score: number;
  average: number;
  participants: number;
};

export function PainPointQuizPopup() {
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(3));
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("binahub_pain_quiz_seen")) {
      return;
    }

    const section = document.getElementById("pain-point");
    if (!section) return;

    let timer: number | undefined;
    const show = () => {
      sessionStorage.setItem("binahub_pain_quiz_seen", "1");
      setVisible(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = window.setTimeout(show, 5000);
        }

        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          if (timer) window.clearTimeout(timer);
          show();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => {
      if (timer) window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const score = useMemo(() => answers.reduce((sum, value) => sum + value, 0), [answers]);

  const close = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("binahub_pain_quiz_seen", "1");
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/home-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, score, maxScore: QUESTIONS.length * 5 }),
      });
      const json = await response.json();
      setResult({
        score,
        average: Number(json.average || score),
        participants: Number(json.participants || 1),
      });
    } catch {
      setResult({ score, average: score, participants: 1 });
    } finally {
      setSubmitting(false);
    }
  };

  if (dismissed && !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-[#06152F]/58 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 22, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[14px] border border-white/16 bg-[#F5F7FA] p-5 text-[#0B2C6B] shadow-[0_30px_90px_-54px_rgba(0,0,0,0.55)] md:p-7"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-[9px] border border-black/10 bg-white text-[#0B2C6B]"
              aria-label="Tutup quiz"
            >
              <X size={16} />
            </button>

            {!started && !result && (
              <div className="pr-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D9A441]">Quick Diagnostic</p>
                <h2 className="mt-3 max-w-2xl text-3xl font-light leading-tight tracking-[-0.04em] md:text-4xl">
                  Seberapa berat tekanan perubahan di organisasi Anda?
                </h2>
                <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-black/58">
                  Jawab 10 pertanyaan singkat. Hasil Anda akan dibandingkan dengan rata-rata peserta lain dan menjadi database insight BinaHub.
                </p>
                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  className="mt-7 inline-flex h-12 items-center gap-3 rounded-[10px] bg-[#0B2C6B] px-5 text-xs font-bold uppercase tracking-[0.14em] text-white"
                >
                  Mulai Quiz <ArrowRight size={15} />
                </button>
              </div>
            )}

            {started && !result && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9A441]">Skala 1-5</p>
                <h2 className="mt-2 pr-10 text-2xl font-light tracking-[-0.03em]">Nilai kondisi organisasi saat ini.</h2>
                <div className="mt-5 space-y-4">
                  {QUESTIONS.map((question, index) => (
                    <div key={question} className="rounded-[12px] border border-black/[0.06] bg-white p-4">
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-sm font-medium leading-relaxed">{index + 1}. {question}</p>
                        <span className="min-w-8 text-right text-sm font-bold text-[#D9A441]">{answers[index]}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={answers[index]}
                        onChange={(event) => {
                          const next = [...answers];
                          next[index] = Number(event.target.value);
                          setAnswers(next);
                        }}
                        className="mt-3 w-full accent-[#D9A441]"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="mt-5 inline-flex h-12 items-center gap-3 rounded-[10px] bg-[#0B2C6B] px-5 text-xs font-bold uppercase tracking-[0.14em] text-white disabled:opacity-50"
                >
                  {submitting ? "Menghitung..." : "Lihat Hasil"} <ArrowRight size={15} />
                </button>
              </div>
            )}

            {result && (
              <div>
                <CheckCircle2 size={42} className="text-[#D9A441]" />
                <h2 className="mt-4 text-3xl font-light tracking-[-0.04em]">Hasil singkat Anda</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <ResultCard label="Skor Anda" value={`${result.score}/${QUESTIONS.length * 5}`} />
                  <ResultCard label="Rata-rata" value={`${Math.round(result.average)}/${QUESTIONS.length * 5}`} />
                  <ResultCard label="Peserta" value={result.participants.toLocaleString("id-ID")} />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-black/60">
                  {result.score < result.average
                    ? "Hasil Anda berada di bawah rata-rata peserta lain. Artinya tekanan perubahan di organisasi Anda kemungkinan lebih berat dan perlu dipetakan lebih cepat."
                    : "Hasil Anda berada di atas atau setara rata-rata peserta lain. Fondasinya cukup baik, tetapi tetap perlu diarahkan agar perubahan benar-benar berdampak."}
                </p>
                <div className="mt-5 rounded-[12px] border border-[#D9A441]/24 bg-[#FFF8EA] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B6C17]">Solusi lanjutan BinaHub</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-black/62">
                    {SERVICE_SOLUTIONS.map((solution) => (
                      <li key={solution}>- {solution}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="mt-5 h-11 rounded-[10px] bg-[#0B2C6B] px-5 text-xs font-bold uppercase tracking-[0.14em] text-white"
                >
                  Tutup
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-black/[0.06] bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/38">{label}</p>
      <p className="mt-2 text-2xl font-light tracking-[-0.04em] text-[#0B2C6B]">{value}</p>
    </div>
  );
}
