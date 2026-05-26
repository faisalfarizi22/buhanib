import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Tag } from "@/components/ui/tag";

const stats = [
  { value: "16+", label: "Tahun pengalaman sejak 2010" },
  { value: "10.000+", label: "Individu mengikuti program" },
  { value: "80+", label: "Organisasi berbagai sektor" },
  { value: "500+", label: "Peserta dalam satu program terbesar" },
];

const timeline = [
  {
    year: "2010",
    title: "PT Bina Daya Nugraha berdiri",
    desc: "Memulai sebagai learning & training partner dengan fokus pada team building, experiential workshop, dan learning event organizer.",
  },
  {
    year: "2023-2025",
    title: "Ekspansi layanan & kemitraan internasional",
    desc: "Mengembangkan business simulation melalui kemitraan resmi dengan BSKsims dan mengelola program skala besar untuk organisasi nasional maupun multinasional.",
  },
  {
    year: "2025-2026",
    title: "Refleksi & perancangan ulang",
    desc: "Kebutuhan organisasi bergerak lebih cepat daripada pendekatan training konvensional, mendorong lahirnya ekosistem layanan yang lebih terintegrasi dan terukur.",
  },
  {
    year: "2026",
    title: "BDN menyelesaikan babaknya. BinaHub membuka yang berikutnya.",
    desc: "Tim yang sama, metodologi dan keahlian yang sama, dengan ambisi yang lebih besar untuk menghadirkan transformasi manusia yang terukur.",
  },
];

const differentiators = [
  {
    title: "Ekosistem terintegrasi",
    desc: "Delapan modul layanan dirancang untuk bekerja bersama, bukan menjadi program terpisah yang tidak saling terhubung.",
  },
  {
    title: "Dampak terukur",
    desc: "Setiap engagement membawa mekanisme pengukuran agar dampak pengembangan tidak berhenti sebagai klaim.",
  },
  {
    title: "AI sebagai enabler",
    desc: "Teknologi digunakan untuk personalisasi, analitik, dan skalabilitas tanpa menggantikan kedalaman manusia.",
  },
  {
    title: "Pengalaman korporat nyata",
    desc: "Pengalaman 16 tahun bersama manufaktur, multinasional, dan korporasi nasional memberi konteks yang tidak bisa digantikan teori.",
  },
];

const industries = [
  "Manufaktur",
  "Distribusi & logistik nasional",
  "Minyak & pertambangan",
  "Jasa keuangan",
  "Ritel & consumer goods",
  "Pendidikan & sektor pemerintahan",
  "Perusahaan multinasional di Indonesia",
];

