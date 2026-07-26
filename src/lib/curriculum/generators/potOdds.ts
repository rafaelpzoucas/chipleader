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

export function generate(): Exercise {
  counter++
  const potSize = randInt(50, 500)
  const betPercent = [0.25, 0.33, 0.5, 0.66, 0.75, 1][randInt(0, 5)]
  const betSize = Math.round(potSize * betPercent)
  const totalAfterCall = potSize + betSize + betSize
  const potOdds = Math.round((betSize / totalAfterCall) * 100)

  // Generate close distractor options
  const correctStr = `${potOdds}%`
  const offsets = [-5, -3, -1, 1, 3, 5, 8]
  const distractorValues = shuffle(offsets)
    .map(o => potOdds + o)
    .filter(v => v > 0 && v < 100 && v !== potOdds)
    .slice(0, 3)
    .map(v => `${v}%`)

  const options = shuffle([correctStr, ...distractorValues])
  const correctAnswer = options.indexOf(correctStr)

  const equityNeeded = potOdds

  return {
    id: `pot-odds-${counter}-${Date.now()}`,
    type: 'multiple_choice',
    skillTag: SKILL_TAG,
    prompt: `Pote: R$ ${potSize}. Vilão aposta R$ ${betSize}. Quanto é o call, qual é o pot odds?`,
    data: {
      potSize,
      betSize,
      totalAfterCall,
      potOdds,
    },
    options,
    correctAnswer,
    explanation: `Pot odds = valor do call / (pote + call) = ${betSize} / (${potSize} + ${betSize} + ${betSize}) = ${betSize}/${totalAfterCall} = ${potOdds}%. Você precisa de pelo menos ${potOdds}% de equidade para um call lucrativo.`,
  }
}
