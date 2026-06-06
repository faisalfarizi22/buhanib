import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

type QuizRow = {
  score: number | null;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const isEnglish = body?.locale === "en";
  const answers = Array.isArray(body.answers) ? body.answers.map((value: unknown) => Number(value)) : [];
  const score = Number(body.score);
  const maxScore = Number(body.maxScore || 50);

  if (
    answers.length !== 10 ||
    answers.some((value: number) => !Number.isFinite(value) || value < 1 || value > 5) ||
    !Number.isFinite(score)
  ) {
    return NextResponse.json(
      {
        success: false,
        error: isEnglish ? "Invalid quiz data." : "Data quiz tidak valid.",
      },
      { status: 400 }
    );
  }

  const db = createServerSupabase();

  const { error: insertError } = await db.from("home_quiz_results").insert({
    answers,
    score,
    max_score: maxScore,
    page_path: "home:pain-point",
    user_agent: req.headers.get("user-agent") || "",
  });

  if (insertError) {
    console.error("[Home Quiz API] Failed to store quiz result:", insertError);
    return NextResponse.json({
      success: false,
      stored: false,
      score,
      average: score,
      participants: 1,
      error: isEnglish
        ? "The quiz result could not be saved. Please check the database configuration."
        : "Hasil quiz tidak dapat disimpan. Mohon periksa konfigurasi database.",
      details: insertError.message,
    }, { status: 500 });
  }

  const { data, error: selectError } = await db.from("home_quiz_results").select("score");
  if (selectError) {
    console.error("[Home Quiz API] Failed to read quiz aggregate:", selectError);
  }
  const scores = ((data || []) as QuizRow[])
    .map((row) => Number(row.score))
    .filter((value) => Number.isFinite(value));
  const aggregateScores = scores.length ? scores : [score];
  const participants = aggregateScores.length;
  const average = Math.round(aggregateScores.reduce((sum, value) => sum + value, 0) / participants);

  return NextResponse.json({
    success: true,
    stored: true,
    score,
    average,
    participants,
  });
}
