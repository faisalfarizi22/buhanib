import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM && process.env.EMAIL_FROM.includes('@') 
  ? process.env.EMAIL_FROM 
  : 'onboarding@resend.dev';
const COMPANY_COPY = process.env.EMAIL_COMPANY_COPY || 'admin@binahub.id';
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || 'BinaHub';

// Zod schema for inquiry validation
const ContactInquirySchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  whatsapp: z.string().optional().default(''),
  message: z.string().min(5, 'Pesan minimal terdiri dari 5 karakter'),
});

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // 1. Zod Validation
    const validationResult = ContactInquirySchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validasi form gagal', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { name, email, whatsapp, message } = validationResult.data;
    const supabase = createServerSupabase();

    // 2. Save lead in "leads" table
    let leadId = null;
    try {
      const { data: lead, error: leadError } = await supabase
        .from('leads')
        .upsert(
          {
            name,
            email,
            phone: whatsapp || '',
            source: 'contact_form',
            lead_status: 'New Lead',
          },
          { onConflict: 'email', ignoreDuplicates: false }
        )
        .select()
        .single();

      if (!leadError && lead) {
        leadId = lead.id;
      } else {
        console.warn('[Contact API Warning] Failed to upsert lead:', leadError);
      }
    } catch (err) {
      console.error('[Contact API Error] Supabase Leads upsert failed:', err);
    }

    // 3. Insert into "inquiries" table
    let isSavedToInquiries = false;
    try {
      const { error: inquiryError } = await supabase
        .from('inquiries')
        .insert({
          lead_id: leadId,
          name,
          email,
          whatsapp,
          message,
          source: 'contact_form',
          status: 'Baru',
        });

      if (!inquiryError) {
        isSavedToInquiries = true;
      } else {
        console.warn('[Contact API Warning] Failed to insert into inquiries table:', inquiryError.message);
        
        // Fail-safe fallback: If inquiries table doesn't exist, we save message into lead notes if possible,
        // or just log it so that we don't block the email and client success response.
        if (leadId) {
          await supabase
            .from('leads')
            .update({
              notes: `Inquiry Message: ${message}`,
            })
            .eq('id', leadId);
        }
      }
    } catch (err: any) {
      console.error('[Contact API Error] Inquiries table insertion failed:', err.message);
    }

    // 4. Send Email Notification to Admin via Resend
    const htmlEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Inquiry Baru - ${COMPANY_NAME}</title>
      </head>
      <body style="margin:0;padding:0;background-color:#F5F7FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <div style="max-width:600px;margin:20px auto;background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E2E8F0;box-shadow:0 4px 12px rgba(0,0,0,0.03);">
          
          <!-- Header -->
          <div style="padding:30px;background-color:#0B2C6B;border-bottom:4px solid #D9A441;text-align:center;">
            <h1 style="color:#FFFFFF;font-size:22px;font-weight:600;margin:0;">Pesan Kontak Baru Masuk</h1>
            <p style="color:rgba(255,255,255,0.7);margin:5px 0 0;font-size:14px;">${COMPANY_NAME} Website</p>
          </div>

          <!-- Body -->
          <div style="padding:40px;color:#1E293B;">
            <p style="font-size:15px;line-height:1.5;margin-top:0;">Halo Admin ${COMPANY_NAME},</p>
            <p style="font-size:15px;line-height:1.5;margin-bottom:25px;">Seseorang baru saja mengirimkan formulir kontak di website Anda. Berikut adalah detail lengkap pesannya:</p>
            
            <!-- Details Table -->
            <table style="width:100%;border-collapse:collapse;margin-bottom:30px;background:#F8FAFC;border-radius:8px;overflow:hidden;">
              <tr>
                <td style="padding:15px 20px;border-bottom:1px solid #E2E8F0;font-weight:600;width:30%;color:#475569;font-size:14px;">Nama Pengirim</td>
                <td style="padding:15px 20px;border-bottom:1px solid #E2E8F0;color:#0F172A;font-size:14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding:15px 20px;border-bottom:1px solid #E2E8F0;font-weight:600;color:#475569;font-size:14px;">Email</td>
                <td style="padding:15px 20px;border-bottom:1px solid #E2E8F0;color:#0F172A;font-size:14px;">
                  <a href="mailto:${email}" style="color:#0B2C6B;text-decoration:none;font-weight:500;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:15px 20px;border-bottom:1px solid #E2E8F0;font-weight:600;color:#475569;font-size:14px;">WhatsApp</td>
                <td style="padding:15px 20px;border-bottom:1px solid #E2E8F0;color:#0F172A;font-size:14px;">
                  ${whatsapp ? `<a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" target="_blank" style="color:#D9A441;text-decoration:none;font-weight:500;">${whatsapp}</a>` : '-'}
                </td>
              </tr>
            </table>

            <!-- Message Box -->
            <div style="background:#F1F5F9;border-left:4px solid #D9A441;padding:20px;border-radius:0 8px 8px 0;margin-bottom:30px;">
              <h3 style="margin:0 0 10px;font-size:14px;color:#475569;text-transform:uppercase;letter-spacing:0.5px;">Isi Pesan:</h3>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#1E293B;white-space:pre-wrap;">${message}</p>
            </div>

            <!-- CTA -->
            <div style="text-align:center;margin-top:40px;">
              <a href="mailto:${email}?subject=Balasan%20Inquiry%20BinaHub" 
                 style="display:inline-block;background-color:#0B2C6B;color:#FFFFFF;text-decoration:none;padding:12px 30px;border-radius:6px;font-weight:600;font-size:14px;box-shadow:0 4px 6px rgba(11,44,107,0.15);">
                Balas Email Langsung
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding:20px 40px;border-top:1px solid #F1F5F9;background-color:#F8FAFC;text-align:center;">
            <p style="color:#94A3B8;font-size:11px;margin:0;">
              Sistem Otomatis BinaHub Notification • Dikirim via Resend
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await resend.emails.send({
        from: `${COMPANY_NAME} <${FROM}>`,
        to: COMPANY_COPY,
        subject: `[INQUIRY BARU] ${name} - ${COMPANY_NAME} Website`,
        html: htmlEmailContent,
      });
      console.log('[Contact API] Email notification sent successfully to admin:', COMPANY_COPY);
    } catch (emailErr: any) {
      console.error('[Contact API Error] Resend email sending failed:', emailErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry Anda berhasil terkirim. Tim kami akan segera menghubungi Anda.',
    });

  } catch (error: any) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan internal server.', details: error.message },
      { status: 500 }
    );
  }
}
