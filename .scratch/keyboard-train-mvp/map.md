# Keyboard Train MVP — Issue map

**Parent PRD:** `docs/PRD-mvp.md` · `.scratch/keyboard-train-mvp/spec.md`

## Dependency graph

```
01 foundation
 └─► 02 multi-profile
      └─► 03 playable first lesson
           ├─► 04 ten-finger visual
           ├─► 05 full dual curriculum
           └─► 06 audio + mute
                └─► 07 mvp polish (waits 04+05+06)
```

## Issues

| ID | File | Status | Blocked by |
|----|------|--------|------------|
| 01 | `issues/01-app-foundation.md` | ready-for-agent | — |
| 02 | `issues/02-local-multi-profile.md` | ready-for-agent | 01 |
| 03 | `issues/03-playable-first-lesson.md` | ready-for-agent | 02 |
| 04 | `issues/04-ten-finger-visual-guide.md` | ready-for-agent | 03 |
| 05 | `issues/05-full-dual-curriculum.md` | ready-for-agent | 03 |
| 06 | `issues/06-audio-and-mute.md` | ready-for-agent | 03 |
| 07 | `issues/07-mvp-polish.md` | ready-for-agent | 04, 05, 06 |

## Notes / Decisions-so-far

- Tracker: local markdown (no GitHub remote).
- Vertical slices approved by user (7 issues).
- 04 / 05 / 06 can run in parallel after 03.
