# Changelog

Semua perubahan yang signifikan pada proyek ini akan didokumentasikan di file ini.
Format yang digunakan berdasarkan [Keep a Changelog](https://keepachangelog.com/id/1.0.0/), dan proyek ini mematuhi aturan [Semantic Versioning](https://semver.org/).

## [0.2.1]
### Added
- Menambahkan endpoint publik `/api/proposal/request` untuk memproses permintaan penawaran dari CTA email hasil assessment.
- Menambahkan flow otomatis `Minta Penawaran`: generate proposal penawaran berbasis AI, kirim email proposal ke klien, dan simpan status proposal di tabel assessment.
- Menambahkan PDF proposal penawaran berisi pendahuluan, ruang lingkup, timeline, catatan investasi, serta pilihan paket A/B/C dengan harga berbeda.

### Changed
- Mengubah CTA email hasil assessment dari jadwal Calendly menjadi `Minta Penawaran`.
- Menyederhanakan body email hasil assessment menjadi pengantar formal, sementara detail analisis diarahkan ke PDF terlampir.
- Mengubah email proposal menjadi pengantar personal dengan lampiran PDF proposal, CTA utama `Jadwalkan Diskusi Lanjutan`, dan sub CTA asisten BinaHub.

### Fixed
- Memperbaiki pembentukan URL CTA email agar tidak memakai domain Vercel lama dan dapat fallback ke `VERCEL_URL` saat staging/production berubah.

## [0.2.0]
### Added
- Menambahkan fondasi dashboard admin internal di `/admin` dengan Supabase Auth dan akses terbatas untuk email admin.
- Menambahkan halaman `/admin/login` untuk login admin menggunakan Supabase email/password.
- Menambahkan API agregasi `/api/admin/dashboard` untuk membaca data assessment, leads, inquiries, rekomendasi, distribusi jawaban, statistik dimensi, dan data coach jika tabel tersedia.
- Menambahkan tampilan dashboard rekap assessment yang mengambil kebutuhan data dari contoh `Data-Visual-Report`: KPI, rata-rata skor, dimensi terkuat/terlemah, kategori, ukuran perusahaan, distribusi jawaban Q1-Q49, rekomendasi layanan, dan tabel assessment expandable.
- Menambahkan tab Kontak untuk inquiry klien dan tab Coach & HRM sebagai fondasi modul HRM/coach management.
- Menambahkan input manual coach di dashboard admin, termasuk data bidang, kategori, rate, availability, status, bio, dan catatan HRM.
- Menambahkan tindakan admin untuk data coach: tambah, edit, hapus, email langsung, dan status kerja sama.
- Menambahkan tindakan admin untuk kontak klien dan inquiry: update status, catatan internal, email langsung, dan WhatsApp.
- Menambahkan master database Kontak yang menggabungkan data assessment, inquiry, coach, dan karyawan jika tabel tersedia.
- Menambahkan filter pencarian, sumber, kategori, status, ukuran perusahaan, dan skor pada menu admin utama untuk memudahkan pencarian data.
- Menambahkan badge notifikasi merah untuk data assessment dan inquiry baru di sidebar admin.
- Menambahkan modul operasional HRM untuk assignment coach ke program, kalender availability, histori sesi, evaluasi/rating, dan dokumen/kontrak berbasis link.
- Menambahkan endpoint `/api/admin/coach-ops` untuk menyimpan, memperbarui, dan menghapus data assignment, availability, sesi, dan dokumen coach.
- Menambahkan tindakan assessment di dashboard admin: kirim ulang email hasil assessment, tandai minta proposal, generate proposal AI, dan kirim proposal penawaran via email.
- Menambahkan status assessment dan proposal untuk memantau alur `Result Email Terkirim`, `Minta Proposal`, hingga `Proposal Terkirim`.

### Changed
- Memisahkan fitur Kontak dan Inquiries di dashboard admin agar database klien/lead tidak bercampur dengan pesan masuk dari formulir kontak.
- Menyesuaikan tab Kontak menjadi database klien berbasis lead dengan kategori sumber, sedangkan Inquiries menjadi inbox operasional untuk pesan masuk.
- Mengubah data dari form kontak agar masuk ke tab Inquiries, sementara tab Kontak difokuskan untuk database lead/klien non-inquiry.
- Mengubah identitas sidebar admin dari teks `BinaHub Admin` menjadi logo resmi BinaHub.
- Menggabungkan kontak duplikat berdasarkan email atau nomor telepon agar lead dan inquiry dari orang yang sama hanya tampil satu kali di master Kontak.
- Memisahkan tab `Coach` dan `HRM` agar database coach tidak bercampur dengan operasional penugasan, sesi, availability, dan dokumen.
- Mengubah modul HRM menjadi expand/collapse agar form operasional lebih mudah dipindai.

## [0.1.2]
### Changed
- Menerapkan anti-AI visual polish lintas halaman dengan mengurangi glass/frosted treatment, shadow berat, dan card surface yang terlalu seragam.
- Menghapus dekor angka `01/02/03` pada section dan card yang bersifat pajangan, menggantinya dengan garis aksen, marker editorial, atau label kontekstual yang lebih tenang.
- Merapikan H.U.M.A.N, Positioning & Capabilities, Perspektif, Workflow, BinaInsight, Contact, dan carousel Home agar tidak terlalu terasa seperti template card-grid generatif.
- Memperhalus navbar, mega dropdown, mobile dropdown, modal layanan, form assessment, chatbot, CTA, dan output email/PDF dengan depth yang lebih restrained.
- Menjaga angka yang memang informatif seperti skor, statistik, jumlah dimensi, dan durasi assessment tetap tampil sebagai data, bukan dekorasi.

### Fixed
- Menghilangkan watermark nomor besar pada kartu pertanyaan assessment yang membuat form terasa ramai dan melelahkan.
- Menghapus label prioritas/temuan bernomor pada email hasil assessment agar report terasa lebih editorial dan tidak seperti output template otomatis.
- Mengembalikan treatment mockup kanan hero BinaInsight ke versi sebelumnya sesuai arahan, tanpa membatalkan polish visual lain.

## [0.1.1]
### Added
- Menambahkan FAQ bergaya collapse/futuristic pada halaman kontak untuk menjawab pertanyaan umum sebelum user mengirim inquiry.
- Menambahkan halaman baru `/from-bdn-to-binahub` sebagai jembatan narasi dari legacy PT Bina Daya Nugraha menuju BinaHub.
- Menambahkan section Pain Point Intro Carousel sebagai section pertama Home sebelum hero utama untuk menjelaskan masalah organisasi sebelum brand reveal.

### Changed
- Menerapkan radius discipline tahap awal pada Home dan Navbar: container besar dibuat lebih tegas, card kecil distandarkan, dan CTA pill tetap dipertahankan hanya untuk aksi utama.
- Mengurangi kesan dekorasi generatif pada Home dengan mengubah beberapa ambient orb menjadi bidang lighting yang lebih architectural.
- Menerapkan radius discipline pada halaman About dan menu Tentang Kami (`Dari BDN ke BinaHub`, `Perjalanan Kami`, dan `Gallery`) agar visual lebih editorial dan tidak terlalu bubble.
- Menerapkan radius discipline pada halaman Layanan, Perspektif, dan Diagnosa Performa, termasuk modal layanan, workflow cards, form assessment, preview report, serta panel CTA.
- Menyelesaikan radius discipline global pada Contact, Footer, Chatbot, orbit glow, dan komponen umum agar panel besar tidak lagi memakai radius bubble berlebihan.
- Memperbarui hero halaman BinaInsight/diagnosa agar layout kiri-kanan lebih jelas, teks utama lebih ringkas, dan preview hasil assessment lebih fokus.
- Meringankan tone visual hero halaman BinaInsight/diagnosa agar lebih dekat dengan atmosfer hero About yang light, warm, dan tidak terlalu biru.
- Merombak navbar menjadi lebih premium dan lega dengan struktur menu baru: Tentang Kami, Layanan, Perspektif, dan CTA Diagnosa Performa.
- Mengubah dropdown desktop navbar menjadi mega dropdown gelap bergaya horizontal dengan title besar, deskripsi pendek, active gold strip, dan hover atmosphere.
- Memperbarui mobile navigation agar item dropdown memiliki deskripsi singkat dan tetap mudah dipindai.
- Menyesuaikan CTA navbar menjadi `Diagnosa Performa`, memperhalus tipografi uppercase dropdown, dan mengganti item FAQ menjadi Kontak.
- Memperhalus Pain Point Intro Carousel dengan durasi slide 10 detik, menghapus label kecil, dan menerapkan background `pain1.png`, `pain2.png`, dan `pain3.png` di bawah overlay navy.
- Mengaktifkan background `pain4.png`, memperbaiki headline tiap slide Pain Point agar lebih tajam, dan meningkatkan CTA `Lihat Jawaban BinaHub` menjadi glass-gold premium.
- Menyesuaikan posisi crop background slide 4 Pain Point agar bagian atas gambar tidak terpotong.
- Memperbaiki responsive Pain Point Intro Carousel untuk mobile, tablet, laptop kecil, dan layar di bawah 1360/1440px melalui penyesuaian tinggi, typography, overlay, posisi gambar, grid mask, dots, dan CTA.
- Meningkatkan style dropdown mobile navbar menjadi panel navigasi premium dengan header, expanded state navy, submenu card, dan CTA yang lebih rapi.
- Merapikan section spektrum penilaian BinaInsight dengan layout card yang lebih kuat dan tanpa contoh sinyal yang terlalu kaku.
- Memperbarui pengalaman form assessment dengan progress/context copy yang lebih informatif, namun mengembalikan pertanyaan akhir dan loading screen ke versi klien.
- Memperbarui email hasil assessment agar seluruh heading, subject, dan copy utama menggunakan Bahasa Indonesia.
- Memperbarui prompt analisis assessment agar output AI, archetype, dan fallback diagnosis konsisten berbahasa Indonesia.
- Merombak PDF hasil assessment menjadi laporan 4 halaman eksplisit dengan halaman prioritas utama dan roadmap lanjutan terpisah agar layout tidak tumpah tanpa margin.
- Menerjemahkan label utama PDF assessment ke Bahasa Indonesia, termasuk peta intelijen diagnostik, papan skor performa, penalaran diagnostik, dan roadmap transformasi.
- Menambahkan pemadatan teks otomatis pada bagian insight, rekomendasi, dan strategic key di PDF agar komposisi halaman lebih stabil.
- Memperbarui halaman Journey/Perjalanan Kami sesuai arahan copy klien, termasuk penyesuaian istilah BDN dan pengembalian statistik/CTA ke versi sebelumnya.
- Menyesuaikan Gallery agar hierarchy cerita foto lebih terasa tanpa mengubah treatment foto utama yang diminta untuk dilewati.

### Fixed
- Mengembalikan mockup kanan pada hero halaman BinaInsight/diagnosa ke versi sebelumnya sesuai arahan revisi.
- Memperbaiki issue React PDF ketika section roadmap berpindah otomatis ke halaman baru tanpa padding/header/footer dengan cara membagi konten ke halaman eksplisit.
- Memperbaiki sisa label Inggris dan karakter mojibake pada output email/PDF assessment.

## [0.1.0] - 2026-05-25
### Added
- Menambahkan halaman khusus `/gallery` untuk dokumentasi aktivitas BinaHub.
- Menambahkan section preview Gallery di halaman Home dengan mosaic image layout dan CTA menuju halaman gallery.
- Menambahkan entry menu `Gallery` pada dropdown `Tentang Kami`.
- Menambahkan aset texture H.U.M.A.N untuk lima nilai utama di `public/asset`.

### Changed
- Merombak visual halaman About pada section Positioning & Capabilities agar memakai card ambient texture yang lebih premium dan sesuai arahan desain.
- Memperbaiki section Visi & Misi pada halaman About dengan visual hierarchy yang lebih kuat, rotating highlighted mission card, texture system, dan motion yang lebih subtle.
- Memperbarui section H.U.M.A.N pada halaman About dengan texture berbeda per nilai, active-state texture, dan tone navy yang lebih menyatu.
- Menyempurnakan Footer dengan ambient background, copy brand yang lebih selaras, hover interaction, dan contrast bottom bar yang lebih jelas.
- Menyempurnakan Navbar menjadi floating glass navigation yang lebih slim, depth lebih baik, dan dropdown yang kembali tampil stabil.
- Memperbarui Hero Home dengan CTA baru yang lebih executive dan overlay readability yang lebih kuat, sambil mempertahankan rotating title.
- Memperbarui carousel Home dengan transisi cinematic, progress navigation, dan slide misi berbentuk pop-up points sesuai permintaan klien.
- Menambahkan color treatment pada Gallery agar foto dokumentasi lebih konsisten dengan atmosfer brand: muted, navy shadow, warm highlight, dan anchor image yang lebih hidup.
- Memperbarui halaman Layanan dengan subtitle hero yang lebih terbaca, background text yang lebih subtle, hierarchy core service cards, dan modal detail berbasis tab.
- Mengubah tone warning pada section “Mengapa Program Sering Gagal?” menjadi red-amber agar tetap memberi sense of problem tanpa terasa alarm.
- Memperbaiki hydration mismatch pada halaman Layanan dengan mengganti random render values menjadi posisi ambient pixel yang deterministik.
- Memperbarui halaman Perspektif dengan headline yang lebih opinionated, manifesto cards, quote pada methodology section, dan workflow timeline interaktif yang lebih besar.

### Fixed
- Memperbaiki dropdown navbar yang sempat hilang akibat container clipping.
- Membersihkan beberapa issue visual seperti overlay terlalu kuat, texture terlalu tajam, dan spacing/contrast yang kurang konsisten di beberapa section.

## [0.0.2] - 2026-05-18
### Added
- Implementasi sistem tipografi baru (`Poppins` dan `Inter`) dari Panduan Identitas Merek v1.2.1.
- *Styling* khusus untuk *text selection* menggunakan warna *Navy* dan putih untuk meningkatkan identitas merek.

### Changed
- Migrasi massal skema warna situs ke spesifikasi CMYK/Pantone resmi (Navy `#0B2C6B`, Gold `#D9A441`, Abu Muda `#F5F7FA`, Abu Gelap `#4A4C54`).
- Pembaruan konfigurasi `next/font/google` pada `layout.tsx` (menggantikan `<link>` Google Fonts lama).
- Pembaruan skrip otomasi `replace_colors.js` dengan pemetaan warna baru untuk mempermudah pembaruan di masa depan.

## [0.0.1] - 2026-05-18
### Added
- Inisialisasi proyek `website-prod` BinaHub.
- Implementasi sistem desain dasar "Crisp Elegance" menggunakan `globals.css` dan Tailwind CSS.
- Pembuatan komponen-komponen antarmuka pengguna (UI) awal seperti *Navbar*, *Footer*, *Hero Section*, dan *Services*.
- Implementasi kuesioner asesmen diagnostik di halaman Insight.
