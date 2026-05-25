"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { PixelIcon } from "@/components/pixel-icon";

export default function JourneyPage() {
  return (
    <div className="bg-[#F5F7FA] text-[#4A4C54] font-sans antialiased overflow-x-hidden min-h-screen pt-28 pb-24">
      {/* Decorative Editorial Background Orbs */}
      <div className="absolute top-40 right-10 w-[600px] h-[600px] bg-[#D9A441]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-[-100px] w-[500px] h-[500px] bg-[#3B82F6]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Magazine Masthead / Header */}
        <header className="mb-24 md:mb-36 border-b border-black/[0.06] pb-12">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <PixelIcon type="about" size={32} />
            </div>
            <div className="mt-2">
              <Tag>TENTANG KAMI</Tag>
            </div>
          </div>

          <h1 className="mt-8 text-4xl sm:text-7xl md:text-8xl lg:text-[110px] font-extralight tracking-tighter text-[#0B2C6B] leading-[0.9] uppercase">
            Perjalanan <br />
            <span className="font-semibold italic text-[#D9A441] normal-case tracking-tight">Kami.</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl text-black/60 font-light leading-relaxed max-w-2xl border-l-2 border-[#D9A441] pl-6 md:pl-8">
                Menghubungkan rekam jejak pelatihan berbasis pengalaman selama 15 tahun menuju gerbang transformasi organisasi masa depan di era AI.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end text-xs tracking-widest text-[#0B2C6B]/50 font-bold uppercase">
              SISTER COMPANY PT BINA DAYA Nugraha — SEJAK 2010
            </div>
          </div>
        </header>

        {/* CHAPTERS (Selang-seling, Asimetris, Majalah) */}
        <div className="space-y-36 md:space-y-48">

          {/* Chapter 1: 2010 - Fondasi Awal BDN (Text-Left, Image-Right) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col items-start"
            >
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#0B2C6B] mb-8 leading-tight">
                Berakar pada Pembelajaran <br />
                <span className="font-semibold italic">Berbasis Pengalaman</span>
              </h2>

              <div className="text-base text-black/70 font-light leading-relaxed space-y-6">
                <p>
                  <span className="text-6xl font-semibold text-[#D9A441] float-left mr-3 mt-1 leading-[0.8] font-sans">B</span>
                  inaHub tidak lahir di ruang hampa. Akar kami tertanam kuat dalam dedikasi panjang <span className="font-bold">  BDN (Bina Daya Nugraha)</span> — perusahaan pelatihan dan penyelenggara program Team Building, yang telah mewarnai industri pengembangan SDM di Indonesia sejak tahun 2010.
                </p>
                <p>
                  Di awal dekade, kami menyadari bahwa pembelajaran terbaik tidak terjadi hanya dengan mendengarkan teori di dalam ruang kelas yang kaku. Manusia belajar secara mendalam ketika mereka bergerak, berinteraksi, menghadapi tantangan bersama, dan merefleksikan pengalaman tersebut secara langsung.
                </p>
              </div>
            </motion.div>

            {/* Right Image (Clean, flat square) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative h-[240px] sm:h-[320px] md:h-[500px] w-full rounded-none overflow-hidden shadow-md border border-black/[0.06] group"
            >
              <Image
                src="/BDN.png"
                alt="BDN Team Building 2010"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0B2C6B]/5 mix-blend-multiply pointer-events-none" />
            </motion.div>

          </section>

          {/* Chapter 2: Rekam Jejak 10.000+ Dampak Nyata (Image-Left, Text-Right) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left Image (Clean, flat square) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 order-2 lg:order-1 relative h-[240px] sm:h-[320px] md:h-[500px] w-full rounded-none overflow-hidden shadow-md border border-black/[0.06] group"
            >
              <Image
                src="/gallery/2.jpg"
                alt="10.000+ Alumni BinaHub"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0B2C6B]/10 mix-blend-multiply pointer-events-none" />
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start"
            >
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#0B2C6B] mb-8 leading-tight">
                Kepercayaan dari <br />
                <span className="font-semibold italic">80+ Organisasi Nasional</span>
              </h2>

              <div className="text-base text-black/70 font-light leading-relaxed space-y-6">
                <p>
                  <span className="text-6xl font-semibold text-[#D9A441] float-left mr-3 mt-1 leading-[0.8] font-sans">S</span>
                  elama lebih dari 15 tahun berkiprah, kami telah diberikan kehormatan untuk mendampingi lebih dari <span className="font-bold">10.000 peserta</span> dari berbagai sektor industri. Dari jajaran direksi BUMN, manajer perusahaan multinasional swasta, institusi pendidikan terkemuka, hingga lembaga nirlaba.
                </p>
                <p>
                  Setiap modul pembelajaran diuji langsung di lapangan, membentuk mentalitas kolaborasi tangguh, dan melahirkan sinergi tim yang kokoh. Pengalaman nyata inilah yang menjadi bahan bakar utama dalam memahami anatomi budaya organisasi di Indonesia secara mendalam.
                </p>
              </div>
            </motion.div>

          </section>

          {/* Chapter 3: Kemitraan Global BSKSims (Text-Left, Image-Right) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col items-start"
            >
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#0B2C6B] mb-8 leading-tight">
                Simulasi Bisnis & <br />
                <span className="font-semibold italic">Akurasi Berstandar Amerika</span>
              </h2>

              <div className="text-base text-black/70 font-light leading-relaxed space-y-6">
                <p>
                  <span className="text-6xl font-semibold text-[#D9A441] float-left mr-3 mt-1 leading-[0.8] font-sans">K</span>
                  omitmen kami dalam membawa standar terbaik diwujudkan dengan menjadi mitra resmi di Indonesia dari <span className="font-bold">BSKSims (www.bsksims.com)</span> — penyedia platform simulasi keputusan strategis terkemuka asal Amerika Serikat.
                </p>
                <p>
                  Melalui kolaborasi global ini, kami mengintegrasikan teknologi simulasi bisnis ke dalam sistem pengembangan kepemimpinan dan asesmen talenta di Indonesia. Simulasi interaktif ini memaksa para pemimpin masa depan untuk mengambil keputusan taktis secara presisi di tengah dinamika pasar digital yang dinamis dan kompetitif.
                </p>
              </div>
            </motion.div>

            {/* Right Image (Clean, flat square) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative h-[240px] sm:h-[320px] md:h-[500px] w-full rounded-none overflow-hidden shadow-md border border-black/[0.06] group"
            >
              <Image
                src="/asset/bsksims2.png"
                alt="BSKSims Strategic Partnerships"
                fill
                className="object-cover object-[80%_center] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0B2C6B]/10 mix-blend-multiply pointer-events-none" />
            </motion.div>

          </section>

          {/* Chapter 4: Kelahiran Sister-Company BinaHub di Era AI (Image-Left, Text-Right) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left Image (Clean, flat square) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 order-2 lg:order-1 relative h-[240px] sm:h-[320px] md:h-[500px] w-full rounded-none overflow-hidden shadow-md border border-black/[0.06] group"
            >
              <Image
                src="/logo.png"
                alt="BinaHub Future Capability Partner"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0B2C6B]/10 mix-blend-multiply pointer-events-none" />
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start"
            >
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#0B2C6B] mb-8 leading-tight">
                Lahirnya BinaHub: <br />
                <span className="font-semibold italic">Memanusiawikan Masa Depan</span>
              </h2>

              <div className="text-base text-black/70 font-light leading-relaxed space-y-6">
                <p>
                  <span className="text-6xl font-semibold text-[#D9A441] float-left mr-3 mt-1 leading-[0.8] font-sans">D</span>
                  unia kerja terus bergerak dengan kecepatan disrupsi yang luar biasa. Masuknya era kecerdasan buatan (AI) dan otomatisasi membawa tantangan baru bagi eksistensi manusia di dalam organisasi.
                </p>
                <p>
                  BinaHub lahir sebagai <span className="font-bold">sister company</span> BDN untuk menjawab tantangan makro ini. Jika BDN berfokus penuh pada pelatihan berbasis pengalaman (<span className="font-bold">experiential learning</span>), BinaHub hadir melangkah lebih jauh sebagai <span className="font-bold">mitra transformasi organisasi menyeluruh</span> yang menyinergikan kapasitas manusia, kedalaman budaya kerja, kekuatan ekosistem teknologi, dan ketepatan data analitik AI.
                </p>
              </div>
            </motion.div>

          </section>

        </div>

        {/* Overlapping Magazine Quote Box (Off-grid, centered) */}
        <section className="my-36 relative">
          <div className="absolute inset-0 bg-[#0B2C6B] rounded-none scale-100 md:scale-105 pointer-events-none shadow-xl" />

          <div className="relative z-10 bg-white border border-[#D9A441]/30 rounded-none p-8 md:p-16 flex flex-col items-center text-center shadow-2xl">
            <Quote size={48} className="text-[#D9A441] mb-8" />
            <blockquote className="text-xl md:text-3xl font-light text-[#0B2C6B] leading-relaxed max-w-3xl italic">
              "Masa depan tidak hanya membutuhkan organisasi yang lebih cerdas secara teknologi, tetapi juga organisasi yang jauh lebih matang secara manusiawi."
            </blockquote>
            <cite className="block mt-8 text-xs font-bold tracking-widest text-black/40 uppercase not-italic">
              — BinaHub Filosofi Transformasi
            </cite>
          </div>
        </section>

        {/* Closing CTA Grid */}
        <section className="mt-24 border-t border-black/[0.06] pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#0B2C6B] uppercase opacity-40">Mulai Bersama Kami</span>
            <h3 className="text-2xl md:text-3xl font-light text-[#0B2C6B] mt-2">
              Siap melangkah ke babak berikutnya?
            </h3>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0B2C6B] text-white font-bold text-xs hover:bg-[#D9A441] hover:text-[#0B2C6B] transition-all duration-300 shadow-[0_4px_16px_rgba(11,44,107,0.15)] group"
            >
              Hubungi Kami
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/insight"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-black/10 text-[#0B2C6B] font-bold text-xs hover:bg-black/5 transition-all duration-300"
            >
              Mulai Diagnosa Performa
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
