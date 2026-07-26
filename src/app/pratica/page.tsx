'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExerciseCard } from '@/components/learn/exercise-card'
import { useProgress } from '@/lib/curriculum/useProgress'
import { generatePracticeSet } from '@/lib/curriculum/practiceEngine'
import { ArrowLeft, Sparkles, RotateCcw, TrendingUp, Flame } from 'lucide-react'
import type { Exercise } from '@/lib/curriculum/types'

export default function PraticaPage() {
  const { progress } = useProgress()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [streakCount, setStreakCount] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (progress && exercises.length === 0) {
      const set = generatePracticeSet(progress, 10)
      setExercises(set)
    }
  }, [progress, exercises.length])

  const startSet = useCallback(() => {
    if (!progress) return
    const set = generatePracticeSet(progress, 10)
    setExercises(set)
    setCurrentIndex(0)
    setShowResult(false)
  }, [progress])

  function handleAnswer(correct: boolean) {
    if (correct) {
      setCorrectCount(c => c + 1)
      setStreakCount(s => {
        const next = s + 1
        if (next > bestStreak) setBestStreak(next)
        return next
      })
    } else {
      setStreakCount(0)
    }
    setTotalAnswered(t => t + 1)

    const next = currentIndex + 1
    if (next >= exercises.length) {
      setShowResult(true)
    } else {
      setCurrentIndex(next)
    }
  }

  function handleRestart() {
    startSet()
    setCorrectCount(0)
    setTotalAnswered(0)
    setStreakCount(0)
    setBestStreak(0)
  }

  if (!progress || exercises.length === 0) {
    return <div className="p-4 text-muted-foreground">Carregando...</div>
  }

  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0

  return (
    <main className="space-y-4 py-4 px-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/trilha">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold">Prática Infinita</h1>
            <Badge variant="outline" className="bg-orange-500/10 text-orange-400">
              ∞ Repetição espaçada
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

      {showResult && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-yellow-400 mx-auto" />
            <p className="font-bold">Sessão concluída!</p>
            <p className="text-sm text-muted-foreground">{correctCount}/{exercises.length} corretos</p>
            <Button className="w-full" onClick={startSet}>
              Continuar praticando
            </Button>
          </CardContent>
        </Card>
      )}

      {!showResult && exercises[currentIndex] && (
        <Card>
          <CardContent className="p-4">
            <ExerciseCard
              key={currentIndex}
              exercise={exercises[currentIndex]}
              index={totalAnswered}
              total={Infinity}
              onAnswer={handleAnswer}
            />
          </CardContent>
        </Card>
      )}
    </main>
  )
}
