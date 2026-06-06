import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { headers } from "next/headers";
import { Tag } from "@/components/ui/tag";
import { defaultLocale, hasLocale } from "@/i18n/config";

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
    desc: "Delapan layanan dirancang untuk bekerja bersama, bukan menjadi program terpisah yang tidak saling terhubung.",
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

const COPY = {
  id: {
    tag: "DARI BDN KE BINAHUB",
    title: "Bukan awal yang baru.",
    accent: "Transformasi perjalanan 16 tahun.",
    intro: "BinaHub berdiri di atas perjalanan PT Bina Daya Nugraha, perusahaan pelatihan dan team building yang telah mendampingi lebih dari 80 organisasi dan 10.000 individu sejak 2010.",
    intro2: "Ketika BDN menyelesaikan babaknya, kami tidak menutup buku. Kami membuka yang baru dengan ekosistem yang lebih terintegrasi, pendekatan yang lebih terukur, dan teknologi yang memperluas dampak tanpa mengorbankan kedalaman.",
    stats,
    originTag: "ORIGIN STORY",
    originTitle: "Satu perjalanan, satu visi yang berkembang.",
    originDesc: "Kami tidak memulai dari nol. Kami memulai dari tempat yang sudah terbukti, lalu bertanya: bagaimana jika pengalaman ini bisa diintegrasikan, diskalakan, dan diperkuat teknologi untuk menghasilkan transformasi yang benar-benar terukur?",
    quote: "BinaHub adalah jawaban dari pertanyaan itu.",
    timeline,
    positioning: "POSITIONING",
    positioningTitle: "Transformation partner, bukan vendor training.",
    differentiators,
    industryTag: "KONTEKS INDUSTRI",
    industryTitle: "Pengalaman yang memahami dinamika kerja nyata.",
    industryDesc: "Pengalaman kami tidak terbatas pada satu sektor. Pemahaman terhadap dinamika workforce di masing-masing industri memungkinkan kami merancang intervensi yang relevan, bukan program generik yang sama untuk semua.",
    industries,
  },
  en: {
    tag: "FROM BDN TO BINAHUB",
    title: "Not a new beginning.",
    accent: "A 16-year journey transformed.",
    intro: "BinaHub stands on the journey of PT Bina Daya Nugraha, a training and team building company that has accompanied more than 80 organizations and 10,000 individuals since 2010.",
    intro2: "When BDN completed its chapter, we did not close the book. We opened a new one with a more integrated ecosystem, a more measurable approach, and technology that expands impact without sacrificing depth.",
    stats: [
      { value: "16+", label: "Years of experience since 2010" },
      { value: "10,000+", label: "Individuals joined programs" },
      { value: "80+", label: "Organizations across sectors" },
      { value: "500+", label: "Participants in the largest single program" },
    ],
    originTag: "ORIGIN STORY",
    originTitle: "One journey, one evolving vision.",
    originDesc: "We did not start from zero. We started from proven ground, then asked: what if this experience could be integrated, scaled, and strengthened by technology to create truly measurable transformation?",
    quote: "BinaHub is the answer to that question.",
    timeline: [
      {
        year: "2010",
        title: "PT Bina Daya Nugraha was established",
        desc: "Started as a learning and training partner focused on team building, experiential workshops, and learning event organizing.",
      },
      {
        year: "2023-2025",
        title: "Service expansion and international partnership",
        desc: "Developed business simulation through an official partnership with BSKSims and managed large-scale programs for national and multinational organizations.",
      },
      {
        year: "2025-2026",
        title: "Reflection and redesign",
        desc: "Organizational needs moved faster than conventional training approaches, leading to a more integrated and measurable service ecosystem.",
      },
      {
        year: "2026",
        title: "BDN completed its chapter. BinaHub opened the next.",
        desc: "The same team, methodology, and expertise, with a bigger ambition to deliver measurable human transformation.",
      },
    ],
    positioning: "POSITIONING",
    positioningTitle: "A transformation partner, not a training vendor.",
    differentiators: [
      {
        title: "Integrated ecosystem",
        desc: "Eight services are designed to work together, not as disconnected standalone programs.",
      },
      {
        title: "Measurable impact",
        desc: "Every engagement carries a measurement mechanism so development impact does not stop as a claim.",
      },
      {
        title: "AI as an enabler",
        desc: "Technology is used for personalization, analytics, and scalability without replacing human depth.",
      },
      {
        title: "Real corporate experience",
        desc: "Sixteen years with manufacturing, multinational companies, and national corporations gives context that theory cannot replace.",
      },
    ],
    industryTag: "INDUSTRY CONTEXT",
    industryTitle: "Experience that understands real workplace dynamics.",
    industryDesc: "Our experience is not limited to one sector. Understanding workforce dynamics across industries enables us to design relevant interventions, not generic programs applied equally to everyone.",
    industries: [
      "Manufacturing",
      "National distribution and logistics",
      "Oil and mining",
      "Financial services",
      "Retail and consumer goods",
      "Education and government sector",
      "Multinational companies in Indonesia",
    ],
  },
};

