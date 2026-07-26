import type { Module, Unit, Lesson } from '../types'

export const module3: Module = {
  id: 'm3',
  title: 'Bluff & Range',
  description: 'Aprenda a blefar, ler ranges e dominar o jogo psicológico',
  order: 3,
}

export const module3Units: Unit[] = [
  {
    id: 'm3-u1',
    moduleId: 'm3',
    title: 'Fundamentos do Bluff',
    order: 1,
    requiredToUnlock: ['m2-u1'],
    isCheckpoint: false,
  },
  {
    id: 'm3-u2',
    moduleId: 'm3',
    title: 'C-Bet e Continuation',
    order: 2,
    requiredToUnlock: ['m3-u1'],
    isCheckpoint: false,
  },
  {
    id: 'm3-u3',
    moduleId: 'm3',
    title: 'Leitura de Range',
    order: 3,
    requiredToUnlock: ['m3-u2'],
    isCheckpoint: false,
  },
  {
    id: 'm3-u4',
    moduleId: 'm3',
    title: 'Checkpoint Bluff & Range',
    order: 4,
    requiredToUnlock: ['m3-u1', 'm3-u2', 'm3-u3'],
    isCheckpoint: true,
  },
]

export const module3Lessons: Lesson[] = [
  // Unit 1: Fundamentos do Bluff
  { id: 'm3-u1-l1', unitId: 'm3-u1', title: 'O Que é Bluff?', order: 1, skillTags: ['bluff_range'], exerciseCount: 5 },
  { id: 'm3-u1-l2', unitId: 'm3-u1', title: 'Quando Blefar', order: 2, skillTags: ['bluff_range'], exerciseCount: 5 },
  { id: 'm3-u1-l3', unitId: 'm3-u1', title: 'Frequência de Bluff', order: 3, skillTags: ['bluff_range'], exerciseCount: 5 },
  { id: 'm3-u1-l4', unitId: 'm3-u1', title: 'Bluff vs Value Bet', order: 4, skillTags: ['bluff_range'], exerciseCount: 5 },

  // Unit 2: C-Bet e Continuation
  { id: 'm3-u2-l1', unitId: 'm3-u2', title: 'Conceito de C-Bet', order: 1, skillTags: ['bluff_range'], exerciseCount: 5 },
  { id: 'm3-u2-l2', unitId: 'm3-u2', title: 'C-Bet por Board Texture', order: 2, skillTags: ['bluff_range'], exerciseCount: 5 },
  { id: 'm3-u2-l3', unitId: 'm3-u2', title: 'Double e Triple Barrel', order: 3, skillTags: ['bluff_range'], exerciseCount: 5 },
  { id: 'm3-u2-l4', unitId: 'm3-u2', title: 'Check-Raise e Float', order: 4, skillTags: ['bluff_range'], exerciseCount: 5 },

  // Unit 3: Leitura de Range
  { id: 'm3-u3-l1', unitId: 'm3-u3', title: 'Introdução a Range', order: 1, skillTags: ['bluff_range'], exerciseCount: 5 },
  { id: 'm3-u3-l2', unitId: 'm3-u3', title: 'Narrowing o Range', order: 2, skillTags: ['bluff_range'], exerciseCount: 5 },
  { id: 'm3-u3-l3', unitId: 'm3-u3', title: 'Range vs Mão Específica', order: 3, skillTags: ['bluff_range'], exerciseCount: 5 },
  { id: 'm3-u3-l4', unitId: 'm3-u3', title: 'Exploração de Oponentes', order: 4, skillTags: ['bluff_range'], exerciseCount: 5 },

  // Unit 4: Checkpoint
  { id: 'm3-u4-l1', unitId: 'm3-u4', title: 'Checkpoint Final', order: 1, skillTags: ['bluff_range'], exerciseCount: 5 },
]
