import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { getLesson, getNextLesson } from '../../data/curriculum'
import { useProfiles } from '../profiles/ProfileContext'

type ResultState = {
  wpm: number
  accuracy: number
  timeMs: number
  stars: number
  passed: boolean
  minWpm: number
}

export function ResultPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const { activeProfile } = useProfiles()
  const location = useLocation()
  const state = location.state as ResultState | null

  if (!activeProfile || !lessonId) return <Navigate to="/" replace />

  const lesson = getLesson(activeProfile.mode, lessonId)
  if (!lesson) {
    return (
      <p className="text-slate-400">
        Lesson tidak ditemukan.{' '}
        <Link to="/lessons" className="text-cyan-400 underline">
          Kembali
        </Link>
      </p>
    )
  }

  const next = getNextLesson(activeProfile.mode, lessonId)
  const result = state ?? {
    wpm: activeProfile.progress[lessonId]?.bestWpm ?? 0,
    accuracy: activeProfile.progress[lessonId]?.bestAccuracy ?? 0,
    timeMs: activeProfile.progress[lessonId]?.bestTimeMs ?? 0,
    stars: activeProfile.progress[lessonId]?.bestStars ?? 0,
    passed: activeProfile.progress[lessonId]?.passed ?? false,
    minWpm: lesson.minWpm,
  }

  const starText =
    result.stars > 0
      ? '★'.repeat(result.stars) + '☆'.repeat(3 - result.stars)
      : '☆☆☆'

  return (
    <section className="kf-fade-in mx-auto max-w-lg space-y-6 text-center">
      <div
        className={`kf-card p-8 ${
          result.passed
            ? 'border-emerald-400/40 shadow-[0_0_40px_rgba(52,211,153,0.15)]'
            : 'border-orange-400/40 shadow-[0_0_40px_rgba(249,115,22,0.12)]'
        }`}
      >
        <p className="kf-mono text-xs uppercase tracking-[0.2em] text-cyan-400/70">
          Mission #{String(lesson.order).padStart(2, '0')} complete
        </p>
        <h1 className="kf-title mt-2 text-2xl text-white">{lesson.title}</h1>
        <p
          className={`mt-6 text-4xl font-bold ${
            result.passed
              ? 'text-emerald-400 drop-shadow-[0_0_16px_rgba(52,211,153,0.5)]'
              : 'text-orange-400 drop-shadow-[0_0_16px_rgba(249,115,22,0.4)]'
          }`}
        >
          {result.passed ? 'LULUS' : 'RETRY'}
        </p>
        <p className="mt-3 text-3xl tracking-[0.35em] text-amber-300/90">
          {starText}
        </p>
        {!result.passed && (
          <p className="mt-3 text-sm text-slate-400">
            Butuh ≥{lesson.minAccuracy}% akurasi dan ≥{lesson.minWpm} WPM.
          </p>
        )}
      </div>

      <dl className="grid grid-cols-3 gap-3">
        <div className="kf-stat">
          <dt className="kf-stat-label">WPM</dt>
          <dd className="kf-stat-value">{result.wpm}</dd>
        </div>
        <div className="kf-stat">
          <dt className="kf-stat-label">Akurasi</dt>
          <dd className="kf-stat-value">{result.accuracy}%</dd>
        </div>
        <div className="kf-stat">
          <dt className="kf-stat-label">Waktu</dt>
          <dd className="kf-stat-value">
            {Math.floor(result.timeMs / 1000)}
            <span className="text-base text-slate-500">s</span>
          </dd>
        </div>
      </dl>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to={`/lessons/${lesson.id}`} className="kf-btn kf-btn-ghost">
          Ulangi
        </Link>
        {result.passed && next && (
          <Link to={`/lessons/${next.id}`} className="kf-btn kf-btn-primary">
            Lesson berikutnya
          </Link>
        )}
        <Link to="/lessons" className="kf-btn kf-btn-ghost">
          Daftar lesson
        </Link>
      </div>
    </section>
  )
}
