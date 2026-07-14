import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { BrandLogo } from '../../components/BrandLogo'
import type { ProfileMode } from '../../lib/storage'
import { useProfiles } from './ProfileContext'

export function OnboardingPage() {
  const { state, createProfile } = useProfiles()
  const [name, setName] = useState('')
  const [mode, setMode] = useState<ProfileMode>('dewasa')

  if (state.activeProfileId && state.profiles.length > 0) {
    return <Navigate to="/lessons" replace />
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    createProfile({ name: trimmed, mode })
  }

  return (
    <section className="kf-fade-in mx-auto max-w-lg">
      <div className="mb-8 flex justify-center">
        <div className="kf-glow-pulse rounded-3xl p-2">
          <BrandLogo
            showWordmark={false}
            className="h-[min(70vw,28rem)] w-auto max-w-full sm:h-[32rem]"
          />
        </div>
      </div>

      <p className="kf-mono text-center text-xs uppercase tracking-[0.25em] text-cyan-400/80">
        System online
      </p>
      <h1 className="kf-title mt-3 text-center text-3xl text-white sm:text-4xl">
        Selamat datang di{' '}
        <span className="bg-gradient-to-r from-cyan-300 to-orange-400 bg-clip-text text-transparent">
          KeyForge
        </span>
      </h1>
      <p className="mt-4 text-center text-xl font-semibold tracking-tight text-cyan-200 sm:text-2xl">
        Asah 10 jari. Kuasai keyboard.
      </p>
      <p className="kf-mono mt-2 text-center text-sm text-slate-400">
        Forge your fingers. Type without looking.
      </p>

      <form onSubmit={handleSubmit} className="kf-card mt-8 space-y-5 p-6">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            Nama profil
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="kf-input"
            placeholder="Contoh: Budi"
            autoFocus
            required
          />
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-slate-300">
            Mode latihan
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {(
              [
                {
                  id: 'anak' as const,
                  label: 'Anak',
                  hint: 'Teks pendek · WPM lebih rendah',
                },
                {
                  id: 'dewasa' as const,
                  label: 'Dewasa',
                  hint: 'Teks lebih panjang · target lebih tinggi',
                },
              ] as const
            ).map((opt) => (
              <label
                key={opt.id}
                className={`cursor-pointer rounded-xl border p-3 transition duration-200 ${
                  mode === opt.id
                    ? 'border-cyan-400/60 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                    : 'border-white/10 bg-black/20 hover:border-cyan-400/30'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  className="sr-only"
                  checked={mode === opt.id}
                  onChange={() => setMode(opt.id)}
                />
                <span className="kf-title block text-sm text-white">
                  {opt.label}
                </span>
                <span className="mt-1 block text-xs text-slate-400">
                  {opt.hint}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="kf-btn kf-btn-primary w-full">
          Inisialisasi profil
        </button>
      </form>
    </section>
  )
}