export default async function FromBdnToBinaHubPage() {
  const headerList = await headers();
  const localeHeader = headerList.get("x-binahub-locale");
  const locale = hasLocale(localeHeader) ? localeHeader : defaultLocale;
  const copy = COPY[locale];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F4F6F8] text-[#4A4C54]">
      <section className="px-4 pt-24 md:px-8 md:pt-32">
        <div className="relative overflow-hidden rounded-[18px] bg-[#071A33] text-white shadow-[0_34px_100px_-70px_rgba(7,26,51,0.85)]">
          <Image
            src="/story-hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#071A33]/16" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,51,0.54)_0%,rgba(7,26,51,0.34)_48%,rgba(7,26,51,0.10)_100%)]" />

          <div className="relative z-10 grid min-h-[64vh] gap-10 px-6 py-16 md:px-12 md:py-20 lg:min-h-[70vh] lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:px-20 lg:pb-10">
            <div>
              <Tag className="border-white/10 bg-white/10 text-[#D9A441]">{copy.tag}</Tag>
              <h1 className="mt-8 max-w-4xl text-5xl font-light leading-[0.94] tracking-[-0.055em] md:text-7xl lg:text-[96px]">
                {copy.title}
                <span className="block italic text-[#D9A441]">{copy.accent}</span>
              </h1>
            </div>

            <div className="max-w-2xl border-l border-[#D9A441]/70 pl-6 md:pl-8">
              <p className="text-lg font-light leading-[1.8] text-white/76 md:text-xl">
                {copy.intro}
              </p>
              <p className="mt-6 text-base leading-[1.8] text-white/56">
                {copy.intro2}
              </p>
            </div>
          </div>

          <div className="relative z-10 px-6 pb-8 md:px-12 lg:px-20">
            <div className="ml-auto grid max-w-3xl border-y border-white/16 text-white sm:grid-cols-2 lg:grid-cols-4 lg:bg-white/[0.035] lg:backdrop-blur-xl">
              {copy.stats.map((item) => (
                <div key={item.label} className="border-b border-white/12 py-3 sm:px-4 lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <p className="text-2xl font-light tracking-[-0.05em] text-white md:text-3xl">{item.value}</p>
                  <p className="mt-1 max-w-[9rem] text-[11px] italic leading-relaxed text-white/60">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-18 pt-12 md:px-12 md:pb-24 md:pt-16 lg:px-20 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Tag>{copy.originTag}</Tag>
            <h2 className="mt-6 text-4xl font-light leading-tight tracking-[-0.045em] text-[#0B2C6B] md:text-6xl">
              {copy.originTitle}
            </h2>
            <p className="mt-7 text-lg font-light leading-[1.8] text-black/58">
              {copy.originDesc}
            </p>
            <blockquote className="mt-10 border-l-2 border-[#D9A441] pl-6 text-2xl font-light italic leading-relaxed text-[#0B2C6B]">
              &ldquo;{copy.quote}&rdquo;
            </blockquote>
          </div>

          <div className="relative">
            <div className="absolute left-[18px] top-4 hidden h-[calc(100%-2rem)] w-px bg-[#D9A441]/30 md:block" />
            <div className="space-y-5">
              {copy.timeline.map((item, index) => (
                <article key={item.year} className="relative grid gap-5 rounded-[14px] border border-black/[0.06] bg-[#FBFAF6] p-6 shadow-[0_18px_56px_-48px_rgba(11,44,107,0.32)] md:grid-cols-[92px_1fr] md:pl-14">
                  <span className="absolute left-4 top-7 hidden h-3 w-3 rounded-full bg-[#D9A441] ring-8 ring-[#F4F6F8] md:block" />
                  <p className="text-sm font-bold tracking-[0.24em] text-[#D9A441]">{item.year}</p>
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="font-mono text-xs text-[#0B2C6B]/34">{String(index + 1).padStart(2, "0")}</span>
                      <span className="h-px flex-1 bg-black/[0.08]" />
                    </div>
                    <h3 className="text-2xl font-light leading-tight text-[#0B2C6B]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-black/54">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#071A33] px-6 py-18 text-white md:px-12 md:py-24 lg:px-20">
        <Image
          src="/story-hero-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="-scale-x-100 object-cover object-center opacity-86"
        />
        <div className="absolute inset-0 bg-[#071A33]/24" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,51,0.72)_0%,rgba(7,26,51,0.38)_55%,rgba(7,26,51,0.16)_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 border-y border-white/16 py-10 backdrop-blur-[2px] lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D9A441]">{copy.positioning}</p>
              <h2 className="mt-6 max-w-2xl text-4xl font-light tracking-[-0.045em] md:text-6xl">
                {copy.positioningTitle}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {copy.differentiators.map((item, index) => (
                <div key={item.title} className="border-t border-white/16 pt-5">
                  <div className="mb-5 flex items-center justify-between">
                    <CheckCircle2 className="text-[#D9A441]" size={20} />
                    <span className="font-mono text-xs text-white/34">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-18 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[18px] bg-[#071A33] text-white lg:grid-cols-[0.92fr_1.08fr]">
          <div className="p-8 md:p-12 lg:p-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D9A441]">{copy.industryTag}</p>
            <h2 className="mt-6 text-4xl font-light tracking-[-0.045em] md:text-6xl">
              {copy.industryTitle}
            </h2>
            <p className="mt-7 text-lg font-light leading-[1.8] text-white/64">
              {copy.industryDesc}
            </p>
          </div>
          <div className="border-t border-white/10 p-8 md:p-12 lg:border-l lg:border-t-0 lg:p-14">
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.industries.map((item) => (
                <div key={item} className="group flex items-center justify-between gap-4 rounded-[10px] border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-medium text-white/78 transition-colors hover:bg-white/[0.1]">
                  <span>{item}</span>
                  <ArrowRight className="shrink-0 text-[#D9A441] opacity-0 transition-opacity group-hover:opacity-100" size={14} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
