import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { chatWithAI } from '@/lib/ai-service';
import { ChatRequestSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  let requestLocale = 'id';

  try {
    const rawBody = await req.json();
    requestLocale = rawBody?.context?.locale === 'en' ? 'en' : 'id';
    
    const validationResult = ChatRequestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: requestLocale === 'en' ? 'Message validation failed' : 'Validasi pesan gagal',
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }
    
    const { message, sessionId, history, context } = validationResult.data;
    const locale = context?.locale || 'id';
    const supabase = createServerSupabase();

    let session = null;
    if (sessionId) {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('id', sessionId)
        .maybeSingle();
      
      if (!error && data) {
        session = data;
      }
    }

    const chatHistory = history || session?.messages || [];

    // Get AI response
    let aiResponseText = await chatWithAI(message, chatHistory, context);
    let isToolExecution = false;

    // Agentic Tool Execution Interceptor
    if (aiResponseText.includes('{"tool":')) {
      try {
        const jsonMatch = aiResponseText.match(/\{"tool":[\s\S]*\}/);
        if (jsonMatch) {
          const toolCall = JSON.parse(jsonMatch[0]);
          
          if (toolCall.tool === 'save_chat_lead' && toolCall.args) {
            isToolExecution = true;
            console.log('[Nara Agent] Executing save_chat_lead tool:', toolCall.args);
            
            // Background lead save
            await supabase.from('leads').upsert({
              name: toolCall.args.name || 'Chat User',
              email: toolCall.args.email,
              source: 'chat_nara',
            }, { onConflict: 'email' });

            // Provide a graceful text response to replace the JSON output for the user
            aiResponseText = locale === 'en'
              ? `Thank you, ${toolCall.args.name}. I have saved your email (${toolCall.args.email}). Is there a specific business operations or people transformation topic you would like to discuss now?`
              : `Terima kasih, ${toolCall.args.name}. Data email Anda (${toolCall.args.email}) sudah saya simpan. Ada hal spesifik tentang operasional bisnis atau SDM yang ingin kita diskusikan sekarang?`;
          }
        }
      } catch (e) {
        console.error('[Nara Agent] Tool parsing failed:', e);
        // Fallback if parsing fails
        if (aiResponseText.includes('{"tool":')) {
           aiResponseText = locale === 'en'
            ? "Sorry, I am experiencing a small system issue. Could you repeat that?"
            : "Mohon maaf, saya sedang mengalami sedikit gangguan sistem. Bisa diulangi?";
        }
      }
    }

    // Save history
    const newMessages = [
      ...chatHistory,
      { role: 'user', content: message, timestamp: new Date().toISOString() },
      { role: 'assistant', content: aiResponseText, timestamp: new Date().toISOString() },
    ];

    let finalSessionId = sessionId;

    try {
      if (session?.id) {
        await supabase
          .from('chat_sessions')
          .update({ messages: newMessages, updated_at: new Date().toISOString() })
          .eq('id', session.id);
      } else {
        const { data: newSession, error: insertError } = await supabase
          .from('chat_sessions')
          .insert({ messages: newMessages })
          .select()
          .single();
        
        if (!insertError) {
          finalSessionId = newSession?.id;
        }
      }
    } catch (dbError) {
      console.error('[Chat DB Error]', dbError);
    }

    return NextResponse.json({ 
      success: true,
      response: aiResponseText,
      sessionId: finalSessionId,
    });
  } catch (error: any) {
    console.error('[Chat API Error]', error);
    return NextResponse.json({ 
      success: false, 
      error: requestLocale === 'en' ? 'An internal server error occurred.' : 'Terjadi kesalahan internal server.',
    }, { status: 500 });
  }
}
