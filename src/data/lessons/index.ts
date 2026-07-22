import type { Lesson, LessonCategory } from '@/models/learning'
import { handLessons } from './hands'
import { oddsLessons } from './odds'
import { positionLessons } from './position'

export const allLessons: Lesson[] = [
  ...handLessons,
  ...oddsLessons,
  ...positionLessons,
].sort((a, b) => a.order - b.order)

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id)
}

export function getLessonsByCategory(category: LessonCategory): Lesson[] {
  return allLessons.filter((l) => l.category === category)
}

export const categoryInfo: Record<LessonCategory, { title: string; description: string; icon: string }> = {
  hands: {
    title: 'Mãos',
    description: 'Rankings e mãos iniciais',
    icon: '🃏',
  },
  odds: {
    title: 'Odds',
    description: 'Probabilidades e pot odds',
    icon: '📊',
  },
  position: {
    title: 'Posição',
    description: 'Estratégia por posição',
    icon: '🎯',
  },
}
