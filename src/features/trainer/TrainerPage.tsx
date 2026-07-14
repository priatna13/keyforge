import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getCurriculum, getLesson } from '../../data/curriculum'
import { getHighlightsForChar } from '../../data/finger-map'
import { playKeyError, playKeyOk } from '../../lib/audio'
import {
  calculateAccuracy,
  calculateStars,
  calculateWpm,
  isLessonPassed,
} from '../../lib/metrics'
import { isLessonUnlocked } from '../../lib/progress'
import { HandGuide } from '../keyboard/HandGuide'
import { VirtualKeyboard } from '../keyboard/VirtualKeyboard'
import { useProfiles } from '../profiles/ProfileContext'
import {
  createTypingSession,
  getSnapshot,
  typeBackspace,
  typeChar,
  type TypingSession,
} from './typingSession'
import { TypingText } from './TypingText'

type Action =
  | { type: 'char'; char: string; now: number }
  | { type: 'backspace' }
  | { type: 'reset'; text: string }

function sessionReducer(state: TypingSession, action: Action): TypingSession {
  switch (action.type) {
    case 'char':
      return typeChar(state, action.char, action.now)
    case 'backspace':
      return typeBackspace(state)
    case 'reset':
      return createTypingSession(action.text)
  }
}

export function TrainerPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const { activeProfile, saveLessonResult } = useProfiles()
  const navigate = useNavigate()

  const lesson =
    activeProfile && lessonId
      ? getLesson(activeProfile.mode, lessonId)
      : undefined

  const [session, dispatch] = useReducer(
    sessionReducer,
    lesson?.targetText ?? '',
    (text) => createTypingSession(text),
  )
  const sessionRef = useRef(session)
  sessionRef.current = session

  const [tick, setTick] = useState(0)
  const [finishedElapsed, setFinishedElapsed] = useState(0)
  const [saved, setSaved] = useState(false)
  const soundRef = useRef(true)
  soundRef.current = activeProfile?.settings.sound ?? true

  const snap = getSnapshot(session)

  useEffect(() => {
    if (lesson) {
      dispatch({ type: 'reset', text: lesson.targetText })
      setSaved(false)
      setFinishedElapsed(0)
    }
  }, [lesson?.id, lesson?.targetText])

  useEffect(() => {
    if (!snap.startedAt || snap.isFinished) return
    const id = window.setInterval(() => setTick((t) => t + 1), 200)
    return () => window.clearInterval(id)
  }, [snap.startedAt, snap.isFinished])

  useEffect(() => {
    if (snap.isFinished && snap.startedAt) {
      setFinishedElapsed(Date.now() - snap.startedAt)
    }
  }, [snap.isFinished, snap.startedAt])

  const liveElapsed =
    snap.startedAt == null ? 0 : Date.now() - snap.startedAt
  const effectiveElapsed = snap.isFinished ? finishedElapsed : liveElapsed
  void tick

  const accuracy = calculateAccuracy({
    correct: snap.correct,
    incorrect: snap.incorrect,
  })
  const wpm = calculateWpm({
    correctChars: snap.correct,
    elapsedMs: effectiveElapsed,
  })

  const highlight = useMemo(() => {
    if (!snap.currentChar) {
      return { keys: [] as string[], fingers: [] as ReturnType<typeof getHighlightsForChar>['fingers'] }
    }
    return getHighlightsForChar(snap.currentChar)
  }, [snap.currentChar])

  useEffect(() => {
    if (!lesson || !activeProfile || !snap.isFinished || saved) return
    if (!snap.startedAt) return

    const elapsed = finishedElapsed || Date.now() - snap.startedAt
    const finalWpm = calculateWpm({
      correctChars: snap.correct,
      elapsedMs: elapsed,
    })
    const finalAccuracy = calculateAccuracy({
      correct: snap.correct,
      incorrect: snap.incorrect,
    })
    const passed = isLessonPassed({
      accuracy: finalAccuracy,
      wpm: finalWpm,
      minWpm: lesson.minWpm,
      minAccuracy: lesson.minAccuracy,
    })
    const stars = calculateStars({
      accuracy: finalAccuracy,
      wpm: finalWpm,
      minWpm: lesson.minWpm,
      minAccuracy: lesson.minAccuracy,
    })
    saveLessonResult(lesson.id, {
      passed,
      bestWpm: finalWpm,
      bestAccuracy: finalAccuracy,
      bestStars: stars,
      bestTimeMs: elapsed,
      lastPlayedAt: new Date().toISOString(),
    })
    setSaved(true)
    navigate(`/lessons/${lesson.id}/hasil`, {
      replace: true,
      state: {
        wpm: finalWpm,
        accuracy: finalAccuracy,
        timeMs: elapsed,
        stars,
        passed,
        minWpm: lesson.minWpm,
      },
    })
  }, [
    snap.isFinished,
    snap.startedAt,
    snap.correct,
    snap.incorrect,
    finishedElapsed,
    saved,
    lesson,
    activeProfile,
    saveLessonResult,
    navigate,
  ])

  useEffect(() => {
    if (!lesson) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.altKey || e.metaKey) return
      if (e.key === 'Tab') {
        e.preventDefault()
        return
      }

      const current = sessionRef.current
      const before = getSnapshot(current)
      if (before.isFinished) return

      if (e.key === 'Backspace') {
        e.preventDefault()
        dispatch({ type: 'backspace' })
        return
      }

      if (e.key.length !== 1) return
      e.preventDefault()

      const now = Date.now()
      const next = typeChar(current, e.key, now)
      const after = getSnapshot(next)
      dispatch({ type: 'char', char: e.key, now })

      if (after.incorrect > before.incorrect) {
        playKeyError(soundRef.current)
      } else if (after.correct > before.correct) {
        playKeyOk(soundRef.current)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lesson?.id])

  if (!activeProfile) return <Navigate to="/" replace />
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

  const unlocked = isLessonUnlocked({
    lessonId: lesson.id,
    lessons: getCurriculum(activeProfile.mode),
    progress: activeProfile.progress,
  })
  if (!unlocked) {
    return <Navigate to="/lessons" replace />
  }

  return (
    <section className="kf-fade-in space-y-6">
      <div>
        <p className="kf-mono text-xs uppercase tracking-[0.2em] text-cyan-400/70">
          Mission #{String(lesson.order).padStart(2, '0')}
        </p>
        <h1 className="kf-title mt-1 text-2xl text-white sm:text-3xl">
          {lesson.title}
        </h1>
        <p className="mt-1 text-sm text-slate-400">{lesson.description}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="kf-stat">
          <p className="kf-stat-label">WPM</p>
          <p className="kf-stat-value">{wpm}</p>
        </div>
        <div className="kf-stat">
          <p className="kf-stat-label">Akurasi</p>
          <p className="kf-stat-value">{accuracy}%</p>
        </div>
        <div className="kf-stat">
          <p className="kf-stat-label">Waktu</p>
          <p className="kf-stat-value">
            {Math.floor(effectiveElapsed / 1000)}
            <span className="text-base text-slate-500">s</span>
          </p>
        </div>
      </div>

      {snap.isErrorLocked && (
        <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-center text-sm text-rose-200">
          ERROR LOCK — tekan{' '}
          <kbd className="kf-mono rounded border border-rose-400/40 bg-rose-500/20 px-1.5 py-0.5 text-rose-100">
            Backspace
          </kbd>{' '}
          lalu ketik karakter yang benar.
        </p>
      )}

      <TypingText
        targetText={lesson.targetText}
        cursorIndex={snap.cursorIndex}
        isErrorLocked={snap.isErrorLocked}
      />

      <p className="kf-mono text-center text-xs text-slate-500">
        TARGET {lesson.minWpm} WPM · ≥{lesson.minAccuracy}% · begin keystroke
        anytime
      </p>

      <HandGuide activeFingers={highlight.fingers} />
      <VirtualKeyboard
        activeKeys={highlight.keys}
        activeFingers={highlight.fingers}
        error={snap.isErrorLocked}
      />
    </section>
  )
}
