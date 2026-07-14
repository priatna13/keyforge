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
      <p>
        Lesson tidak ditemukan.{' '}
        <Link to="/lessons" className="text-sky-700 underline">
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
    <section className="mx-auto max-w-lg space-y-6 text-center">
      <div
        className={`rounded-2xl border p-6 shadow-sm ${
          result.passed
            ? 'border-emerald-200 bg-emerald-50'
            : 'border-amber-200 bg-amber-50'
        }`}
      >
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Lesson {lesson.order}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">{lesson.title}</h1>
        <p
          className={`mt-4 text-3xl font-bold ${
            result.passed ? 'text-emerald-700' : 'text-amber-800'
          }`}
        >
          {result.passed ? 'Lulus!' : 'Belum lulus'}
        </p>
        <p className="mt-2 text-2xl tracking-widest text-amber-500">{starText}</p>
        {!result.passed && (
          <p className="mt-2 text-sm text-slate-600">
            Butuh ≥{lesson.minAccuracy}% akurasi dan ≥{lesson.minWpm} WPM.
          </p>
        )}
      </div>

      <dl className="grid grid-cols-3 gap-3">
        <Metric label="WPM" value={String(result.wpm)} />
        <Metric label="Akurasi" value={`${result.accuracy}%`} />
        <Metric
          label="Waktu"
          value={`${Math.floor(result.timeMs / 1000)} dtk`}
        />
      </dl>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to={`/lessons/${lesson.id}`}
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-800 hover:bg-slate-50"
        >
          Ulangi
        </Link>
        {result.passed && next && (
          <Link
            to={`/lessons/${next.id}`}
            className="rounded-lg bg-sky-600 px-5 py-2.5 font-semibold text-white hover:bg-sky-700"
          >
            Lesson berikutnya
          </Link>
        )}
        <Link
          to="/lessons"
          className="rounded-lg bg-slate-800 px-5 py-2.5 font-semibold text-white hover:bg-slate-900"
        >
          Daftar lesson
        </Link>
      </div>
    </section>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <dt className="text-xs uppercase text-slate-400">{label}</dt>
      <dd className="mt-1 text-xl font-bold tabular-nums text-slate-900">{value}</dd>
    </div>
  )
}
