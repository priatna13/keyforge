let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return null
    ctx = new Ctx()
  }
  return ctx
}

function beep(freq: number, durationMs: number, type: OscillatorType = 'sine') {
  const audio = getCtx()
  if (!audio) return
  void audio.resume()
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.value = 0.04
  osc.connect(gain)
  gain.connect(audio.destination)
  const now = audio.currentTime
  osc.start(now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000)
  osc.stop(now + durationMs / 1000)
}

export function playKeyOk(enabled: boolean) {
  if (!enabled) return
  beep(660, 40, 'sine')
}

export function playKeyError(enabled: boolean) {
  if (!enabled) return
  beep(180, 90, 'square')
}
