'use client'

import { useProgress } from '@/lib/curriculum/useProgress'
import { allModules, getUnitsByModule, getLessonsByUnit } from '@/lib/curriculum/content'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Flame, Heart, Sparkles, Lock, CheckCircle, ChevronRight, BookOpen, Play } from 'lucide-react'
import Link from 'next/link'

function getUnitStatus(unitId: string, completedLessons: string[], unlockedUnits: string[]): 'locked' | 'unlocked' | 'in_progress' | 'done' {
  if (!unlockedUnits.includes(unitId)) return 'locked'
  const lessons = getLessonsByUnit(unitId)
  const completed = lessons.filter(l => completedLessons.includes(l.id))
  if (completed.length === 0) return 'unlocked'
  if (completed.length >= lessons.length) return 'done'
  return 'in_progress'
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

  const accuracy = calcAccuracy(progress)
  const totalCompleted = progress.completedLessons.length
  const totalLessons = allModules.reduce((sum, m) => {
    const units = getUnitsByModule(m.id)
    return sum + units.reduce((s, u) => s + getLessonsByUnit(u.id).length, 0)
  }, 0)

  return (
    <main className="max-w-md mx-auto space-y-5 py-6 px-4">
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-xl font-bold">Trilha</h1>
          <p className="text-sm text-muted-foreground">Aprenda poker passo a passo</p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 bg-muted rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-400" /> XP
          </p>
          <p className="text-lg font-bold">{progress.xp}</p>
        </div>
        <div className="flex-1 bg-muted rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Flame className="w-3 h-3 text-orange-400" /> Streak
          </p>
          <p className="text-lg font-bold">{progress.streak}d</p>
        </div>
        <div className="flex-1 bg-muted rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-red-400" /> Vidas
          </p>
          <p className="text-lg font-bold">
            {Array(progress.maxHearts).fill(null).map((_, i) => (
              <span key={i} className={i < progress.hearts ? 'text-red-400' : 'text-muted-foreground/30'}>{'♥'}</span>
            ))}
          </p>
        </div>
      </div>

      {accuracy > 0 && (
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-medium">{totalCompleted}/{totalLessons} lições</span>
            </div>
            <Progress value={totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0} className="h-2" />
            <p className="text-xs text-muted-foreground">{accuracy}% de acertos</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {allModules.map(mod => {
          const units = getUnitsByModule(mod.id)
          return (
            <div key={mod.id}>
              <h2 className="font-semibold text-lg mb-1">{mod.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{mod.description}</p>

              <div className="space-y-3">
                {units.map(unit => {
                  const lessons = getLessonsByUnit(unit.id)
                  const status = getUnitStatus(unit.id, progress.completedLessons, progress.unlockedUnits)
                  const completed = lessons.filter(l => progress.completedLessons.includes(l.id)).length
                  const pct = lessons.length > 0 ? Math.round((completed / lessons.length) * 100) : 0

                  const isClickable = status !== 'locked'
                  const firstLesson = getFirstLessonId(unit.id)

                  return (
                    <div key={unit.id} className={`relative ${isClickable ? 'cursor-pointer' : 'opacity-50'} group`}>
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 z-10
                        ${status === 'done' ? 'bg-green-500 border-green-500' :
                          status === 'in_progress' ? 'bg-primary border-primary' :
                          status === 'unlocked' ? 'bg-card border-muted-foreground' :
                          'bg-muted border-muted-foreground'}" />

                      {isClickable ? (
                        <Link href={`/licao/${firstLesson}`} className="block ml-4">
                          <Card className={`border transition-colors hover:bg-accent/50
                            ${status === 'done' ? 'border-green-500/30' : ''}`}>
                            <CardContent className="p-3 flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                ${status === 'done' ? 'bg-green-500/20' :
                                  status === 'in_progress' ? 'bg-primary/20' :
                                  'bg-muted'}`}>
                                {status === 'done' ? <CheckCircle className="w-5 h-5 text-green-400" /> :
                                  status === 'in_progress' ? <Play className="w-5 h-5 text-primary" /> :
                                  <span className="text-xs font-bold text-foreground">{pct > 0 ? `${pct}%` : '>'}</span>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{unit.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {status === 'unlocked' ? `${lessons.length} lições` :
                                    `${completed}/${lessons.length} concluídas`}
                                </p>
                              </div>
                              {unit.isCheckpoint && <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />}
                              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                            </CardContent>
                          </Card>
                        </Link>
                      ) : (
                        <div className="ml-4">
                          <Card className="border-muted">
                            <CardContent className="p-3 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-muted">
                                <Lock className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate text-muted-foreground">{unit.title}</p>
                                <p className="text-xs text-muted-foreground">Complete as lições anteriores</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <Link href="/pratica">
        <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20 cursor-pointer hover:opacity-80 transition-opacity">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">Prática Infinita</p>
              <p className="text-xs text-muted-foreground">Reforce skills com repetição espaçada</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </CardContent>
        </Card>
      </Link>
    </main>
  )
}

function calcAccuracy(p: { lessonScores: Record<string, { correct: number; total: number }> }): number {
  let totalC = 0, totalT = 0
  for (const s of Object.values(p.lessonScores)) {
    totalC += s.correct; totalT += s.total
  }
  return totalT > 0 ? Math.round((totalC / totalT) * 100) : 0
}
