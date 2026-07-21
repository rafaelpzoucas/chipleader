export function playBlindAlertSound() {
  try {
    const ctx = new AudioContext()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(440, now)
    osc.frequency.setValueAtTime(880, now + 0.15)
    osc.frequency.setValueAtTime(440, now + 0.3)
    osc.frequency.setValueAtTime(880, now + 0.45)

    gain.gain.setValueAtTime(0.4, now)
    gain.gain.setValueAtTime(0.4, now + 0.55)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.7)
  } catch {
    // Audio not available
  }
}
