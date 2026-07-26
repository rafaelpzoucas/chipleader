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

function toCardDisplay(cardStr: string): CardDisplay {
  return { rank: cardStr[0], suit: cardStr[1] as CardDisplay['suit'] }
}

const RANK_VALUES: Record<string, string> = {
  'A': 'A', 'K': 'K', 'Q': 'Q', 'J': 'J', 'T': '10',
  '9': '9', '8': '8', '7': '7', '6': '6',
  '5': '5', '4': '4', '3': '3', '2': '2',
}

function buildHandDescription(hand: any): string {
  const pool = hand.cardPool.filter((c: any) => c.suit)
  const name = hand.name

  switch (name) {
    case 'HighCard': {
      const top = pool[0]
      return `Carta Alta ${RANK_VALUES[top.value] || top.value}`
    }
    case 'Pair': {
      const pairRank = RANK_VALUES[pool[0].value] || pool[0].value
      const kickers = pool.slice(2, 5).map((c: any) => RANK_VALUES[c.value] || c.value).join(' ')
      return `Par de ${pairRank}s (${kickers})`
    }
    case 'TwoPair': {
      const high = RANK_VALUES[pool[0].value] || pool[0].value
      const low = RANK_VALUES[pool[2].value] || pool[2].value
      const kicker = RANK_VALUES[pool[4].value] || pool[4].value
      return `Dois Pares ${high}s e ${low}s (kicker ${kicker})`
    }
    case 'ThreeOfAKind': {
      const rank = RANK_VALUES[pool[0].value] || pool[0].value
      return `Trinca de ${rank}s`
    }
    case 'Straight': {
      const high = RANK_VALUES[pool[0].value] || pool[0].value
      return `Sequência ${high} high`
    }
    case 'Flush': {
      const high = RANK_VALUES[pool[0].value] || pool[0].value
      return `Flush ${high} high`
    }
    case 'FullHouse': {
      const trio = RANK_VALUES[pool[0].value] || pool[0].value
      const pair = RANK_VALUES[pool[3].value] || pool[3].value
      return `Full House ${trio}s cheio de ${pair}s`
    }
    case 'FourOfAKind': {
      const rank = RANK_VALUES[pool[0].value] || pool[0].value
      return `Quadra de ${rank}s`
    }
    case 'StraightFlush': {
      const high = RANK_VALUES[pool[0].value] || pool[0].value
      return `Straight Flush ${high} high`
    }
    default:
      return hand.descr
  }
}

let counter = 0

export function generate(): Exercise {
  counter++
  const deck = shuffle(createDeck())

  const hero = deck.slice(0, 2)
  const villain = deck.slice(2, 4)
  const board = deck.slice(4, 9)

  const heroAll = [...hero, ...board]
  const villainAll = [...villain, ...board]

  const heroHand = Hand.solve(heroAll)
  const villainHand = Hand.solve(villainAll)

  // Get cards forming each player's best 5-card hand (filter internal helper cards)
  const heroBestRaw = heroHand.cardPool.filter((c: any) => c.suit).map((c: any) => `${c.value}${c.suit}`)
  const villainBestRaw = villainHand.cardPool.filter((c: any) => c.suit).map((c: any) => `${c.value}${c.suit}`)

  // Which hole cards are used in the best hand
  const heroHoleUsed = hero.map(c => heroBestRaw.includes(c))
  const villainHoleUsed = villain.map(c => villainBestRaw.includes(c))

  // Which board cards are used in the best hand
  const heroBoardUsed = board.map(c => heroBestRaw.includes(c))
  const villainBoardUsed = board.map(c => villainBestRaw.includes(c))

  const heroDesc = buildHandDescription(heroHand)
  const villainDesc = buildHandDescription(villainHand)

  const winners = Hand.winners([heroHand, villainHand])

  const heroCards = hero.map(toCardDisplay)
  const villainCards = villain.map(toCardDisplay)
  const boardCards = board.map(toCardDisplay)

  let correctAnswer: number
  let explanation: string

  if (winners.length === 2) {
    correctAnswer = 2
    explanation = `Empate! Ambas as mãos têm a mesma classificação: ${heroDesc}.`
  } else if (winners[0] === heroHand) {
    correctAnswer = 0
    explanation = `Mão do jogador vence! ${heroDesc} é mais forte que ${villainDesc}.`
  } else {
    correctAnswer = 1
    explanation = `Mão do oponente vence! ${villainDesc} é mais forte que ${heroDesc}.`
  }

  return {
    id: `hand-ranking-${counter}-${Date.now()}`,
    type: 'multiple_choice',
    skillTag: SKILL_TAG,
    prompt: "Qual mão vence?",
    data: {
      board: boardCards,
      heroCards,
      villainCards,
      heroDesc,
      villainDesc,
      heroHoleUsed,
      villainHoleUsed,
      heroBoardUsed,
      villainBoardUsed,
      winner: correctAnswer,
    },
    options: ["Mão do jogador vence", "Mão do oponente vence", "Empate"],
    correctAnswer,
    explanation,
  }
}
