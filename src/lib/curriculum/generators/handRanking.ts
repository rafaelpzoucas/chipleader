import { Hand } from 'pokersolver'
import type { Exercise, CardDisplay, SkillTag } from '../types'

const RANKS = ['A','K','Q','J','T','9','8','7','6','5','4','3','2']
const SUITS: CardDisplay['suit'][] = ['s','h','d','c']
const SKILL_TAG: SkillTag = 'hand_ranking'

function createDeck(): string[] {
  const deck: string[] = []
  for (const rank of RANKS) {
    for (const suit of SUITS) {
      deck.push(`${rank}${suit}`)
    }
  }
  return deck
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function dealHands(): [string[], string[]] {
  const deck = shuffle(createDeck())
  return [deck.slice(0, 5), deck.slice(5, 10)]
}

function toCardDisplay(cardStr: string): CardDisplay {
  return { rank: cardStr[0], suit: cardStr[1] as CardDisplay['suit'] }
}

function handRankName(hand: string[]): string {
  const solved = Hand.solve(hand)
  return solved.name
}

function handDescr(hand: string[]): string {
  const solved = Hand.solve(hand)
  return solved.descr
}

let counter = 0

export function generate(): Exercise {
  counter++
  const [h1, h2] = dealHands()
  const solved1 = Hand.solve(h1)
  const solved2 = Hand.solve(h2)
  const winners = Hand.winners([solved1, solved2])

  const descr1 = solved1.descr
  const descr2 = solved2.descr

  const h1Display = h1.map(toCardDisplay)
  const h2Display = h2.map(toCardDisplay)

  let correctAnswer: number
  let explanation: string
  let options: string[]

  if (winners.length === 2) {
    correctAnswer = 2
    options = ["Mão 1 vence", "Mão 2 vence", "Empate"]
    explanation = `Empate! Ambas as mãos têm a mesma classificação: ${descr1}. Nenhuma das mãos é melhor que a outra.`
  } else if (winners[0] === solved1) {
    correctAnswer = 0
    options = ["Mão 1 vence", "Mão 2 vence", "Empate"]
    explanation = `Mão 1 vence! ${descr1} é mais forte que ${descr2}.`
  } else {
    correctAnswer = 1
    options = ["Mão 1 vence", "Mão 2 vence", "Empate"]
    explanation = `Mão 2 vence! ${descr2} é mais forte que ${descr1}.`
  }

  return {
    id: `hand-ranking-${counter}-${Date.now()}`,
    type: 'multiple_choice',
    skillTag: SKILL_TAG,
    prompt: "Qual mão vence?",
    data: {
      hand1: h1Display,
      hand2: h2Display,
      hand1Desc: descr1,
      hand2Desc: descr2,
    },
    options,
    correctAnswer,
    explanation,
  }
}
