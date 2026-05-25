import type { Metadata } from "next";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery | BinaHub",
  description: "Dokumentasi kegiatan, ruang belajar, dan perjalanan transformasi BinaHub.",
};

export default function GalleryPage() {
  return (
    <div className="bg-[#F5F7FA] text-[#4A4C54]">
      <section className="relative overflow-hidden px-6 pb-16 pt-36 md:px-12 md:pb-24 md:pt-44 lg:px-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-20 h-[520px] w-[520px] rounded-full bg-[#0B2C6B]/[0.06] blur-[140px]" />
          <div className="absolute right-0 top-32 h-[460px] w-[460px] rounded-full bg-[#D9A441]/[0.11] blur-[135px]" />
          <div className="absolute left-[40%] bottom-20 h-[300px] w-[300px] rounded-full bg-[#D9A441]/[0.045] blur-[110px]" />
          <div className="absolute inset-0 opacity-[0.026] bg-[linear-gradient(90deg,transparent_0,transparent_96%,rgba(11,44,107,0.7)_100%)] bg-[length:84px_100%]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-full bg-black/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#0B2C6B]/52">
                Gallery
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-light leading-[1.02] tracking-tight text-[#0B2C6B]">
                Dokumentasi perjalanan BinaHub.
              </h1>
            </div>
            <p className="max-w-2xl text-base leading-[1.9] text-[#4A4C54]/70 md:text-lg">
              Kumpulan momen dari aktivitas pembelajaran, kolaborasi, dan pengembangan kapabilitas
              yang menjadi bagian dari ekosistem transformasi BinaHub.
            </p>
          </div>

          <div className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY_IMAGES.map((image, index) => {
              const isAnchor = index === 0 || index === 7;

              return (
                <figure
                  key={image.src}
                  className={`group relative overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_20px_70px_-50px_rgba(11,44,107,0.62)] ${
                    isAnchor ? "sm:col-span-2 sm:row-span-2" : ""
                  } ${index === 4 || index === 11 ? "lg:col-span-2" : ""}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] ${
                      isAnchor
                        ? "saturate-[0.88] contrast-[1.02] brightness-[1.03] group-hover:saturate-[0.96] group-hover:brightness-[1.07]"
                        : "saturate-[0.72] contrast-[0.96] brightness-[0.95] group-hover:saturate-[0.82] group-hover:brightness-[1.01]"
                    }`}
                  />
                  <div className={`absolute inset-0 mix-blend-multiply ${isAnchor ? "bg-[#0B2C6B]/[0.035]" : "bg-[#0B2C6B]/[0.105]"}`} />
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isAnchor
                      ? "bg-[linear-gradient(135deg,rgba(217,164,65,0.16)_0%,rgba(11,44,107,0.05)_48%,rgba(255,255,255,0.03)_100%)] opacity-72 group-hover:opacity-58"
                      : "bg-[linear-gradient(135deg,rgba(11,44,107,0.25)_0%,rgba(11,44,107,0.10)_42%,rgba(217,164,65,0.10)_100%)] opacity-82 group-hover:opacity-56"
                  }`} />
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#061A3B]/42 via-transparent to-white/5 transition-opacity duration-500 ${
                    isAnchor ? "opacity-52 group-hover:opacity-38" : "opacity-78 group-hover:opacity-54"
                  }`} />
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
