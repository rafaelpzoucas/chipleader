import type { UserProgress, LessonScore, SkillTag } from './types'
import { allUnits, getUnit, getLessonsByUnit, allLessons as allLessonsFlat } from './content'

export function completeLesson(
  progress: UserProgress,
  lessonId: string,
  correct: number,
  total: number,
  skillTags: SkillTag[],
): UserProgress {
  const now = new Date().toISOString()
  const newProgress = { ...progress }
  const xpGain = correct * 10
  newProgress.xp = progress.xp + xpGain

  newProgress.lessonScores = {
    ...progress.lessonScores,
    [lessonId]: accumulateScore(progress.lessonScores[lessonId], correct, total, now),
  }

  if (!newProgress.completedLessons.includes(lessonId)) {
    newProgress.completedLessons = [...progress.completedLessons, lessonId]
  }

  newProgress.lastActiveDate = now
  newProgress.streak = progress.streak + 1

  newProgress.skillStrength = updateSkillStrength(progress.skillStrength, skillTags, correct === total, now)

  newProgress.unlockedUnits = computeUnlockedUnits(newProgress.completedLessons)

  return newProgress
}

function accumulateScore(
  existing: LessonScore | undefined,
  correct: number,
  total: number,
  now: string,
): LessonScore {
  return {
    correct: (existing?.correct ?? 0) + correct,
    total: (existing?.total ?? 0) + total,
    lastAttemptAt: now,
  }
}

function updateSkillStrength(
  current: Record<string, number>,
  skillTags: SkillTag[],
  allCorrect: boolean,
  _now: string,
): Record<string, number> {
  const updated = { ...current }
  for (const tag of skillTags) {
    const cur = updated[tag] ?? 50
    if (allCorrect) {
      updated[tag] = Math.min(100, cur + 8)
    } else {
      updated[tag] = Math.max(0, cur - 4)
    }
  }
  return updated
}

function computeUnlockedUnits(completedLessons: string[]): string[] {
  return allUnits
    .filter(u => {
      if (u.requiredToUnlock.length === 0) return true
      return u.requiredToUnlock.every(reqUnitId => {
        const reqLessons = getLessonsByUnit(reqUnitId)
        return reqLessons.every(l => completedLessons.includes(l.id))
      })
    })
    .map(u => u.id)
}

export { computeUnlockedUnits }

export function updateStreak(progress: UserProgress): UserProgress {
  const now = new Date()
  const today = now.toISOString().slice(0, 10)

  if (!progress.lastActiveDate) {
    return progress
  }

  const lastDate = progress.lastActiveDate.slice(0, 10)
  if (lastDate === today) return progress

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().slice(0, 10)

  let newStreak = progress.streak
  if (lastDate === yesterdayStr) {
    newStreak += 1
  } else if (lastDate < yesterdayStr) {
    newStreak = 1
  }

  const daysSinceLastActive = Math.floor(
    (now.getTime() - new Date(progress.lastActiveDate).getTime()) / (1000 * 60 * 60 * 24),
  )

  if (daysSinceLastActive > 2) {
    const newSkillStrength = { ...progress.skillStrength }
    for (const key of Object.keys(newSkillStrength)) {
      newSkillStrength[key] = Math.max(0, newSkillStrength[key] - daysSinceLastActive * 2)
    }
    return {
      ...progress,
      streak: newStreak,
      lastActiveDate: today,
      skillStrength: newSkillStrength,
    }
  }

  return {
    ...progress,
    streak: newStreak,
    lastActiveDate: today,
  }
}

export function loseHeart(progress: UserProgress): UserProgress {
  if (progress.hearts <= 0) return progress
  const newHearts = progress.hearts - 1
  return {
    ...progress,
    hearts: newHearts,
    lastHeartRegenAt: newHearts < progress.maxHearts
      ? (progress.lastHeartRegenAt ?? new Date().toISOString())
      : progress.lastHeartRegenAt,
  }
}

export function regenHearts(progress: UserProgress): UserProgress {
  if (progress.hearts >= progress.maxHearts) return progress

  const now = Date.now()
  const lastRegen = progress.lastHeartRegenAt
    ? new Date(progress.lastHeartRegenAt).getTime()
    : now

  const elapsed = now - lastRegen
  const regenCount = Math.floor(elapsed / (4 * 60 * 60 * 1000))

  if (regenCount <= 0) return progress

  const newHearts = Math.min(progress.maxHearts, progress.hearts + regenCount)
  const actualRegen = newHearts - progress.hearts

  const newLastRegen = actualRegen > 0
    ? new Date(lastRegen + actualRegen * 4 * 60 * 60 * 1000).toISOString()
    : progress.lastHeartRegenAt

  return {
    ...progress,
    hearts: newHearts,
    lastHeartRegenAt: newLastRegen,
  }
}


