import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LearningState, LessonProgress } from '@/models/learning'

type LearningStore = LearningState & {
  completeLesson: (lessonId: string, correctAnswers: number, totalQuestions: number, xpReward: number) => void
  getProgress: (lessonId: string) => LessonProgress | undefined
  getTotalLessonsCompleted: () => number
  getTotalCorrectAnswers: () => number
  getAverageAccuracy: () => number
}

function isSameDay(a: string, b: string): boolean {
  return a.slice(0, 10) === b.slice(0, 10)
}

function isYesterday(date: string): boolean {
  const d = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return isSameDay(d.toISOString(), yesterday.toISOString())
}

function isToday(date: string): boolean {
  return isSameDay(date, new Date().toISOString())
}

export const useLearningStore = create<LearningStore>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      totalXp: 0,
      streak: 0,
      lastPlayedDate: null,

      completeLesson: (lessonId, correctAnswers, totalQuestions, xpReward) => {
        const now = new Date().toISOString()
        const state = get()

        let newStreak = state.streak
        if (state.lastPlayedDate) {
          if (isToday(state.lastPlayedDate)) {
            // already played today, streak stays
          } else if (isYesterday(state.lastPlayedDate)) {
            newStreak += 1
          } else {
            newStreak = 1
          }
        } else {
          newStreak = 1
        }

        set({
          completedLessons: {
            ...state.completedLessons,
            [lessonId]: {
              completedAt: now,
              correctAnswers,
              totalQuestions,
            },
          },
          totalXp: state.totalXp + xpReward,
          streak: newStreak,
          lastPlayedDate: now,
        })
      },

      getProgress: (lessonId) => {
        return get().completedLessons[lessonId]
      },

      getTotalLessonsCompleted: () => {
        return Object.keys(get().completedLessons).length
      },

      getTotalCorrectAnswers: () => {
        return Object.values(get().completedLessons).reduce(
          (sum, p) => sum + p.correctAnswers, 0,
        )
      },

      getAverageAccuracy: () => {
        const lessons = Object.values(get().completedLessons)
        if (lessons.length === 0) return 0
        const totalCorrect = lessons.reduce((s, p) => s + p.correctAnswers, 0)
        const totalQuestions = lessons.reduce((s, p) => s + p.totalQuestions, 0)
        return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
      },
    }),
    {
      name: 'chipleader-learning',
      skipHydration: true,
    },
  ),
)
