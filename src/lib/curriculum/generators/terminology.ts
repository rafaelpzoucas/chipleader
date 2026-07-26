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

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

let counter = 0

export function generate(): Exercise {
  counter++
  const shuffled = shuffle(GLOSSARY)
  const target = shuffled[0]
  const distractors = shuffled.slice(1, 4)

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
