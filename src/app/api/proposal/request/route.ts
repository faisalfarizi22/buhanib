import { NextRequest, NextResponse } from "next/server";
import { generateAssessmentProposal } from "@/lib/ai-service";
import { sendProposalEmail } from "@/lib/email-service";
import { generateProposalPDFBuffer } from "@/lib/pdf-service";
import { createServerSupabase } from "@/lib/supabase";

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

function htmlResponse(title: string, message: string, status = 200) {
  return new NextResponse(
    `<!doctype html>
    <html lang="id">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
      </head>
      <body style="margin:0;background:#F5F7FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0B2C6B;">
        <main style="min-height:100vh;display:grid;place-items:center;padding:32px;">
          <section style="max-width:620px;background:#fff;border:1px solid #E2E8F0;border-radius:14px;padding:38px;box-shadow:0 24px 70px -48px rgba(11,44,107,.35);">
            <p style="margin:0 0 10px;color:#D9A441;font-size:11px;font-weight:800;letter-spacing:2.4px;text-transform:uppercase;">BinaHub Proposal</p>
            <h1 style="margin:0 0 14px;font-size:30px;line-height:1.15;font-weight:500;letter-spacing:-.04em;">${title}</h1>
            <p style="margin:0;color:#475569;font-size:15px;line-height:1.7;">${message}</p>
          </section>
        </main>
      </body>
    </html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

export async function GET(req: NextRequest) {
  const assessmentId = req.nextUrl.searchParams.get("assessmentId");
  if (!assessmentId) {
    return htmlResponse("Link Tidak Valid", "ID assessment tidak ditemukan pada link penawaran.", 400);
  }

  const db = createServerSupabase();
  const { data, error } = await db
    .from("assessments")
    .select("id, form_data, scores, category, ai_analysis, recommendations, overall_score, proposal_sent_at")
    .eq("id", assessmentId)
    .single();

  if (error || !data) {
    return htmlResponse("Assessment Tidak Ditemukan", "Kami tidak dapat menemukan data assessment untuk membuat penawaran.", 404);
  }

  const formData = parseJson<any>(data.form_data, {});
  if (!formData.email) {
    return htmlResponse("Email Tidak Ditemukan", "Data assessment ini belum memiliki email tujuan penawaran.", 400);
  }

  if (data.proposal_sent_at) {
    return htmlResponse(
      "Penawaran Sudah Dikirim",
      "Proposal penawaran untuk assessment ini sudah pernah dibuat dan dikirim ke email Anda. Silakan cek inbox atau folder spam."
    );
  }

  try {
    await db
      .from("assessments")
      .update({
        assessment_status: "Minta Proposal",
        proposal_status: "Sedang Disusun",
        proposal_requested_at: new Date().toISOString(),
      })
      .eq("id", assessmentId);

    const proposal = await generateAssessmentProposal({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      role: formData.role,
      employees: formData.employees,
      challenge: formData.challenge,
      target: formData.target,
      category: data.category,
      overallScore: data.overall_score,
      scores: parseJson(data.scores, {}),
      aiAnalysis: data.ai_analysis,
      recommendations: parseJson(data.recommendations, []),
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
      .eq("id", assessmentId);

    return htmlResponse(
      "Penawaran Sedang Dikirim",
      "Terima kasih. Proposal penawaran awal telah dibuat berdasarkan hasil assessment dan sedang dikirim ke email Anda."
    );
  } catch (proposalError) {
    await db
      .from("assessments")
      .update({ proposal_status: "Gagal Diproses" })
      .eq("id", assessmentId);

    return htmlResponse(
      "Penawaran Belum Dapat Diproses",
      proposalError instanceof Error
        ? proposalError.message
        : "Terjadi kendala saat membuat proposal penawaran. Silakan hubungi tim BinaHub.",
      500
    );
  }
}
