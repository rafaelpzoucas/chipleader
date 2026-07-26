import type { UserProgress } from './types'

const STORAGE_KEY = 'chipleader:progress'
const OLD_STORAGE_KEY = 'chipleader-learning'

export function createInitialProgress(): UserProgress {
  return {
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    hearts: 5,
    maxHearts: 5,
    completedLessons: [],
    lessonScores: {},
    skillStrength: {},
    unlockedUnits: [],
    lastHeartRegenAt: null,
  }
}

function migrateOldData(): UserProgress | null {
  try {
    const raw = localStorage.getItem(OLD_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw)
    const state = parsed?.state
    if (!state) return null

    const progress = createInitialProgress()
    progress.xp = state.totalXp ?? 0
    progress.streak = state.streak ?? 0
    progress.lastActiveDate = state.lastPlayedDate ?? null

    if (state.completedLessons) {
      for (const [lessonId, lp] of Object.entries(state.completedLessons)) {
        const lpAny = lp as any
        progress.completedLessons.push(lessonId)
        progress.lessonScores[lessonId] = {
          correct: lpAny.correctAnswers ?? 0,
          total: lpAny.totalQuestions ?? 0,
          lastAttemptAt: lpAny.completedAt ?? new Date().toISOString(),
        }
      }
    }

    localStorage.removeItem(OLD_STORAGE_KEY)
    return progress
  } catch {
    return null
  }
}

export function loadProgress(): UserProgress {
  try {
    const migrated = migrateOldData()
    if (migrated) {
      saveProgress(migrated)
      return migrated
    }

    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const initial = createInitialProgress()
      saveProgress(initial)
      return initial
    }

    return JSON.parse(raw) as UserProgress
  } catch {
    const initial = createInitialProgress()
    saveProgress(initial)
    return initial
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    console.warn('[chipleader] failed to save progress')
  }
}

export function resetProgress(): UserProgress {
  const initial = createInitialProgress()
  saveProgress(initial)
  return initial
}
