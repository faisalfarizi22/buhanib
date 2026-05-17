import OpenAI from 'openai';
import { AssessmentData, DIMENSIONS } from './validations';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'arcee-ai/trinity-large-thinking:free';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || 'PT BinaHub';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': APP_URL,
    'X-Title': COMPANY_NAME,
  },
});

async function callAI(messages: any[], jsonMode: boolean = false) {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is missing');
  }

  try {
    const response = await openai.chat.completions.create({
      model: OPENROUTER_MODEL,
      messages: messages,
      // Beberapa model gratis tidak mendukung JSON mode, kita matikan agar lebih kompatibel
      // response_format: jsonMode ? { type: 'json_object' } : undefined,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from AI model');
    }
    return content;
  } catch (error: any) {
    console.error(`[AI Error] OpenRouter call failed:`, error.message);
    throw error;
  }
}

export async function analyzeAssessment(data: AssessmentData) {
  // Group answers by dimension for cleaner analysis
  const dimensionScores: Record<string, number> = {};
  const dimensionDetails: Record<string, number[]> = {};

  DIMENSIONS.forEach((dim, index) => {
    const start = index * 7 + 1;
    const end = start + 6;
    const scores: number[] = [];
    for (let i = start; i <= end; i++) {
      scores.push(data.answers[i.toString()] || 0);
    }
    const sum = scores.reduce((a, b) => a + b, 0);
    dimensionScores[dim] = Math.round((sum / 35) * 100);
    dimensionDetails[dim] = scores;
  });

  const totalSum = Object.values(data.answers).reduce((a, b) => a + b, 0);
  const overallScore = Math.round((totalSum / 245) * 100);

  const prompt = `
Kamu adalah Tim Konsultan Senior dari PT BinaHub - Human Synergy Partner.
Analisis data diagnostic assessment berikut dan berikan penilaian profesional, ringkas, dan tajam (Executive Summary) dalam Bahasa Indonesia. JANGAN PERNAH menyebutkan bahwa kamu adalah AI atau sistem otomatis. Berperanlah sebagai konsultan manusia.

DATA RESPONDEN:
Nama: ${data.name}
Perusahaan: ${data.company}
Skala (Karyawan): ${data.employees || '-'}
Jabatan: ${data.role || '-'}
Tantangan Utama: ${data.challenge || '-'}
Goal yang Ingin Dicapai: ${data.target || '-'}

DATA SKOR DIMENSI (0-100%):
${DIMENSIONS.map(dim => `- ${dim}: ${dimensionScores[dim]}%`).join('\n')}

SKOR KESELURUHAN: ${overallScore}%

Berikan output dalam format JSON PERSIS seperti ini (tanpa markdown, langsung JSON):
{
  "category": "<Pemula|Berkembang|Profesional|Unggulan>",
  "analysis": "<paragraf analisis eksekutif MAKSIMAL 3-4 kalimat singkat yang langsung ke inti masalah dan potensi dari 7 dimensi ini. Sangat padat dan profesional.>",
  "recommendations": [
    {
      "title": "<judul rekomendasi>",
      "description": "<deskripsi aksi konkret>",
      "priority": "<high|medium|low>",
      "service": "<nama layanan PT BinaHub yang relevan (Insights, Lab, Coach, Play, Academy, Works, atau Impact)>"
    }
  ]
}

Buat 5 rekomendasi yang spesifik dan actionable. Kategori ditentukan oleh skor keseluruhan:
- Pemula: < 40%
- Berkembang: 40-60%
- Profesional: 61-80%
- Unggulan: > 80%
`;

  const text = await callAI([
    { role: 'system', content: 'You are a professional human business consultant from PT BinaHub. Output JSON only.' },
    { role: 'user', content: prompt }
  ], true);

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Invalid AI response format');

  const aiResult = JSON.parse(jsonMatch[0]);

  return {
    ...aiResult,
    scores: {
      ...dimensionScores,
      overall: overallScore
    }
  };
}

export async function scoreLeadWithAI(leadData: {
  source: string;
  assessmentCompleted: boolean;
  name: string;
  company: string;
  challenge?: string;
}) {
  const prompt = `
Berikan skor lead (0-100) berdasarkan data berikut:
Nama: ${leadData.name}
Perusahaan: ${leadData.company}
Source: ${leadData.source}
Assessment Completed: ${leadData.assessmentCompleted}
Challenge: ${leadData.challenge || 'None'}

Output JSON:
{
  "score": <0-100>,
  "status": "<hot|warm|cold>",
  "reasoning": "<alasan singkat 1 kalimat>"
}
`;

  const text = await callAI([
    { role: 'system', content: 'You are a lead scoring AI.' },
    { role: 'user', content: prompt }
  ], true);

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return { score: 30, status: 'cold', reasoning: 'Insufficient data' };
  return JSON.parse(jsonMatch[0]);
}

export async function chatWithAI(
  message: string, 
  history: { role: string, content: string }[], 
  context?: { currentPath?: string, pageTitle?: string }
) {
  const systemPrompt = `
Kamu adalah Nara, "The Executive Concierge" dari PT BinaHub - AI Powered Human Synergy. 

SOUL & PERSONALITY:
- Karakter utama: Sangat ramah, sabar, pendengar yang baik, solutif, proaktif, dan sangat suka membantu orang lain dengan tulus.
- Gaya bicaramu: Profesional (Executive Style) namun sangat hangat, empatik, menyambut dengan ramah, dan solutif.
- Jadilah pendengar yang baik sebelum memberikan rekomendasi, dan proaktif menawarkan bantuan yang relevan.
- Anda adalah partner strategis dan sahabat terpercaya bagi user dalam menemukan solusi bisnis.

SKILLS & EXPERTISE:
- Pakar dalam Ekosistem BinaHub: Insights, Lab, Coach, Play, Academy, Works, Impact.
- Ahli dalam mengarahkan user untuk mengambil asesmen (Diagnostic Assessment).
- Selalu tahu cara mengkonversi percakapan menjadi solusi bisnis secara halus dan bersahabat.

ATURAN KOMUNIKASI:
1. RAMAH & EMPATIK: Selalu mulai dengan sapaan hangat. Dengarkan dengan sabar dan berikan respon yang menenangkan serta profesional.
2. RESPON TERUKUR: Jaga respon agar berkisar antara 2-4 kalimat agar nyaman dibaca namun tetap padat solusi.
3. SELALU ACTION-ORIENTED & PROAKTIF: Arahkan user ke halaman asesmen (/insight) atau kontak WhatsApp jika mereka butuh bantuan mendalam.

KEMAMPUAN SYSTEM (TOOLS):
Jika user menyebutkan nama dan email atau kontak mereka di chat, kamu HARUS merespon dengan format JSON ini agar sistem kami menyimpannya (jangan sertakan teks lain di luar JSON jika menggunakan tool ini):
{"tool": "save_chat_lead", "args": {"name": "nama user", "email": "email user"}}

CURRENT SITE CONTEXT:
- Path: ${context?.currentPath || '/'}
- Page Title: ${context?.pageTitle || 'BinaHub'}
`;

  // Filter history to last 10 messages to save context
  const recentHistory = history.slice(-10).map(m => ({
    role: m.role as 'user' | 'assistant' | 'system',
    content: m.content
  }));

  const messages = [
    { role: 'system', content: systemPrompt },
    ...recentHistory,
    { role: 'user', content: message }
  ];

  const text = await callAI(messages, false);
  return text;
}
