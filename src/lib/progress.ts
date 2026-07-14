export type LessonMeta = {
  id: string
  order: number
}

export type LessonResult = {
  passed: boolean
  bestWpm: number
  bestAccuracy: number
  bestStars: number
  bestTimeMs: number
  lastPlayedAt: string
}

export function isLessonUnlocked(input: {
  lessonId: string
  lessons: LessonMeta[]
  progress: Record<string, LessonResult>
}): boolean {
  const sorted = [...input.lessons].sort((a, b) => a.order - b.order)
  const index = sorted.findIndex((l) => l.id === input.lessonId)
  if (index < 0) return false
  if (index === 0) return true

  const previous = sorted[index - 1]!
  return input.progress[previous.id]?.passed === true
}

export function mergeBestResult(
  previous: LessonResult | undefined,
  attempt: LessonResult,
): LessonResult {
  if (!previous) return attempt

  const betterStars = attempt.bestStars > previous.bestStars
  const sameStarsBetterWpm =
    attempt.bestStars === previous.bestStars &&
    attempt.bestWpm > previous.bestWpm

  if (betterStars || sameStarsBetterWpm) {
    return {
      ...attempt,
      passed: previous.passed || attempt.passed,
    }
  }

  return {
    ...previous,
    passed: previous.passed || attempt.passed,
    lastPlayedAt: attempt.lastPlayedAt,
  }
}
