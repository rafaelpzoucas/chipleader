import type { Scenario, Card, CardRank, CardSuit } from '@/models/learning'

const RANKS: CardRank[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const SUITS: CardSuit[] = ['s', 'h', 'd', 'c']
const SUIT_NAMES: Record<CardSuit, string> = { s: 'E', h: 'C', d: 'O', c: 'P' }

const POSITIONS = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB']
const FLOP_POSITIONS = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB']

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

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

function pickCards(count: number, exclude: string[] = []): Card[] {
  const pool: Card[] = []
  for (const rank of RANKS) {
    for (const suit of SUITS) {
      const key = `${rank}${suit}`
      if (!exclude.includes(key)) pool.push({ rank, suit })
    }
  }
  return shuffle(pool).slice(0, count)
}

function cardKey(c: Card): string { return `${c.rank}${c.suit}` }

const CARD_DISPLAY: Record<string, string> = {
  A: 'A', K: 'K', Q: 'Q', J: 'J', T: '10',
  '9': '9', '8': '8', '7': '7', '6': '6',
  '5': '5', '4': '4', '3': '3', '2': '2',
}

function cardStr(c: Card): string { return `${CARD_DISPLAY[c.rank] ?? c.rank}${SUIT_NAMES[c.suit]}` }

function heroHandStr(cards: [Card, Card]): string {
  return `${cardStr(cards[0])} ${cardStr(cards[1])}`
}

function boardStr(cards: Card[]): string {
  return cards.map(cardStr).join(' ')
}

function isSuited(cards: [Card, Card]): boolean {
  return cards[0].suit === cards[1].suit
}

function isPair(cards: [Card, Card]): boolean {
  return cards[0].rank === cards[1].rank
}

/* ── template: flush draw ── */
function genFlushDraw(): Scenario {
  const heroSuit = rand(SUITS)
  const heroRank1: CardRank = rand(['A', 'K', 'Q', 'J', 'T'])
  let heroRank2: CardRank = rand(RANKS.filter(r => r !== heroRank1))
  if (['A', 'K'].includes(heroRank1)) {
    heroRank2 = rand(RANKS.filter(r => r !== heroRank1))
  }
  const heroCards: [Card, Card] = [{ rank: heroRank1, suit: heroSuit }, { rank: heroRank2, suit: heroSuit }]
  const used = [cardKey(heroCards[0]), cardKey(heroCards[1])]

  const boardRank1 = rand(RANKS.filter(r => r !== heroRank1 && r !== heroRank2))
  const boardRank2 = rand(RANKS.filter(r => r !== boardRank1 && r !== heroRank1 && r !== heroRank2))
  const boardRank3 = rand(RANKS.filter(r => r !== boardRank1 && r !== boardRank2 && r !== heroRank1 && r !== heroRank2))
  const offSuit = rand(SUITS.filter(s => s !== heroSuit))

  const board: Card[] = [
    { rank: boardRank1, suit: heroSuit },
    { rank: boardRank2, suit: heroSuit },
    { rank: boardRank3, suit: offSuit },
  ]

  const heroPos = rand(['BTN', 'CO', 'MP'])
  const vilPos = rand(['UTG', 'MP', 'CO', 'BB'])
  const potSize = randInt(80, 300)
  const betSize = potSize * (rand([0.33, 0.5, 0.66]) as number)
  const totalAfterCall = Math.round(potSize + betSize + betSize)
  const potOdds = Math.round((betSize / totalAfterCall) * 100)

  const heroLabel = heroHandStr(heroCards)
  const boardLabel = boardStr(board)
  const outs = 9
  const equity = 36

  const isProfitable = equity > potOdds

  const correctIdx = isProfitable ? 1 : 0

  return {
    heroCards,
    board,
    heroPosition: heroPos,
    villainAction: `${vilPos} aposta ${Math.round(betSize)} no pote de ${potSize}`,
    potSize: Math.round(totalAfterCall),
    question: `${heroLabel} no board ${boardLabel}. Você está no ${heroPos}. ${vilPos} apostou. Sua ação?`,
    options: ['Fold', 'Call', 'Raise', 'All-in'],
    correctIndex: correctIdx,
    explanation: isProfitable
      ? `✅ Call lucrativo! Você tem 9 outs para o flush = ~${equity}% de equidade. Pot odds de ~${potOdds}%. ${equity}% > ${potOdds}%, então o call é positivo no longo prazo.`
      : `❌ Fold! A aposta é muito alta. Pot odds de ~${potOdds}%, e seu flush draw tem ~${equity}%. ${equity}% < ${potOdds}%, call daria prejuízo.`,
    alternativeAnalysis: isProfitable
      ? `Raise também é possível se você quiser semibluffar, especialmente em posição. Você tem fold equity + draw forte.`
      : `Call só se justifica se as implied odds forem muito boas (stack profundo, vilão paga muito no river). Em geral, fold é a jogada correta.`,
  }
}

/* ── template: top pair decision ── */
function genTopPair(): Scenario {
  const heroRank: CardRank = rand(['A', 'K', 'Q', 'J', 'T', '9'])
  const kicker: CardRank = rand(['K', 'Q', 'J', 'T', '9', '8', '7'].filter(r => r !== heroRank) as CardRank[])
  const heroSuit1 = rand(SUITS)
  let heroSuit2 = rand(SUITS.filter(s => s !== heroSuit1))
  const heroCards: [Card, Card] = [{ rank: heroRank, suit: heroSuit1 }, { rank: kicker, suit: heroSuit2 }]

  const used = [cardKey(heroCards[0]), cardKey(heroCards[1])]
  const boardRank1: CardRank = rand(RANKS.filter(r => r !== heroRank && r !== kicker))
  const boardRank2: CardRank = rand(RANKS.filter(r => r !== boardRank1 && r !== heroRank && r !== kicker))
  const boardRank3: CardRank = rand(RANKS.filter(r => r !== boardRank1 && r !== boardRank2 && r !== heroRank && r !== kicker))
  const suits = shuffle(SUITS.filter(s => s !== heroSuit1 && s !== heroSuit2))

  const board: Card[] = [
    { rank: heroRank, suit: suits[0] },
    { rank: boardRank1, suit: suits[1] },
    { rank: boardRank2, suit: suits[2] || rand(SUITS) },
  ]

  const heroPos = rand(['BTN', 'CO', 'BB'])
  const vilPos = rand(['UTG', 'MP', 'CO'])
  const potSize = randInt(100, 400)
  const betSize = Math.round(potSize * rand([0.4, 0.6, 0.75])!)

  const heroLabel = heroHandStr(heroCards)
  const boardLabel = boardStr(board)

  const isStrongKicker = ['A', 'K', 'Q'].includes(heroRank) && ['A', 'K', 'Q'].includes(kicker)

  const correctIdx = isStrongKicker ? 2 : 1

  return {
    heroCards,
    board,
    heroPosition: heroPos,
    villainAction: `${vilPos} aposta ${Math.round(betSize)} no flop (pote ${potSize})`,
    potSize: Math.round(potSize + betSize * 2),
    question: `Board: ${boardLabel}. Você tem ${heroLabel} no ${heroPos} e acertou top pair. ${vilPos} apostou. Sua ação?`,
    options: ['Fold', 'Call', 'Raise'],
    correctIndex: correctIdx,
    explanation: isStrongKicker
      ? `Raise! Voce tem top pair com bom kicker (${CARD_DISPLAY[heroRank]}${CARD_DISPLAY[kicker]}). Esta na frente de A-x pior, draws e blefes. Raise para extrair valor e proteger contra draws.`
      : `Call e a jogada correta. Voce tem top pair mas o kicker (${CARD_DISPLAY[kicker]}) e medio. Raise so isola contra maos melhores. Call mantem o pote controlado.`,
    alternativeAnalysis: isStrongKicker
      ? `Fold seria muito passivo - você está na frente do range do vilão na maioria das vezes. Call também é ok se você quiser slowplay, mas raise maximiza o valor.`
      : `Raise arriscado: se o vilão tem A-melhor kicker, você perde muito. Fold é cedo demais - você pode estar na frente contra draws e blefes.`,
  }
}

/* ── template: open-ended straight draw ── */
function genOESD(): Scenario {
  const middle: CardRank = rand(['9', '8', '7', '6', '5', '4'])
  const highRank: CardRank = String.fromCharCode(middle.charCodeAt(0) + 2) as CardRank
  const lowRank: CardRank = String.fromCharCode(middle.charCodeAt(0) - 1) as CardRank

  const heroCards: [Card, Card] = [
    { rank: middle, suit: rand(SUITS) },
    { rank: String.fromCharCode(middle.charCodeAt(0) + 1) as CardRank, suit: rand(SUITS) },
  ]

  const used = [cardKey(heroCards[0]), cardKey(heroCards[1])]

  const board: Card[] = [
    { rank: lowRank, suit: rand(SUITS.filter(s => s !== heroCards[0].suit && s !== heroCards[1].suit)) },
    { rank: middle, suit: rand(SUITS.filter(s => s !== heroCards[0].suit && s !== heroCards[1].suit)) },
    { rank: highRank, suit: rand(SUITS) },
  ]

  const heroPos = rand(['BTN', 'CO', 'BB', 'MP'])
  const vilPos = rand(['UTG', 'MP', 'CO', 'BTN'].filter(p => p !== heroPos))
  const potSize = randInt(60, 200)
  const betSize = Math.round(potSize * rand([0.5, 0.66, 0.75])!)
  const totalAfter = potSize + betSize + betSize
  const potOdds = Math.round((betSize / totalAfter) * 100)
  const equity = 32

  const heroLabel = heroHandStr(heroCards)
  const boardLabel = boardStr(board)

  const isProfitable = equity > potOdds

  return {
    heroCards,
    board,
    heroPosition: heroPos,
    villainAction: `${vilPos} aposta ${Math.round(betSize)} (pote ${potSize})`,
    potSize: Math.round(totalAfter),
    question: `Board: ${boardLabel} (abertura de straight). Você tem ${heroLabel} no ${heroPos}. ${vilPos} apostou. ${isProfitable ? `Pot odds ~${potOdds}%.` : `Pot odds ~${potOdds}% — alta.`} Sua ação?`,
    options: ['Fold', 'Call', 'Raise'],
    correctIndex: isProfitable ? 1 : 0,
    explanation: isProfitable
      ? `✅ Call! Você tem 8 outs para o straight = ~${equity}% de equidade (regra do 4). Pot odds de ~${potOdds}%. ${equity}% > ${potOdds}% → call lucrativo.`
      : `❌ Fold. Pot odds (~${potOdds}%) são maiores que sua equidade (~${equity}%). O call não é lucrativo no longo prazo.`,
    alternativeAnalysis: isProfitable
      ? `Raise também é uma opção viável como semibluff, especialmente se você tiver fold equity contra o range do vilão.`
      : `Call seria pagar caro demais para um draw. Espere pot odds melhores. Se o stack for muito fundo, implied odds podem justificar.`,
  }
}

/* ── template: overpair ── */
function genOverpair(): Scenario {
  const pairRank: CardRank = rand(['K', 'Q', 'J', 'T', '9', '8'])
  const heroCards: [Card, Card] = [
    { rank: pairRank, suit: rand(SUITS) },
    { rank: pairRank, suit: rand(SUITS) },
  ]
  if (heroCards[0].suit === heroCards[1].suit) {
    heroCards[1].suit = rand(SUITS.filter(s => s !== heroCards[0].suit))
  }

  const used = [cardKey(heroCards[0]), cardKey(heroCards[1])]

  const boardRanks = shuffle(RANKS.filter(r => r !== pairRank))
  const board: Card[] = [
    { rank: boardRanks[0], suit: rand(SUITS) },
    { rank: boardRanks[1], suit: rand(SUITS) },
    { rank: boardRanks[2], suit: rand(SUITS) },
  ]

  const heroPos = rand(['UTG', 'MP', 'CO'])
  const vilPos = rand(['BB', 'SB', 'BTN'])
  const potSize = randInt(200, 600)

  const heroLabel = heroHandStr(heroCards)
  const boardLabel = boardStr(board)

  const correctIdx = 2

  return {
    heroCards,
    board,
    heroPosition: heroPos,
    villainAction: `${vilPos} aposta ${Math.round(potSize * 0.4)} no flop (pote ${potSize})`,
    potSize: Math.round(potSize + potSize * 0.4 * 2),
    question: `Pré-flop: você deu raise com ${heroLabel}. ${vilPos} pagou. Flop: ${boardLabel}. ${vilPos} aposta. Você tem overpair no ${heroPos}. Sua ação?`,
    options: ['Fold', 'Call', 'Raise'],
    correctIndex: correctIdx,
    explanation: `✅ Raise! Você tem overpair (par maior que qualquer carta no board). Está na frente de top pair, draws e blefes. Raise para construir o pote e proteger sua mão. Se o vilão tiver um set, é cooler — mas a longo prazo, overpair é lucrativa.`,
    alternativeAnalysis: `Call é passivo demais — você deixa o vilão ver o turn de graça. Fold seria um erro gigante: overpair é uma mão muito forte no flop na maioria dos boards.`,
  }
}

/* ── template: gutshot + overcards ── */
function genGutshot(): Scenario {
  // Hero has AK or AQ on a board that gives a gutshot
  const heroRank1 = 'A' as CardRank
  const heroRank2 = rand(['K', 'Q'] as CardRank[])
  const heroCards: [Card, Card] = [
    { rank: heroRank1, suit: rand(SUITS) },
    { rank: heroRank2, suit: rand(SUITS) },
  ]

  // Board gives a gutshot for the broadway
  const boardHigh = rand(['K', 'Q', 'J', 'T'] as CardRank[])
  const boardMid = String.fromCharCode(boardHigh.charCodeAt(0) - 1) as CardRank
  const boardLow = String.fromCharCode(boardHigh.charCodeAt(0) - 2) as CardRank

  const board: Card[] = [
    { rank: boardHigh, suit: rand(SUITS) },
    { rank: boardMid, suit: rand(SUITS) },
    { rank: boardLow, suit: rand(SUITS) },
  ]

  const heroPos = rand(['BTN', 'CO', 'MP'])
  const vilPos = rand(['UTG', 'BB', 'SB'])
  const potSize = randInt(150, 350)
  const betSize = Math.round(potSize * rand([0.5, 0.6, 0.75])!)
  const totalAfter = potSize + betSize + betSize
  const potOdds = Math.round((betSize / totalAfter) * 100)
  const equity = 16 // 4 outs for gutshot + maybe 6 for overcards

  const heroLabel = heroHandStr(heroCards)
  const boardLabel = boardStr(board)

  const correctIdx = 0 // fold

  return {
    heroCards,
    board,
    heroPosition: heroPos,
    villainAction: `${vilPos} aposta ${Math.round(betSize)} (pote ${potSize})`,
    potSize: Math.round(totalAfter),
    question: `Board: ${boardLabel}. Você tem ${heroLabel}. Posição: ${heroPos}. ${vilPos} apostou. Você tem um gutshot (4 outs) + overcards (mais 6 outs). Pot odds ~${potOdds}%. Sua ação?`,
    options: ['Fold', 'Call', 'Raise'],
    correctIndex: correctIdx,
    explanation: `❌ Fold é melhor. Você tem ~${equity}% de equidade (gutshot 4 outs + overcards podem não ser outs limpos). Pot odds de ~${potOdds}%. ${16 > potOdds ? 'A conta até fecha, mas' : 'A conta não fecha e'} as overcards não são outs limpos — se você acertar um A ou K, pode ainda perder para dois pares ou trinca.`,
    alternativeAnalysis: `Call só se justifica com implied odds muito boas (stack profundo + vilão que paga muito). Raise como semibluff é arriscado porque o board já conecta com o range do vilão.`,
  }
}

/* ── choose template ── */
export function generateScenario(): Scenario {
  const templates = [genFlushDraw, genTopPair, genOESD, genOverpair, genGutshot]
  const gen = rand(templates)
  return gen()
}
