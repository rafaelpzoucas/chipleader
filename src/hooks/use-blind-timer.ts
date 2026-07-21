'use client'

import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '@/store/game-store'
import { DEFAULT_BLIND_STRUCTURE } from '@/data/blind-structure'
import { playBlindAlertSound } from '@/utils/audio'

export function useBlindTimer(gameId: string) {
  const game = useGameStore((s) => s.games.find((g) => g.id === gameId))
  const advanceBlindLevel = useGameStore((s) => s.advanceBlindLevel)
  const startBlindTimer = useGameStore((s) => s.startBlindTimer)
  const pauseBlindTimer = useGameStore((s) => s.pauseBlindTimer)
  const resumeBlindTimer = useGameStore((s) => s.resumeBlindTimer)
  const resetBlindTimer = useGameStore((s) => s.resetBlindTimer)
  const previousBlindLevel = useGameStore((s) => s.previousBlindLevel)

  const [timeRemaining, setTimeRemaining] = useState(0)
  const endRef = useRef<number | null>(null)
  const advancedRef = useRef(false)

  const blindTimer = game?.blindTimer ?? null
  const blindInterval = game?.blindInterval ?? 900
  const levels = game?.blindLevels ?? DEFAULT_BLIND_STRUCTURE
  const maxLevel = levels.length - 1

  useEffect(() => {
    if (!blindTimer?.isRunning || blindTimer.levelStartedAt === null) {
      endRef.current = null
      setTimeRemaining(blindInterval * 1000)
      return
    }
    endRef.current =
      blindTimer.levelStartedAt + blindInterval * 1000 + blindTimer.totalPausedMs
    advancedRef.current = false
  }, [
    blindTimer?.isRunning,
    blindTimer?.levelStartedAt,
    blindTimer?.totalPausedMs,
    blindTimer?.currentLevel,
    blindInterval,
  ])

  useEffect(() => {
    if (endRef.current === null) return

    const tick = () => {
      if (endRef.current === null) return
      const remaining = Math.max(0, endRef.current - Date.now())
      setTimeRemaining(remaining)

      if (remaining <= 0 && !advancedRef.current) {
        advancedRef.current = true
        playBlindAlertSound()
        advanceBlindLevel(gameId)
      }
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [
    blindTimer?.isRunning,
    blindTimer?.currentLevel,
    blindTimer?.totalPausedMs,
    blindTimer?.levelStartedAt,
    gameId,
    advanceBlindLevel,
  ])

  if (!game || !blindTimer) return null

  const isLastLevel = blindTimer.currentLevel >= maxLevel
  const currentLevelData = levels[blindTimer.currentLevel]
  const isBreak = currentLevelData?.isBreak ?? false
  const nextLevelData = isLastLevel
    ? null
    : levels[blindTimer.currentLevel + 1]

  return {
    timeRemaining,
    isRunning: blindTimer.isRunning,
    wasStarted: blindTimer.levelStartedAt !== null,
    isLastLevel,
    isBreak,
    currentLevel: blindTimer.currentLevel + 1,
    totalLevels: levels.length,
    smallBlind: currentLevelData.smallBlind,
    bigBlind: currentLevelData.bigBlind,
    nextSmallBlind: nextLevelData?.smallBlind ?? null,
    nextBigBlind: nextLevelData?.bigBlind ?? null,
    start: () => startBlindTimer(gameId),
    pause: () => pauseBlindTimer(gameId),
    resume: () => resumeBlindTimer(gameId),
    reset: () => resetBlindTimer(gameId),
    advanceLevel: () => advanceBlindLevel(gameId),
    previousLevel: () => previousBlindLevel(gameId),
  }
}
