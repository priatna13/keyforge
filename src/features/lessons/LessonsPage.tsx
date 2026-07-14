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
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Daftar lesson</h1>
        <p className="mt-1 text-slate-600">
          Halo, <span className="font-medium text-slate-800">{activeProfile.name}</span>
          {' · '}
          mode {activeProfile.mode === 'anak' ? 'Anak' : 'Dewasa'}. Selesaikan
          berurutan: akurasi ≥ 90% dan WPM minimum lesson.
        </p>
      </div>

      <ol className="space-y-3">
        {lessons.map((lesson) => {
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
              className={`rounded-xl border bg-white p-4 shadow-sm ${
                unlocked ? 'border-slate-200' : 'border-slate-100 opacity-70'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Lesson {lesson.order}
                    {passed && (
                      <span className="ml-2 text-emerald-600">Lulus</span>
                    )}
                    {!unlocked && (
                      <span className="ml-2 text-slate-400">Terkunci</span>
                    )}
                  </p>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {lesson.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{lesson.description}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    Target: {lesson.minWpm} WPM · ≥{lesson.minAccuracy}% akurasi
                    {result
                      ? ` · Best: ${result.bestWpm} WPM, ${result.bestAccuracy}%, ${starsLabel(result.bestStars)}`
                      : ''}
                  </p>
                </div>
                {unlocked ? (
                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="shrink-0 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                  >
                    {passed ? 'Ulangi' : 'Mulai'}
                  </Link>
                ) : (
                  <span className="shrink-0 rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-400">
                    🔒
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
