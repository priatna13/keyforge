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
    <section className="kf-fade-in mx-auto max-w-2xl space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="kf-mono text-xs uppercase tracking-[0.2em] text-cyan-400/70">
            Identity bank
          </p>
          <h1 className="kf-title mt-1 text-3xl text-white">Profil</h1>
        </div>
        <Link to="/lessons" className="kf-btn kf-btn-ghost text-sm">
          ← Lesson
        </Link>
      </div>

      <ul className="space-y-3">
        {state.profiles.map((p) => {
          const active = p.id === activeProfile?.id
          return (
            <li
              key={p.id}
              className={`kf-card flex flex-wrap items-center justify-between gap-3 p-4 ${
                active ? 'border-cyan-400/50 shadow-[0_0_24px_rgba(34,211,238,0.15)]' : ''
              }`}
            >
              <div>
                <p className="font-semibold text-white">
                  {p.name}{' '}
                  {active && (
                    <span className="kf-badge kf-badge-open ml-1">Aktif</span>
                  )}
                </p>
                <p className="kf-mono mt-1 text-xs text-slate-500">
                  {p.mode === 'anak' ? 'ANAK' : 'DEWASA'} · audio{' '}
                  {p.settings.sound ? 'ON' : 'OFF'}
                </p>
              </div>
              <div className="flex gap-2">
                {!active && (
                  <button
                    type="button"
                    onClick={() => setActiveProfile(p.id)}
                    className="kf-btn kf-btn-ghost"
                  >
                    Aktifkan
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Hapus profil "${p.name}"?`)) deleteProfile(p.id)
                  }}
                  className="kf-btn kf-btn-danger"
                >
                  Hapus
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <form onSubmit={handleCreate} className="kf-card space-y-4 p-5">
        <h2 className="kf-title text-sm text-cyan-300">Tambah profil</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
          className="kf-input"
          required
        />
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as ProfileMode)}
          className="kf-input"
        >
          <option value="anak">Anak</option>
          <option value="dewasa">Dewasa</option>
        </select>
        <button type="submit" className="kf-btn kf-btn-primary">
          Buat profil
        </button>
      </form>
    </section>
  )
}
