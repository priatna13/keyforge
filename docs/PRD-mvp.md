# PRD: KeyForge MVP

**Status:** `ready-for-agent`  
**Versi:** 1.0  
**Tanggal:** 2026-07-14  
**Sumber:** Sesi grill-me + plan implementasi yang disetujui  

---

## Problem Statement

Banyak orang mengetik dengan 2–4 jari sambil melihat keyboard, sehingga lambat, mudah lelah, dan tidak akurat untuk pekerjaan atau sekolah. Mereka butuh cara terstruktur untuk belajar **touch typing 10 jari** di layout QWERTY, dengan panduan visual yang jelas (tombol + jari mana), dalam **Bahasa Indonesia**, tanpa harus daftar akun atau bayar kursus online.

Anak dan dewasa belajar dengan kecepatan dan teks yang berbeda; di rumah sering berbagi satu komputer, jadi progress masing-masing harus terpisah.

---

## Solution

**KeyForge** adalah aplikasi web (desktop/laptop) yang mengajarkan mengetik 10 jari melalui **kurikulum lesson berurutan** berbahasa Indonesia. Pengguna:

1. Membuat **profil lokal** (Anak atau Dewasa).
2. Menyelesaikan lesson dari home row hingga huruf, spasi, tanda baca dasar, lalu Shift/kapital.
3. Melihat **keyboard virtual + siluet tangan berwarna per jari** saat mengetik.
4. Wajib **mengoreksi kesalahan** sebelum lanjut (lock-on-error).
5. Lulus lesson jika **akurasi ≥ 90%** dan **WPM mencapai minimum lesson**.
6. Menyimpan progress di browser (`localStorage`) — tanpa login.

UI seluruhnya Bahasa Indonesia, desain clean modern edukasi, dengan suara klik/error opsional.

---

## User Stories

### Onboarding & profil

1. As a **pengguna baru**, I want **melihat layar sambutan singkat dalam Bahasa Indonesia**, so that **saya paham aplikasi ini untuk latihan 10 jari**.
2. As a **pengguna baru**, I want **membuat profil dengan nama dan mode Anak/Dewasa**, so that **kurikulum dan target sesuai saya**.
3. As a **anggota keluarga**, I want **membuat beberapa profil di browser yang sama**, so that **progress anak dan dewasa tidak bercampur**.
4. As a **pengguna**, I want **berpindah profil aktif**, so that **saya bisa ganti orang yang sedang latihan**.
5. As a **pengguna**, I want **menghapus profil**, so that **data yang tidak dipakai bisa dibersihkan**.
6. As a **pengguna**, I want **progress tetap ada setelah refresh/tutup browser**, so that **saya tidak mengulang dari nol**.

### Daftar lesson & progresi

7. As a **pelajar**, I want **melihat daftar lesson berurutan**, so that **saya tahu jalur belajar dari home row sampai kalimat**.
8. As a **pelajar**, I want **lesson terkunci sampai lesson sebelumnya lulus**, so that **saya tidak loncat materi terlalu sulit**.
9. As a **pelajar**, I want **melihat status lesson (terkunci / terbuka / lulus) dan best score**, so that **saya tahu mana yang perlu diulang**.
10. As a **profil Anak**, I want **teks lesson pendek dan WPM minimum lebih rendah**, so that **latihan tidak frustasi**.
11. As a **profil Dewasa**, I want **teks lebih panjang dan target WPM lebih tinggi**, so that **latihan menantang untuk penggunaan nyata**.
12. As a **pelajar**, I want **membaca deskripsi lesson (tombol/jari yang dilatih)**, so that **saya tahu fokus sesi ini**.

### Sesi latihan (trainer)

