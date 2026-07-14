import { beforeEach, describe, expect, it } from 'vitest'
import { mergeBestResult } from './progress'
import {
  STORAGE_KEY,
  createProfile,
  deleteProfile,
  emptyState,
  loadState,
  recordLessonResult,
  saveState,
  setActiveProfile,
  updateProfileSettings,
  type AppState,
} from './storage'

function memoryStorage() {
  const map = new Map<string, string>()
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => {
      map.set(k, v)
    },
    removeItem: (k: string) => {
      map.delete(k)
    },
  }
}

describe('profile storage', () => {
  let store: ReturnType<typeof memoryStorage>

  beforeEach(() => {
    store = memoryStorage()
  })

  it('loads empty state when nothing is stored', () => {
    expect(loadState(store)).toEqual(emptyState())
  })

  it('round-trips state through save and load', () => {
    let state = emptyState()
    state = createProfile(state, { name: 'Budi', mode: 'dewasa' })
    saveState(state, store)
    const loaded = loadState(store)
    expect(loaded.profiles).toHaveLength(1)
    expect(loaded.profiles[0]!.name).toBe('Budi')
    expect(loaded.profiles[0]!.mode).toBe('dewasa')
    expect(loaded.profiles[0]!.settings.sound).toBe(true)
    expect(loaded.activeProfileId).toBe(loaded.profiles[0]!.id)
  })

  it('creates multiple profiles without mixing progress', () => {
    let state = emptyState()
    state = createProfile(state, { name: 'Anak1', mode: 'anak' })
    state = createProfile(state, { name: 'Dewasa1', mode: 'dewasa' })
    expect(state.profiles).toHaveLength(2)
    expect(state.profiles[0]!.progress).toEqual({})
    expect(state.profiles[1]!.progress).toEqual({})
    expect(state.profiles[0]!.id).not.toBe(state.profiles[1]!.id)
  })

  it('switches active profile', () => {
    let state = emptyState()
    state = createProfile(state, { name: 'A', mode: 'anak' })
    state = createProfile(state, { name: 'B', mode: 'dewasa' })
    const firstId = state.profiles[0]!.id
    state = setActiveProfile(state, firstId)
    expect(state.activeProfileId).toBe(firstId)
  })

  it('deletes profile and clears active if needed', () => {
    let state = emptyState()
    state = createProfile(state, { name: 'A', mode: 'anak' })
    state = createProfile(state, { name: 'B', mode: 'dewasa' })
    const activeId = state.activeProfileId!
    state = deleteProfile(state, activeId)
    expect(state.profiles).toHaveLength(1)
    expect(state.activeProfileId).toBe(state.profiles[0]!.id)
  })

  it('sets active to null when last profile is deleted', () => {
    let state = emptyState()
    state = createProfile(state, { name: 'Only', mode: 'anak' })
    state = deleteProfile(state, state.profiles[0]!.id)
    expect(state.profiles).toHaveLength(0)
    expect(state.activeProfileId).toBeNull()
  })

  it('updates sound setting on a profile', () => {
    let state = emptyState()
    state = createProfile(state, { name: 'A', mode: 'anak' })
    const id = state.profiles[0]!.id
    state = updateProfileSettings(state, id, { sound: false })
    expect(state.profiles[0]!.settings.sound).toBe(false)
  })

  it('ignores corrupt storage and returns empty state', () => {
    store.setItem(STORAGE_KEY, '{not-json')
    expect(loadState(store)).toEqual(emptyState())
  })

  it('persists version field', () => {
    const state: AppState = emptyState()
    saveState(state, store)
    const raw = JSON.parse(store.getItem(STORAGE_KEY)!)
    expect(raw.version).toBe(1)
  })

  it('records merged lesson results on the active profile', () => {
    let state = emptyState()
    state = createProfile(state, { name: 'A', mode: 'anak' })
    const id = state.profiles[0]!.id
    state = recordLessonResult(
      state,
      id,
      'home-asdf',
      {
        passed: true,
        bestWpm: 12,
        bestAccuracy: 95,
        bestStars: 2,
        bestTimeMs: 20_000,
        lastPlayedAt: '2026-01-01T00:00:00.000Z',
      },
      mergeBestResult,
    )
    expect(state.profiles[0]!.progress['home-asdf']?.passed).toBe(true)
    expect(state.profiles[0]!.progress['home-asdf']?.bestStars).toBe(2)
  })
})
