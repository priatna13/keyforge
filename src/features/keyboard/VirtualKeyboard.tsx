import type { CSSProperties } from 'react'
import { FINGER_COLORS, type FingerId } from '../../data/finger-map'

type Props = {
  activeKeys: string[]
  activeFingers: FingerId[]
  error?: boolean
}

const ROWS: { key: string; label: string; wide?: string }[][] = [
  [
    { key: '`', label: '`' },
    { key: '1', label: '1' },
    { key: '2', label: '2' },
    { key: '3', label: '3' },
    { key: '4', label: '4' },
    { key: '5', label: '5' },
    { key: '6', label: '6' },
    { key: '7', label: '7' },
    { key: '8', label: '8' },
    { key: '9', label: '9' },
    { key: '0', label: '0' },
    { key: '-', label: '-' },
    { key: '=', label: '=' },
  ],
  [
    { key: 'q', label: 'Q' },
    { key: 'w', label: 'W' },
    { key: 'e', label: 'E' },
    { key: 'r', label: 'R' },
    { key: 't', label: 'T' },
    { key: 'y', label: 'Y' },
    { key: 'u', label: 'U' },
    { key: 'i', label: 'I' },
    { key: 'o', label: 'O' },
    { key: 'p', label: 'P' },
    { key: '[', label: '[' },
    { key: ']', label: ']' },
  ],
  [
    { key: 'a', label: 'A' },
    { key: 's', label: 'S' },
    { key: 'd', label: 'D' },
    { key: 'f', label: 'F' },
    { key: 'g', label: 'G' },
    { key: 'h', label: 'H' },
    { key: 'j', label: 'J' },
    { key: 'k', label: 'K' },
    { key: 'l', label: 'L' },
    { key: ';', label: ';' },
    { key: "'", label: "'" },
  ],
  [
    { key: 'ShiftLeft', label: 'Shift', wide: 'w-16' },
    { key: 'z', label: 'Z' },
    { key: 'x', label: 'X' },
    { key: 'c', label: 'C' },
    { key: 'v', label: 'V' },
    { key: 'b', label: 'B' },
    { key: 'n', label: 'N' },
    { key: 'm', label: 'M' },
    { key: ',', label: ',' },
    { key: '.', label: '.' },
    { key: '/', label: '/' },
    { key: 'ShiftRight', label: 'Shift', wide: 'w-16' },
  ],
  [{ key: ' ', label: 'Spasi', wide: 'w-64' }],
]

function keyStyle(
  key: string,
  activeKeys: string[],
  error?: boolean,
): CSSProperties {
  const active = activeKeys.includes(key)
  if (!active) {
    return {
      background:
        'linear-gradient(180deg, rgba(17,31,54,0.95), rgba(8,15,28,0.95))',
      borderColor: 'rgba(34,211,238,0.12)',
      color: '#94a3b8',
      boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.35)',
    }
  }
  if (error) {
    return {
      background: 'linear-gradient(180deg, #be123c, #9f1239)',
      borderColor: '#fb7185',
      color: '#fff1f2',
      boxShadow: '0 0 16px rgba(244,63,94,0.55)',
    }
  }
  return {
    background: 'linear-gradient(180deg, #22d3ee, #0891b2)',
    borderColor: '#67e8f9',
    color: '#031018',
    boxShadow: '0 0 18px rgba(34,211,238,0.55)',
    fontWeight: 700,
  }
}

export function VirtualKeyboard({ activeKeys, activeFingers, error }: Props) {
  return (
    <div className="select-none">
      <div className="mb-3 flex flex-wrap justify-center gap-1.5">
        {activeFingers.map((f) => (
          <span
            key={f}
            className="kf-mono rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-[#031018]"
            style={{
              backgroundColor: FINGER_COLORS[f],
              boxShadow: `0 0 12px ${FINGER_COLORS[f]}88`,
            }}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="kf-card p-3 sm:p-4">
        <div className="flex flex-col items-center gap-1.5">
          {ROWS.map((row, i) => (
            <div key={i} className="flex flex-wrap justify-center gap-1">
              {row.map((k) => (
                <div
                  key={k.key + k.label}
                  className={`flex h-10 min-w-9 items-center justify-center rounded-md border text-xs font-semibold transition-shadow duration-150 ${k.wide ?? 'w-9'}`}
                  style={keyStyle(k.key, activeKeys, error)}
                >
                  {k.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
