import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { analyzeAssessment, scoreLeadWithAI } from '@/lib/ai-service';
import { sendAssessmentEmail } from '@/lib/email-service';
import { generatePDFBuffer, AssessmentResult } from '@/lib/pdf-service';
import { AssessmentSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    
    // 1. Zod Validation
    const validationResult = AssessmentSchema.safeParse(rawBody);
    if (!validationResult.success) {
      console.error('[API Error] Validation failed:', validationResult.error.format());
      return NextResponse.json(
        { success: false, error: 'Validasi data gagal', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const body = validationResult.data;
    const supabase = createServerSupabase();

    // 2. Upsert lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .upsert(
        {
          name: body.name,
          email: body.email,
          company: body.company,
          phone: body.whatsapp || '',
          source: body.source || 'insight_assessment',
        },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select()
      .single();

    if (leadError) {
      console.error('[API Error] Supabase Lead error:', leadError);
      throw leadError;
    }

    // 3. Save raw assessment
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .insert({ 
        lead_id: lead.id, 
        form_data: body 
      })
      .select()
      .single();

    if (assessmentError) {
      console.error('[API Error] Supabase Assessment error:', assessmentError);
      throw assessmentError;
    }

    // 4. AI Analysis & Scoring
    let aiResult;
    try {
      aiResult = await analyzeAssessment(body);
    } catch (aiError: any) {
      console.error('[API Error] AI Analysis failed:', aiError.message);
      return NextResponse.json(
        { success: false, error: 'Gagal melakukan analisis AI. Silakan coba beberapa saat lagi.' },
        { status: 502 }
      );
    }

    // 5. Update assessment with AI results and calculated score
    await supabase
      .from('assessments')
      .update({
        scores: aiResult.scores,
        category: aiResult.category,
        ai_analysis: aiResult.analysis,
        recommendations: aiResult.recommendations,
        overall_score: aiResult.scores.overall,
      })
      .eq('id', assessment.id);

    // 6. Score the lead with AI (non-blocking)
    scoreLeadWithAI({
      source: body.source || 'insight_assessment',
      assessmentCompleted: true,
      name: body.name,
      company: body.company,
      challenge: body.challenge,
    }).then(async (leadScore) => {
      await supabase
        .from('leads')
        .update({ lead_score: leadScore.score, lead_status: leadScore.status })
        .eq('id', lead.id);
    }).catch(e => console.warn('[API Warning] Lead scoring background task failed:', e.message));

    // 7. Generate PDF
    const resultObj: AssessmentResult = {
      scores: aiResult.scores,
      category: aiResult.category,
      aiAnalysis: aiResult.analysis,
      recommendations: aiResult.recommendations,
    };

    let pdfBuffer: Buffer | undefined;
    try {
      console.log('[API] Starting PDF Generation (React-PDF)...');
      pdfBuffer = await generatePDFBuffer(body, resultObj);
    } catch (pdfErr: any) {
      console.error('[API Error] PDF Generation failed:', pdfErr.message);
    }

    // 8. Send email
    try {
      await sendAssessmentEmail(body, resultObj, pdfBuffer);
    } catch (emailError: any) {
      console.error('[API Error] Email sending failed:', emailError.message);
    }

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      leadId: lead.id,
      scores: aiResult.scores,
      category: aiResult.category,
      analysis: aiResult.analysis,
      recommendations: aiResult.recommendations,
    });
  } catch (error: any) {
    console.error('[Assessment API Error]', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan internal server.', details: error.message },
      { status: 500 }
    );
  }
}
