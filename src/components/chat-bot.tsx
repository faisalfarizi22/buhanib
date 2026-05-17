"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Sparkles, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Halo! Saya Nara, Executive Concierge BinaHub. Ada yang bisa saya bantu terkait operasional bisnis atau SDM perusahaan Anda?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const [assessmentInfo, setAssessmentInfo] = useState<{name: string, company: string, score: string} | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Check if URL has ?chat=open
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('chat') === 'open') {
      setIsOpen(true);
      
      const name = searchParams.get('name');
      const company = searchParams.get('company');
      const score = searchParams.get('score');

      if (name && company) {
        setAssessmentInfo({ name, company, score: score || '0' });
        setMessages([
          { 
            role: 'assistant', 
            content: `Selamat datang kembali, Bapak/Ibu ${name}. Saya Nara, Executive Concierge BinaHub. Saya telah menerima ringkasan laporan diagnostik untuk ${company} dengan skor indeks ${score}/100. Sebelum kita berdiskusi lebih dalam mengenai rekomendasi strategis yang sesuai, bolehkah saya mengonfirmasi apakah data profil ini sudah benar?` 
          }
        ]);
      }

      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

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
        setMessages(prev => [...prev, { role: 'assistant', content: 'Maaf, sistem saya sedang mengalami gangguan. Silakan coba beberapa saat lagi.' }]);
        setIsLoading(false);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Koneksi terputus. Mohon periksa jaringan Anda.' }]);
    } finally {
      setIsLoading(false);
    }
  };

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
        className={`fixed bottom-6 right-6 w-14 h-14 bg-[#0A1A3A] rounded-full shadow-2xl flex items-center justify-center z-50 border border-white/10 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-xl animate-pulse" />
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
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-black/5"
          >
            {/* Header */}
            <div className="bg-[#0A1A3A] p-4 flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-2xl rounded-full translate-x-10 -translate-y-10" />
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
            <div className="flex-1 overflow-y-auto p-4 bg-[#F8F9FB] flex flex-col gap-4">
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
                        <div className="w-full h-full bg-[#D4AF37] flex items-center justify-center">
                          <User className="text-white w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      isBot 
                        ? 'bg-white border border-black/5 text-[#0F172A] rounded-tl-sm' 
                        : 'bg-[#0A1A3A] text-white rounded-tr-sm'
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
                  <div className="bg-white border border-black/5 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#0A1A3A] animate-spin" />
                    <span className="text-xs text-gray-400">Nara sedang mengetik...</span>
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
                  placeholder="Ketik pesan Anda di sini..."
                  className="w-full bg-[#F8F9FB] border border-black/5 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#0A1A3A]/30 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-8 h-8 bg-[#0A1A3A] rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-black"
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
