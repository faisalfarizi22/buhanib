# Manual QA Checklist - BinaHub Website

Panduan ini dipakai untuk menguji kelancaran fitur website secara manual sebelum deploy atau setelah update besar.

## 1. Persiapan

- Jalankan website lokal: `npm run dev`.
- Buka mode desktop dan mobile responsive di browser.
- Siapkan akses Supabase untuk cek tabel: `contacts`, `home_quiz_results`, `leads`, `assessments`, `chat_sessions`, `inquiries`, dan tabel admin terkait.
- Siapkan email test dan WhatsApp test yang aman dipakai.
- Bersihkan session browser bila perlu: incognito atau clear `sessionStorage`.

## 2. Smoke Test Publik

- Buka `/id` dan `/en`.
- Pastikan navbar, footer, CTA, language switcher, dan chatbot muncul normal.
- Klik semua menu utama: Home, About, Services, Perspective, Contact, Performance Diagnostic.
- Expected: tidak ada error boundary, tidak ada halaman blank, semua link internal mempertahankan locale aktif.

## 3. Test Bilingual

- Dari `/id`, pindah ke `/en` melalui switcher.
- Cek halaman Home, About, Services, Contact, Journey, From BDN to BinaHub, Perspective, Transformation Signals, dan Insight.
- Expected: headline, CTA, label form, modal, popup, loading, error message, dan metadata visible tidak campur bahasa.
- Cek tombol CTA di mode EN.
- Expected: semua menuju `/en/...`, bukan kembali ke route Indonesia.

## 4. Home Quick Diagnostic Quiz

- Buka Home dengan session baru.
- Scroll ke section pain point atau tunggu popup muncul.
- Klik Start Quiz, ubah beberapa slider, lalu klik View Result.
- Expected UI: hasil tampil, skor dan rata-rata muncul, tidak ada pesan gagal simpan.
- Cek Supabase `home_quiz_results`.
- Expected DB: row baru masuk dengan `answers`, `score`, `max_score`, `page_path`, `user_agent`, dan `created_at`.
- Jika gagal: cek response `/api/home-quiz`; error permission biasanya diselesaikan dengan `supabase/v0.2.9-home-quiz-permissions.sql`.

## 5. Contact Form

- Buka `/id/contact` dan `/en/contact`.
- Submit kosong.
- Expected: validasi tampil sesuai bahasa.
- Submit data test lengkap.
- Expected UI: success state sesuai bahasa.
- Cek Supabase `contacts` atau tabel kontak yang digunakan endpoint.
- Expected DB: data kontak masuk dan status awal benar.

## 6. Chatbot Nara

- Buka chatbot di mode ID dan tanya pertanyaan umum tentang layanan.
- Expected: jawaban Bahasa Indonesia.
- Buka mode EN dan tanya pertanyaan yang sama.
- Expected: jawaban Bahasa Inggris.
- Test lead capture: berikan nama dan email jika diminta.
- Expected DB: session tersimpan di `chat_sessions`; lead tersimpan bila flow meminta email.

## 7. BinaInsight Assessment

- Buka `/id/insight` dan `/en/insight`.
- Jalankan sampai step profil organisasi.
- Expected: semua label, placeholder, instruksi, pilihan skala, navigation footer, loading, dan success state sesuai bahasa.
- Submit assessment lengkap dengan data test.
- Expected UI: success state muncul.
- Cek Supabase `leads` dan `assessments`.
- Expected DB: lead dan assessment masuk, scores/recommendations terisi setelah AI sukses.
- Cek email.
- Expected: email/PDF sesuai bahasa aktif.

## 8. Admin Login dan Dashboard

- Buka `/admin/login`.
- Test login salah.
- Expected: error jelas dan tidak masuk dashboard.
- Login benar.
- Expected: dashboard terbuka dan tab utama muncul.
- Cek Overview, Smart Center, Assessment, Contact, Inquiries, Associate Network.
- Expected: data load tanpa crash dan tidak ada action utama yang ambigu.

## 9. Admin Operational Actions

- Assessment: buka detail, test resend result, request proposal, send proposal, dan follow-up dengan data test.
- Smart Center: generate assignment AI, review draft, lalu send invitation dengan data test.
- Associate Network: tambah associate, upload/isi dokumen, simpan availability, session, dan evaluasi.
- Contact/Inquiries: ubah status dan jalankan follow-up.
- Expected: setiap action memberi feedback, data berubah di database, dan email/event log tercatat bila fitur mengirim komunikasi.

## 10. Responsive dan UX

- Test viewport mobile: 390x844.
- Test tablet: 768x1024.
- Test desktop: 1440x900.
- Expected: navbar tidak overlap, CTA terlihat, form tidak kepotong, modal bisa discroll, dan text tidak keluar dari container.
- Test keyboard navigation untuk form utama.
- Expected: focus state jelas dan urutan tab masuk akal.

## 11. Error dan Empty State

- Buka URL tidak valid seperti `/en/halaman-tidak-ada`.
- Expected: 404 English.
- Buka `/id/halaman-tidak-ada`.
- Expected: 404 Indonesia.
- Matikan sementara network/API saat dev bila memungkinkan.
- Expected: form dan quiz menampilkan error manusiawi, bukan success palsu.

## 12. SEO dan Metadata

- Inspect page source untuk `/id`, `/en`, `/id/insight`, dan `/en/insight`.
- Expected: title, description, canonical, lang, dan OpenGraph sesuai locale.
- Buka `/opengraph-image`.
- Expected: image render tanpa error.

## 13. Pre-Deploy Checklist

- Jalankan `npm run quality:repo`.
- Jalankan `npm run build`.
- Pastikan SQL migrasi baru sudah dijalankan di Supabase bila ada file baru di folder `supabase`.
- Lakukan minimal satu submit real untuk Contact, Quiz, Chatbot, dan Assessment di environment target.
- Cek log deployment untuk error runtime.

