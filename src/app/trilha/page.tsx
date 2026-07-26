'use client'

import { useProgress } from '@/lib/curriculum/useProgress'
import { allModules, getUnitsByModule, getLessonsByUnit, getLesson } from '@/lib/curriculum/content'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Flame, Heart, Sparkles, Lock, CheckCircle, ChevronRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

function UnitBubble({
  unit,
  isUnlocked,
  completedLessons,
  totalLessons,
}: {
  unit: { id: string; title: string; isCheckpoint: boolean }
  isUnlocked: boolean
  completedLessons: number
  totalLessons: number
}) {
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  const allDone = completedLessons >= totalLessons && totalLessons > 0

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center gap-1 opacity-50">
        <div className="w-14 h-14 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center bg-muted">
          <Lock className="w-5 h-5 text-muted-foreground" />
        </div>
        <span className="text-xs text-muted-foreground text-center max-w-24">{unit.title}</span>
      </div>
    )
  }

  return (
    <Link href={`/licao/${getFirstLessonId(unit.id)}`} className="flex flex-col items-center gap-1 group">
      <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors ${
        allDone
          ? 'border-green-500 bg-green-500/20'
          : unit.isCheckpoint
            ? 'border-yellow-500 bg-yellow-500/20'
            : 'border-primary bg-primary/20 group-hover:bg-primary/30'
      }`}>
        {allDone ? (
          <CheckCircle className="w-6 h-6 text-green-400" />
        ) : unit.isCheckpoint ? (
          <Sparkles className="w-5 h-5 text-yellow-400" />
        ) : (
          <span className="text-xs font-bold text-primary">{progress > 0 ? `${progress}%` : '0'}</span>
        )}
      </div>
      <span className="text-xs text-center max-w-24 leading-tight">{unit.title}</span>
    </Link>
  )
}

function getFirstLessonId(unitId: string): string {
  const lessons = getLessonsByUnit(unitId)
  return lessons[0]?.id ?? ''
}

export default function TrilhaPage() {
  const { progress } = useProgress()

  if (!progress) {
    return <div className="p-4 text-muted-foreground">Carregando...</div>
  }

  const accuracy = calculateAccuracy(progress)
  const totalCompleted = progress.completedLessons.length
  const totalLessons = allModules.reduce((sum, m) => {
    const units = getUnitsByModule(m.id)
    return sum + units.reduce((s, u) => s + getLessonsByUnit(u.id).length, 0)
  }, 0)

  return (
    <main className="space-y-6 py-4 px-4 max-w-lg mx-auto">
      <header className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-xl font-bold">Trilha de Aprendizado</h1>
          <p className="text-sm text-muted-foreground">Evolua seu poker passo a passo</p>
        </div>
      </header>

      <div className="flex gap-3">
        <div className="flex-1 bg-muted rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <p className="text-xs text-muted-foreground">XP</p>
          </div>
          <p className="text-lg font-bold">{progress.xp}</p>
        </div>
        <div className="flex-1 bg-muted rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flame className="w-4 h-4 text-orange-400" />
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
          <p className="text-lg font-bold">{progress.streak} dias</p>
        </div>
        <div className="flex-1 bg-muted rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Heart className="w-4 h-4 text-red-400" />
            <p className="text-xs text-muted-foreground">Vidas</p>
          </div>
          <p className="text-lg font-bold">{'♥'.repeat(progress.hearts)}{'♡'.repeat(Math.max(0, progress.maxHearts - progress.hearts))}</p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso geral</span>
            <span className="font-medium">{totalCompleted}/{totalLessons} lições</span>
          </div>
          <Progress value={totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0} className="h-2" />
          {accuracy > 0 && (
            <p className="text-xs text-muted-foreground">{accuracy}% de acertos total</p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        {allModules.map(module => {
          const units = getUnitsByModule(module.id)
          return (
            <div key={module.id}>
              <h2 className="font-semibold text-lg mb-4">{module.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
              <div className="relative">
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-6 relative">
                  {units.map(unit => {
                    const lessons = getLessonsByUnit(unit.id)
                    const completedLessons = lessons.filter(l => progress.completedLessons.includes(l.id)).length
                    const isUnlocked = progress.unlockedUnits.includes(unit.id)

                    return (
                      <div key={unit.id} className="flex items-center gap-4 pl-0">
                        <UnitBubble
                          unit={unit}
                          isUnlocked={isUnlocked}
                          completedLessons={completedLessons}
                          totalLessons={lessons.length}
                        />
                        {isUnlocked && !unit.isCheckpoint && (
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{unit.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {completedLessons}/{lessons.length} lições
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Link href="/pratica">
        <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20 cursor-pointer hover:opacity-80 transition-opacity">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Prática Infinita</p>
              <p className="text-xs text-muted-foreground">Reforce todas as skills com repetição espaçada</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </Link>
    </main>
  )
}

function calculateAccuracy(p: {
  lessonScores: Record<string, { correct: number; total: number }>
}): number {
  let totalC = 0
  let totalT = 0
  for (const s of Object.values(p.lessonScores)) {
    totalC += s.correct
    totalT += s.total
  }
  return totalT > 0 ? Math.round((totalC / totalT) * 100) : 0
}
