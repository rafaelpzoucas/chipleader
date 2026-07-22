'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useLearningStore } from '@/store/learning-store'
import { allLessons, categoryInfo } from '@/data/lessons'
import type { LessonCategory } from '@/models/learning'
import { BookOpen, Brain, TrendingUp, Zap, Flame, Target, ChevronRight, Sparkles, Trophy } from 'lucide-react'
import Link from 'next/link'

const categoryIcons: Record<LessonCategory, React.ReactNode> = {
  hands: <Brain className="w-5 h-5" />,
  odds: <TrendingUp className="w-5 h-5" />,
  position: <Target className="w-5 h-5" />,
}

const categoryColors: Record<LessonCategory, string> = {
  hands: 'from-green-500/10 to-emerald-500/5 border-green-500/20',
  odds: 'from-blue-500/10 to-cyan-500/5 border-blue-500/20',
  position: 'from-purple-500/10 to-pink-500/5 border-purple-500/20',
}

const categoryBadge: Record<LessonCategory, string> = {
  hands: 'bg-green-500/10 text-green-400',
  odds: 'bg-blue-500/10 text-blue-400',
  position: 'bg-purple-500/10 text-purple-400',
}

export default function LearnPage() {
  const { totalXp, streak, getTotalLessonsCompleted, getAverageAccuracy, completedLessons } = useLearningStore()

  const categories = Object.entries(categoryInfo) as [LessonCategory, typeof categoryInfo['hands']][]

  const progressPercent = Math.min(100, (getTotalLessonsCompleted() / allLessons.length) * 100)

  return (
    <main className="space-y-6 py-4">
      <section className="px-4">
        <div className="flex items-center gap-3 mb-1">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Poker Academy</h1>
        </div>
        <p className="text-muted-foreground text-sm">Aprenda poker com lições interativas</p>
      </section>

      <section className="px-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-lg">{totalXp} XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="font-bold">{streak} dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="font-bold">{getTotalLessonsCompleted()}/{allLessons.length}</span>
                </div>
              </div>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {getTotalLessonsCompleted() === 0
                ? 'Complete sua primeira lição para começar!'
                : `${getAverageAccuracy()}% de acertos no total`}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="px-4 space-y-4">
        <h2 className="font-semibold text-lg">Categorias</h2>
        {categories.map(([category, info]) => {
          const catLessons = allLessons.filter((l) => l.category === category)
          const completed = catLessons.filter((l) => completedLessons[l.id]).length
          const catProgress = (completed / catLessons.length) * 100

          return (
            <Card key={category} className={`bg-gradient-to-br ${categoryColors[category]} overflow-hidden`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {categoryIcons[category]}
                    <CardTitle className="text-base">{info.title}</CardTitle>
                  </div>
                  <Badge variant="outline" className={categoryBadge[category]}>
                    {completed}/{catLessons.length}
                  </Badge>
                </div>
                <CardDescription>{info.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <Progress value={catProgress} className="h-1.5" />
                {catLessons.map((lesson) => (
                  <Link key={lesson.id} href={`/learn/lesson/${lesson.id}`}>
                    <div className={`flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-accent/50 ${
                      completedLessons[lesson.id] ? 'opacity-80' : ''
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          completedLessons[lesson.id] ? 'bg-green-400' : 'bg-muted-foreground/30'
                        }`} />
                        <div>
                          <p className={`text-sm font-medium ${completedLessons[lesson.id] ? 'line-through text-muted-foreground' : ''}`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">+{lesson.xpReward}XP</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </section>
    </main>
  )
}
