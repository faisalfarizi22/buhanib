import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

type QuizRow = {
  score: number | null;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const answers = Array.isArray(body.answers) ? body.answers.map((value: unknown) => Number(value)) : [];
  const score = Number(body.score);
  const maxScore = Number(body.maxScore || 50);

  if (answers.length !== 10 || !Number.isFinite(score)) {
    return NextResponse.json({ success: false, error: "Data quiz tidak valid." }, { status: 400 });
  }

  const db = createServerSupabase();

  try {
    await db.from("home_quiz_results").insert({
      answers,
      score,
      max_score: maxScore,
      page_path: "home:pain-point",
      user_agent: req.headers.get("user-agent") || "",
    });
  } catch {
    return NextResponse.json({
      success: true,
      stored: false,
      score,
      average: score,
      participants: 1,
    });
  }

  const { data } = await db.from("home_quiz_results").select("score");
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
