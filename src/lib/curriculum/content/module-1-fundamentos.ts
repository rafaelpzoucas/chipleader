import type { Module, Unit, Lesson } from '../types'

export const module1: Module = {
  id: 'm1',
  title: 'Fundamentos',
  description: 'Aprenda os conceitos básicos do pôquer',
  order: 1,
}

export const module1Units: Unit[] = [
  {
    id: 'm1-u1',
    moduleId: 'm1',
    title: 'Ranking de Mãos',
    order: 1,
    requiredToUnlock: [],
    isCheckpoint: false,
  },
  {
    id: 'm1-u2',
    moduleId: 'm1',
    title: 'Posições',
    order: 2,
    requiredToUnlock: [],
    isCheckpoint: false,
  },
  {
    id: 'm1-u3',
    moduleId: 'm1',
    title: 'Termos Básicos',
    order: 3,
    requiredToUnlock: [],
    isCheckpoint: false,
  },
  {
    id: 'm1-u4',
    moduleId: 'm1',
    title: 'Checkpoint',
    order: 4,
    requiredToUnlock: ['m1-u1', 'm1-u2', 'm1-u3'],
    isCheckpoint: true,
  },
]

export const module1Lessons: Lesson[] = [
  // Unit 1: Hand Ranking
  { id: 'm1-u1-l1', unitId: 'm1-u1', title: 'Mãos Altas e Pares', order: 1, skillTags: ['hand_ranking'], exerciseCount: 5 },
  { id: 'm1-u1-l2', unitId: 'm1-u1', title: 'Dois Pares e Trincas', order: 2, skillTags: ['hand_ranking'], exerciseCount: 5 },
  { id: 'm1-u1-l3', unitId: 'm1-u1', title: 'Sequências e Flushes', order: 3, skillTags: ['hand_ranking'], exerciseCount: 5 },
  { id: 'm1-u1-l4', unitId: 'm1-u1', title: 'Full House em diante', order: 4, skillTags: ['hand_ranking'], exerciseCount: 5 },

  // Unit 2: Position
  { id: 'm1-u2-l1', unitId: 'm1-u2', title: 'Identificando Posições', order: 1, skillTags: ['position'], exerciseCount: 5 },
  { id: 'm1-u2-l2', unitId: 'm1-u2', title: 'Ordem de Ação', order: 2, skillTags: ['position'], exerciseCount: 5 },
  { id: 'm1-u2-l3', unitId: 'm1-u2', title: 'Vantagem de Posição', order: 3, skillTags: ['position'], exerciseCount: 5 },
  { id: 'm1-u2-l4', unitId: 'm1-u2', title: 'Estratégia por Posição', order: 4, skillTags: ['position'], exerciseCount: 5 },

  // Unit 3: Terminology (was m1-u4, renumbered)
  { id: 'm1-u3-l1', unitId: 'm1-u3', title: 'Ações na Mesa', order: 1, skillTags: ['terminology'], exerciseCount: 5 },
  { id: 'm1-u3-l2', unitId: 'm1-u3', title: 'Apostas e Aumentos', order: 2, skillTags: ['terminology'], exerciseCount: 5 },
  { id: 'm1-u3-l3', unitId: 'm1-u3', title: 'Conceitos de Probabilidade', order: 3, skillTags: ['terminology'], exerciseCount: 5 },
  { id: 'm1-u3-l4', unitId: 'm1-u3', title: 'Estratégia e Blefe', order: 4, skillTags: ['terminology'], exerciseCount: 5 },

  // Unit 4: Checkpoint (was m1-u5, renumbered)
  { id: 'm1-u4-l1', unitId: 'm1-u4', title: 'Checkpoint Final', order: 1, skillTags: ['hand_ranking', 'position', 'terminology'], exerciseCount: 5 },
]
