import type { Exercise, SkillTag } from '../types'
import { GLOSSARY } from '../glossary'

const SKILL_TAG: SkillTag = 'terminology'

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

let counter = 0
let lastTermIndex = -1

export function generate(): Exercise {
  counter++
  const available = GLOSSARY.map((_, i) => i).filter(i => i !== lastTermIndex)
  const targetIdx = available[Math.floor(Math.random() * available.length)]
  lastTermIndex = targetIdx
  const target = GLOSSARY[targetIdx]
  const distractors = shuffle(GLOSSARY.filter((_, i) => i !== targetIdx)).slice(0, 3)

  // Ask for definition of a term
  const defs = shuffle([
    target.definition,
    ...distractors.map(d => d.definition),
  ])

  const correctAnswer = defs.indexOf(target.definition)

  return {
    id: `terminology-${counter}-${Date.now()}`,
    type: 'multiple_choice',
    skillTag: SKILL_TAG,
    prompt: `O que significa "${target.term}" no pôquer?`,
    data: {
      term: target.term,
    },
    options: defs,
    correctAnswer,
    explanation: `"${target.term}" significa: ${target.definition}.`,
  }
}
