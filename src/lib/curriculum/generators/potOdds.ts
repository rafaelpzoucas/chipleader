import type { Exercise, SkillTag } from '../types'

const SKILL_TAG: SkillTag = 'pot_odds'

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

let counter = 0
let lastType = -1

type PotOddsQ = { prompt: string; options: string[]; correctAnswer: number; explanation: string; data: Record<string, unknown> }

// Only these 4 patterns — each with round numbers
const PATTERNS = [
  // bet=1/2 pot → pot odds = call/(pot+2*call) = 0.5/(1+1) = 25%
  { fraction: '1/2', desc: 'metade do pote', pct: 25, exPot: 20, exBet: 10 },
  // bet=1/3 pot → pot odds = 0.333/(1+0.667) = 20%
  { fraction: '1/3', desc: 'um terço do pote', pct: 20, exPot: 30, exBet: 10 },
  // bet=2/3 pot → pot odds = 0.667/(1+1.333) = 29%
  { fraction: '2/3', desc: 'dois terços do pote', pct: 29, exPot: 30, exBet: 20 },
  // bet=1/1 pot → pot odds = 1/(1+2) = 33%
  { fraction: 'pote cheio', desc: 'o valor do pote', pct: 33, exPot: 20, exBet: 20 },
]

// Type 0: given pot+bet, ask pot odds %
function genCalc(): PotOddsQ {
  const p = PATTERNS[Math.floor(Math.random() * PATTERNS.length)]
  const potSize = p.exPot
  const betSize = p.exBet
  const total = potSize + betSize + betSize

  const correct = `${p.pct}%`
  // distractors = other pattern % values shuffled
  const dist = shuffle(PATTERNS.filter(x => x.fraction !== p.fraction)).map(x => `${x.pct}%`).slice(0, 3)
  const opts = shuffle([correct, ...dist])

  return {
    prompt: `Pote: R$ ${potSize}. Vilão aposta R$ ${betSize} (${p.desc}). Qual o pot odds?`,
    options: opts,
    correctAnswer: opts.indexOf(correct),
    explanation: `Pot odds = call ÷ (pote + call + call) = ${betSize} ÷ (${potSize} + ${betSize} + ${betSize}) = ${betSize} ÷ ${total} ≈ ${p.pct}%.`,
    data: { potSize, betSize, total, potOdds: p.pct },
  }
}

// Type 1: given fraction, ask pot odds % (memorization)
function genPattern(): PotOddsQ {
  const p = PATTERNS[Math.floor(Math.random() * PATTERNS.length)]
  const correct = `${p.pct}%`
  const dist = shuffle(PATTERNS.filter(x => x.fraction !== p.fraction)).map(x => `${x.pct}%`).slice(0, 3)
  const opts = shuffle([correct, ...dist])

  return {
    prompt: `Se a aposta é ${p.fraction} do pote (${p.desc}), qual o pot odds aproximado?`,
    options: opts,
    correctAnswer: opts.indexOf(correct),
    explanation: `Aposta de ${p.fraction} do pote ≈ ${p.pct}% de pot odds. Decore: 1/3→20%, 1/2→25%, 2/3→~30%, pote cheio→33%.`,
    data: { fraction: p.fraction, pct: p.pct },
  }
}

export function generate(): Exercise {
  counter++
  const types = [0, 1]
  const available = lastType === -1 ? types : types.filter(t => t !== lastType)
  const type = available[Math.floor(Math.random() * available.length)]
  lastType = type

  const q = type === 0 ? genCalc() : genPattern()

  return {
    id: `pot-odds-${counter}-${Date.now()}`,
    type: 'multiple_choice',
    skillTag: SKILL_TAG,
    prompt: q.prompt,
    data: q.data,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }
}
