# KeyForge

Aplikasi web latihan **touch typing 10 jari** (layout QWERTY, teks & UI Bahasa Indonesia). Tema dark cyberpunk, sidebar navigasi, brand **KeyForge**.

## Fitur MVP

- Profil lokal multi-user (Anak / Dewasa) di `localStorage`
- 28 lesson bertahap per mode (home row → huruf → tanda baca → Shift/kapital)
- Lock-on-error: harus koreksi sebelum lanjut
- Lulus: akurasi ≥ 90% + WPM minimum lesson
- Keyboard virtual + siluet tangan + warna per jari
- Suara feedback (bisa dimatikan per profil)
- Metrik: WPM, akurasi, waktu, bintang 1–3

## Persyaratan

- Node.js 20+ (disarankan)
- **Desktop/laptop dengan keyboard fisik**

## Menjalankan

```bash
npm install
npm run dev
```

Buka URL Vite (biasanya `http://localhost:5173`).

1. Buat profil (nama + Anak/Dewasa)
2. Mulai lesson dari daftar
3. Ketik teks target; Backspace jika salah

## Skrip

```bash
npm run dev        # development
npm run build      # production
npm run preview    # preview build
npm test           # unit tests (Vitest)
npm run test:watch
```

## Deploy

- **GitHub:** https://github.com/priatna13/keyforge
- **Production:** https://keyforge-typing.vercel.app
- **Vercel:** project `keyforge-typing` (jangan pakai `keyforge-phi` — bentrok domain produk lain)

## Stack

Vite · React · TypeScript · Tailwind CSS · React Router · Vitest

## Dokumentasi

| Dokumen | Path |
|---------|------|
| PRD | [`docs/PRD-mvp.md`](docs/PRD-mvp.md) |
| Test seams | [`docs/SEAMS.md`](docs/SEAMS.md) |
| Issues | [`.scratch/keyboard-train-mvp/`](.scratch/keyboard-train-mvp/) |

## Catatan

Progress disimpan di browser (`localStorage` key `keyforge:v1`). Membersihkan data situs akan menghapus profil.

## Branding

Logo utama: `public/logo.png`.
