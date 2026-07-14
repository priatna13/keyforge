import { Link } from 'react-router-dom'
import { useProfiles } from './ProfileContext'

export function SettingsPage() {
  const { activeProfile, setSoundEnabled } = useProfiles()

  if (!activeProfile) {
    return (
      <p>
        Belum ada profil aktif.{' '}
        <Link to="/" className="text-sky-700 underline">
          Buat profil
        </Link>
      </p>
    )
  }

  return (
    <section className="mx-auto max-w-lg space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan</h1>
        <Link to="/lessons" className="text-sm font-medium text-sky-700 hover:underline">
          ← Lesson
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Profil aktif</p>
        <p className="text-lg font-semibold text-slate-900">
          {activeProfile.name} ({activeProfile.mode === 'anak' ? 'Anak' : 'Dewasa'})
        </p>

        <label className="mt-6 flex cursor-pointer items-center justify-between gap-4">
          <span>
            <span className="block font-medium text-slate-900">Suara feedback</span>
            <span className="text-sm text-slate-500">
              Bunyi saat ketik benar/salah
            </span>
          </span>
          <input
            type="checkbox"
            checked={activeProfile.settings.sound}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            className="h-5 w-5 accent-sky-600"
          />
        </label>
      </div>
    </section>
  )
}
