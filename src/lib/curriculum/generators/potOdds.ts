import type { Exercise, SkillTag } from '../types'

const SKILL_TAG: SkillTag = 'pot_odds'

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

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

type PotOddsQuestion = {
  prompt: string
  options: string[]
  correctAnswer: number
  explanation: string
  data: Record<string, unknown>
}

// Pot odds % = call / (pote + call + call)
// Padrões comuns pra decorar:
// 1/3 do pote → 20% | 1/2 → 25% | 2/3 → ~30% | pote cheio → 33%
const COMMON_FRACTIONS = [
  { fraction: '1/4', pct: 17, desc: 'um quarto do pote' },
  { fraction: '1/3', pct: 20, desc: 'um terço do pote' },
  { fraction: '1/2', pct: 25, desc: 'metade do pote' },
  { fraction: '2/3', pct: 29, desc: 'dois terços do pote' },
  { fraction: '3/4', pct: 30, desc: 'três quartos do pote' },
  { fraction: '1/1', pct: 33, desc: 'pote inteiro' },
]

// Type 0: given pot + bet, identify the fraction
function genFractionQuestion(): PotOddsQuestion {
  const entry = COMMON_FRACTIONS[randInt(0, COMMON_FRACTIONS.length - 1)]
  const potSize = [60, 90, 120, 150, 180, 200][randInt(0, 5)]
  let betSize: number
  switch (entry.fraction) {
    case '1/4': betSize = potSize / 4; break
    case '1/3': betSize = potSize / 3; break
    case '1/2': betSize = potSize / 2; break
    case '2/3': betSize = Math.round(potSize * 2 / 3); break
    case '3/4': betSize = Math.round(potSize * 3 / 4); break
    default: betSize = potSize; break
  }
  betSize = Math.round(betSize / 5) * 5 || 5

  const distractors = shuffle(COMMON_FRACTIONS.filter(f => f.fraction !== entry.fraction)).slice(0, 3)
  const allOpts = shuffle([entry, ...distractors])

  return {
    prompt: `Pote: R$ ${potSize}. Vilão aposta R$ ${betSize}. A aposta é aproximadamente que fração do pote?`,
    options: allOpts.map(f => `${f.fraction} (${f.desc})`),
    correctAnswer: allOpts.findIndex(f => f.fraction === entry.fraction),
    explanation: `${betSize} de ${potSize} ≈ ${entry.fraction} do pote. Pot odds ≈ ${entry.pct}%. Decore os padrões: 1/3→20%, 1/2→25%, 2/3→~30%, pote cheio→33%.`,
    data: { potSize, betSize, fraction: entry.fraction },
  }
}

// Type 1: given fraction, what are the pot odds %?
function genPatternQuestion(): PotOddsQuestion {
  const entry = COMMON_FRACTIONS[randInt(0, COMMON_FRACTIONS.length - 1)]
  const distractors = shuffle(COMMON_FRACTIONS.filter(f => f.fraction !== entry.fraction)).slice(0, 3)

  const correctStr = `${entry.pct}%`
  const distStrs = distractors.map(f => `${f.pct}%`)
  const allOpts = shuffle([correctStr, ...distStrs])

  return {
    prompt: `Se a aposta é ${entry.fraction} do pote (${entry.desc}), qual é aproximadamente o pot odds?`,
    options: allOpts,
    correctAnswer: allOpts.indexOf(correctStr),
    explanation: `Aposta de ${entry.fraction} do pote ≈ ${entry.pct}% de pot odds. Decore: 1/3→20%, 1/2→25%, 2/3→~30%, pote cheio→33%.`,
    data: { fraction: entry.fraction, pct: entry.pct },
  }
}

// Type 2: calculate exact pot odds
function genCalcQuestion(): PotOddsQuestion {
  const potSize = randInt(50, 500)
  const betPercent = [0.25, 0.33, 0.5, 0.66, 0.75, 1][randInt(0, 5)]
  const betSize = Math.round(potSize * betPercent)
  const totalAfterCall = potSize + betSize + betSize
  const potOdds = Math.round((betSize / totalAfterCall) * 100)

  const correctStr = `${potOdds}%`
  const offsets = [-5, -3, -1, 1, 3, 5, 8]
  const distractorValues = shuffle(offsets)
    .map(o => potOdds + o)
    .filter(v => v > 0 && v < 100 && v !== potOdds)
    .slice(0, 3)
    .map(v => `${v}%`)

  const options = shuffle([correctStr, ...distractorValues])

  return {
    prompt: `Pote: R$ ${potSize}. Vilão aposta R$ ${betSize}. Qual o pot odds?`,
    options,
    correctAnswer: options.indexOf(correctStr),
    explanation: `Pot odds = call / (pote + call + call) = ${betSize} / (${potSize} + ${betSize} + ${betSize}) = ${betSize}/${totalAfterCall} ≈ ${potOdds}%. Precisa de ${potOdds}%+ de equidade para o call ser lucrativo.`,
    data: { potSize, betSize, totalAfterCall, potOdds },
  }
}

// Type 3: given pot odds and equity, decide call/fold
function genDecisionQuestion(): PotOddsQuestion {
  const entry = COMMON_FRACTIONS[randInt(0, COMMON_FRACTIONS.length - 1)]
  const potSize = [60, 90, 120, 150, 180, 200][randInt(0, 5)]
  let betSize = potSize
  switch (entry.fraction) {
    case '1/4': betSize = potSize / 4; break
    case '1/3': betSize = potSize / 3; break
    case '1/2': betSize = potSize / 2; break
    case '2/3': betSize = Math.round(potSize * 2 / 3); break
    case '3/4': betSize = Math.round(potSize * 3 / 4); break
    default: break
  }
  betSize = Math.round(betSize / 5) * 5 || 5

  const shouldCall = Math.random() > 0.5
  const equity = shouldCall
    ? entry.pct + randInt(5, 20) // equity > pot odds
    : Math.max(1, entry.pct - randInt(5, 20)) // equity < pot odds

  return {
    prompt: `Pote: R$ ${potSize}. Vilão aposta R$ ${betSize}. Você estima sua equidade em ${equity}%. Call ou Fold?`,
    options: ['Fold', 'Call'],
    correctAnswer: shouldCall ? 1 : 0,
    explanation: shouldCall
      ? `Call! Pot odds ≈ ${entry.pct}% (aposta de ${entry.fraction} do pote). Sua equidade (${equity}%) > ${entry.pct}% → call lucrativo.`
      : `Fold! Pot odds ≈ ${entry.pct}% (aposta de ${entry.fraction} do pote). Sua equidade (${equity}%) < ${entry.pct}% → pagar caro demais.`,
    data: { potSize, betSize, equity, potOdds: entry.pct, shouldCall },
  }
}

export function generate(): Exercise {
  counter++
  const available = [0, 1, 2, 3].filter(t => t !== lastType)
  const type = available[randInt(0, available.length - 1)]
  lastType = type

  const q: PotOddsQuestion = type === 0
    ? genFractionQuestion()
    : type === 1
      ? genPatternQuestion()
      : type === 2
        ? genCalcQuestion()
        : genDecisionQuestion()

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
