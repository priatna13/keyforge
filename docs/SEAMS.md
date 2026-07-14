# Test seams (TDD)

Disetujui untuk MVP. Hanya uji di seam ini (bukan internal UI React, kecuali ditambahkan nanti).

| Seam | Modul publik | File tes |
|------|----------------|----------|
| Metrics | `calculateAccuracy`, `calculateWpm`, `isLessonPassed`, `calculateStars` | `src/lib/metrics.test.ts` |
| Typing session | `createTypingSession`, `typeChar`, `typeBackspace`, `getSnapshot` | `src/features/trainer/typingSession.test.ts` |
| Progress / unlock | `isLessonUnlocked`, `mergeBestResult` | `src/lib/progress.test.ts` |
| Finger map | `getFingerForKey`, `getHighlightsForChar`, `FINGER_COLORS` | `src/data/finger-map.test.ts` |
| Profile storage | `loadState`, `saveState`, `createProfile`, … | `src/lib/storage.test.ts` |

Jalankan: `npm test`
