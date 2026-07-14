import { describe, expect, it } from 'vitest'
import {
  createTypingSession,
  typeChar,
  typeBackspace,
  getSnapshot,
} from './typingSession'

describe('typing session (lock-on-error)', () => {
  it('starts at index 0 with no errors and not finished', () => {
    const session = createTypingSession('ab')
    const snap = getSnapshot(session)
    expect(snap.cursorIndex).toBe(0)
    expect(snap.correct).toBe(0)
    expect(snap.incorrect).toBe(0)
    expect(snap.isErrorLocked).toBe(false)
    expect(snap.isFinished).toBe(false)
    expect(snap.startedAt).toBeNull()
  })

  it('advances cursor on correct character and records start time', () => {
    const t0 = 1_000
    let session = createTypingSession('ab')
    session = typeChar(session, 'a', t0)
    const snap = getSnapshot(session)
    expect(snap.cursorIndex).toBe(1)
    expect(snap.correct).toBe(1)
    expect(snap.incorrect).toBe(0)
    expect(snap.startedAt).toBe(t0)
    expect(snap.isErrorLocked).toBe(false)
  })

  it('locks on wrong character without advancing cursor', () => {
    let session = createTypingSession('ab')
    session = typeChar(session, 'x', 1_000)
    const snap = getSnapshot(session)
    expect(snap.cursorIndex).toBe(0)
    expect(snap.correct).toBe(0)
    expect(snap.incorrect).toBe(1)
    expect(snap.isErrorLocked).toBe(true)
  })

  it('ignores further characters while error-locked (except they still count as incorrect)', () => {
    let session = createTypingSession('ab')
    session = typeChar(session, 'x', 1_000)
    session = typeChar(session, 'a', 1_100) // correct key but still locked → incorrect
    const snap = getSnapshot(session)
    expect(snap.cursorIndex).toBe(0)
    expect(snap.isErrorLocked).toBe(true)
    expect(snap.incorrect).toBe(2)
    expect(snap.correct).toBe(0)
  })

  it('backspace clears error lock so the learner can retry', () => {
    let session = createTypingSession('ab')
    session = typeChar(session, 'x', 1_000)
    session = typeBackspace(session)
    const snap = getSnapshot(session)
    expect(snap.isErrorLocked).toBe(false)
    expect(snap.cursorIndex).toBe(0)
  })

  it('after backspace, correct character advances', () => {
    let session = createTypingSession('ab')
    session = typeChar(session, 'x', 1_000)
    session = typeBackspace(session)
    session = typeChar(session, 'a', 1_200)
    const snap = getSnapshot(session)
    expect(snap.cursorIndex).toBe(1)
    expect(snap.correct).toBe(1)
    expect(snap.isErrorLocked).toBe(false)
  })

  it('backspace does nothing when not error-locked and at start', () => {
    let session = createTypingSession('ab')
    session = typeBackspace(session)
    expect(getSnapshot(session).cursorIndex).toBe(0)
  })

  it('finishes when all characters typed correctly', () => {
    let session = createTypingSession('hi')
    session = typeChar(session, 'h', 1_000)
    session = typeChar(session, 'i', 1_500)
    const snap = getSnapshot(session)
    expect(snap.isFinished).toBe(true)
    expect(snap.cursorIndex).toBe(2)
    expect(snap.correct).toBe(2)
  })

  it('ignores input after finished', () => {
    let session = createTypingSession('a')
    session = typeChar(session, 'a', 1_000)
    session = typeChar(session, 'a', 1_100)
    const snap = getSnapshot(session)
    expect(snap.correct).toBe(1)
    expect(snap.incorrect).toBe(0)
    expect(snap.isFinished).toBe(true)
  })

  it('handles space as a normal target character', () => {
    let session = createTypingSession('a b')
    session = typeChar(session, 'a', 1_000)
    session = typeChar(session, ' ', 1_100)
    session = typeChar(session, 'b', 1_200)
    expect(getSnapshot(session).isFinished).toBe(true)
  })

  it('is case-sensitive for target text', () => {
    let session = createTypingSession('A')
    session = typeChar(session, 'a', 1_000)
    expect(getSnapshot(session).isErrorLocked).toBe(true)
    session = typeBackspace(session)
    session = typeChar(session, 'A', 1_100)
    expect(getSnapshot(session).isFinished).toBe(true)
  })

  it('does not set startedAt on backspace alone', () => {
    let session = createTypingSession('a')
    session = typeBackspace(session)
    expect(getSnapshot(session).startedAt).toBeNull()
  })
})
