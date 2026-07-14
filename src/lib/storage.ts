import type { LessonResult } from './progress'

export const STORAGE_KEY = 'keyboard-train:v1'

export type ProfileMode = 'anak' | 'dewasa'

export type Profile = {
  id: string
  name: string
  mode: ProfileMode
  settings: { sound: boolean }
  progress: Record<string, LessonResult>
  createdAt: string
}

export type AppState = {
  version: 1
  activeProfileId: string | null
  profiles: Profile[]
}

export type StorageLike = {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

export function emptyState(): AppState {
  return {
    version: 1,
    activeProfileId: null,
    profiles: [],
  }
}

function defaultStorage(): StorageLike | null {
  if (typeof globalThis.localStorage === 'undefined') return null
  return globalThis.localStorage
}

export function loadState(storage: StorageLike | null = defaultStorage()): AppState {
  if (!storage) return emptyState()
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as AppState
    if (parsed.version !== 1 || !Array.isArray(parsed.profiles)) {
      return emptyState()
    }
    return parsed
  } catch {
    return emptyState()
  }
}

export function saveState(
  state: AppState,
  storage: StorageLike | null = defaultStorage(),
): void {
  if (!storage) return
  storage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function newId(): string {
  return crypto.randomUUID()
}

export function createProfile(
  state: AppState,
  input: { name: string; mode: ProfileMode },
): AppState {
  const profile: Profile = {
    id: newId(),
    name: input.name.trim(),
    mode: input.mode,
    settings: { sound: true },
    progress: {},
    createdAt: new Date().toISOString(),
  }
  return {
    ...state,
    profiles: [...state.profiles, profile],
    activeProfileId: profile.id,
  }
}

export function setActiveProfile(state: AppState, profileId: string): AppState {
  if (!state.profiles.some((p) => p.id === profileId)) return state
  return { ...state, activeProfileId: profileId }
}

export function deleteProfile(state: AppState, profileId: string): AppState {
  const profiles = state.profiles.filter((p) => p.id !== profileId)
  let activeProfileId = state.activeProfileId
  if (activeProfileId === profileId) {
    activeProfileId = profiles[0]?.id ?? null
  }
  return { ...state, profiles, activeProfileId }
}

export function updateProfileSettings(
  state: AppState,
  profileId: string,
  settings: Partial<Profile['settings']>,
): AppState {
  return {
    ...state,
    profiles: state.profiles.map((p) =>
      p.id === profileId
        ? { ...p, settings: { ...p.settings, ...settings } }
        : p,
    ),
  }
}

export function recordLessonResult(
  state: AppState,
  profileId: string,
  lessonId: string,
  result: LessonResult,
  merge: (prev: LessonResult | undefined, attempt: LessonResult) => LessonResult,
): AppState {
  return {
    ...state,
    profiles: state.profiles.map((p) => {
      if (p.id !== profileId) return p
      const previous = p.progress[lessonId]
      return {
        ...p,
        progress: {
          ...p.progress,
          [lessonId]: merge(previous, result),
        },
      }
    }),
  }
}
