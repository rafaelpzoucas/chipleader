export type ExerciseType = 'multiple_choice' | 'true_false' | 'calc' | 'match'

export interface Module {
  id: string
  title: string
  description: string
  order: number
}

export interface Unit {
  id: string
  moduleId: string
  title: string
  order: number
  requiredToUnlock: string[]
  isCheckpoint: boolean
}

export interface Lesson {
  id: string
  unitId: string
  title: string
  order: number
  skillTags: string[]
  exerciseCount: number
}

export interface Exercise {
  id: string
  type: ExerciseType
  skillTag: string
  prompt: string
  data: Record<string, unknown>
  correctAnswer: string | number | boolean
  options?: string[]
  explanation: string
}

export interface LessonScore {
  correct: number
  total: number
  lastAttemptAt: string
}

export interface UserProgress {
  xp: number
  streak: number
  lastActiveDate: string | null

  completedLessons: string[]
  lessonScores: Record<string, LessonScore>
  skillStrength: Record<string, number>
  unlockedUnits: string[]
}

export type SkillTag = 'hand_ranking' | 'position' | 'pot_odds' | 'terminology'

export interface CardDisplay {
  rank: string
  suit: 's' | 'h' | 'd' | 'c'
}

export interface GeneratorFn {
  generate(): Exercise
}
