import type { Exercise, SkillTag } from '../types'

const SKILL_TAG: SkillTag = 'position'

const POSITIONS = [
  { id: 'UTG', name: 'Under the Gun', order: 1, description: 'age primeiro no pré-flop' },
  { id: 'HJ', name: 'Hijack', order: 2, description: 'segunda posição' },
  { id: 'CO', name: 'Cut-Off', order: 3, description: 'uma antes do botão' },
  { id: 'BTN', name: 'Button', order: 4, description: 'melhor posição (age por último no pré-flop)' },
  { id: 'SB', name: 'Small Blind', order: 5, description: 'aposta pequena obrigatória' },
  { id: 'BB', name: 'Big Blind', order: 6, description: 'aposta grande obrigatória, age por último no pré-flop' },
]

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let counter = 0
let lastType = -1

type PositionQuestion = {
  prompt: string
  options: string[]
  correctAnswer: number
  explanation: string
  data: Record<string, unknown>
}

function generateIdentifyQuestion(): PositionQuestion {
  const idx = randInt(0, POSITIONS.length - 1)
  const pos = POSITIONS[idx]
  const seat = idx + 1

  const distractors = shuffle(POSITIONS.filter(p => p.id !== pos.id)).slice(0, 3)
  const allOptions = shuffle([pos, ...distractors])

  const correctIdx = allOptions.findIndex(o => o.id === pos.id)

  return {
    prompt: `Em uma mesa 6-max (6 jogadores), qual posição está no assento ${seat}?`,
    options: allOptions.map(o => `${o.id} — ${o.name}`),
    correctAnswer: correctIdx,
    explanation: `Assento ${seat} = ${pos.id} (${pos.name}). ${pos.description}.`,
    data: { seatIndex: idx, positions: POSITIONS.map(p => p.id) },
  }
}

function generateOrderQuestion(): PositionQuestion {
  const idx = randInt(0, POSITIONS.length - 2)
  const pos = POSITIONS[idx]
  const nextPos = POSITIONS[idx + 1]

  return {
    prompt: `Em uma mesa 6-max, depois de ${pos.id} agir no pré-flop, quem age em seguida?`,
    options: [nextPos.id, ...shuffle(POSITIONS.filter(p => p.id !== nextPos.id)).slice(0, 3).map(p => p.id)],
    correctAnswer: 0,
    explanation: `No pré-flop, a ordem de ação é: ${POSITIONS.map(p => p.id).join(' → ')}. Após ${pos.id} agir, o próximo é ${nextPos.id}.`,
    data: { positions: POSITIONS.map(p => p.id) },
  }
}

function generateAdvantageQuestion(): PositionQuestion {
  const shuffled = shuffle(POSITIONS)
  const best = POSITIONS[3] // BTN
  const worst = POSITIONS[0] // UTG

  const type = randInt(0, 1)

  if (type === 0) {
    const distractors = shuffle(POSITIONS.filter(p => p.id !== best.id)).slice(0, 3).map(p => p.id)
    return {
      prompt: "Qual é a melhor posição em uma mesa de poker?",
      options: [best.id, ...distractors],
      correctAnswer: 0,
      explanation: `O Button (BTN) é a melhor posição porque age por último em todas as rodadas pós-flop, tendo mais informação sobre as ações dos oponentes.`,
      data: { positions: POSITIONS.map(p => p.id) },
    }
  } else {
    const distractors = shuffle(POSITIONS.filter(p => p.id !== worst.id)).slice(0, 3).map(p => p.id)
    return {
      prompt: "Qual é a pior posição em uma mesa de poker (pré-flop)?",
      options: [worst.id, ...distractors],
      correctAnswer: 0,
      explanation: `UTG (Under the Gun) é a pior posição no pré-flop porque age primeiro, sem informação sobre os outros jogadores.`,
      data: { positions: POSITIONS.map(p => p.id) },
    }
  }
}

export function generate(): Exercise {
  counter++
  const available = [0, 1, 2].filter(t => t !== lastType)
  const type = available[randInt(0, available.length - 1)]
  lastType = type
  const q: PositionQuestion = type === 0
    ? generateIdentifyQuestion()
    : type === 1
      ? generateOrderQuestion()
      : generateAdvantageQuestion()

  return {
    id: `position-${counter}-${Date.now()}`,
    type: 'multiple_choice',
    skillTag: SKILL_TAG,
    prompt: q.prompt,
    data: q.data,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }
}
