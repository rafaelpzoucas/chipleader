export type LessonCategory = 'hands' | 'odds' | 'position'

export type LessonContent = {
  type: 'text' | 'tip' | 'example'
  text: string
}

export type Question = {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export type Lesson = {
  id: string
  title: string
  description: string
  category: LessonCategory
  order: number
  content: LessonContent[]
  questions: Question[]
  xpReward: number
}

export type LessonProgress = {
  completedAt: string
  correctAnswers: number
  totalQuestions: number
}

export type LearningState = {
  completedLessons: Record<string, LessonProgress>
  totalXp: number
  streak: number
  lastPlayedDate: string | null
}
