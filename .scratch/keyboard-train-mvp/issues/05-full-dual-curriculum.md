# 05 — Kurikulum penuh Anak & Dewasa

**Status:** resolved  
**Type:** task  
**Parent:** `.scratch/keyboard-train-mvp/spec.md` (`docs/PRD-mvp.md`)

## What to build

Isi kurikulum lengkap **~24–30 lesson** untuk mode **Anak** dan **Dewasa** (struktur tahap sama, teks & `minWpm` beda):

1. Home row intro (ASDF / JKL;)  
2–6. Perluasan home + spasi  
7–12. Top row bertahap  
13–18. Bottom row bertahap  
19–22. Semua huruf A–Z + kata/frasa Indonesia  
23–25. Tanda baca `.` `,` `?` `!`  
26–28. Shift + kapital + kalimat pendek  

- **Anak:** teks lebih pendek, `minWpm` lebih rendah (kisaran ~5→15, naik bertahap).  
- **Dewasa:** teks lebih panjang, `minWpm` lebih tinggi (~10→25).  
- `minAccuracy` default 90% kecuali override eksplisit.  
- Setiap lesson: id, order, title, description, keysIntroduced, targetText, minWpm.  
- UI list lesson menampilkan judul/deskripsi yang bermakna (Bahasa Indonesia).

Ganti stub issue 03; unlock tetap berdasar `order` berurutan.

## Acceptance criteria

- [ ] ≥24 lesson per mode (Anak dan Dewasa)
- [ ] Progresi keys: home → top → bottom → full letters → punctuation → shift/kapital
- [ ] Teks latihan Bahasa Indonesia yang masuk akal per tahap
- [ ] minWpm Anak secara umum lebih rendah dari Dewasa pada tahap setara
- [ ] Lesson order unik dan berurutan; unlock masih benar end-to-end
- [ ] Profil Anak hanya melihat/menjalankan kurikulum anak; Dewasa sebaliknya
- [ ] Satu smoke path: buka lesson mid-kurikulum (setelah unlock manual di storage atau skip dev) tetap playable

## User stories covered

10, 11, 33, 34, 35, 36, 37, 38

## Blocked by

- `03-playable-first-lesson`  
  (bisa paralel dengan 04 setelah 03 selesai)
