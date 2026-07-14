# 07 — MVP polish, DoD, dan README final

**Status:** resolved  
**Type:** task  
**Parent:** `.scratch/keyboard-train-mvp/spec.md` (`docs/PRD-mvp.md`)

## What to build

Rapikan pengalaman end-to-end agar MVP “siap demo”:

- Konsistensi UI Bahasa Indonesia di semua layar
- Empty states (belum ada profil, dll.)
- Fokus/aksesibilitas wajar di area trainer (hindari scroll tak sengaja)
- Pastikan notice desktop tetap ada
- Verifikasi Definition of Done PRD
- README final: install, dev, build, ringkas cara pakai (profil → lesson → latihan)
- Pastikan `npm run build` clean; unit test inti masih hijau

Tidak menambah fitur di luar PRD (no cloud, no free practice, no mobile-first typing).

## Acceptance criteria

- [ ] Alur lengkap demoable: buat 2 profil → latihan lesson → lulus/gagal → unlock → refresh persist → mute
- [ ] Tidak ada string UI berbahasa Inggris yang mencolok (kecuali istilah teknis wajar seperti WPM)
- [ ] Desktop notice + layout area ketik nyaman di desktop
- [ ] README lengkap untuk pengguna developer
- [ ] `npm run build` sukses; test suite metrics/engine/finger-map (yang sudah ada) pass
- [ ] Checklist Definition of Done di PRD dapat ditandai untuk item MVP inti

## User stories covered

42, 43, 44, 45, 46 + penutupan residual 1–41

## Blocked by

- `04-ten-finger-visual-guide`
- `05-full-dual-curriculum`
- `06-audio-and-mute`