export default function FromBdnToBinaHubPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F7FA] text-[#4A4C54]">
      <section className="relative px-4 pt-24 md:px-8 md:pt-32">
        <div className="relative overflow-hidden rounded-[30px] border border-white/50 bg-[#FAFAF8] px-6 py-20 shadow-[0_28px_90px_-60px_rgba(11,44,107,0.36)] md:rounded-[42px] md:px-14 lg:px-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(217,164,65,0.14),transparent_30%),linear-gradient(135deg,rgba(11,44,107,0.06),transparent_42%)]" />
          <div className="relative z-10 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <Tag>DARI BDN KE BINAHUB</Tag>
              <h1 className="mt-8 max-w-4xl text-5xl font-light leading-[0.96] tracking-[-0.055em] text-[#0B2C6B] md:text-7xl lg:text-[92px]">
                Bukan awal yang baru.
                <span className="block italic text-[#D9A441]">Transformasi perjalanan 16 tahun.</span>
              </h1>
            </div>
            <div className="max-w-2xl border-l border-[#D9A441]/70 pl-7">
              <p className="text-lg font-light leading-[1.8] text-black/64 md:text-xl">
                BinaHub berdiri di atas perjalanan PT Bina Daya Nugraha, perusahaan pelatihan dan team building yang telah mendampingi lebih dari 80 organisasi dan 10.000 individu sejak 2010.
              </p>
              <p className="mt-6 text-base leading-[1.8] text-black/54">
                Ketika BDN menyelesaikan babaknya, kami tidak menutup buku. Kami membuka yang baru dengan ekosistem yang lebih terintegrasi, pendekatan yang lebih terukur, dan teknologi yang memperluas dampak tanpa mengorbankan kedalaman.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-18 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <Tag>TRACK RECORD</Tag>
              <h2 className="mt-6 text-4xl font-light tracking-[-0.04em] text-[#0B2C6B] md:text-6xl">
                Angka yang dibangun dari lapangan.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-black/56">
              Bukan angka pemasaran. Ini adalah akumulasi dari kerja nyata bersama organisasi di berbagai sektor industri Indonesia.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-[26px] border border-black/[0.04] bg-white p-7 shadow-[0_20px_70px_-54px_rgba(11,44,107,0.34)]">
                <p className="text-4xl font-light tracking-[-0.04em] text-[#0B2C6B] md:text-5xl">{item.value}</p>
                <p className="mt-4 text-sm leading-relaxed text-black/50">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAF8] px-6 py-18 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Tag>ORIGIN STORY</Tag>
            <h2 className="mt-6 text-4xl font-light leading-tight tracking-[-0.045em] text-[#0B2C6B] md:text-6xl">
              Satu perjalanan, satu visi yang berkembang.
            </h2>
            <p className="mt-8 text-lg font-light leading-[1.8] text-black/58">
              Kami tidak memulai dari nol. Kami memulai dari tempat yang sudah terbukti, lalu bertanya: bagaimana jika pengalaman ini bisa diintegrasikan, diskalakan, dan diperkuat teknologi untuk menghasilkan transformasi yang benar-benar terukur?
            </p>
            <blockquote className="mt-10 border-l-2 border-[#D9A441] pl-6 text-2xl font-light italic leading-relaxed text-[#0B2C6B]">
              "BinaHub adalah jawaban dari pertanyaan itu."
            </blockquote>
          </div>
          <div className="space-y-5">
            {timeline.map((item) => (
              <div key={item.year} className="grid gap-5 rounded-[26px] border border-black/[0.04] bg-white p-6 shadow-[0_20px_80px_-62px_rgba(11,44,107,0.32)] md:grid-cols-[100px_1fr]">
                <p className="text-sm font-bold tracking-[0.24em] text-[#D9A441]">{item.year}</p>
                <div>
                  <h3 className="text-xl font-light text-[#0B2C6B]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/52">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-18 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <Tag>POSITIONING</Tag>
            <h2 className="mt-6 text-4xl font-light tracking-[-0.045em] text-[#0B2C6B] md:text-6xl">
              Transformation partner, bukan vendor training.
            </h2>
            <p className="mt-7 text-lg font-light leading-[1.8] text-black/58">
              Banyak program pelatihan gagal bukan karena pesertanya tidak mampu, tetapi karena intervensinya tidak menyentuh akar masalah, tidak berkelanjutan, dan dampaknya tidak pernah diukur.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <div key={item.title} className="rounded-[26px] border border-black/[0.04] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_-58px_rgba(11,44,107,0.42)]">
                <CheckCircle2 className="mb-7 text-[#D9A441]" size={24} />
                <h3 className="text-xl font-light text-[#0B2C6B]">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-black/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2C6B] px-6 py-18 text-white md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D9A441]">KONTEKS INDUSTRI</p>
            <h2 className="mt-6 text-4xl font-light tracking-[-0.045em] md:text-6xl">
              Pengalaman yang memahami dinamika kerja nyata.
            </h2>
            <p className="mt-7 text-lg font-light leading-[1.8] text-white/64">
              Pengalaman kami tidak terbatas pada satu sektor. Pemahaman terhadap dinamika workforce di masing-masing industri memungkinkan kami merancang intervensi yang relevan, bukan program generik yang sama untuk semua.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm font-medium text-white/78 backdrop-blur-md">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-18 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center rounded-[34px] border border-black/[0.04] bg-white px-8 py-14 text-center shadow-[0_28px_90px_-62px_rgba(11,44,107,0.36)]">
          <Tag>LANGKAH BERIKUTNYA</Tag>
          <h2 className="mt-6 max-w-3xl text-4xl font-light tracking-[-0.045em] text-[#0B2C6B] md:text-6xl">
            Ingin tahu apakah BinaHub tepat untuk organisasi Anda?
          </h2>
          <p className="mt-7 max-w-2xl text-lg font-light leading-[1.8] text-black/56">
            Mulai dengan sesi Organizational Readiness Diagnostic untuk memahami tantangan spesifik organisasi Anda dan mengevaluasi kecocokan pendekatan kami.
          </p>
          <Link
            href="/insight"
            className="mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-[#0B2C6B] px-8 text-xs font-bold uppercase tracking-[0.18em] text-[#D9A441] transition-all hover:-translate-y-0.5 hover:bg-[#08245A]"
          >
            Jadwalkan Readiness Session
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
