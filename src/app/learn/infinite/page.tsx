'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Sparkles, RotateCcw, TrendingUp, Flame } from 'lucide-react'
import { ScenarioQuestion } from '@/components/learn/scenario-question'
import { generateScenario } from '@/utils/scenario-generator'
import type { Scenario } from '@/models/learning'

export default function InfinitePracticePage() {
  const [scenarios, setScenarios] = useState<Scenario[]>(() => [generateScenario()])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [streakCount, setStreakCount] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [showStats, setShowStats] = useState(false)

  const current = scenarios[currentIndex]

  function loadNext() {
    const nextScenarios = [...scenarios, generateScenario()]
    setScenarios(nextScenarios)
    setCurrentIndex((i) => i + 1)
  }

  function handleComplete(correct: boolean) {
    if (correct) {
      setCorrectCount((c) => c + 1)
      setStreakCount((s) => {
        const next = s + 1
        if (next > bestStreak) setBestStreak(next)
        return next
      })
    } else {
      setStreakCount(0)
    }
    setTotalAnswered((t) => t + 1)
    loadNext()
  }

  function handleRestart() {
    setScenarios([generateScenario()])
    setCurrentIndex(0)
    setCorrectCount(0)
    setTotalAnswered(0)
    setStreakCount(0)
    setBestStreak(0)
    setShowStats(false)
  }

  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0

  return (
    <main className="space-y-4 py-4 px-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/learn">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold">Prática Infinita</h1>
            <Badge variant="outline" className="bg-orange-500/10 text-orange-400">
              ∞ Mãos infinitas
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={handleRestart}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 bg-muted rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Acertos</p>
          <p className="text-lg font-bold text-green-400">{correctCount}/{totalAnswered}</p>
        </div>
        <div className="flex-1 bg-muted rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Precisão</p>
          <p className="text-lg font-bold">{accuracy}%</p>
        </div>
        <div className="flex-1 bg-muted rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1">
            <Flame className="w-3 h-3 text-orange-400" />
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
          <p className={`text-lg font-bold ${streakCount > 0 ? 'text-orange-400' : 'text-muted-foreground'}`}>
            {streakCount}
          </p>
        </div>
      </div>

      {current && (
        <ScenarioQuestion
          key={currentIndex}
          scenario={current}
          scenarioIndex={currentIndex}
          total={Infinity}
          onComplete={handleComplete}
        />
      )}

      {totalAnswered > 0 && totalAnswered % 10 === 0 && !showStats && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 text-center space-y-2">
            <Sparkles className="w-6 h-6 text-yellow-400 mx-auto" />
            <p className="font-bold">{totalAnswered} mãos praticadas!</p>
            <p className="text-sm text-muted-foreground">{accuracy}% de acerto. Melhor streak: {bestStreak}</p>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
