import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { ProfileMode } from '../../lib/storage'
import { useProfiles } from './ProfileContext'

export function ProfilesPage() {
  const {
    state,
    activeProfile,
    createProfile,
    setActiveProfile,
    deleteProfile,
  } = useProfiles()
  const [name, setName] = useState('')
  const [mode, setMode] = useState<ProfileMode>('anak')

  function handleCreate(e: FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    createProfile({ name: trimmed, mode })
    setName('')
  }

  return (
    <section className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Profil</h1>
        <Link to="/lessons" className="text-sm font-medium text-sky-700 hover:underline">
          ← Kembali ke lesson
        </Link>
      </div>

      <ul className="space-y-3">
        {state.profiles.map((p) => {
          const active = p.id === activeProfile?.id
          return (
            <li
              key={p.id}
              className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white p-4 shadow-sm ${
                active ? 'border-sky-400 ring-2 ring-sky-100' : 'border-slate-200'
              }`}
            >
              <div>
                <p className="font-semibold text-slate-900">
                  {p.name}{' '}
                  {active && (
                    <span className="text-xs font-medium text-sky-700">(aktif)</span>
                  )}
                </p>
                <p className="text-sm text-slate-500">
                  Mode {p.mode === 'anak' ? 'Anak' : 'Dewasa'} · Suara{' '}
                  {p.settings.sound ? 'nyala' : 'mati'}
                </p>
              </div>
              <div className="flex gap-2">
                {!active && (
                  <button
                    type="button"
                    onClick={() => setActiveProfile(p.id)}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                  >
                    Aktifkan
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Hapus profil "${p.name}"?`)) deleteProfile(p.id)
                  }}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50"
                >
                  Hapus
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <form
        onSubmit={handleCreate}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 className="font-semibold text-slate-900">Tambah profil</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
          required
        />
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as ProfileMode)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="anak">Anak</option>
          <option value="dewasa">Dewasa</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Buat profil
        </button>
      </form>
    </section>
  )
}