13. As a **pelajar**, I want **melihat teks target dengan karakter saat ini ditandai**, so that **saya tahu apa yang harus diketik berikutnya**.
14. As a **pelajar**, I want **karakter yang sudah benar ditandai selesai**, so that **saya melihat kemajuan dalam teks**.
15. As a **pelajar**, I want **karakter salah ditandai jelas (merah)**, so that **saya sadar harus koreksi**.
16. As a **pelajar**, I want **kursor tidak maju saat salah ketik sampai saya perbaiki (Backspace + benar)**, so that **saya terbiasa akurat, bukan asal cepat**.
17. As a **pelajar**, I want **melihat WPM, akurasi, dan waktu secara live**, so that **saya bisa menyesuaikan kecepatan dan ketelitian**.
18. As a **pelajar**, I want **timer mulai pada keystroke pertama**, so that **waktu persiapan tidak dihitung**.
19. As a **pemula**, I want **keyboard QWERTY di layar menyorot tombol target**, so that **saya tahu posisi tombol tanpa menunduk ke keyboard fisik terlalu lama**.
20. As a **pemula**, I want **siluet tangan dengan warna per jari**, so that **saya memakai jari yang benar**.
21. As a **pemula**, I want **jari yang aktif ditonjolkan saat karakter target berubah**, so that **otot memori jari terbentuk**.
22. As a **pelajar**, I want **tombol Shift yang benar disorot saat mengetik huruf kapital**, so that **saya belajar Shift berlawanan dengan sisi huruf**.
23. As a **pelajar**, I want **spasi dilatih dengan highlight thumb**, so that **ibu jari dipakai dengan benar**.
24. As a **pelajar**, I want **mencegah default browser (scroll, dll.) saat fokus di area latihan**, so that **latihan tidak terganggu**.
25. As a **pelajar**, I want **menyelesaikan lesson dan otomatis ke layar hasil**, so that **saya langsung tahu lulus atau tidak**.

### Hasil, bintang, unlock

26. As a **pelajar**, I want **melihat WPM, akurasi %, dan durasi di akhir lesson**, so that **saya mengevaluasi performa**.
27. As a **pelajar**, I want **tahu apakah saya lulus (akurasi ≥ 90% dan WPM ≥ minimum lesson)**, so that **saya tahu apakah lesson berikutnya terbuka**.
28. As a **pelajar**, I want **mendapat 1–3 bintang berdasarkan performa**, so that **saya termotivasi mengulang untuk skor lebih baik**.
29. As a **pelajar**, I want **best score per lesson tersimpan (bintang tertinggi, lalu WPM terbaik)**, so that **pencapaian terbaik tidak hilang**.
30. As a **pelajar yang lulus**, I want **tombol lanjut ke lesson berikutnya**, so that **alur belajar mulus**.
31. As a **pelajar yang gagal atau ingin latihan ulang**, I want **mengulang lesson yang sama**, so that **saya bisa memperbaiki skor**.
32. As a **pelajar yang gagal**, I want **lesson berikutnya tetap terkunci**, so that **standar kelulusan ditegakkan**.

### Kurikulum & konten

33. As a **pemula total**, I want **lesson awal hanya home row (ASDF JKL;)**, so that **posisi tangan dasar dikuasai dulu**.
34. As a **pelajar**, I want **penambahan tombol bertahap (home → top → bottom row)**, so that **beban kognitif terkelola**.
35. As a **pelajar**, I want **latihan semua huruf A–Z + spasi dengan kata/frasa Indonesia**, so that **keterampilan berguna di dunia nyata**.
36. As a **pelajar**, I want **lesson tanda baca dasar (`.` `,` `?` `!`)**, so that **saya bisa mengetik kalimat sederhana**.
37. As a **pelajar menengah**, I want **lesson Shift dan huruf kapital setelah lowercase lancar**, so that **kesulitan diperkenalkan di waktu yang tepat**.
38. As a **penyusun konten / agent**, I want **kurikulum Anak dan Dewasa sebagai data terpisah dengan struktur lesson sama**, so that **mode profil hanya memilih sumber data**.

### Audio & pengaturan

39. As a **pelajar**, I want **suara feedback saat ketik benar dan salah (default menyala)**, so that **feedback instan tanpa hanya mengandalkan mata**.
40. As a **pelajar di perpustakaan/kantor**, I want **mematikan suara per profil**, so that **saya tidak mengganggu orang lain**.
41. As a **pengguna**, I want **pengaturan suara tersimpan di profil**, so that **preferensi tidak hilang saat ganti sesi**.

