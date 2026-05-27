import { Resend } from 'resend';
import { AssessmentData } from './validations';
import { AssessmentResult } from './pdf-service';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM && process.env.EMAIL_FROM.includes('@') 
  ? process.env.EMAIL_FROM 
  : 'onboarding@resend.dev';
const COMPANY_COPY = process.env.EMAIL_COMPANY_COPY || 'admin@binahub.id';
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || 'BinaHub';

export async function sendAssessmentEmail(
  formData: AssessmentData,
  result: AssessmentResult,
  pdfBuffer?: Buffer,
  assessmentId?: string
) {
  // Brand Colors
  const navy = '#0B2C6B';
  const gold = '#D9A441';
  const offWhite = '#F5F7FA';
  const scoreInterpretation = result.scoreInterpretation || `Skor ${result.scores.overall} menempatkan ${formData.company} pada kategori ${result.category}. Ini menunjukkan fondasi organisasi yang dapat diperkuat melalui prioritas strategis yang lebih tajam.`;
  const crossInsights: string[] = [];
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || '').replace(/\/$/, '');
  const proposalUrl = assessmentId && appUrl
    ? `${appUrl}/api/proposal/request?assessmentId=${encodeURIComponent(assessmentId)}`
    : `${appUrl || '#'}?proposal=request`;

  // Premium Corporate HTML Email
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan Eksekutif - ${COMPANY_NAME}</title>
</head>
<body style="margin:0;padding:0;background-color:#E2E8F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:8px;overflow:hidden;margin-top:40px;margin-bottom:40px;box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div style="padding:40px;background-color:${navy};text-align:center;border-bottom:4px solid ${gold};background-image:radial-gradient(circle at 85% 20%, rgba(217,164,65,0.18), transparent 26%), linear-gradient(135deg, rgba(255,255,255,0.05), transparent 45%);">
      <div style="color:${gold};font-size:10px;text-transform:uppercase;letter-spacing:3px;margin-bottom:15px;font-weight:700;">Diagnostik BinaHub Insight</div>
      <h1 style="color:#FFFFFF;font-size:26px;font-weight:600;margin:0 0 10px;letter-spacing:0px;">
        Asesmen Eksekutif Rahasia
      </h1>
      <p style="color:rgba(255,255,255,0.8);margin:0;font-size:16px;font-weight:300;">${formData.company}</p>
    </div>

    <!-- Body -->
    <div style="padding:40px;">
      <p style="color:${navy};font-size:16px;margin:0 0 20px;font-weight:400;">
        Yth. <strong>Bapak/Ibu ${formData.name}</strong>,
      </p>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 35px;font-weight:400;">
        Terima kasih telah menyelesaikan proses diagnostik BinaHub Insight. Laporan awal Anda telah kami proses dan kami lampirkan dalam bentuk PDF agar dapat ditinjau secara lebih utuh oleh tim internal ${formData.company}.
      </p>

      <!-- Score Card -->
      <div style="background:${offWhite};border-radius:12px;padding:35px;text-align:center;margin:0 0 35px;border:1px solid #E2E8F0;">
        <p style="color:#64748B;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 15px;font-weight:600;">Skor Keseluruhan</p>
        <div style="font-size:64px;font-weight:700;color:${navy};margin:0 0 15px;line-height:1;">${result.scores.overall}</div>
        <div style="display:inline-block;background:${gold};color:${navy};padding:6px 20px;border-radius:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">
          Tahap: ${result.category}
        </div>
        <p style="color:#475569;font-size:14px;line-height:1.6;margin:22px 0 0;font-weight:400;">
          ${scoreInterpretation}
        </p>
        ${result.archetype ? `
          <div style="margin-top:18px;display:inline-block;border:1px solid #E2E8F0;background:#FFFFFF;color:${navy};padding:8px 18px;border-radius:999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.4px;">
            ${result.archetype}
          </div>
        ` : ''}
      </div>

      <!-- Analysis -->
      <h2 style="color:${navy};font-size:18px;font-weight:600;margin:0 0 15px;border-left:3px solid ${gold};padding-left:12px;">Catatan Pendahuluan</h2>
      <div style="background:#FFFFFF;padding:0 0 35px 0;">
        <p style="color:#475569;font-size:15px;line-height:1.7;margin:0;font-weight:400;">Email ini bersifat sebagai pengantar resmi atas hasil diagnostik yang telah diselesaikan. Seluruh detail analisis, prioritas pengembangan, penalaran lintas dimensi, dan rekomendasi awal tersedia dalam PDF terlampir.</p>
      </div>

      ${crossInsights.length ? `
        <h2 style="color:${navy};font-size:18px;font-weight:600;margin:0 0 15px;border-left:3px solid ${gold};padding-left:12px;">Penalaran Diagnostik</h2>
        ${crossInsights.slice(0, 2).map((insight) => `
          <div style="padding:18px;background:#FFFFFF;border-radius:8px;margin-bottom:12px;border:1px solid #E2E8F0;">
            <div style="width:34px;height:1px;background:${gold};margin-bottom:12px;"></div>
            <p style="color:#475569;font-size:14px;margin:0;line-height:1.55;">${insight}</p>
          </div>
        `).join('')}
      ` : ''}

      <!-- Recommendation Highlights -->
      <h2 style="color:${navy};font-size:18px;font-weight:600;margin:0 0 15px;border-left:3px solid ${gold};padding-left:12px;">Dokumen Rujukan</h2>
      ${result.recommendations.slice(0, 0).map((rec) => `
        <div style="padding:20px;background:${offWhite};border-radius:8px;margin-bottom:12px;border:1px solid #E2E8F0;border-left:4px solid ${navy};">
          <div style="color:${gold};font-size:10px;font-weight:700;margin-bottom:5px;text-transform:uppercase;">Prioritas Strategis — ${rec.service}</div>
          <p style="color:${navy};font-size:15px;font-weight:600;margin:0 0 8px;">${rec.title}</p>
          ${rec.diagnosis ? `<p style="color:${navy};font-size:13px;margin:0 0 8px;line-height:1.5;font-weight:500;">${rec.diagnosis}</p>` : ''}
          <p style="color:#64748B;font-size:14px;margin:0;line-height:1.5;">${rec.description}</p>
        </div>
      `).join('')}

      ${false && result.riskProjection ? `
        <div style="background:#FFF8E8;border-radius:8px;padding:22px;margin:30px 0;border:1px solid #F4E5B2;">
          <div style="color:${navy};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:8px;">Proyeksi Risiko 12-18 Bulan</div>
          <p style="color:#475569;font-size:14px;line-height:1.6;margin:0;">${result.riskProjection}</p>
        </div>
      ` : ''}

      <!-- PDF Note -->
      <div style="background:${offWhite};border-radius:8px;padding:25px;text-align:center;margin:35px 0;">
        <p style="color:#475569;font-size:14px;margin:0;line-height:1.6;">
          <strong>Laporan lengkap (PDF)</strong> berisi detail visualisasi, insight diagnostik, prioritas strategis, dan roadmap awal. Badan email ini kami buat ringkas agar dokumen utama tetap menjadi rujukan resmi.
        </p>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin:45px 0 10px;">
        <p style="color:#475569;font-size:14px;margin-bottom:20px;">Jika Bapak/Ibu ingin mengetahui bentuk program, ruang lingkup, dan arah investasi yang paling relevan dengan hasil diagnostik ini, silakan minta penawaran awal dari tim kami.</p>
        <a href="${proposalUrl}" 
           style="display:inline-block;background-color:${navy};color:#FFFFFF;text-decoration:none;padding:16px 40px;border-radius:6px;font-weight:600;font-size:15px;letter-spacing:0.5px;box-shadow: 0 4px 6px rgba(10,26,58,0.2);">
          Minta Penawaran
        </a>
        <div style="margin-top:25px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}?chat=open&name=${encodeURIComponent(formData.name)}&company=${encodeURIComponent(formData.company)}&score=${result.scores.overall}" 
             style="color:${navy};font-size:13px;font-weight:600;text-decoration:underline;">
            Ajukan pertanyaan awal melalui asisten BinaHub
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:30px 40px;border-top:1px solid #E2E8F0;text-align:center;background-color:${offWhite};">
      <p style="color:${navy};font-size:12px;margin:0;font-weight:600;letter-spacing:1px;text-transform:uppercase;">${COMPANY_NAME}</p>
      <p style="color:#94A3B8;font-size:11px;margin:8px 0 0;">
        Mitra Transformasi Manusia & Kapabilitas Masa Depan<br>
        Email ini dikirim secara otomatis. Jika butuh bantuan, balas ke ${process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'hello@binahub.id'}
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    console.log(`[Email] Sending to ${formData.email}. PDF Attached: ${!!pdfBuffer} (${pdfBuffer?.length || 0} bytes)`);

    // Send to client
    const clientRes = await resend.emails.send({
      from: `${COMPANY_NAME} <${FROM}>`,
      to: formData.email,
      subject: `Asesmen Eksekutif Rahasia · ${formData.company}`,
      html: htmlBody,
      attachments: pdfBuffer
        ? [{ 
            filename: `Laporan_Diagnostik_${formData.company.replace(/\s+/g, '_')}.pdf`, 
            content: pdfBuffer.toString('base64') 
          }]
        : [],
    });

    console.log('[Email] Client email response:', clientRes);

    // Send copy to company
    const adminRes = await resend.emails.send({
      from: `${COMPANY_NAME} <${FROM}>`,
      to: COMPANY_COPY,
      subject: `[LEAD BARU] Assessment: ${formData.company} (${result.category})`,
      html: `<p>Data diagnostik baru telah diterima dari <strong>${formData.name}</strong> (${formData.company}).<br>
      Email: ${formData.email}<br>WhatsApp: ${formData.whatsapp || '-'}<br>
      Skor: ${result.scores.overall}/100 — Kategori: ${result.category}</p>`,
    });

    console.log('[Email] Admin notification response:', adminRes);
  } catch (error) {
    console.error('[Email Error] Failed to send assessment emails:', error);
  }
}

