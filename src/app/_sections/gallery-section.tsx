import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GALLERY_IMAGES } from "@/data/gallery";

const previewImages = GALLERY_IMAGES.slice(0, 6);

export function GallerySection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F7FA] px-6 py-24 md:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-20 h-[420px] w-[420px] rounded-full bg-[#0B2C6B]/[0.055] blur-[120px]" />
        <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-[#D9A441]/[0.11] blur-[130px]" />
        <div className="absolute right-[18%] bottom-20 h-[260px] w-[260px] rounded-full bg-[#D9A441]/[0.055] blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.026] bg-[linear-gradient(90deg,transparent_0,transparent_96%,rgba(11,44,107,0.68)_100%)] bg-[length:78px_100%]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div className="max-w-xl">
          <span className="inline-flex rounded-full bg-black/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#0B2C6B]/52">
            Gallery
          </span>
          <h2 className="mt-6 text-4xl font-light leading-[1.06] tracking-tight text-[#0B2C6B] md:text-6xl">
            Momen yang membentuk perjalanan.
          </h2>
          <p className="mt-6 text-base leading-[1.85] text-[#4A4C54]/70 md:text-lg">
            Dokumentasi ruang belajar, kolaborasi, dan transformasi yang memperlihatkan bagaimana
            kapabilitas manusia bertumbuh dalam ekosistem BinaHub.
          </p>
          <Link
            href="/gallery"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#0B2C6B] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_46px_-30px_rgba(11,44,107,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D9A441] hover:text-[#0B2C6B]"
          >
            Lihat Gallery
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {previewImages.map((image, index) => (
            <Link
              key={image.src}
              href="/gallery"
              className={`group relative min-h-[170px] overflow-hidden rounded-[22px] border border-white/70 bg-white shadow-[0_18px_60px_-46px_rgba(11,44,107,0.55)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_-42px_rgba(11,44,107,0.65)] ${
                index === 0
                  ? "md:col-span-3 md:row-span-2 md:min-h-[380px]"
                  : index === 1
                    ? "md:col-span-3 md:min-h-[182px]"
                    : "md:col-span-2 md:min-h-[182px]"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 38vw, (min-width: 768px) 50vw, 100vw"
                className={`object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] ${
                  index === 0
                    ? "saturate-[0.88] contrast-[1.02] brightness-[1.03] group-hover:saturate-[0.96] group-hover:brightness-[1.07]"
                    : "saturate-[0.72] contrast-[0.96] brightness-[0.95] group-hover:saturate-[0.82] group-hover:brightness-[1.01]"
                }`}
              />
              <div className={`absolute inset-0 mix-blend-multiply ${index === 0 ? "bg-[#0B2C6B]/[0.035]" : "bg-[#0B2C6B]/[0.105]"}`} />
              <div className={`absolute inset-0 transition-opacity duration-500 ${
                index === 0
                  ? "bg-[linear-gradient(135deg,rgba(217,164,65,0.16)_0%,rgba(11,44,107,0.05)_48%,rgba(255,255,255,0.03)_100%)] opacity-72 group-hover:opacity-58"
                  : "bg-[linear-gradient(135deg,rgba(11,44,107,0.25)_0%,rgba(11,44,107,0.10)_42%,rgba(217,164,65,0.10)_100%)] opacity-82 group-hover:opacity-56"
              }`} />
              <div className={`absolute inset-0 bg-gradient-to-t from-[#061A3B]/42 via-transparent to-white/5 transition-opacity duration-500 ${
                index === 0 ? "opacity-52 group-hover:opacity-38" : "opacity-78 group-hover:opacity-54"
              }`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
