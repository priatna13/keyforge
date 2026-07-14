import { describe, expect, it } from 'vitest'
import { getCurriculum, getLesson, getNextLesson } from './index'

describe('curriculum', () => {
  it('provides at least 24 lessons for each mode', () => {
    expect(getCurriculum('anak').length).toBeGreaterThanOrEqual(24)
    expect(getCurriculum('dewasa').length).toBeGreaterThanOrEqual(24)
  })

  it('has unique sequential orders starting at 1', () => {
    for (const mode of ['anak', 'dewasa'] as const) {
      const orders = getCurriculum(mode).map((l) => l.order)
      expect(orders).toEqual([...orders].sort((a, b) => a - b))
      expect(new Set(orders).size).toBe(orders.length)
      expect(orders[0]).toBe(1)
    }
  })

  it('uses lower minWpm for anak than dewasa on matching lessons', () => {
    const anak = getLesson('anak', 'home-asdf')!
    const dewasa = getLesson('dewasa', 'home-asdf')!
    expect(anak.minWpm).toBeLessThan(dewasa.minWpm)
  })

  it('resolves next lesson by order', () => {
    const next = getNextLesson('anak', 'home-asdf')
    expect(next?.id).toBe('home-jkl')
  })

  it('keeps Indonesian-friendly text for later lessons', () => {
    const final = getLesson('dewasa', 'final-paragraph')!
    expect(final.targetText.length).toBeGreaterThan(40)
    expect(final.minAccuracy).toBe(90)
  })
})
