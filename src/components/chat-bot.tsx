"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/i18n/use-locale';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function ChatBot() {
  const pathname = usePathname();
  const locale = useLocale();
  const copy = useMemo(() => locale === 'en'
    ? ({
        greeting: 'Hi! I am Nara, BinaHub Executive Concierge. How can I help with your business operations or people transformation needs?',
        returning: (name: string, company: string, score: string) =>
          `Welcome back, ${name}. I am Nara, BinaHub Executive Concierge. I have received the diagnostic summary for ${company} with an index score of ${score}/100. Before we discuss the most relevant strategic recommendations, may I confirm that this profile data is correct?`,
        systemError: 'Sorry, my system is currently having trouble. Please try again in a moment.',
        connectionError: 'Connection lost. Please check your network and try again.',
        typing: 'Nara is typing...',
        placeholder: 'Type your message here...',
      })
    : ({
        greeting: 'Halo! Saya Nara, Executive Concierge BinaHub. Ada yang bisa saya bantu terkait operasional bisnis atau SDM perusahaan Anda?',
        returning: (name: string, company: string, score: string) =>
          `Selamat datang kembali, Bapak/Ibu ${name}. Saya Nara, Executive Concierge BinaHub. Saya telah menerima ringkasan laporan diagnostik untuk ${company} dengan skor indeks ${score}/100. Sebelum kita berdiskusi lebih dalam mengenai rekomendasi strategis yang sesuai, bolehkah saya mengonfirmasi apakah data profil ini sudah benar?`,
        systemError: 'Maaf, sistem saya sedang mengalami gangguan. Silakan coba beberapa saat lagi.',
        connectionError: 'Koneksi terputus. Mohon periksa jaringan Anda.',
        typing: 'Nara sedang mengetik...',
        placeholder: 'Ketik pesan Anda di sini...',
      }), [locale]);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: copy.greeting }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const [assessmentInfo, setAssessmentInfo] = useState<{name: string, company: string, score: string} | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void Promise.resolve().then(() => {
      setMessages((current) => {
        if (
          current.length === 1 &&
          current[0].role === 'assistant' &&
          (current[0].content.includes('Halo! Saya Nara') || current[0].content.includes('Hi! I am Nara'))
        ) {
          return [{ role: 'assistant', content: copy.greeting }];
        }

        return current;
      });
    });
  }, [copy.greeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Check if URL has ?chat=open
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('chat') === 'open') {
      const name = searchParams.get('name');
      const company = searchParams.get('company');
      const score = searchParams.get('score');

      void Promise.resolve().then(() => {
        setIsOpen(true);

        if (name && company) {
          setAssessmentInfo({ name, company, score: score || '0' });
          setMessages([{ role: 'assistant', content: copy.returning(name, company, score || '0') }]);
        }
      });

      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }

    // Hash change & click listener for #chatbot CTAs
    if (window.location.hash === '#chatbot') {
      void Promise.resolve().then(() => setIsOpen(true));
      window.history.replaceState(null, '', window.location.pathname);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#chatbot') {
        setIsOpen(true);
        window.history.replaceState(null, '', window.location.pathname);
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    const handleOpenChat = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-chatbot', handleOpenChat);

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closestLink = target.closest('a');
      if (closestLink) {
        const href = closestLink.getAttribute('href');
        if (href === '#chatbot' || href === '/#chatbot' || href?.endsWith('#chatbot')) {
          e.preventDefault();
          setIsOpen(true);
        }
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('open-chatbot', handleOpenChat);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [copy]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
          history: messages,
          context: {
            currentPath: window.location.pathname,
            pageTitle: document.title,
            locale,
            assessment: assessmentInfo // Pass assessment context to AI
          }
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        if (data.sessionId && !sessionId) {
          setSessionId(data.sessionId);
        }
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: copy.systemError }]);
        setIsLoading(false);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: copy.connectionError }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        id="chatbot-trigger"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-[16px] border border-white/10 bg-[#0B2C6B] shadow-[0_18px_54px_-36px_rgba(11,44,107,0.72)] ${isOpen ? 'hidden' : 'flex'}`}
      >
        <div className="absolute inset-0 bg-[#D9A441]/16 blur-xl animate-pulse" />
        <MessageSquare className="text-white w-6 h-6 relative z-10" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex h-[600px] max-h-[80vh] w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[16px] border border-black/5 bg-white shadow-[0_24px_76px_-48px_rgba(11,44,107,0.48)] sm:w-[400px]"
          >
            {/* Header */}
            <div className="bg-[#0B2C6B] p-4 flex items-center justify-between relative overflow-hidden">
              <div className="absolute right-0 top-0 h-24 w-40 translate-x-10 -translate-y-10 bg-[#D9A441]/8 blur-2xl" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-white/20 relative">
                  <Image 
                    src="/Avatar-Nara.png" 
                    alt="Nara" 
                    fill 
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Nara</h3>
                  <p className="text-white/60 text-xs">Executive Concierge AI</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors relative z-10 p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#F5F7FA] flex flex-col gap-4">
              {messages.map((msg, idx) => {
                if (msg.role === 'system') return null;
                const isBot = msg.role === 'assistant';
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className={`flex gap-3 max-w-[85%] ${isBot ? 'self-start' : 'self-end flex-row-reverse'}`}
                  >
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border border-black/5 relative">
                      {isBot ? (
                        <Image 
                          src="/Avatar-Nara.png" 
                          alt="Nara" 
                          fill 
                          sizes="32px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#D9A441] flex items-center justify-center">
                          <User className="text-white w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className={`rounded-[12px] p-3 text-sm leading-relaxed ${
                      isBot 
                        ? 'bg-white border border-black/5 text-[#4A4C54] rounded-tl-sm' 
                        : 'bg-[#0B2C6B] text-white rounded-tr-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                );
              })}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] self-start">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border border-black/5 relative">
                    <Image 
                      src="/Avatar-Nara.png" 
                      alt="Nara" 
                      fill 
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2 rounded-[12px] rounded-tl-sm border border-black/5 bg-white p-4">
                    <Loader2 className="w-4 h-4 text-[#0B2C6B] animate-spin" />
                    <span className="text-xs text-gray-400">{copy.typing}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-black/5">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={copy.placeholder}
                  className="w-full bg-[#F5F7FA] border border-black/5 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#0B2C6B]/30 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-8 h-8 bg-[#0B2C6B] rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-black"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
              <div className="text-center mt-3">
                <span className="text-[9px] text-gray-400 font-medium uppercase tracking-widest">Powered by BinaHub AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
