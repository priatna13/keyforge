type Props = {
  targetText: string
  cursorIndex: number
  isErrorLocked: boolean
}

export function TypingText({ targetText, cursorIndex, isErrorLocked }: Props) {
  return (
    <p
      className="kf-typing-panel text-xl leading-relaxed tracking-wide sm:text-2xl"
      aria-live="polite"
    >
      {targetText.split('').map((ch, i) => {
        let className = 'text-slate-600'
        if (i < cursorIndex) {
          className = 'text-emerald-400'
        } else if (i === cursorIndex) {
          className = isErrorLocked
            ? 'rounded-sm bg-rose-500/40 text-rose-100 underline decoration-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
            : 'rounded-sm bg-cyan-400/30 text-white underline decoration-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.45)]'
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
