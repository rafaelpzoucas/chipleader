import type { Exercise, SkillTag } from '../types'

const SKILL_TAG: SkillTag = 'bluff_range'

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

type BluffQ = { prompt: string; options: string[]; correctAnswer: number; explanation: string; data: Record<string, unknown> }

const BLUFF_SCENARIOS = [
  { board: 'A♠ K♠ 7♥', desc: 'A-K-7 rainbow', texture: 'seco', bluffFriendly: false },
  { board: '9♠ 8♠ 6♥', desc: '9-8-6 com draws', texture: 'molhado', bluffFriendly: true },
  { board: 'J♦ T♠ 3♣', desc: 'J-T-3 rainbow', texture: 'médio', bluffFriendly: true },
  { board: '2♣ 4♥ 9♠', desc: '2-4-9 seco', texture: 'seco', bluffFriendly: false },
  { board: 'Q♠ J♠ T♥', desc: 'Q-J-T com draws', texture: 'molhado', bluffFriendly: true },
  { board: 'K♣ 8♦ 2♠', desc: 'K-8-2 seco', texture: 'seco', bluffFriendly: false },
  { board: '6♥ 7♥ 8♣', desc: '6-7-8 straight draw', texture: 'molhado', bluffFriendly: true },
  { board: 'A♦ Q♣ 3♥', desc: 'A-Q-3 rainbow', texture: 'seco', bluffFriendly: false },
]

// Type 0: Bluff frequency
function genBluffFrequency(): BluffQ {
  const valueCombos = [8, 12, 16, 20][Math.floor(Math.random() * 4)]
  const ratios = [
    { label: '1:1 (um bluff para cada value)', bluff: valueCombos, pct: 50 },
    { label: '2:1 (dois values para cada bluff)', bluff: Math.round(valueCombos / 2), pct: 33 },
    { label: '1:2 (um value para dois bluffs)', bluff: valueCombos * 2, pct: 67 },
  ]
  const r = ratios[Math.floor(Math.random() * ratios.length)]
  const correct = `${r.pct}%`
  const dist = shuffle(ratios.filter(x => x.pct !== r.pct)).map(x => `${x.pct}%`).slice(0, 3)
  const opts = shuffle([correct, ...dist])

  return {
    prompt: `Você tem ${valueCombos} combos de value bet e quer ${r.label}. Qual % das suas apostas deve ser bluff?`,
    options: opts,
    correctAnswer: opts.indexOf(correct),
    explanation: `${r.label} = ${r.bluff} bluffs / ${valueCombos + r.bluff} total = ${r.pct}% de bluffs.`,
    data: { valueCombos, bluffCombos: r.bluff, pct: r.pct },
  }
}

// Type 1: Should you bluff?
function genBluffDecision(): BluffQ {
  const s = BLUFF_SCENARIOS[Math.floor(Math.random() * BLUFF_SCENARIOS.length)]
  const opts = shuffle(['Blefar', 'Não blefar', 'Depende'])
  const correctIdx = s.bluffFriendly ? opts.indexOf('Blefar') : opts.indexOf('Não blefar')
  const answer = correctIdx === -1 ? 0 : correctIdx

  return {
    prompt: `Board: ${s.board} (${s.desc}). Você deu raise pré-flop, oponente deu call. Deve C-Bet de bluff?`,
    options: opts,
    correctAnswer: answer,
    explanation: s.bluffFriendly
      ? `Board ${s.texture}: muitas mãos do oponente erraram. C-Bet de bluff funciona bem.`
      : `Board ${s.texture}: oponente acerta esse board com frequência. Prefira check.`,
    data: { board: s.board, texture: s.texture, bluffFriendly: s.bluffFriendly },
  }
}

// Type 2: C-Bet decision
function genCBetDecision(): BluffQ {
  const s = BLUFF_SCENARIOS[Math.floor(Math.random() * BLUFF_SCENARIOS.length)]
  const positions = ['UTG vs BTN', 'BTN vs BB', 'CO vs SB', 'HJ vs CO']
  const pos = positions[Math.floor(Math.random() * positions.length)]
  const opts = shuffle(['Fazer C-Bet', 'Check', 'Fold'])
  const correctIdx = s.bluffFriendly ? opts.indexOf('Fazer C-Bet') : opts.indexOf('Check')
  const answer = correctIdx === -1 ? 0 : correctIdx

  return {
    prompt: `Você abriu do ${pos}, oponente deu call. Flop: ${s.board}. Sua mão não acertou. Qual ação?`,
    options: opts,
    correctAnswer: answer,
    explanation: s.bluffFriendly
      ? `Board ${s.texture}: C-Bet é lucrativo. Você pode representar força e fazer o oponente foldar.`
      : `Board ${s.texture}: não favorece C-Bet. Check é melhor para evitar desperdício.`,
    data: { board: s.board, position: pos, texture: s.texture, bluffFriendly: s.bluffFriendly },
  }
}

export function generate(): Exercise {
  counter++
  const types = [0, 1, 2]
  const available = lastType === -1 ? types : types.filter(t => t !== lastType)
  const type = available[Math.floor(Math.random() * available.length)]
  lastType = type

  const q = type === 0 ? genBluffFrequency() : type === 1 ? genBluffDecision() : genCBetDecision()

  return {
    id: `bluff-range-${counter}-${Date.now()}`,
    type: 'multiple_choice',
    skillTag: SKILL_TAG,
    prompt: q.prompt,
    data: q.data,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }
}
