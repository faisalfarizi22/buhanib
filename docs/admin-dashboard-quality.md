# Admin Dashboard Quality Gate

Dokumen ini menjadi checklist ringkas untuk menjaga dashboard admin tetap rapi, jelas, dan aman setelah audit UX/backend.

## Command wajib

Jalankan sebelum mengirim perubahan admin:

```bash
npm run quality:admin
```

Command tersebut menjalankan:

- `npm run lint:admin` untuk file dashboard admin, komponen admin, helper admin, dan route backend admin yang sudah dirapikan.
- `npm run typecheck` untuk memastikan kontrak TypeScript seluruh aplikasi tetap valid.

## Smoke test manual

Setelah dev server berjalan, buka `/admin` dan cek:

- Header berubah sesuai tab aktif.
- Overview menampilkan playbook, alur kerja, dan metrik ringkas.
- Automation Center menahan aksi autopilot sampai nama klien, email kontak, dan layanan terisi.
- Aksi kirim email, invitation, smart action, dan delete selalu menampilkan dialog konfirmasi.
- Assessment tetap bisa discroll di layar kecil dan empty state filter menyediakan reset.
- Associate Network dan Project Assignment punya konteks modul, metrik ringkas, filter, dan empty state yang jelas.

## Catatan build

`npm run build` tetap menjadi gate produksi, tetapi saat ini bisa gagal di environment tanpa akses network karena `next/font/google` perlu mengambil font Inter/Poppins. Jika build dipakai di CI restricted network, pindahkan font ke local font asset atau pastikan cache/font tersedia.
