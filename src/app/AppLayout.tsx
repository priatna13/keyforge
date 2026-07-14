import { Link, Outlet } from 'react-router-dom'
import { useProfiles } from '../features/profiles/ProfileContext'
import { DesktopNotice } from './DesktopNotice'

export function AppLayout() {
  const { activeProfile } = useProfiles()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link to={activeProfile ? '/lessons' : '/'} className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-sky-700">
              Keyboard Train
            </span>
            <span className="hidden text-sm text-slate-500 sm:inline">
              Latihan mengetik 10 jari
            </span>
          </Link>

          {activeProfile && (
            <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
              <Link to="/lessons" className="hover:text-sky-700">
                Lesson
              </Link>
              <Link to="/profil" className="hover:text-sky-700">
                Profil
              </Link>
              <Link to="/pengaturan" className="hover:text-sky-700">
                Pengaturan
              </Link>
              <span className="hidden rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 sm:inline">
                {activeProfile.name}
              </span>
            </nav>
          )}
        </div>
      </header>

      <DesktopNotice />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
