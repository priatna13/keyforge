import { buildCurriculum } from './buildCurriculum'
import type { CurriculumMode, Lesson } from './types'

export type { CurriculumMode, Lesson } from './types'

const cache: Record<CurriculumMode, Lesson[]> = {
  anak: buildCurriculum('anak'),
  dewasa: buildCurriculum('dewasa'),
}

export function getCurriculum(mode: CurriculumMode): Lesson[] {
  return cache[mode]
}

export function getLesson(
  mode: CurriculumMode,
  lessonId: string,
): Lesson | undefined {
  return getCurriculum(mode).find((l) => l.id === lessonId)
}

export function getNextLesson(
  mode: CurriculumMode,
  lessonId: string,
): Lesson | undefined {
  const list = getCurriculum(mode)
  const current = list.find((l) => l.id === lessonId)
  if (!current) return undefined
  return list.find((l) => l.order === current.order + 1)
}
