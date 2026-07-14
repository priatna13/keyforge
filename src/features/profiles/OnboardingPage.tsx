import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
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
    <section className="mx-auto max-w-lg">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Selamat datang di Keyboard Train
      </h1>
      <p className="mt-3 text-slate-600">
        Buat profil untuk menyimpan progress latihan 10 jari di browser ini.
        Progress anak dan dewasa bisa dipisah.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Nama profil
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-sky-500 focus:ring-2"
            placeholder="Contoh: Budi"
            autoFocus
            required
          />
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-slate-700">Mode latihan</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {(
              [
                { id: 'anak', label: 'Anak', hint: 'Teks pendek, WPM lebih rendah' },
                { id: 'dewasa', label: 'Dewasa', hint: 'Teks lebih panjang' },
              ] as const
            ).map((opt) => (
              <label
                key={opt.id}
                className={`cursor-pointer rounded-xl border p-3 text-left transition ${
                  mode === opt.id
                    ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-200'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  className="sr-only"
                  checked={mode === opt.id}
                  onChange={() => setMode(opt.id)}
                />
                <span className="block font-semibold text-slate-900">{opt.label}</span>
                <span className="mt-1 block text-xs text-slate-500">{opt.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full rounded-lg bg-sky-600 px-4 py-2.5 font-semibold text-white hover:bg-sky-700"
        >
          Mulai latihan
        </button>
      </form>
    </section>
  )
}
