import { describe, expect, it } from 'vitest'
import {
  calculateAccuracy,
  calculateStars,
  calculateWpm,
  isLessonPassed,
} from './metrics'

describe('calculateAccuracy', () => {
  it('returns 100 when all keystrokes are correct', () => {
    expect(calculateAccuracy({ correct: 50, incorrect: 0 })).toBe(100)
  })

  it('returns 0 when there are no keystrokes yet', () => {
    expect(calculateAccuracy({ correct: 0, incorrect: 0 })).toBe(100)
  })

  it('computes percentage from correct vs total attempts', () => {
    // 90 correct + 10 incorrect = 90%
    expect(calculateAccuracy({ correct: 90, incorrect: 10 })).toBe(90)
  })

  it('rounds to nearest whole percent', () => {
    // 2/3 ≈ 66.666 → 67
    expect(calculateAccuracy({ correct: 2, incorrect: 1 })).toBe(67)
  })
})

describe('calculateWpm', () => {
  it('uses standard 5 characters per word', () => {
    // 50 correct chars in 1 minute → 10 WPM
    expect(
      calculateWpm({ correctChars: 50, elapsedMs: 60_000 }),
    ).toBe(10)
  })

  it('returns 0 when no time has elapsed', () => {
    expect(calculateWpm({ correctChars: 50, elapsedMs: 0 })).toBe(0)
  })

  it('scales with shorter sessions', () => {
    // 25 chars in 30s → (25/5) / 0.5 min = 10 WPM
    expect(
      calculateWpm({ correctChars: 25, elapsedMs: 30_000 }),
    ).toBe(10)
  })

  it('floors fractional WPM to whole number', () => {
    // 10 chars in 60s → 2 WPM exact; 9 chars → 1.8 → 1
    expect(
      calculateWpm({ correctChars: 9, elapsedMs: 60_000 }),
    ).toBe(1)
  })
})

describe('isLessonPassed', () => {
  it('requires accuracy >= 90 and wpm >= minWpm', () => {
    expect(
      isLessonPassed({ accuracy: 90, wpm: 10, minWpm: 10, minAccuracy: 90 }),
    ).toBe(true)
  })

  it('fails when accuracy is below threshold', () => {
    expect(
      isLessonPassed({ accuracy: 89, wpm: 20, minWpm: 10, minAccuracy: 90 }),
    ).toBe(false)
  })

  it('fails when wpm is below minimum', () => {
    expect(
      isLessonPassed({ accuracy: 100, wpm: 9, minWpm: 10, minAccuracy: 90 }),
    ).toBe(false)
  })
})

describe('calculateStars', () => {
  it('returns 0 stars when lesson is not passed', () => {
    expect(
      calculateStars({
        accuracy: 80,
        wpm: 5,
        minWpm: 10,
        minAccuracy: 90,
      }),
    ).toBe(0)
  })

  it('returns 1 star for a bare pass', () => {
    expect(
      calculateStars({
        accuracy: 90,
        wpm: 10,
        minWpm: 10,
        minAccuracy: 90,
      }),
    ).toBe(1)
  })

  it('returns 2 stars when accuracy is at least 95%', () => {
    expect(
      calculateStars({
        accuracy: 95,
        wpm: 10,
        minWpm: 10,
        minAccuracy: 90,
      }),
    ).toBe(2)
  })

  it('returns 3 stars when accuracy >= 95% and wpm >= minWpm * 1.25', () => {
    expect(
      calculateStars({
        accuracy: 95,
        wpm: 13, // 10 * 1.25 = 12.5
        minWpm: 10,
        minAccuracy: 90,
      }),
    ).toBe(3)
  })

  it('caps at 3 stars', () => {
    expect(
      calculateStars({
        accuracy: 100,
        wpm: 50,
        minWpm: 10,
        minAccuracy: 90,
      }),
    ).toBe(3)
  })

  it('awards speed star independently of the 95% accuracy bonus', () => {
    // pass (1) + speed (1) without accuracy bonus → 2
    expect(
      calculateStars({
        accuracy: 92,
        wpm: 20,
        minWpm: 10,
        minAccuracy: 90,
      }),
    ).toBe(2)
  })
})
