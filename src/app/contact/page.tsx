"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Apakah konsultasi awal berbayar?",
    answer: "Tidak. Diskusi awal bersifat eksploratif untuk memahami tantangan, konteks organisasi, dan kemungkinan arah solusi yang relevan.",
  },
  {
    question: "Berapa lama biasanya tim BinaHub merespons?",
    answer: "Tim kami biasanya merespons dalam 1x24 jam kerja melalui email atau kontak yang Anda cantumkan di formulir.",
  },
  {
    question: "Apakah BinaHub cocok untuk organisasi kecil?",
    answer: "Ya. Pendekatan dapat disesuaikan dengan skala tim, tingkat kematangan organisasi, dan prioritas perubahan yang paling mendesak.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nama lengkap wajib diisi";
    if (!formData.company.trim()) newErrors.company = "Nama organisasi wajib diisi";
    if (!formData.role.trim()) newErrors.role = "Jabatan atau peran wajib diisi";
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Pesan wajib diisi";
    } else if (formData.message.length < 20) {
      newErrors.message = "Pesan minimal 20 karakter agar konteks awal lebih jelas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setServerMessage(data.message || "Pesan Anda berhasil dikirim!");
        setFormData({ name: "", company: "", role: "", email: "", whatsapp: "", message: "" });
      } else {
        setStatus("error");
        setServerMessage(data.error || "Terjadi kesalahan saat mengirim pesan.");
      }
    } catch (error) {
      console.error("[Submit Contact Error]", error);
      setStatus("error");
      setServerMessage("Gagal terhubung ke server. Silakan coba kembali.");
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-16">
      {/* Decorative Glow Ambient Orbs */}
      <div className="pointer-events-none absolute right-0 top-20 h-[220px] w-[760px] bg-[#D9A441]/4 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-20 left-0 h-[180px] w-[720px] bg-[#0B2C6B]/[0.035] blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Hero Section */}
        <div className="mb-16 text-left max-w-3xl">
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#0B2C6B] leading-[1.1]">
            Kontak
          </h1>
        </div>

        {/* main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            {/* Info Badges Card */}
            <div className="flex flex-col gap-6 rounded-[14px] border border-black/[0.045] bg-white p-8 shadow-[0_16px_48px_-42px_rgba(11,44,107,0.32)]">
              <h2 className="text-xl font-bold text-[#0B2C6B] tracking-tight mb-2">Informasi Kontak</h2>
              
              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#D9A441]/10">
                  <MapPin size={18} className="text-[#D9A441]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#0B2C6B]/40 uppercase tracking-widest mb-1">Lokasi Kantor</span>
                  <p className="text-[#0B2C6B]/70 leading-relaxed text-sm font-light">
                    Kencana Tower, Level Mezzanine<br />
                    Jl. Raya Meruya Ilir No. 88, Business Park Kebon Jeruk<br />
                    Meruya Utara, Kembangan, Jakarta Barat 11620
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#D9A441]/10">
                  <Mail size={18} className="text-[#D9A441]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#0B2C6B]/40 uppercase tracking-widest mb-1">Email Pertanyaan</span>
                  <a href="mailto:info@binahub.id" className="text-[#0B2C6B] hover:text-[#D9A441] transition-colors font-medium text-sm">
                    info@binahub.id
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#D9A441]/10">
                  <Phone size={18} className="text-[#D9A441]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#0B2C6B]/40 uppercase tracking-widest mb-1">Telepon</span>
                  <a href="tel:02129601514" className="text-[#0B2C6B] hover:text-[#D9A441] transition-colors font-medium text-sm">
                    021-29601514
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Card */}
            <div className="relative h-[280px] min-h-[250px] overflow-hidden rounded-[14px] border border-black/[0.045] bg-white shadow-[0_16px_48px_-42px_rgba(11,44,107,0.32)] lg:h-full">
              <iframe
                title="BinaHub Office - Kencana Tower, Business Park Kebon Jeruk, Jakarta Barat"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7963243964685!2d106.74600407586469!3d-6.193820660990527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f7b2e93a0f5b%3A0x3c8b7c4f2d1a5e9c!2sJl.%20Raya%20Meruya%20Ilir%20No.88%2C%20Meruya%20Utara%2C%20Kembangan%2C%20Jakarta%20Barat!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="flex h-full flex-col justify-between rounded-[14px] border border-black/[0.045] bg-white p-8 shadow-[0_18px_54px_-44px_rgba(11,44,107,0.34)] md:p-10">
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12 px-4 h-full"
                  >
                    <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
                    <h2 className="text-2xl font-bold text-[#0B2C6B] tracking-tight mb-4">Pesan Berhasil Terkirim!</h2>
                    <p className="text-black/45 text-sm max-w-md leading-relaxed mb-8">
                      {serverMessage} Tim konsultan strategis kami akan meninjau inquiry Anda dan merespons dalam waktu 1x24 jam kerja.
                    </p>
                    
                    {/* Secondary Direct WA Option */}
                    <div className="w-full max-w-sm rounded-[12px] border border-black/[0.04] bg-[#F5F7FA] p-6">
                      <p className="text-[11px] font-bold text-[#0B2C6B]/40 uppercase tracking-widest mb-3">Butuh Respons Cepat?</p>
                      <p className="text-xs text-black/60 mb-4 leading-relaxed">
                        Anda juga dapat langsung menghubungi kami melalui telepon atau email resmi.
                      </p>
                      <a 
                        href="tel:02129601514"
                        className="mb-2 inline-flex w-full items-center justify-center rounded-[10px] bg-[#0B2C6B] px-5 py-3 text-xs font-bold text-white shadow-[0_4px_12px_rgba(11,44,107,0.2)] transition-colors hover:bg-[#0a2255]"
                      >
                        021-29601514
                      </a>
                    </div>

                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-8 text-xs font-bold text-[#0B2C6B]/60 hover:text-[#0B2C6B] underline tracking-widest uppercase transition-colors"
                    >
                      Kirim Formulir Baru
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-[#0B2C6B] tracking-tight mb-1">Mulai Percakapan</h2>
                      <p className="text-xs text-black/40">Bila ada yang ingin anda diskusikan lebih lanjut, silahkan hubungi kami</p>
                    </div>

                    {/* Server Error Alert */}
                    {status === "error" && (
                      <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs">
                        <AlertCircle size={18} className="shrink-0 text-rose-500" />
                        <p>{serverMessage}</p>
                      </div>
                    )}

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Name Input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-[10px] font-bold text-[#0B2C6B]/60 tracking-wider uppercase">
                          Nama Lengkap <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Contoh: Budi Santoso"
                          className={`w-full px-4 py-3 rounded-xl border bg-black/[0.01] text-sm text-[#0B2C6B] outline-none transition-all duration-300 ${
                            errors.name 
                              ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500" 
                              : "border-black/[0.08] focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441]"
                          }`}
                        />
                        {errors.name && <span className="text-[10px] text-rose-500 font-medium">{errors.name}</span>}
                      </div>

                      {/* Company Input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="company" className="text-[10px] font-bold text-[#0B2C6B]/60 tracking-wider uppercase">
                          Organisasi / Perusahaan <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Contoh: PT BinaHub Solusi"
                          className={`w-full px-4 py-3 rounded-xl border bg-black/[0.01] text-sm text-[#0B2C6B] outline-none transition-all duration-300 ${
                            errors.company
                              ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-black/[0.08] focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441]"
                          }`}
                        />
                        {errors.company && <span className="text-[10px] text-rose-500 font-medium">{errors.company}</span>}
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Email Input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-[10px] font-bold text-[#0B2C6B]/60 tracking-wider uppercase">
                          Email Perusahaan <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Contoh: budi@perusahaan.com"
                          className={`w-full px-4 py-3 rounded-xl border bg-black/[0.01] text-sm text-[#0B2C6B] outline-none transition-all duration-300 ${
                            errors.email 
                              ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500" 
                              : "border-black/[0.08] focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441]"
                          }`}
                        />
                        {errors.email && <span className="text-[10px] text-rose-500 font-medium">{errors.email}</span>}
                      </div>

                      {/* Role Input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="role" className="text-[10px] font-bold text-[#0B2C6B]/60 tracking-wider uppercase">
                          Jabatan / Role <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          placeholder="Contoh: HR Manager, Founder, Direktur"
                          className={`w-full px-4 py-3 rounded-xl border bg-black/[0.01] text-sm text-[#0B2C6B] outline-none transition-all duration-300 ${
                            errors.role
                              ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-black/[0.08] focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441]"
                          }`}
                        />
                        {errors.role && <span className="text-[10px] text-rose-500 font-medium">{errors.role}</span>}
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* WhatsApp Input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="whatsapp" className="text-[10px] font-bold text-[#0B2C6B]/60 tracking-wider uppercase">
                          Nomor WhatsApp <span className="text-black/30 font-normal">(Opsional)</span>
                        </label>
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="Contoh: 0812XXXXXXXX"
                          className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-black/[0.01] text-sm text-[#0B2C6B] outline-none focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-[10px] font-bold text-[#0B2C6B]/60 tracking-wider uppercase">
                        Pesan Anda <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tuliskan tantangan utama, jumlah tim/perkiraan skala organisasi, dan target perubahan yang ingin dicapai..."
                        className={`w-full px-4 py-3 rounded-xl border bg-black/[0.01] text-sm text-[#0B2C6B] outline-none resize-none transition-all duration-300 ${
                          errors.message 
                            ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500" 
                            : "border-black/[0.08] focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441]"
                        }`}
                      />
                      {errors.message && <span className="text-[10px] text-rose-500 font-medium">{errors.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-4 group relative inline-flex items-center justify-center gap-3 w-full overflow-hidden px-6 py-4 rounded-xl bg-[#0B2C6B] text-white font-bold text-sm hover:bg-[#D9A441] hover:text-[#0B2C6B] transition-all duration-300 disabled:bg-[#0B2C6B]/40 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(11,44,107,0.15)]"
                    >
                      <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/20 blur-xl transition-transform duration-700 group-hover:translate-x-[420%]" />
                      {status === "loading" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sedang Mengirim Pesan...</span>
                        </>
                      ) : (
                        <>
                          <span>Kirim Inquiry Sekarang</span>
                          <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        ["1x24 jam", "Estimasi respons tim"],
                        ["Gratis", "Diskusi kebutuhan awal"],
                      ].map(([title, desc]) => (
                        <div key={title} className="rounded-[12px] border border-black/[0.04] bg-[#F5F7FA] px-5 py-4">
                          <p className="text-sm font-bold text-[#0B2C6B]">{title}</p>
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.13em] text-black/34">{desc}</p>
                        </div>
                      ))}
                    </div>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

        <section className="relative left-1/2 right-1/2 mt-20 w-screen -translate-x-1/2 bg-white px-6 py-14 md:px-12 md:py-20 lg:px-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="max-w-lg text-4xl font-light leading-[1.05] tracking-[-0.04em] text-[#0B2C6B] md:text-5xl lg:text-6xl">
                Pertanyaan sebelum memulai.
              </h2>
              <p className="mt-7 max-w-md text-base font-light leading-relaxed text-[#0B2C6B]/62">
                Beberapa hal yang biasanya ingin dipastikan sebelum berdiskusi dengan tim BinaHub.
              </p>
            </div>

            <div className="space-y-0">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={item.question}
                  className="border-b border-[#0B2C6B]/16 first:border-t"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="max-w-2xl text-base font-semibold leading-snug text-[#0B2C6B] md:text-lg">{item.question}</span>
                    <span className="mt-1 text-[#D9A441] transition-transform duration-300 group-hover:text-[#0B2C6B]">
                      <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="pb-8">
                          <p className="max-w-3xl text-sm font-light leading-[1.85] text-[#0B2C6B]/70 md:text-base">{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
