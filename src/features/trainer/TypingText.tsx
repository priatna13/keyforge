type Props = {
  targetText: string
  cursorIndex: number
  isErrorLocked: boolean
}

export function TypingText({ targetText, cursorIndex, isErrorLocked }: Props) {
  return (
    <p
      className="rounded-xl border border-slate-200 bg-white p-5 font-mono text-xl leading-relaxed tracking-wide text-slate-800 shadow-sm sm:text-2xl"
      aria-live="polite"
    >
      {targetText.split('').map((ch, i) => {
        let className = 'text-slate-300'
        if (i < cursorIndex) className = 'text-emerald-600'
        else if (i === cursorIndex) {
          className = isErrorLocked
            ? 'bg-red-200 text-red-800 underline decoration-red-500'
            : 'bg-sky-200 text-slate-900 underline decoration-sky-600'
        }
        const display = ch === ' ' ? '\u00a0' : ch
        return (
          <span key={i} className={className}>
            {display}
          </span>
        )
      })}
    </p>
  )
}
