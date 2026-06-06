# Repository Architecture

Dokumen ini menjelaskan struktur `website-prod` setelah perapihan repo agar routing, ownership, dan maintenance lebih mudah dibaca.

## Prinsip Struktur

- `src/app` mengikuti App Router Next.js. Folder route publik tetap berada langsung di bawah `src/app`, tetapi implementasi halaman besar dipindah ke folder route-private `_components`.
- `src/app/admin` menjadi boundary dashboard admin. UI admin, helper admin, dan tipe khusus admin diletakkan dekat route admin agar mudah dirawat bersama.
- `src/app/api/admin` menjadi boundary backend admin. Route ini tetap berada di `website-prod` karena dashboard admin memakai API yang sama dan masih terhubung dengan Supabase, email, AI, serta dokumen.
- `src/lib` berisi integrasi lintas route seperti Supabase, auth admin, email, AI, PDF, dan helper API admin.
- `src/components/layout` berisi komponen layout global seperti navbar dan footer. Wrapper lama di `src/components/Navbar.tsx` dan `src/components/Footer.tsx` tetap ada agar import lama tidak langsung pecah.
- `src/components`, `src/data`, dan `src/hooks` dipakai untuk website publik dan komponen lintas halaman.

## Routing Utama

- Website publik: `/`, `/about`, `/contact`, `/ecosystem`, `/insight`, `/journey`, `/perspektif`, dan route publik lain di `src/app`.
- Dashboard admin: `/admin`.
- Login admin: `/admin/login`.
- API admin: `/api/admin/*`.
- API publik: `/api/assessment`, `/api/contact`, `/api/chat`, `/api/home-quiz`, dan `/api/proposal/request`.

## Struktur Route Publik

Halaman publik besar memakai pola route tipis:

```text
src/app/about
├─ page.tsx                       # Route wrapper tipis
└─ _components/about-page-content.tsx

src/app/ecosystem
├─ page.tsx
└─ _components/ecosystem-page-content.tsx

src/app/contact
├─ page.tsx
└─ _components/contact-page-content.tsx

src/app/perspektif/transformation-signals-2026
├─ page.tsx
└─ _components/transformation-signals-page-content.tsx
```

Untuk route baru:

- Simpan `page.tsx` sebagai wrapper tipis.
- Letakkan section/komponen besar di `_components`.
- Letakkan data statis route di `_data` bila mulai banyak.
- Letakkan helper khusus route di `_lib` bila tidak dipakai route lain.

## Struktur Layout Global

```text
src/components
├─ Navbar.tsx                     # Compatibility wrapper
├─ Footer.tsx                     # Compatibility wrapper
└─ layout
   ├─ navbar.tsx                  # Implementasi navbar
   └─ footer.tsx                  # Implementasi footer
```

## Struktur Admin

```text
src/app/admin
├─ page.tsx                       # Shell dashboard: auth, fetch data, tab routing, layout utama
├─ login/page.tsx                 # Login admin
├─ _components
│  ├─ overview.tsx                # Ringkasan dashboard
│  ├─ smart-center-panel.tsx      # Automation Center dan project autopilot
│  ├─ assessment-panel.tsx        # Assessment, dokumen, email preview, follow-up
│  ├─ contacts-panel.tsx          # Kontak & leads
│  ├─ inquiries-panel.tsx         # Inquiry masuk dan follow-up
│  ├─ associate-panel.tsx         # Associate Network dan Project Assignment
│  └─ shared.tsx                  # Komponen UI admin reusable
└─ _lib
   ├─ constants.ts                # Tab, option list, workflow, copy helper
   ├─ types.ts                    # Kontrak data dashboard admin
   └─ utils.ts                    # Formatter, filter helper, export CSV
```

## Aturan Maintenance

- Tambahkan modul admin baru sebagai file baru di `src/app/admin/_components`, bukan memperbesar `page.tsx`.
- Tambahkan option, tab, atau copy panduan di `src/app/admin/_lib/constants.ts`.
- Tambahkan tipe dashboard admin di `src/app/admin/_lib/types.ts`.
- Tambahkan helper frontend admin di `src/app/admin/_lib/utils.ts`.
- Route backend baru untuk admin masuk ke `src/app/api/admin/<nama>/route.ts`.
- Validasi request backend admin sebaiknya memakai `zod` dan helper `src/lib/admin-api.ts`.
- Jalankan `npm run quality:admin` sebelum menganggap perubahan admin siap direview.
- Jalankan `npm run quality:public` untuk perubahan website publik.
- Jalankan `npm run quality:repo` untuk perubahan yang menyentuh admin dan website publik sekaligus.

## Catatan Pemecahan File

Sebelumnya `src/app/admin/page.tsx` berisi shell, semua panel UI, tipe, konstanta, helper, dan subkomponen. Setelah perapihan, file ini menjadi shell dashboard saja dan turun menjadi sekitar 300-an baris. Modul besar dipisah berdasarkan domain agar mudah dicari, diuji, dan dikembangkan.

Pemecahan lanjutan yang disarankan:

- Pecah `associate-panel.tsx` menjadi form Associate Network dan form Project Assignment jika state management sudah dipisah.
- Pecah `assessment-panel.tsx` menjadi list/table, detail drawer, email preview, dan follow-up section bila fitur assessment bertambah.
- Pecah `about-page-content.tsx`, `ecosystem-page-content.tsx`, `contact-page-content.tsx`, dan `transformation-signals-page-content.tsx` menjadi section file bila akan ada perubahan konten besar berikutnya.
- Pecah `src/lib/pdf-service.tsx`, `src/lib/ai-service.ts`, dan `src/lib/email-service.ts` menjadi folder service per domain saat ada perubahan backend berikutnya.
- Pertimbangkan `src/features/admin` hanya jika modul admin mulai dipakai lintas route di luar `/admin`.
