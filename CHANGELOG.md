# Changelog

Semua perubahan yang signifikan pada proyek ini akan didokumentasikan di file ini.
Format yang digunakan berdasarkan [Keep a Changelog](https://keepachangelog.com/id/1.0.0/), dan proyek ini mematuhi aturan [Semantic Versioning](https://semver.org/).

## [0.2.5]
### Added
- Menambahkan popup quiz Home pada area pain point dengan trigger 5 detik atau setelah user melewati section pain point.
- Menambahkan 10 pertanyaan quick diagnostic, penyimpanan hasil ke `home_quiz_results`, dan perbandingan skor user terhadap rata-rata peserta.
- Menambahkan endpoint `/api/home-quiz` beserta SQL Supabase pendamping untuk database hasil quiz.
- Menambahkan konsep follow-up inquiry 3 tingkat: H+2, H+7, dan H+14.
- Menambahkan tombol manual Follow Up 1, Follow Up 2, dan Follow Up 3 di tab Inquiries yang generate email via AI, mengirim email, lalu mengubah status inquiry otomatis.
- Menambahkan follow-up 3 tingkat di tab Assessment untuk email result dan email proposal.
- Menambahkan endpoint follow-up generik yang mendukung inquiry, assessment result, assessment proposal, serta cron otomatis berbasis `FOLLOW_UP_CRON_SECRET`.
- Menambahkan tracking SQL untuk follow-up inquiry, follow-up assessment result/proposal, dan tabel event log `follow_up_events`.
- Menambahkan kategori Assossiate untuk assessor, facilitator, trainer, project manager, coach, tour guide, travel agency, event organizer, dan konsultan spesialis.
- Menambahkan field lampiran CV, LinkedIn URL, dan ringkasan otomatis dari LinkedIn pada form assossiate.
- Menambahkan upload file CV assossiate melalui endpoint admin dan private Supabase Storage bucket `associate-documents`.
- Menambahkan ekstraksi field LinkedIn berbasis profile text/export yang diberikan admin, tanpa melakukan direct crawling LinkedIn yang tidak berizin.
- Menambahkan stop condition follow-up otomatis agar cron tidak mengirim follow-up lanjutan saat status sudah dibalas, lanjut diskusi, qualified, client, revisi, deal, lost, closed, selesai, atau diarsipkan.
- Menambahkan rekomendasi status cerdas di tab Kontak agar status dapat diarahkan otomatis berdasarkan sumber dan konteks kontak.

### Changed
- Menyederhanakan hero halaman Kontak menjadi headline tunggal "Kontak".
- Menghapus Jam Respons dari panel informasi kiri halaman Kontak.
- Mengubah copy brief form inquiry menjadi arahan diskusi lanjutan yang lebih langsung.
- Mengubah label `Email Kerja` menjadi `Email Perusahaan`.
- Mengubah tab `Coach` menjadi `Assossiate`.
- Mengubah tab `HRM` menjadi `Project Assignment`.
- Menyesuaikan bahasa modul operasional admin dari coach/HRM ke assossiate/project assignment.
- Menyesuaikan copy FAQ halaman Kontak agar merujuk pada diskusi dengan tim BinaHub.
- Menyesuaikan section Transformation Architecture di halaman Perspektif dengan background texture baru dan carousel tab ICEO/OWN/4P.

### Removed
- Menghapus FAQ `Apakah harus sudah tahu layanan yang dibutuhkan?` dari halaman Kontak.

## [0.2.4]
### Changed
- Merapikan flow Home menjadi lebih kuratif: hero, pain point, carousel positioning/visi/misi, layanan, dan CTA akhir.
- Memendekkan copy judul pain point agar lebih tajam dan mudah dipindai.
- Mengubah hero Home menjadi stacking behavior di desktop, sementara mobile tetap proporsional dan tidak memakai sticky effect yang berpotensi janky.
- Menyesuaikan ukuran container hero Home agar selaras dengan hero halaman Tentang Kami.
- Mengubah trigger efek navbar agar baru aktif saat section pain point mulai naik ke area navigasi, bukan langsung setelah scroll kecil.
- Mengembalikan carousel Posisi Kami dan Misi Kami ke treatment gelap/cinematic agar tidak terasa seperti section putih yang sama dengan pain point.
- Mengembalikan H.U.M.A.N ke Home sebagai section pemisah full-width berbasis scroll/parallax: penjelasan bergeser, kepanjangan nilai muncul bertahap, lalu berubah menjadi `HUMAN` gold dengan CTA detail nilai.
- Memusatkan intro H.U.M.A.N, mengubah transisi penjelasan menjadi slide-out tanpa fade yang bertumpuk, memakai gold solid pada state final, serta menstabilkan tinggi carousel Home agar slide positioning, visi, dan misi memakai frame yang konsisten.
- Mengganti background light/dark H.U.M.A.N dari glow/blob menjadi abstract architectural texture berbasis grid, diagonal etching, dan solid navy/gold treatment.
- Mengganti copy pengantar H.U.M.A.N Home agar lebih ringkas dari versi About, serta memakai satu texture dark dari H.U.M.A.N About dan generated light texture khusus untuk Home.
- Menghapus garis melintang pada final state H.U.M.A.N dan mengganti dark background Home dengan generated HD abstract texture yang lebih bersih.
- Mengubah trigger compact navbar agar baru aktif setelah section pain point benar-benar terscroll, menambahkan transisi layout yang lebih halus, dan memperbaiki hover bridge mega dropdown agar panel tidak mudah hilang saat dipilih.
- Memperbaiki responsive Home untuk mobile kecil, tablet, laptop di bawah 1440px, dan layar lebar: menurunkan tinggi hero/pain point mobile, mengubah pain point menjadi headline kiri-bawah, merapikan carousel mobile, memberi ruang CTA H.U.M.A.N di tablet, dan mengubah slide misi carousel menjadi map/node compact.
- Mengubah breakpoint navbar tablet ke mode mobile agar tidak kepotong di 768px, menyembunyikan navbar mobile saat scroll pertama, mengganti indikator carousel menjadi progress lines, dan memadatkan slide misi agar tidak overlap di mobile.
- Merapikan flow halaman About menjadi Hero, Siapa Kami, Legacy & Perjalanan, Positioning, Visi & Misi, H.U.M.A.N, dan CTA akhir; memperjelas perbedaan tautan Perjalanan Kami dan Dari BDN ke BinaHub; serta memadatkan capabilities agar tidak tumpang tindih dengan misi.
- Mengubah arsitektur CTA akhir menjadi bagian dari Footer route-aware: halaman yang memiliki CTA memakai satu container CTA+Footer dengan background sesuai halaman, sedangkan halaman tanpa CTA tetap memakai footer normal full-width.
- Menghapus pendekatan ruang bawah/negative margin pada CTA lama agar tidak ada gap kecil di bawah footer dan footer panel menempel ke dasar container CTA.
- Mengembalikan CTA Home ke light image treatment tanpa overlay navy, sementara CTA halaman Layanan, About, Journey, Dari BDN ke BinaHub, dan Transformation Signals tetap mempertahankan copy serta konteks masing-masing.
- Merapikan halaman Layanan dengan menghapus mode orbit teknis, mempertahankan peta gambar sebagai satu-satunya eksplorasi layanan, memindahkan Alur Kerja ke halaman Layanan, dan memperbaiki anchor/detail navigasi.
- Mempertegas copy problem section Layanan, mengganti label `Core` menjadi kategori kebutuhan Diagnose/Develop/Execute/Measure, mengarahkan CTA konsultasi Layanan ke halaman Kontak, dan mengganti indikator Alur Kerja menjadi angka 1-4.
- Menjaga halaman Perspektif tetap fokus sebagai thought leadership dengan mempertahankan Metodologi dan memindahkan Alur Kerja yang lebih operasional ke halaman Layanan.
- Membuat section Transformation Signals di Perspektif menjadi full-width band agar terasa lebih editorial dan menonjol sebagai aset briefing utama.
- Memperkuat halaman Kontak sebagai jalur B2B dengan field organisasi/perusahaan dan jabatan/role, validasi pesan yang lebih kontekstual, FAQ full-width putih, serta SQL Supabase untuk kolom contact form baru.
- Mengganti istilah user-facing `pilar` pada halaman Layanan dan nilai menjadi `layanan`/`prinsip` agar bahasa struktur lebih jelas dan tidak menimbulkan kategori baru.
- Menyesuaikan warna teks FAQ Kontak ke navy BinaHub agar konsisten dengan tema visual halaman dan tidak terasa lepas dari brand.
- Meredesain halaman Dari BDN ke BinaHub menjadi editorial transition page dengan hero gelap premium, proof ledger, timeline boardroom, positioning cards, dan industry context panel.
- Meredesain Transformation Signals 2026 menjadi executive briefing dengan executive summary, priority signals, signal register yang lebih rapi, dan recommended response lens yang lebih kuat.
- Mengubah section Spektrum Pengukuran BinaInsight dari scroll-driven menjadi click-driven full-width band agar tidak menghasilkan ruang kosong besar, dengan overlay navy lebih ringan supaya foto background tetap terlihat.
- Menambahkan jarak bawah pada section Spektrum Pengukuran BinaInsight agar tidak menempel ke CTA berikutnya.
- Merapikan Footer agar struktur link mengikuti navbar: Tentang, Layanan, Perspektif, CTA Diagnosa Performa, Hubungi Kami, dan kontak.
- Menghapus tombol CTA dari panel Footer, mengganti background CTA+Footer route-aware dengan abstract navy image baru, dan mengganti background Spektrum Pengukuran BinaInsight dengan image baru.
- Mengembalikan background CTA+Footer Home ke versi light semula, menambahkan dua variasi background CTA+Footer untuk halaman lain, dan menurunkan overlay navy Spektrum Pengukuran agar foto lebih dominan.
- Mengubah state navbar saat scroll menjadi glossy translucent blur agar terasa lebih ringan dan modern.
- Menghapus teks penjelasan tambahan di Footer, membuat navbar scrolled benar-benar transparent blur tanpa white fill, serta mengganti hero Perjalanan Kami dan Dari BDN ke BinaHub dengan story hero background navy-gold baru.
- Mengubah statistik Dari BDN ke BinaHub menjadi glossy blur panel dengan background navy-gold yang selaras dengan hero.
- Memindahkan statistik Dari BDN ke BinaHub ke pojok kanan bawah hero dengan garis minimalis dan label italic, lalu mengganti area lama menjadi positioning section glossy blur.
- Memperbaiki statistik hero Dari BDN ke BinaHub agar tidak tumpang tindih dengan copy hero pada viewport berbeda.
- Memindahkan positioning Dari BDN ke BinaHub ke bawah Origin Story sebagai section full-width dengan treatment glossy blur.
- Mengganti background card Priority Signals pada halaman Transformation Signals 2026 dengan `cta-footer-bg.png` dan treatment glossy blur.
- Memadatkan statistik hero Dari BDN ke BinaHub, merapikan jarak hero ke Origin Story, dan membalik background Positioning agar tidak sama dengan hero.
- Membuat navbar lebih adaptif terhadap tone area di belakangnya: teks berubah terang saat berada di area gelap dan kembali navy saat berada di area terang.
- Mengganti background section Transformation Signals di halaman Perspektif dengan `human-texture-dark-home.png` agar selaras dengan bahasa visual H.U.M.A.N.
- Meredesain halaman Perjalanan Kami menjadi editorial timeline dengan masthead, chapter treatment, image frame konsisten, dan quote akhir yang lebih matang tanpa mengubah narasi utama.
- Menyambungkan Transformation Signals 2026 dengan pain point Home melalui section visual berbasis asset slide pain point agar alur dari Home ke briefing terasa konsisten.
- Mengubah default `npm run dev` ke `next dev --webpack` untuk menghindari lonjakan memori Turbopack di Windows/OneDrive, serta menambahkan `npm run dev:turbo` bila perlu menjalankan Turbopack secara eksplisit.
- Merapikan struktur navigasi utama menjadi Home, Tentang, Layanan, Perspektif, Kontak, dan CTA Diagnosa Performa.
- Mengubah halaman Transformation Signals 2026 menjadi gaya executive briefing yang lebih ringkas, strategis, dan siap dibaca decision maker.

### Removed
- Menghapus rendering section Gallery dan Marquee dari flow utama Home agar alur pesan lebih fokus.
- Menghapus halaman khusus layanan individual lama seperti Academy, Coach, Lab, Play, Impact, dan Works dari sitemap/route karena detail layanan diarahkan ke eksplorasi modal di halaman Layanan.

## [0.2.3]
### Added
- Menambahkan akses dokumen langsung dari dashboard admin untuk melihat preview isi email result assessment dan email proposal.
- Menambahkan endpoint admin `/api/admin/assessments/documents` untuk mengambil email terkirim dan attachment PDF asli dari Resend.
- Menambahkan tombol `Lihat Email Result`, `PDF Result`, `Lihat Email Proposal`, dan `PDF Proposal` pada detail assessment admin.
- Menambahkan penyimpanan `result_email_id` dan `proposal_email_id` dari response Resend agar salinan email/attachment dapat diakses presisi dari dashboard.
- Menambahkan konfigurasi metadata global, Open Graph, Twitter card, canonical URL, robots, sitemap, dan OG image untuk memperkuat SEO dasar website.
- Menambahkan metadata per route utama seperti About, Ecosystem, Insight, Perspektif, Contact, Academy, Coach, Lab, Play, Impact, Works, Journey, dan halaman BDN-to-BinaHub.
- Menambahkan halaman `loading`, `not-found`, `error`, dan `global-error` agar fallback sistem lebih rapi dan tetap sesuai identitas visual BinaHub.
- Menambahkan `ChatBotLoader` agar chatbot dimuat secara lazy dan tidak membebani initial render.

### Changed
- Mengubah akses salinan PDF result/proposal agar mengambil dokumen asli dari Resend, bukan generate ulang PDF dari data assessment.
- Menampilkan metadata email Resend di preview admin, termasuk status terakhir, waktu kirim, Resend ID, pengirim, penerima, dan daftar attachment.
- Menambahkan fallback query dashboard agar tetap berjalan pada database lama yang belum memiliki kolom email ID.
- Mengubah Home page menjadi Server Component kembali dengan wrapper client khusus untuk intro animation dan hero.
- Mengubah beberapa image penting dari `<img>` ke `next/image`, termasuk intro animation, hero About, carousel About, landing Insight, dan stacking service cards.
- Mengatur intro animation agar hanya berjalan sekali per sesi browser sehingga navigasi internal terasa lebih ringan.
- Menambahkan header security dasar melalui `next.config.ts`, termasuk `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, HSTS, dan `Permissions-Policy`.
- Mengaktifkan format image modern `AVIF` dan `WebP` pada konfigurasi Next image.

### Fixed
- Memperbaiki lint error pada `landing-step.tsx` dengan mengganti cast `any` untuk `PixelIcon` menjadi union type eksplisit.

### Notes
- Tambahkan kolom Supabase berikut sebelum deploy penuh fitur dokumen admin:
  `alter table assessments add column if not exists result_email_id text, add column if not exists proposal_email_id text;`
- Data assessment lama yang belum menyimpan Email ID perlu dikirim ulang sekali agar salinan Resend dapat dibuka langsung dari dashboard admin.

## [0.2.2]
### Added
- Menambahkan halaman editorial `/perspektif/transformation-signals-2026` sebagai aset BinaHub Intelligence untuk memuat 10 sinyal perubahan dunia kerja beserta evidence fragment, implikasi, dan perspektif BinaHub.
- Menambahkan menu `Transformation Signals` pada navigasi Perspektif.
- Menambahkan menu `Home` pada navbar utama.

### Changed
- Mengubah section pain point Home menjadi narasi `Transformation Signals` berbasis 4 slide dengan progression: tekanan bisnis, energi pekerja, gap teknologi, dan respons BinaHub.
- Mengganti asset visual slide pain point ke `/asset/slide-1.png` hingga `/asset/slide-4.png`.
- Mengubah section transformation menjadi full-screen sampai area navbar, dengan treatment visual lebih light/editorial dan slideshow tetap berjalan.
- Memperbarui copy headline dan subcopy slide agar lebih strategis, lebih manusiawi, dan mengurangi jargon berulang.
- Menyesuaikan navbar menjadi floating white pill, logo tanpa background kapsul, CTA Diagnosa Performa di kanan, dan sticky state yang hanya menampilkan menu saat user scroll.
- Mengurangi ukuran headline pain point sekitar 15% agar lebih seimbang dengan visual light editorial.
- Mengubah halaman `/perspektif/transformation-signals-2026` menjadi layout documentation/docs dengan sidebar navigasi, `On this page`, system map, dan blok evidence/implication per signal.

### Fixed
- Memperbaiki runtime error navbar ketika menu tanpa submenu seperti `Home` memicu mega dropdown.
- Memperbaiki kontras dan visual depth section transformation agar tidak terlalu gelap, terlalu milky, atau mengganggu keterbacaan headline.
- Menghapus label `Transformation Signals 2026`, mood labels, dan marker terpisah yang membuat section terasa terlalu UI/deck-like.

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