### Perangkat & akses

42. As a **pengguna di layar sempit/ponsel**, I want **melihat peringatan bahwa latihan ditujukan untuk desktop/laptop + keyboard fisik**, so that **saya tidak mengira virtual keyboard mobile adalah target utama**.
43. As a **pengguna desktop**, I want **layout yang nyaman dibaca dengan area ketik besar**, so that **fokus pada latihan**.

### Kualitas & operasional

44. As a **developer**, I want **aplikasi SPA client-only tanpa backend**, so that **deploy statis sederhana**.
45. As a **developer**, I want **build production sukses**, so that **bisa di-host di static hosting**.
46. As a **pengguna**, I want **UI konsisten Bahasa Indonesia (label, tombol, instruksi)**, so that **tidak ada campur bahasa yang membingungkan**.

---

## Implementation Decisions

### Produk & perilaku

- Bahasa UI dan teks latihan: **Indonesia**.
- Layout keyboard: **QWERTY**.
- Target perangkat MVP: **desktop/laptop** (keyboard fisik); notice pada viewport sempit.
- Salah ketik: **lock-on-error** — karakter salah harus dikoreksi (Backspace) sebelum maju.
- Lulus lesson: **akurasi ≥ 90%** DAN **WPM ≥ `minWpm` lesson**.
- Bintang (1–3): lulus → minimal 1★; +1 jika akurasi ≥ 95%; +1 jika WPM ≥ `minWpm * 1.25`; maksimum 3.
- WPM: `(jumlah karakter benar / 5) / menit berlalu`, timer dari keystroke pertama.
- Best result per lesson: prioritaskan bintang tertinggi, lalu WPM tertinggi (hanya simpan jika lebih baik).
- Unlock: lesson `order = N+1` terbuka jika ada progress lulus pada lesson `order = N`. Lesson pertama selalu terbuka.
- Audio default ON; toggle per profil.
- Desain: clean modern edukasi; warna jari konsisten dan kontras.

### Arsitektur

- SPA **client-only**: Vite + React + TypeScript + Tailwind.
- Routing client (mis. React Router): onboarding/profil, home lesson list, trainer, results, settings.
- **Tidak ada backend / auth / API**.
- Persistensi: satu key `localStorage` ber-versi, contoh bentuk state:

```ts
// Keputusan skema (bukan kode final)
{
  version: 1,
  activeProfileId: string | null,
  profiles: Array<{
    id: string
    name: string
    mode: 'anak' | 'dewasa'
    settings: { sound: boolean }
    progress: Record<string /* lessonId */, {
      passed: boolean
      bestWpm: number
      bestAccuracy: number
      bestStars: number
      bestTimeMs: number
      lastPlayedAt: string
    }>
    createdAt: string
  }>
}
```

### Modul domain (seams)

Bangun di sekitar modul berikut (bukan path file kaku):

1. **Profile store** — load/save state, CRUD profil, set aktif, update settings & progress.
2. **Curriculum** — daftar lesson per mode (`anak` | `dewasa`); lookup by id; urutan `order`.
3. **Finger map** — karakter/key → finger id + warna; aturan Shift berlawanan untuk kapital.
4. **Typing session engine** — state mesin ketik: index, error lock, hitung keystroke benar/salah, elapsed, selesai.
5. **Metrics** — pure functions: accuracy, WPM, stars, passed.
6. **Audio** — play ok/error jika sound enabled.
7. **UI shells** — Virtual keyboard, hand guide, trainer view, lesson list, result view, profile screens.

### Kurikulum

- ~24–30 lesson per mode (Anak & Dewasa), struktur tahap sama, teks/`minWpm` beda.
- Cakupan: home row → top → bottom → semua huruf + spasi → `. , ? !` → Shift/kapital + kalimat pendek.
- Konten statis di modul data (bukan generate runtime dari AI).
- `minWpm` anak lebih rendah (kisaran ~5→15); dewasa lebih tinggi (~10→25), naik bertahap.

