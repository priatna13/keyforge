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

function keyStyle(key: string, activeKeys: string[], error?: boolean): CSSProperties {
  const active = activeKeys.includes(key)
  if (!active) {
    return {
      backgroundColor: '#f8fafc',
      borderColor: '#e2e8f0',
      color: '#334155',
    }
  }
  if (error) {
    return {
      backgroundColor: '#fecaca',
      borderColor: '#ef4444',
      color: '#7f1d1d',
      boxShadow: '0 0 0 2px #fca5a5',
    }
  }
  return {
    backgroundColor: '#e0f2fe',
    borderColor: '#0ea5e9',
    color: '#0c4a6e',
    boxShadow: '0 0 0 2px #7dd3fc',
  }
}

export function VirtualKeyboard({ activeKeys, activeFingers, error }: Props) {
  return (
    <div className="select-none">
      <div className="mb-2 flex flex-wrap justify-center gap-1">
        {activeFingers.map((f) => (
          <span
            key={f}
            className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
            style={{ backgroundColor: FINGER_COLORS[f] }}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1">
        {ROWS.map((row, i) => (
          <div key={i} className="flex flex-wrap justify-center gap-1">
            {row.map((k) => (
              <div
                key={k.key + k.label}
                className={`flex h-9 min-w-8 items-center justify-center rounded-md border text-xs font-semibold ${k.wide ?? 'w-8'}`}
                style={keyStyle(k.key, activeKeys, error)}
              >
                {k.label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
