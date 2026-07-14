# 06 — Feedback audio + mute per profil

**Status:** resolved  
**Type:** task  
**Parent:** `.scratch/keyboard-train-mvp/spec.md` (`docs/PRD-mvp.md`)

## What to build

Suara feedback saat latihan: bunyi ringan untuk **keystroke benar** dan **salah** (error). Default **menyala** untuk profil baru. Pengguna bisa **mute/unmute** di pengaturan profil; preferensi tersimpan di `profile.settings.sound` dan survive refresh.

Hormati setting: jika sound false, tidak ada audio. Implementasi via Web Audio API atau file pendek di assets publik — pilih yang sederhana dan andal.

## Acceptance criteria

- [ ] Suara (atau tone) pada ketikan benar saat sound ON
- [ ] Suara berbeda/error pada ketikan salah saat sound ON
- [ ] Toggle mute di UI pengaturan profil
- [ ] Default sound = true untuk profil baru
- [ ] Setting tersimpan di localStorage bersama profil
- [ ] Sound OFF → benar-benar senyap saat mengetik

## User stories covered

39, 40, 41

## Blocked by

- `03-playable-first-lesson`  
  (idealnya juga setelah 02 untuk settings profil; 03 sudah mengasumsikan 02)
