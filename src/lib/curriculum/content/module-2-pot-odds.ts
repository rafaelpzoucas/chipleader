import type { Module, Unit, Lesson } from '../types'

export const module2: Module = {
  id: 'm2',
  title: 'Pot Odds & Probabilidade',
  description: 'Aprenda a calcular odds e tomar decisões lucrativas',
  order: 2,
}

export const module2Units: Unit[] = [
  {
    id: 'm2-u1',
    moduleId: 'm2',
    title: 'Pot Odds Básico',
    order: 1,
    requiredToUnlock: ['m1-u4'],
    isCheckpoint: false,
  },
]

export const module2Lessons: Lesson[] = [
  // Unit 1: Pot Odds
  { id: 'm2-u1-l1', unitId: 'm2-u1', title: 'Calculando Pot Odds', order: 1, skillTags: ['pot_odds'], exerciseCount: 5 },
  { id: 'm2-u1-l2', unitId: 'm2-u1', title: 'Odds na Prática', order: 2, skillTags: ['pot_odds'], exerciseCount: 5 },
  { id: 'm2-u1-l3', unitId: 'm2-u1', title: 'Equidade vs Pot Odds', order: 3, skillTags: ['pot_odds'], exerciseCount: 5 },
  { id: 'm2-u1-l4', unitId: 'm2-u1', title: 'Decisões com Odds', order: 4, skillTags: ['pot_odds'], exerciseCount: 5 },
]
