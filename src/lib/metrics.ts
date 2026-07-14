export function calculateAccuracy(input: {
  correct: number
  incorrect: number
}): number {
  const total = input.correct + input.incorrect
  if (total === 0) return 100
  return Math.round((input.correct / total) * 100)
}

export function calculateWpm(input: {
  correctChars: number
  elapsedMs: number
}): number {
  if (input.elapsedMs <= 0) return 0
  const minutes = input.elapsedMs / 60_000
  return Math.floor(input.correctChars / 5 / minutes)
}

export function isLessonPassed(input: {
  accuracy: number
  wpm: number
  minWpm: number
  minAccuracy: number
}): boolean {
  return input.accuracy >= input.minAccuracy && input.wpm >= input.minWpm
}

export function calculateStars(input: {
  accuracy: number
  wpm: number
  minWpm: number
  minAccuracy: number
}): number {
  if (!isLessonPassed(input)) return 0

  let stars = 1
  if (input.accuracy >= 95) stars += 1
  if (input.accuracy >= 95 && input.wpm >= input.minWpm * 1.25) stars += 1
  return Math.min(stars, 3)
}
