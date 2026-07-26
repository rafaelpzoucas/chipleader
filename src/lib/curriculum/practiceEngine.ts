import type { Exercise, UserProgress, SkillTag } from './types'
import { generators } from './generators'

const ALL_SKILLS: SkillTag[] = ['hand_ranking', 'position', 'pot_odds', 'terminology']

export function generatePracticeSet(
  progress: UserProgress,
  count: number = 10,
): Exercise[] {
  const practicedSkills = Object.keys(progress.skillStrength) as SkillTag[]
  const skills = practicedSkills.length > 0 ? practicedSkills : ALL_SKILLS

  const weights = skills.map(skill => ({
    skill,
    weight: 100 - (progress.skillStrength[skill] ?? 0) + 10,
  }))

  const totalWeight = weights.reduce((s, w) => s + w.weight, 0)
  const exercises: Exercise[] = []

  for (let i = 0; i < count; i++) {
    let r = Math.random() * totalWeight
    let picked = skills[0]
    for (const w of weights) {
      r -= w.weight
      if (r <= 0) { picked = w.skill; break }
    }

    const gen = generators[picked]
    if (gen) exercises.push(gen.generate())
  }

  return shuffle(exercises)
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
