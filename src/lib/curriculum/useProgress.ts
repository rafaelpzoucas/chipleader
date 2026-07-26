'use client'

import { useState, useEffect, useCallback } from 'react'
import type { UserProgress, SkillTag } from './types'
import { loadProgress, saveProgress } from './storage'
import { updateStreak, completeLesson, computeUnlockedUnits } from './engine'

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    let p = loadProgress()
    p = updateStreak(p)
    p = { ...p, unlockedUnits: computeUnlockedUnits(p.completedLessons) }
    saveProgress(p)
    setProgress(p)
  }, [])

  const update = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress(prev => {
      if (!prev) return prev
      const next = updater(prev)
      saveProgress(next)
      return next
    })
  }, [])

  const finishLesson = useCallback((
    lessonId: string,
    correct: number,
    total: number,
    skillTags: SkillTag[],
  ) => {
    update(prev => completeLesson(prev, lessonId, correct, total, skillTags))
  }, [update])

  return { progress, update, finishLesson }
}
