export type LessonCategory = 'hands' | 'odds' | 'position' | 'practice'

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

export type CardSuit = 's' | 'h' | 'd' | 'c'
export type CardRank = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2'

export type Card = {
  rank: CardRank
  suit: CardSuit
}

export type Scenario = {
  heroCards: [Card, Card]
  board: Card[]
  heroPosition: string
  villainAction: string
  potSize: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  alternativeAnalysis: string
}

export type Lesson = {
  id: string
  title: string
  description: string
  category: LessonCategory
  order: number
  content: LessonContent[]
  questions: Question[]
  scenarios?: Scenario[]
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
