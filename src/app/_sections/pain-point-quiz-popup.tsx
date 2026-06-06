"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { useLocale } from "@/i18n/use-locale";

const COPY = {
  id: {
    questions: [
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
    ],
    solutions: [
      "BinaInsight untuk membaca akar masalah dan benchmark internal.",
      "BinaLab untuk membangun kapabilitas praktis yang langsung dipakai.",
      "BinaCoach untuk memperkuat leader dan decision maker.",
      "BinaWorks atau BinaImpact untuk memastikan perubahan masuk ke eksekusi dan terukur.",
    ],
    closeQuiz: "Tutup quiz",
    eyebrow: "Quick Diagnostic",
    startTitle: "Seberapa berat tekanan perubahan di organisasi Anda?",
    startDesc: "Jawab 10 pertanyaan singkat. Hasil Anda akan dibandingkan dengan rata-rata peserta lain dan menjadi database insight BinaHub.",
    startCta: "Mulai Quiz",
    scale: "Skala 1-5",
    ratingTitle: "Nilai kondisi organisasi saat ini.",
    calculating: "Menghitung...",
    showResult: "Lihat Hasil",
    resultTitle: "Hasil singkat Anda",
    yourScore: "Skor Anda",
    average: "Rata-rata",
    participants: "Peserta",
    belowAverage: "Hasil Anda berada di bawah rata-rata peserta lain. Artinya tekanan perubahan di organisasi Anda kemungkinan lebih berat dan perlu dipetakan lebih cepat.",
    aboveAverage: "Hasil Anda berada di atas atau setara rata-rata peserta lain. Fondasinya cukup baik, tetapi tetap perlu diarahkan agar perubahan benar-benar berdampak.",
    nextSolution: "Solusi lanjutan BinaHub",
    saveError: "Hasil quiz belum tersimpan ke database. Silakan coba lagi atau hubungi tim BinaHub.",
    close: "Tutup",
    numberLocale: "id-ID",
  },
  en: {
    questions: [
      "Business priorities feel clear down to team level.",
      "The team has enough energy to carry out new changes.",
      "Important decisions are made with data, not only intuition.",
      "AI or new technology is already part of daily work processes.",
      "Training programs influence workplace behavior, not just finish as events.",
      "Managers can translate strategy into weekly execution rhythms.",
      "Cross-functional collaboration runs without too much friction.",
      "Key talent has a visible development pathway.",
      "The work culture supports experimentation, feedback, and fast improvement.",
      "The impact of people development programs is measured with clear indicators.",
    ],
    solutions: [
      "BinaInsight to uncover root causes and internal benchmarks.",
      "BinaLab to build practical capabilities that can be used immediately.",
      "BinaCoach to strengthen leaders and decision makers.",
      "BinaWorks or BinaImpact to ensure change enters execution and can be measured.",
    ],
    closeQuiz: "Close quiz",
    eyebrow: "Quick Diagnostic",
    startTitle: "How heavy is the pressure for change in your organization?",
    startDesc: "Answer 10 short questions. Your result will be compared with the participant average and become part of BinaHub's insight database.",
    startCta: "Start Quiz",
    scale: "Scale 1-5",
    ratingTitle: "Rate your organization's current condition.",
    calculating: "Calculating...",
    showResult: "View Result",
    resultTitle: "Your Quick Result",
    yourScore: "Your Score",
    average: "Average",
    participants: "Participants",
    belowAverage: "Your result is below the participant average. This suggests the pressure for change in your organization may be heavier and should be mapped sooner.",
    aboveAverage: "Your result is above or aligned with the participant average. The foundation is fairly strong, but it still needs direction so change creates real impact.",
    nextSolution: "Recommended BinaHub Solutions",
    saveError: "The quiz result has not been saved to the database. Please try again or contact the BinaHub team.",
    close: "Close",
    numberLocale: "en-US",
  },
};

type QuizResult = {
  score: number;
  average: number;
  participants: number;
};

export function PainPointQuizPopup() {
  const locale = useLocale();
  const copy = COPY[locale];
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>(Array(copy.questions.length).fill(3));
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [saveError, setSaveError] = useState("");

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
    setSaveError("");
    try {
      const response = await fetch("/api/home-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, score, maxScore: copy.questions.length * 5, locale }),
      });
      const json = await response.json();
      if (!response.ok || !json.success || json.stored === false) {
        setSaveError(json.error || copy.saveError);
      }
      setResult({
        score,
        average: Number(json.average || score),
        participants: Number(json.participants || 1),
      });
    } catch {
      setSaveError(copy.saveError);
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
              aria-label={copy.closeQuiz}
            >
              <X size={16} />
            </button>

            {!started && !result && (
              <div className="pr-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D9A441]">{copy.eyebrow}</p>
                <h2 className="mt-3 max-w-2xl text-3xl font-light leading-tight tracking-[-0.04em] md:text-4xl">
                  {copy.startTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-black/58">
                  {copy.startDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  className="mt-7 inline-flex h-12 items-center gap-3 rounded-[10px] bg-[#0B2C6B] px-5 text-xs font-bold uppercase tracking-[0.14em] text-white"
                >
                  {copy.startCta} <ArrowRight size={15} />
                </button>
              </div>
            )}

            {started && !result && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9A441]">{copy.scale}</p>
                <h2 className="mt-2 pr-10 text-2xl font-light tracking-[-0.03em]">{copy.ratingTitle}</h2>
                <div className="mt-5 space-y-4">
                  {copy.questions.map((question, index) => (
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
                  {submitting ? copy.calculating : copy.showResult} <ArrowRight size={15} />
                </button>
              </div>
            )}

            {result && (
              <div>
                <CheckCircle2 size={42} className="text-[#D9A441]" />
                <h2 className="mt-4 text-3xl font-light tracking-[-0.04em]">{copy.resultTitle}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <ResultCard label={copy.yourScore} value={`${result.score}/${copy.questions.length * 5}`} />
                  <ResultCard label={copy.average} value={`${Math.round(result.average)}/${copy.questions.length * 5}`} />
                  <ResultCard label={copy.participants} value={result.participants.toLocaleString(copy.numberLocale)} />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-black/60">
                  {result.score < result.average
                    ? copy.belowAverage
                    : copy.aboveAverage}
                </p>
                {saveError && (
                  <div className="mt-5 rounded-[12px] border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
                    {saveError}
                  </div>
                )}
                <div className="mt-5 rounded-[12px] border border-[#D9A441]/24 bg-[#FFF8EA] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B6C17]">{copy.nextSolution}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-black/62">
                    {copy.solutions.map((solution) => (
                      <li key={solution}>- {solution}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="mt-5 h-11 rounded-[10px] bg-[#0B2C6B] px-5 text-xs font-bold uppercase tracking-[0.14em] text-white"
                >
                  {copy.close}
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
