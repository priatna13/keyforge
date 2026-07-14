import { describe, expect, it } from 'vitest'
import {
  isLessonUnlocked,
  mergeBestResult,
  type LessonMeta,
  type LessonResult,
} from './progress'

const lessons: LessonMeta[] = [
  { id: 'l1', order: 1 },
  { id: 'l2', order: 2 },
  { id: 'l3', order: 3 },
]

describe('isLessonUnlocked', () => {
  it('always unlocks the first lesson by order', () => {
    expect(isLessonUnlocked({ lessonId: 'l1', lessons, progress: {} })).toBe(
      true,
    )
  })

  it('locks later lessons until previous is passed', () => {
    expect(isLessonUnlocked({ lessonId: 'l2', lessons, progress: {} })).toBe(
      false,
    )
  })

  it('unlocks next lesson after previous is passed', () => {
    const progress: Record<string, LessonResult> = {
      l1: {
        passed: true,
        bestWpm: 12,
        bestAccuracy: 95,
        bestStars: 2,
        bestTimeMs: 30_000,
        lastPlayedAt: '2026-01-01T00:00:00.000Z',
      },
    }
    expect(isLessonUnlocked({ lessonId: 'l2', lessons, progress })).toBe(true)
    expect(isLessonUnlocked({ lessonId: 'l3', lessons, progress })).toBe(false)
  })

  it('keeps next locked if previous attempt did not pass', () => {
    const progress: Record<string, LessonResult> = {
      l1: {
        passed: false,
        bestWpm: 5,
        bestAccuracy: 80,
        bestStars: 0,
        bestTimeMs: 40_000,
        lastPlayedAt: '2026-01-01T00:00:00.000Z',
      },
    }
    expect(isLessonUnlocked({ lessonId: 'l2', lessons, progress })).toBe(false)
  })
})

describe('mergeBestResult', () => {
  const previous: LessonResult = {
    passed: true,
    bestWpm: 15,
    bestAccuracy: 92,
    bestStars: 1,
    bestTimeMs: 50_000,
    lastPlayedAt: '2026-01-01T00:00:00.000Z',
  }

  it('returns attempt when there is no previous result', () => {
    const attempt: LessonResult = {
      passed: true,
      bestWpm: 10,
      bestAccuracy: 90,
      bestStars: 1,
      bestTimeMs: 60_000,
      lastPlayedAt: '2026-02-01T00:00:00.000Z',
    }
    expect(mergeBestResult(undefined, attempt)).toEqual(attempt)
  })

  it('prefers higher stars over higher wpm', () => {
    const attempt: LessonResult = {
      passed: true,
      bestWpm: 8,
      bestAccuracy: 96,
      bestStars: 2,
      bestTimeMs: 70_000,
      lastPlayedAt: '2026-02-01T00:00:00.000Z',
    }
    const merged = mergeBestResult(previous, attempt)
    expect(merged.bestStars).toBe(2)
    expect(merged.bestWpm).toBe(8)
  })

  it('when stars equal, keeps higher wpm', () => {
    const attempt: LessonResult = {
      passed: true,
      bestWpm: 20,
      bestAccuracy: 91,
      bestStars: 1,
      bestTimeMs: 40_000,
      lastPlayedAt: '2026-02-01T00:00:00.000Z',
    }
    const merged = mergeBestResult(previous, attempt)
    expect(merged.bestStars).toBe(1)
    expect(merged.bestWpm).toBe(20)
    expect(merged.bestAccuracy).toBe(91)
  })

  it('keeps previous bests when attempt is worse', () => {
    const attempt: LessonResult = {
      passed: false,
      bestWpm: 5,
      bestAccuracy: 70,
      bestStars: 0,
      bestTimeMs: 80_000,
      lastPlayedAt: '2026-02-01T00:00:00.000Z',
    }
    const merged = mergeBestResult(previous, attempt)
    expect(merged.bestStars).toBe(1)
    expect(merged.bestWpm).toBe(15)
    expect(merged.passed).toBe(true) // once passed, stays passed
    expect(merged.lastPlayedAt).toBe(attempt.lastPlayedAt)
  })
})
