# Changelog

Semua perubahan yang signifikan pada proyek ini akan didokumentasikan di file ini.
Format yang digunakan berdasarkan [Keep a Changelog](https://keepachangelog.com/id/1.0.0/), dan proyek ini mematuhi aturan [Semantic Versioning](https://semver.org/).

## [Unreleased]

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
