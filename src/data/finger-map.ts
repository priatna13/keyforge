export type FingerId =
  | 'L-pinky'
  | 'L-ring'
  | 'L-middle'
  | 'L-index'
  | 'thumbs'
  | 'R-index'
  | 'R-middle'
  | 'R-ring'
  | 'R-pinky'

export const FINGER_COLORS: Record<FingerId, string> = {
  'L-pinky': '#ef4444',
  'L-ring': '#f97316',
  'L-middle': '#eab308',
  'L-index': '#22c55e',
  thumbs: '#64748b',
  'R-index': '#14b8a6',
  'R-middle': '#3b82f6',
  'R-ring': '#8b5cf6',
  'R-pinky': '#ec4899',
}

/** Lowercase / unshifted character → primary finger */
const KEY_TO_FINGER: Record<string, FingerId> = {
  // left
  '`': 'L-pinky',
  '1': 'L-pinky',
  q: 'L-pinky',
  a: 'L-pinky',
  z: 'L-pinky',
  '2': 'L-ring',
  w: 'L-ring',
  s: 'L-ring',
  x: 'L-ring',
  '3': 'L-middle',
  e: 'L-middle',
  d: 'L-middle',
  c: 'L-middle',
  '4': 'L-index',
  '5': 'L-index',
  r: 'L-index',
  t: 'L-index',
  f: 'L-index',
  g: 'L-index',
  v: 'L-index',
  b: 'L-index',
  // thumbs
  ' ': 'thumbs',
  // right
  '6': 'R-index',
  '7': 'R-index',
  y: 'R-index',
  u: 'R-index',
  h: 'R-index',
  j: 'R-index',
  n: 'R-index',
  m: 'R-index',
  '8': 'R-middle',
  i: 'R-middle',
  k: 'R-middle',
  ',': 'R-middle',
  '9': 'R-ring',
  o: 'R-ring',
  l: 'R-ring',
  '.': 'R-ring',
  '0': 'R-pinky',
  '-': 'R-pinky',
  '=': 'R-pinky',
  p: 'R-pinky',
  '[': 'R-pinky',
  ']': 'R-pinky',
  '\\': 'R-pinky',
  ';': 'R-pinky',
  "'": 'R-pinky',
  '/': 'R-pinky',
}

/** Characters that need Shift on QWERTY US (for our MVP set) */
const SHIFTED_CHARS: Record<string, string> = {
  '!': '1',
  '?': '/',
  // letters handled separately
}

function isLetter(char: string): boolean {
  return /^[a-zA-Z]$/.test(char)
}

function isLeftHandFinger(finger: FingerId): boolean {
  return finger.startsWith('L-')
}

export function getFingerForKey(key: string): FingerId {
  if (key === ' ') return 'thumbs'
  const normalized = key.length === 1 ? key.toLowerCase() : key
  return KEY_TO_FINGER[normalized] ?? 'R-pinky'
}

export type CharHighlight = {
  keys: string[]
  fingers: FingerId[]
  shiftSide: 'left' | 'right' | null
}

export function getHighlightsForChar(char: string): CharHighlight {
  if (char === ' ') {
    return { keys: [' '], fingers: ['thumbs'], shiftSide: null }
  }

  if (isLetter(char) && char === char.toUpperCase() && char !== char.toLowerCase()) {
    const base = char.toLowerCase()
    const letterFinger = getFingerForKey(base)
    const shiftSide = isLeftHandFinger(letterFinger) ? 'right' : 'left'
    const shiftKey = shiftSide === 'right' ? 'ShiftRight' : 'ShiftLeft'
    const shiftFinger: FingerId = shiftSide === 'right' ? 'R-pinky' : 'L-pinky'
    return {
      keys: [base, shiftKey],
      fingers: [letterFinger, shiftFinger],
      shiftSide,
    }
  }

  if (char in SHIFTED_CHARS) {
    const base = SHIFTED_CHARS[char]!
    const baseFinger = getFingerForKey(base)
    const shiftSide = isLeftHandFinger(baseFinger) ? 'right' : 'left'
    const shiftKey = shiftSide === 'right' ? 'ShiftRight' : 'ShiftLeft'
    const shiftFinger: FingerId = shiftSide === 'right' ? 'R-pinky' : 'L-pinky'
    return {
      keys: [base, shiftKey],
      fingers: [baseFinger, shiftFinger],
      shiftSide,
    }
  }

  const finger = getFingerForKey(char)
  return {
    keys: [char.length === 1 ? char.toLowerCase() : char],
    fingers: [finger],
    shiftSide: null,
  }
}
