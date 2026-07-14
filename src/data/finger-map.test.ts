import { describe, expect, it } from 'vitest'
import {
  FINGER_COLORS,
  getFingerForKey,
  getHighlightsForChar,
  type FingerId,
} from './finger-map'

describe('getFingerForKey', () => {
  it('maps home row keys to expected fingers', () => {
    expect(getFingerForKey('a')).toBe('L-pinky')
    expect(getFingerForKey('s')).toBe('L-ring')
    expect(getFingerForKey('d')).toBe('L-middle')
    expect(getFingerForKey('f')).toBe('L-index')
    expect(getFingerForKey('j')).toBe('R-index')
    expect(getFingerForKey('k')).toBe('R-middle')
    expect(getFingerForKey('l')).toBe('R-ring')
    expect(getFingerForKey(';')).toBe('R-pinky')
  })

  it('maps space to thumbs', () => {
    expect(getFingerForKey(' ')).toBe('thumbs')
  })

  it('is case-insensitive for letter finger assignment', () => {
    expect(getFingerForKey('A')).toBe('L-pinky')
    expect(getFingerForKey('J')).toBe('R-index')
  })
})

describe('getHighlightsForChar', () => {
  it('highlights only the letter key for lowercase', () => {
    expect(getHighlightsForChar('a')).toEqual({
      keys: ['a'],
      fingers: ['L-pinky'] satisfies FingerId[],
      shiftSide: null,
    })
  })

  it('highlights space and thumbs', () => {
    expect(getHighlightsForChar(' ')).toEqual({
      keys: [' '],
      fingers: ['thumbs'],
      shiftSide: null,
    })
  })

  it('uses opposite shift for left-hand capital letters', () => {
    const h = getHighlightsForChar('A')
    expect(h.keys).toContain('a')
    expect(h.keys).toContain('ShiftRight')
    expect(h.shiftSide).toBe('right')
    expect(h.fingers).toContain('L-pinky')
    expect(h.fingers).toContain('R-pinky') // right shift finger
  })

  it('uses opposite shift for right-hand capital letters', () => {
    const h = getHighlightsForChar('J')
    expect(h.keys).toContain('j')
    expect(h.keys).toContain('ShiftLeft')
    expect(h.shiftSide).toBe('left')
    expect(h.fingers).toContain('R-index')
    expect(h.fingers).toContain('L-pinky') // left shift finger
  })

  it('highlights punctuation without shift when unshifted key', () => {
    const h = getHighlightsForChar(',')
    expect(h.keys).toContain(',')
    expect(h.shiftSide).toBeNull()
  })
})

describe('FINGER_COLORS', () => {
  it('defines a color for every finger id', () => {
    const ids: FingerId[] = [
      'L-pinky',
      'L-ring',
      'L-middle',
      'L-index',
      'thumbs',
      'R-index',
      'R-middle',
      'R-ring',
      'R-pinky',
    ]
    for (const id of ids) {
      expect(FINGER_COLORS[id]).toMatch(/^#/)
    }
  })
})
