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
  pdfBuffer?: Buffer
) {
  // Brand Colors
  const navy = '#0A1A3A';
  const gold = '#D4AF37';
  const offWhite = '#F8F9FB';

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
    <div style="padding:40px;background-color:${navy};text-align:center;border-bottom:4px solid ${gold};">
      <div style="color:${gold};font-size:10px;text-transform:uppercase;letter-spacing:3px;margin-bottom:15px;font-weight:700;">BinaHub Insight Diagnostic</div>
      <h1 style="color:#FFFFFF;font-size:26px;font-weight:600;margin:0 0 10px;letter-spacing:0px;">
        Laporan Eksekutif Kematangan Organisasi
      </h1>
      <p style="color:rgba(255,255,255,0.8);margin:0;font-size:16px;font-weight:300;">${formData.company}</p>
    </div>

    <!-- Body -->
    <div style="padding:40px;">
      <p style="color:${navy};font-size:16px;margin:0 0 20px;font-weight:400;">
        Yth. <strong>Bapak/Ibu ${formData.name}</strong>,
      </p>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 35px;font-weight:400;">
        Terima kasih telah meluangkan waktu untuk menyelesaikan proses diagnostik BinaHub Insight. Tim konsultan kami telah memproses data Anda untuk memetakan kondisi operasional dan sumber daya manusia di perusahaan Anda saat ini.
      </p>

      <!-- Score Card -->
      <div style="background:${offWhite};border-radius:12px;padding:35px;text-align:center;margin:0 0 35px;border:1px solid #E2E8F0;">
        <p style="color:#64748B;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 15px;font-weight:600;">Skor Keseluruhan</p>
        <div style="font-size:64px;font-weight:700;color:${navy};margin:0 0 15px;line-height:1;">${result.scores.overall}</div>
        <div style="display:inline-block;background:${gold};color:${navy};padding:6px 20px;border-radius:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">
          Tahap: ${result.category}
        </div>
      </div>

      <!-- Analysis -->
      <h2 style="color:${navy};font-size:18px;font-weight:600;margin:0 0 15px;border-left:3px solid ${gold};padding-left:12px;">Ringkasan Eksekutif</h2>
      <div style="background:#FFFFFF;padding:0 0 35px 0;">
        <p style="color:#475569;font-size:15px;line-height:1.7;margin:0;font-weight:400;">${result.aiAnalysis}</p>
      </div>

      <!-- Recommendation Highlights -->
      <h2 style="color:${navy};font-size:18px;font-weight:600;margin:0 0 15px;border-left:3px solid ${gold};padding-left:12px;">Prioritas Strategis</h2>
      ${result.recommendations.slice(0, 3).map((rec, i) => `
        <div style="padding:20px;background:${offWhite};border-radius:8px;margin-bottom:12px;border:1px solid #E2E8F0;border-left:4px solid ${navy};">
          <div style="color:${gold};font-size:10px;font-weight:700;margin-bottom:5px;text-transform:uppercase;">Prioritas 0${i+1} — ${rec.service}</div>
          <p style="color:${navy};font-size:15px;font-weight:600;margin:0 0 8px;">${rec.title}</p>
          <p style="color:#64748B;font-size:14px;margin:0;line-height:1.5;">${rec.description}</p>
        </div>
      `).join('')}

      <!-- PDF Note -->
      <div style="background:${offWhite};border-radius:8px;padding:25px;text-align:center;margin:35px 0;">
        <p style="color:#475569;font-size:14px;margin:0;line-height:1.6;">
          <strong>Laporan lengkap (PDF)</strong> yang berisi visualisasi data mendalam untuk 7 Dimensi Organisasi telah kami lampirkan pada email ini.
        </p>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin:45px 0 10px;">
        <p style="color:#475569;font-size:14px;margin-bottom:20px;">Langkah selanjutnya adalah mendiskusikan hasil ini melalui sesi konsultasi strategis.</p>
        <a href="https://calendly.com/binahub-diagnostic/consultation" 
           style="display:inline-block;background-color:${navy};color:#FFFFFF;text-decoration:none;padding:16px 40px;border-radius:6px;font-weight:600;font-size:15px;letter-spacing:0.5px;box-shadow: 0 4px 6px rgba(10,26,58,0.2);">
          Kunci Jadwal Konsultasi (Calendly)
        </a>
        <div style="margin-top:25px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://assessment.binahub.id'}?chat=open&name=${encodeURIComponent(formData.name)}&company=${encodeURIComponent(formData.company)}&score=${result.scores.overall}" 
             style="color:${navy};font-size:13px;font-weight:600;text-decoration:underline;">
            Pelajari lebih lanjut & Konsultasi Interaktif
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:30px 40px;border-top:1px solid #E2E8F0;text-align:center;background-color:${offWhite};">
      <p style="color:${navy};font-size:12px;margin:0;font-weight:600;letter-spacing:1px;text-transform:uppercase;">${COMPANY_NAME}</p>
      <p style="color:#94A3B8;font-size:11px;margin:8px 0 0;">
        Human Transformation & Future Capability Partner<br>
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
      subject: `Laporan Eksekutif BinaHub Insight: ${formData.company}`,
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
