import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { generateAssessmentProposal } from "@/lib/ai-service";
import { sendAssessmentEmail, sendProposalEmail } from "@/lib/email-service";
import { generatePDFBuffer, generateProposalPDFBuffer, AssessmentResult } from "@/lib/pdf-service";
import { requireAdmin } from "../dashboard/route";

function parseJson<T>(value: unknown, fallback: T): T {
  if (!value) return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value as T;
}

async function getAssessment(id: string) {
  const db = createServerSupabase();
  const { data, error } = await db
    .from("assessments")
    .select("id, form_data, scores, category, ai_analysis, recommendations, overall_score")
    .eq("id", id)
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Assessment tidak ditemukan.");
  }

  return data;
}

function buildResult(row: any): AssessmentResult {
  const scores = parseJson<Record<string, number>>(row.scores, {});
  return {
    scores: { ...scores, overall: Number(scores.overall || row.overall_score || 0) } as AssessmentResult["scores"],
    category: row.category || "Belum dikategorikan",
    aiAnalysis: row.ai_analysis || "",
    recommendations: parseJson(row.recommendations, []),
  };
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin(req);
  if ("error" in admin) {
    return NextResponse.json({ success: false, error: admin.error }, { status: admin.status });
  }

  const body = await req.json();
  const id = String(body.id || "");
  if (!id) {
    return NextResponse.json({ success: false, error: "ID assessment tidak ditemukan." }, { status: 400 });
  }

  const { data, error } = await createServerSupabase()
    .from("assessments")
    .update({
      assessment_status: String(body.assessmentStatus || "Follow Up"),
      proposal_status: String(body.proposalStatus || "Belum Diminta"),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, assessment: data });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if ("error" in admin) {
    return NextResponse.json({ success: false, error: admin.error }, { status: admin.status });
  }

  const body = await req.json();
  const id = String(body.id || "");
  const action = String(body.action || "");
  if (!id || !action) {
    return NextResponse.json({ success: false, error: "Action assessment tidak valid." }, { status: 400 });
  }

  const db = createServerSupabase();

  try {
    const row = await getAssessment(id);
    const formData = parseJson<any>(row.form_data, {});
    const result = buildResult(row);

    if (action === "resend_result") {
      const pdfBuffer = await generatePDFBuffer(formData, result);
      await sendAssessmentEmail(formData, result, pdfBuffer, id);
      await db
        .from("assessments")
        .update({
          assessment_status: "Result Email Terkirim",
          result_email_sent_at: new Date().toISOString(),
        })
        .eq("id", id);
      return NextResponse.json({ success: true });
    }

    if (action === "request_proposal") {
      await db
        .from("assessments")
        .update({
          assessment_status: "Minta Proposal",
          proposal_status: "Diminta",
          proposal_requested_at: new Date().toISOString(),
        })
        .eq("id", id);
      return NextResponse.json({ success: true });
    }

    if (action === "send_proposal") {
      const proposal = await generateAssessmentProposal({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        role: formData.role,
        employees: formData.employees,
        challenge: formData.challenge,
        target: formData.target,
        category: row.category,
        overallScore: row.overall_score,
        scores: parseJson(row.scores, {}),
        aiAnalysis: row.ai_analysis,
        recommendations: parseJson(row.recommendations, []),
      });

      const proposalPdf = await generateProposalPDFBuffer(formData, proposal);
      await sendProposalEmail(formData.email, formData.name, formData.company, proposal, proposalPdf);
      await db
        .from("assessments")
        .update({
          assessment_status: "Proposal Terkirim",
          proposal_status: "Terkirim",
          proposal_sent_at: new Date().toISOString(),
          proposal_data: proposal,
        })
        .eq("id", id);

      return NextResponse.json({ success: true, proposal });
    }

    return NextResponse.json({ success: false, error: "Action assessment tidak dikenal." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Gagal memproses assessment." },
      { status: 500 }
    );
  }
}
