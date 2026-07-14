# 03 — First playable lesson (list → trainer → hasil → unlock)

**Status:** resolved  
**Type:** task  
**Parent:** `.scratch/keyboard-train-mvp/spec.md` (`docs/PRD-mvp.md`)

## What to build

Jalur vertikal **pertama yang bisa dimainkan sampai selesai**:

1. Home menampilkan daftar lesson (minimal **2–3 lesson stub** per mode, konten Indonesia).
2. Lesson 1 terbuka; lesson berikutnya terkunci sampai sebelumnya **lulus**.
3. Mulai lesson → sesi ketik dengan **lock-on-error** (salah → tidak maju sampai Backspace + karakter benar).
4. Teks target menampilkan karakter selesai / current / sisa; error merah.
5. Live metrics: WPM, akurasi %, waktu (timer start keystroke pertama).
6. Selesai teks → layar hasil: WPM, akurasi, waktu, lulus/gagal, bintang 1–3.
7. Lulus (akurasi ≥ 90% **dan** WPM ≥ `minWpm` lesson) → simpan progress/best score → unlock lesson berikutnya.
8. Gagal → next tetap terkunci; bisa ulangi lesson.
9. Kurikulum stub dipilih berdasarkan mode profil (Anak vs Dewasa boleh beda teks/`minWpm` meski baru sedikit lesson).

**Aturan bintang (PRD):** lulus → min 1★; +1 jika akurasi ≥ 95%; +1 jika WPM ≥ `minWpm * 1.25`; cap 3.  
**Best score:** bintang tertinggi, lalu WPM tertinggi.  
**WPM:** `(karakter benar / 5) / menit`.

Visual keyboard/tangan **belum** wajib di issue ini (boleh placeholder). Fokus: engine + list + results + persist unlock.

## Acceptance criteria

- [ ] Daftar lesson menampilkan status terkunci / terbuka / lulus (+ best score bila ada)
- [ ] Lesson pertama selalu terbuka; berikutnya hanya setelah lulus sebelumnya
- [ ] Trainer lock-on-error + Backspace koreksi berperilaku benar
- [ ] Live WPM, akurasi, timer (start di keystroke pertama)
- [ ] Hasil menampilkan metrik, lulus/gagal, bintang
- [ ] Lulus menyimpan progress dan membuka lesson berikutnya; gagal tidak membuka
- [ ] Ulangi lesson dan “lanjut berikutnya” (jika lulus & ada next) tersedia
- [ ] Mode Anak vs Dewasa memakai sumber kurikulum terpisah (meski stub)
- [ ] Unit test: metrics (WPM/accuracy/stars/passed) + session engine (maju/lock/backspace/selesai) + unlock/best merge

## User stories covered

7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 24, 25, 26, 27, 28, 29, 30, 31, 32, 38 (sebagian)

## Blocked by

- `02-local-multi-profile`
