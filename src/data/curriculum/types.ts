export type Lesson = {
  id: string
  order: number
  title: string
  description: string
  keysIntroduced: string[]
  targetText: string
  minWpm: number
  minAccuracy: number
}

export type CurriculumMode = 'anak' | 'dewasa'
