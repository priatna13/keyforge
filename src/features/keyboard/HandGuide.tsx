import { FINGER_COLORS, type FingerId } from '../../data/finger-map'

type Props = {
  activeFingers: FingerId[]
}

const LEFT: FingerId[] = ['L-pinky', 'L-ring', 'L-middle', 'L-index']
const RIGHT: FingerId[] = ['R-index', 'R-middle', 'R-ring', 'R-pinky']

function Finger({
  id,
  active,
  x,
}: {
  id: FingerId
  active: boolean
  x: number
}) {
  const color = FINGER_COLORS[id]
  return (
    <rect
      x={x}
      y={active ? 8 : 18}
      width={14}
      height={active ? 52 : 42}
      rx={6}
      fill={color}
      opacity={active ? 1 : 0.35}
      stroke={active ? '#0f172a' : 'transparent'}
      strokeWidth={active ? 2 : 0}
    />
  )
}

function Palm({ x }: { x: number }) {
  return (
    <rect
      x={x}
      y={55}
      width={72}
      height={36}
      rx={12}
      fill="#1e293b"
      opacity={0.9}
      stroke="rgba(34,211,238,0.25)"
      strokeWidth={1}
    />
  )
}

export function HandGuide({ activeFingers }: Props) {
  const thumbsActive = activeFingers.includes('thumbs')

  return (
    <div className="flex flex-wrap items-end justify-center gap-8">
      <svg viewBox="0 0 100 100" className="h-24 w-28" aria-label="Tangan kiri">
        <Palm x={14} />
        {LEFT.map((id, i) => (
          <Finger
            key={id}
            id={id}
            active={activeFingers.includes(id)}
            x={16 + i * 18}
          />
        ))}
        <ellipse
          cx={78}
          cy={thumbsActive ? 72 : 78}
          rx={10}
          ry={14}
          fill={FINGER_COLORS.thumbs}
          opacity={thumbsActive ? 1 : 0.35}
        />
        <text x={50} y={98} textAnchor="middle" fill="#64748b" fontSize="8">
          Kiri
        </text>
      </svg>

      <svg viewBox="0 0 100 100" className="h-24 w-28" aria-label="Tangan kanan">
        <Palm x={14} />
        {RIGHT.map((id, i) => (
          <Finger
            key={id}
            id={id}
            active={activeFingers.includes(id)}
            x={16 + i * 18}
          />
        ))}
        <ellipse
          cx={22}
          cy={thumbsActive ? 72 : 78}
          rx={10}
          ry={14}
          fill={FINGER_COLORS.thumbs}
          opacity={thumbsActive ? 1 : 0.35}
        />
        <text x={50} y={98} textAnchor="middle" fill="#64748b" fontSize="8">
          Kanan
        </text>
      </svg>
    </div>
  )
}
