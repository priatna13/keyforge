import { Link } from 'react-router-dom'
import { useProfiles } from './ProfileContext'

export function SettingsPage() {
  const { activeProfile, setSoundEnabled } = useProfiles()

  if (!activeProfile) {
    return (
      <p className="text-slate-400">
        Belum ada profil aktif.{' '}
        <Link to="/" className="text-cyan-400 underline">
          Buat profil
        </Link>
      </p>
    )
  }

  return (
    <section className="kf-fade-in mx-auto max-w-lg space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="kf-mono text-xs uppercase tracking-[0.2em] text-cyan-400/70">
            System config
          </p>
          <h1 className="kf-title mt-1 text-3xl text-white">Pengaturan</h1>
        </div>
        <Link to="/lessons" className="kf-btn kf-btn-ghost text-sm">
          ← Lesson
        </Link>
      </div>

      <div className="kf-card p-6">
        <p className="kf-mono text-xs uppercase tracking-wider text-slate-500">
          Profil aktif
        </p>
        <p className="mt-1 text-xl font-semibold text-white">
          {activeProfile.name}{' '}
          <span className="text-sm font-normal text-cyan-400">
            ({activeProfile.mode === 'anak' ? 'Anak' : 'Dewasa'})
          </span>
        </p>

        <label className="mt-8 flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-cyan-400/15 bg-black/25 p-4 transition hover:border-cyan-400/35">
          <span>
            <span className="block font-medium text-white">Suara feedback</span>
            <span className="text-sm text-slate-400">
              Tone neon saat ketik benar / error
            </span>
          </span>
          <input
            type="checkbox"
            checked={activeProfile.settings.sound}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            className="h-6 w-6 accent-cyan-400"
          />
        </label>
      </div>
    </section>
  )
}
