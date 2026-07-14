# 02 — Profil multi-user lokal + persistensi

**Status:** resolved  
**Type:** task  
**Parent:** `.scratch/keyboard-train-mvp/spec.md` (`docs/PRD-mvp.md`)

## What to build

Alur profil end-to-end: pengguna membuat satu atau lebih profil (nama + mode **Anak** / **Dewasa**), memilih profil aktif, dan menghapus profil. Semua tersimpan di `localStorage` ber-versi dan tetap ada setelah refresh browser.

Tanpa profil aktif, app mengarahkan ke onboarding/buat profil. Dengan profil aktif, user masuk ke home (boleh masih placeholder lesson list).

Skema state (keputusan PRD):

```ts
{
  version: 1,
  activeProfileId: string | null,
  profiles: Array<{
    id: string
    name: string
    mode: 'anak' | 'dewasa'
    settings: { sound: boolean } // default sound: true
    progress: Record<string, LessonResult> // boleh {} dulu
    createdAt: string
  }>
}
```

## Acceptance criteria

- [ ] Buat profil baru dengan nama + mode Anak/Dewasa
- [ ] Bisa punya beberapa profil; progress/settings terpisah per profil
- [ ] Ganti profil aktif dari UI
- [ ] Hapus profil (termasuk clear active bila yang dihapus sedang aktif)
- [ ] Data bertahan setelah full page refresh
- [ ] Tanpa profil → alur buat profil; dengan profil aktif → masuk area app utama
- [ ] Unit/integration test ringkas untuk load/save/round-trip storage (opsional tapi disarankan)

## User stories covered

1, 2, 3, 4, 5, 6

## Blocked by

- `01-app-foundation`
