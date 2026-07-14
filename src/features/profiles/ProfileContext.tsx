import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { LessonResult } from '../../lib/progress'
import { mergeBestResult } from '../../lib/progress'
import {
  createProfile as createProfileState,
  deleteProfile as deleteProfileState,
  loadState,
  recordLessonResult,
  saveState,
  setActiveProfile as setActiveProfileState,
  updateProfileSettings as updateProfileSettingsState,
  type AppState,
  type Profile,
  type ProfileMode,
} from '../../lib/storage'

type ProfileContextValue = {
  state: AppState
  activeProfile: Profile | null
  createProfile: (input: { name: string; mode: ProfileMode }) => void
  setActiveProfile: (id: string) => void
  deleteProfile: (id: string) => void
  setSoundEnabled: (enabled: boolean) => void
  saveLessonResult: (lessonId: string, result: LessonResult) => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

function persist(next: AppState) {
  saveState(next)
  return next
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState())

  const activeProfile = useMemo(
    () => state.profiles.find((p) => p.id === state.activeProfileId) ?? null,
    [state],
  )

  const createProfile = useCallback((input: { name: string; mode: ProfileMode }) => {
    setState((prev) => persist(createProfileState(prev, input)))
  }, [])

  const setActiveProfile = useCallback((id: string) => {
    setState((prev) => persist(setActiveProfileState(prev, id)))
  }, [])

  const deleteProfile = useCallback((id: string) => {
    setState((prev) => persist(deleteProfileState(prev, id)))
  }, [])

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setState((prev) => {
      if (!prev.activeProfileId) return prev
      return persist(
        updateProfileSettingsState(prev, prev.activeProfileId, {
          sound: enabled,
        }),
      )
    })
  }, [])

  const saveLessonResult = useCallback(
    (lessonId: string, result: LessonResult) => {
      setState((prev) => {
        if (!prev.activeProfileId) return prev
        return persist(
          recordLessonResult(
            prev,
            prev.activeProfileId,
            lessonId,
            result,
            mergeBestResult,
          ),
        )
      })
    },
    [],
  )

  const value = useMemo(
    () => ({
      state,
      activeProfile,
      createProfile,
      setActiveProfile,
      deleteProfile,
      setSoundEnabled,
      saveLessonResult,
    }),
    [
      state,
      activeProfile,
      createProfile,
      setActiveProfile,
      deleteProfile,
      setSoundEnabled,
      saveLessonResult,
    ],
  )

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

export function useProfiles(): ProfileContextValue {
  const ctx = useContext(ProfileContext)
  if (!ctx) {
    throw new Error('useProfiles must be used within ProfileProvider')
  }
  return ctx
}
