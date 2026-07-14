import { useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  matchPath,
} from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'
import { useProfiles } from '../features/profiles/ProfileContext'
import { DesktopNotice } from './DesktopNotice'

function navClass({ isActive }: { isActive: boolean }) {
  return [
    'flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition duration-200',
    isActive
      ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 text-void shadow-[0_0_18px_rgba(34,211,238,0.35)]'
      : 'text-slate-300 hover:bg-cyan-400/10 hover:text-cyan-300',
  ].join(' ')
}

function useIsTypingSession() {
  const { pathname } = useLocation()
  return Boolean(
    matchPath({ path: '/lessons/:lessonId', end: true }, pathname),
  )
}

export function AppLayout() {
  const { activeProfile } = useProfiles()
  const isTypingSession = useIsTypingSession()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Tutup drawer mobile saat ganti halaman
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Saat latihan ketik: sidebar desktop disembunyikan (full focus)
  const sidebarHiddenDesktop = isTypingSession

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link
        to={activeProfile ? '/lessons' : '/'}
        className="flex flex-col items-center gap-2 border-b border-cyan-400/15 px-4 py-5"
        onClick={() => setMobileOpen(false)}
      >
        <BrandLogo
          showWordmark={false}
          className="h-20 w-auto sm:h-24"
        />
        <span className="kf-title bg-gradient-to-r from-cyan-300 to-orange-400 bg-clip-text text-lg text-transparent">
          KeyForge
        </span>
        <span className="kf-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          10-finger protocol
        </span>
      </Link>

      {activeProfile ? (
        <nav className="flex flex-1 flex-col gap-1.5 p-3">
          <p className="kf-mono mb-1 px-2 text-[10px] uppercase tracking-[0.18em] text-cyan-500/60">
            Navigate
          </p>
          <NavLink to="/lessons" className={navClass} onClick={() => setMobileOpen(false)}>
            <NavIcon kind="lesson" />
            Lesson
          </NavLink>
          <NavLink to="/profil" className={navClass} onClick={() => setMobileOpen(false)}>
            <NavIcon kind="profil" />
            Profil
          </NavLink>
          <NavLink
            to="/pengaturan"
            className={navClass}
            onClick={() => setMobileOpen(false)}
          >
            <NavIcon kind="system" />
            System
          </NavLink>
        </nav>
      ) : (
        <div className="flex-1 p-4 text-center text-xs text-slate-500">
          Buat profil untuk membuka navigasi.
        </div>
      )}

      <div className="mt-auto border-t border-cyan-400/15 p-4">
        {activeProfile && (
          <div className="mb-3 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-3 py-2">
            <p className="kf-mono text-[10px] uppercase tracking-wider text-slate-500">
              Operative
            </p>
            <p className="truncate font-semibold text-cyan-300">
              {activeProfile.name}
            </p>
            <p className="kf-mono text-[10px] text-slate-500">
              {activeProfile.mode === 'anak' ? 'MODE ANAK' : 'MODE DEWASA'}
            </p>
          </div>
        )}
        <p className="kf-mono text-center text-[10px] text-slate-600">
          KEYFORGE // v0.1
        </p>
      </div>
    </div>
  )

  return (
    <div className="kf-app-bg flex min-h-dvh">
      {/* Overlay mobile */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          aria-label="Tutup menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar desktop */}
      <aside
        className={`kf-glass fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-cyan-400/20 transition-transform duration-300 ease-out md:flex ${
          sidebarHiddenDesktop ? '-translate-x-full' : 'translate-x-0'
        }`}
        aria-hidden={sidebarHiddenDesktop}
      >
        {sidebar}
      </aside>

      {/* Sidebar mobile drawer */}
      <aside
        className={`kf-glass fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-cyan-400/20 transition-transform duration-300 ease-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        {sidebar}
      </aside>

      {/* Main column */}
      <div
        className={`flex min-h-dvh min-w-0 flex-1 flex-col transition-[margin] duration-300 ease-out ${
          sidebarHiddenDesktop ? 'md:ml-0' : 'md:ml-60'
        }`}
      >
        {/* Top bar tipis: hamburger (mobile) + back saat latihan */}
        <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-cyan-400/10 bg-void/80 px-3 py-2 backdrop-blur-md md:border-0 md:bg-transparent md:px-4 md:py-3 md:backdrop-blur-none">
          {!isTypingSession && (
            <button
              type="button"
              className="kf-btn kf-btn-ghost px-3 py-2 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Buka menu"
            >
              <span className="kf-mono text-xs">☰ MENU</span>
            </button>
          )}
          {isTypingSession && (
            <Link to="/lessons" className="kf-btn kf-btn-ghost text-sm">
              ← Daftar lesson
            </Link>
          )}
          {!isTypingSession && (
            <span className="kf-mono hidden text-[10px] uppercase tracking-[0.2em] text-slate-600 sm:inline md:hidden">
              KeyForge
            </span>
          )}
        </div>

        {!isTypingSession && <DesktopNotice />}

        <main
          className={`mx-auto w-full max-w-5xl flex-1 px-4 transition-[padding] duration-300 ${
            isTypingSession ? 'py-3 sm:py-4' : 'py-6 sm:py-8'
          }`}
        >
          <Outlet />
        </main>

        {!isTypingSession && (
          <footer className="border-t border-cyan-400/10 py-3 text-center text-xs text-slate-500">
            <span className="kf-mono text-cyan-700/80">KEYFORGE</span>
            <span className="mx-2 text-slate-600">//</span>
            forge your ten-finger skill
          </footer>
        )}
      </div>
    </div>
  )
}

function NavIcon({ kind }: { kind: 'lesson' | 'profil' | 'system' }) {
  const common = 'h-4 w-4 shrink-0 opacity-90'
  if (kind === 'lesson') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 6h16M4 12h10M4 18h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (kind === 'profil') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