### Finger map (aturan)

- Mapping standar QWERTY 10 jari (pinky kiri … pinky kanan + thumbs untuk space).
- Highlight target key + finger aktif.
- Kapital: highlight key huruf + **Shift sisi berlawanan**.

### Interaksi trainer

- Dengarkan `keydown` saat sesi aktif.
- Abaikan modifier murni yang tidak menghasilkan karakter (kecuali Backspace, dan Shift sebagai bagian dari kapital).
- `preventDefault` pada input yang mengganggu latihan.
- Karakter target dari `targetText` lesson; selesai jika index mencapai panjang teks tanpa error lock.

---

## Testing Decisions

### Prinsip

- Uji **perilaku eksternal** (input → output/state yang diamati), bukan detail implementasi React/DOM internal.
- Utamakan **pure functions** dan **engine session** (mudah di-unit test tanpa browser penuh).
- E2E manual atau smoke build untuk alur UI; otomatisasi E2E tidak wajib di MVP kecuali tool sudah ada.

### Seams pengujian (tinggi → rendah)

| Seam | Yang diuji |
|------|------------|
| **Metrics** | WPM, accuracy, stars, passed threshold |
| **Typing session engine** | maju benar, lock on error, backspace unlock, selesai, timer start |
| **Progress / unlock** | lesson 1 open; pass membuka berikutnya; fail tidak membuka; best score merge |
| **Finger map** | key → finger; space → thumb; kapital → shift sisi lawan |
| **Storage** | serialize/deserialize round-trip; profil terpisah |
| **Curriculum** | urutan order unik; setiap mode punya lesson lengkap; minWpm/accuracy defaults |

### Skenario acceptance (manual / E2E)

1. Buat dua profil (Anak, Dewasa) → progress terpisah.
2. Lesson 1: salah ketik → tidak maju sampai dikoreksi.
3. Highlight keyboard + jari sesuai target (termasuk space & shift kapital).
4. Gagal threshold → next locked; lulus → next unlocked + best tersimpan.
5. Refresh → data masih ada.
6. Mute → tidak ada suara.
7. `npm run build` sukses.

### Prior art

- Repo greenfield: belum ada suite tes. Mulai dengan unit test pada Metrics + Typing session engine + Unlock/best-score helpers (Vitest).

---

## Out of Scope

- Login, akun cloud, sinkron antar perangkat  
- PWA / offline install  
- Latihan di ponsel sebagai target utama (hanya notice)  
- Layout non-QWERTY (Colemak, Dvorak, dll.)  
- Mode free practice / custom text / quote race  
- Mode flow tanpa lock-on-error  
- Angka dan simbol baris atas lengkap  
- Multiplayer, leaderboard global  
- Grafik progress harian/mingguan, XP, badge kompleks  
- UI bilingual  
- Backend, analytics pihak ketiga, pembayaran  

---

## Further Notes

- Nama produk: **KeyForge**.
- PRD ini merangkum keputusan grill-me; perubahan lingkup harus meng-update PRD dan plan.
- Salinan tracker lokal: `.scratch/keyboard-train-mvp/spec.md` (mirror).
- Setelah implementasi, verifikasi mengikuti bagian Testing + acceptance di atas.
- Urutan implementasi disarankan: scaffold → metrics/finger-map/storage → session engine → keyboard/hands UI → curriculum → profiles/lessons/results → audio/polish.

### Definition of Done (MVP)

- [ ] Semua user stories inti (profil, lesson lock, trainer lock-on-error, visual 10 jari, hasil, persistensi, audio toggle) terpenuhi  
- [ ] Kurikulum Anak & Dewasa mencakup huruf + spasi + punctuation dasar + Shift  
- [ ] Unit test metrics + session engine + unlock  
- [ ] Build production sukses  
- [ ] UI Bahasa Indonesia  
- [ ] README singkat: cara `npm install` / `npm run dev`  
