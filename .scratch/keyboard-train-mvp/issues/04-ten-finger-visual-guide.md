# 04 — Panduan visual 10 jari (keyboard + tangan + warna)

**Status:** resolved  
**Type:** task  
**Parent:** `.scratch/keyboard-train-mvp/spec.md` (`docs/PRD-mvp.md`)

## What to build

Di layar trainer, tampilkan **keyboard QWERTY virtual** dan **siluet dua tangan** dengan skema warna per jari. Karakter target sesi menggerakkan highlight:

- Tombol target menyala / tertandai
- Jari yang benar ditonjolkan (warna finger map)
- **Space** → thumbs
- **Huruf kapital** → highlight huruf + **Shift sisi berlawanan** (huruf kiri → Shift kanan, dan sebaliknya)

Finger map standar QWERTY 10 jari (pinky kiri … pinky kanan + thumbs). Integrasi dengan trainer yang sudah ada di issue 03 — bukan halaman demo terpisah saja.

## Acceptance criteria

- [ ] Virtual keyboard QWERTY terlihat selama sesi latihan
- [ ] Target key ter-highlight sesuai karakter current (termasuk spasi)
- [ ] Warna/identifikasi per jari konsisten (finger map)
- [ ] Siluet tangan menonjolkan jari aktif
- [ ] Kapital: Shift berlawanan + key huruf ter-highlight
- [ ] Unit test finger-map: key→finger, space→thumb, kapital→shift sisi lawan
- [ ] Tidak merusak perilaku lock-on-error / metrics dari issue 03

## User stories covered

19, 20, 21, 22, 23

## Blocked by

- `03-playable-first-lesson`
