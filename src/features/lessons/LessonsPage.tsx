import { Link } from 'react-router-dom'
import { getCurriculum } from '../../data/curriculum'
import { isLessonUnlocked } from '../../lib/progress'
import { useProfiles } from '../profiles/ProfileContext'

function starsLabel(n: number) {
  if (n <= 0) return '—'
  return '★'.repeat(n) + '☆'.repeat(3 - n)
}

export function LessonsPage() {
  const { activeProfile } = useProfiles()
  if (!activeProfile) return null

  const lessons = getCurriculum(activeProfile.mode)
  const progress = activeProfile.progress

  return (
    <section className="kf-fade-in space-y-8">
      <header className="space-y-2">
        <p className="kf-mono text-xs uppercase tracking-[0.2em] text-cyan-400/70">
          Mission list · {activeProfile.mode === 'anak' ? 'mode anak' : 'mode dewasa'}
        </p>
        <h1 className="kf-title text-3xl text-white sm:text-4xl">
          Daftar lesson
        </h1>
        <p className="max-w-2xl text-slate-400">
          Operative{' '}
          <span className="kf-mono text-cyan-300">{activeProfile.name}</span>
          . Lulus = akurasi ≥ 90% + WPM minimum. Unlock berurutan.
        </p>
      </header>

      <ol className="space-y-3">
        {lessons.map((lesson, i) => {
          const unlocked = isLessonUnlocked({
            lessonId: lesson.id,
            lessons,
            progress,
          })
          const result = progress[lesson.id]
          const passed = result?.passed === true

          return (
            <li
              key={lesson.id}
              className={`kf-card p-4 sm:p-5 ${unlocked ? '' : 'kf-card-locked'}`}
              style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="kf-mono text-xs text-cyan-500/80">
                      #{String(lesson.order).padStart(2, '0')}
                    </span>
                    {passed && <span className="kf-badge kf-badge-ok">Lulus</span>}
                    {!unlocked && (
                      <span className="kf-badge kf-badge-lock">Terkunci</span>
                    )}
                    {unlocked && !passed && (
                      <span className="kf-badge kf-badge-open">Terbuka</span>
                    )}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                    {lesson.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {lesson.description}
                  </p>
                  <p className="kf-mono mt-3 text-xs text-slate-500">
                    TARGET {lesson.minWpm} WPM · ≥{lesson.minAccuracy}%
                    {result
                      ? ` · BEST ${result.bestWpm}wpm ${result.bestAccuracy}% ${starsLabel(result.bestStars)}`
                      : ''}
                  </p>
                </div>
                {unlocked ? (
                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="kf-btn kf-btn-primary shrink-0"
                  >
                    {passed ? 'Ulangi' : 'Mulai'}
                  </Link>
                ) : (
                  <span
                    className="kf-mono shrink-0 rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-xs text-slate-500"
                    title="Selesaikan lesson sebelumnya"
                  >
                    LOCK
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
