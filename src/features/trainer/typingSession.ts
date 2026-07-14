export type TypingSession = {
  targetText: string
  cursorIndex: number
  correct: number
  incorrect: number
  isErrorLocked: boolean
  startedAt: number | null
}

export type TypingSnapshot = {
  cursorIndex: number
  correct: number
  incorrect: number
  isErrorLocked: boolean
  isFinished: boolean
  startedAt: number | null
  targetText: string
  currentChar: string | null
}

export function createTypingSession(targetText: string): TypingSession {
  return {
    targetText,
    cursorIndex: 0,
    correct: 0,
    incorrect: 0,
    isErrorLocked: false,
    startedAt: null,
  }
}

export function getSnapshot(session: TypingSession): TypingSnapshot {
  const isFinished = session.cursorIndex >= session.targetText.length
  return {
    cursorIndex: session.cursorIndex,
    correct: session.correct,
    incorrect: session.incorrect,
    isErrorLocked: session.isErrorLocked,
    isFinished,
    startedAt: session.startedAt,
    targetText: session.targetText,
    currentChar: isFinished ? null : session.targetText[session.cursorIndex]!,
  }
}

export function typeChar(
  session: TypingSession,
  char: string,
  nowMs: number,
): TypingSession {
  if (session.cursorIndex >= session.targetText.length) {
    return session
  }

  const startedAt = session.startedAt ?? nowMs

  if (session.isErrorLocked) {
    return {
      ...session,
      startedAt,
      incorrect: session.incorrect + 1,
    }
  }

  const expected = session.targetText[session.cursorIndex]
  if (char === expected) {
    return {
      ...session,
      startedAt,
      cursorIndex: session.cursorIndex + 1,
      correct: session.correct + 1,
      isErrorLocked: false,
    }
  }

  return {
    ...session,
    startedAt,
    incorrect: session.incorrect + 1,
    isErrorLocked: true,
  }
}

export function typeBackspace(session: TypingSession): TypingSession {
  if (session.cursorIndex >= session.targetText.length) {
    return session
  }
  if (!session.isErrorLocked) {
    return session
  }
  return {
    ...session,
    isErrorLocked: false,
  }
}