export async function sendOutreachEmail(
  to: string,
  name: string,
  subject: string,
  htmlContent: string,
  company?: string
) {
  return resend.emails.send({
    from: `${COMPANY_NAME} <${FROM}>`,
    to,
    subject,
    html: htmlContent.replace('{{name}}', name).replace('{{company}}', company || 'Perusahaan Anda'),
    headers: {
      'List-Unsubscribe': `<${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe>`,
    },
  });
}

export async function sendProposalEmail(
  to: string,
  name: string,
  company: string,
  proposal: {
    subject?: string;
    opening?: string;
    proposedProgram?: string;
    scope?: string[];
    timeline?: string;
    investmentNote?: string;
    nextStep?: string;
  },
  pdfBuffer?: Buffer
) {
  const navy = '#0B2C6B';
  const gold = '#D9A441';
  const subject = proposal.subject || `Proposal Penawaran BinaHub untuk ${company}`;

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#EAF0F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:640px;margin:36px auto;background:#FFFFFF;border-radius:10px;overflow:hidden;border:1px solid #DDE5F0;">
    <div style="background:${navy};padding:34px 38px;border-bottom:4px solid ${gold};">
      <p style="margin:0 0 10px;color:${gold};font-size:10px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;">Proposal Penawaran BinaHub</p>
      <h1 style="margin:0;color:#FFFFFF;font-size:25px;font-weight:600;line-height:1.25;">${proposal.proposedProgram || 'Program Transformasi Organisasi'}</h1>
      <p style="margin:12px 0 0;color:rgba(255,255,255,0.72);font-size:14px;">${company}</p>
    </div>
    <div style="padding:36px 38px;color:#334155;">
      <p style="margin:0 0 18px;color:${navy};font-size:16px;">Yth. <strong>${name}</strong>,</p>
      <p style="margin:0 0 22px;line-height:1.7;font-size:15px;">${proposal.opening || 'Berdasarkan hasil diagnostik yang telah Anda selesaikan, kami menyusun penawaran awal yang dapat menjadi bahan diskusi internal dan tindak lanjut bersama tim BinaHub.'}</p>
      <p style="margin:0 0 26px;line-height:1.7;font-size:15px;">Detail ruang lingkup, estimasi timeline, pilihan paket A/B/C, dan catatan investasi kami lampirkan dalam PDF proposal. Email ini kami buat sebagai pengantar agar dokumen utama tetap menjadi rujukan resmi.</p>

      <div style="border-top:1px solid #E2E8F0;padding-top:24px;text-align:center;">
        <p style="margin:0 0 18px;color:#475569;font-size:14px;line-height:1.6;">${proposal.nextStep || 'Langkah berikutnya adalah menyelaraskan prioritas program, ruang lingkup, peserta, dan paket yang paling sesuai.'}</p>
        <a href="https://calendly.com/binahub-diagnostic/consultation" style="display:inline-block;background:${navy};color:#FFFFFF;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:700;font-size:14px;">Jadwalkan Diskusi Lanjutan</a>
        <div style="margin-top:22px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}?chat=open&name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}"
             style="color:${navy};font-size:13px;font-weight:600;text-decoration:underline;">
            Ajukan pertanyaan awal melalui asisten BinaHub
          </a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

  return resend.emails.send({
    from: `${COMPANY_NAME} <${FROM}>`,
    to,
    subject,
    html,
    attachments: pdfBuffer
      ? [{
          filename: `Proposal_Penawaran_${company.replace(/\s+/g, '_')}.pdf`,
          content: pdfBuffer.toString('base64'),
        }]
      : [],
  });
}
