'use client'

import { useState, use, useCallback, useMemo } from 'react'
import { notFound, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ExerciseCard } from '@/components/learn/exercise-card'
import { LessonIntroScreen } from '@/components/learn/lesson-intro'
import { useProgress } from '@/lib/curriculum/useProgress'
import { getLesson, getUnit } from '@/lib/curriculum/content'
import { lessonIntros } from '@/lib/curriculum/content/lesson-intros'
import { generators } from '@/lib/curriculum/generators'
import { ArrowLeft, Sparkles, RotateCcw, Heart } from 'lucide-react'
import Link from 'next/link'
import type { Exercise, SkillTag } from '@/lib/curriculum/types'

export default function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params)
  const router = useRouter()
  const { progress, finishLesson } = useProgress()

  const lesson = useMemo(() => getLesson(lessonId), [lessonId])

  const [exercises, setExercises] = useState<Exercise[] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [started, setStarted] = useState(false)
  const [showIntro, setShowIntro] = useState(false)

  const generateExercises = useCallback(() => {
    if (!lesson) return
    const tags = lesson.skillTags as SkillTag[]
    const tag = tags[Math.floor(Math.random() * tags.length)]
    const gen = generators[tag]
    if (!gen) return
    const exs: Exercise[] = []
    for (let i = 0; i < lesson.exerciseCount; i++) {
      exs.push(gen.generate())
    }
    setExercises(exs)
    setCurrentIndex(0)
    setCorrectCount(0)
    setShowResult(false)
    setStarted(true)
    setShowIntro(false)
  }, [lesson])

  function handleAnswer(correct: boolean) {
    if (correct) setCorrectCount(c => c + 1)

    const next = currentIndex + 1
    if (!exercises || next >= exercises.length) {
      setShowResult(true)
      if (progress && lesson) {
        finishLesson(lessonId, correct ? correctCount + 1 : correctCount, exercises?.length ?? 0, lesson.skillTags as SkillTag[])
      }
    } else {
      setCurrentIndex(next)
    }
  }

  if (!lesson) { notFound() }

  const unit = lesson ? getUnit(lesson.unitId) : undefined
  const intro = lessonIntros[lessonId]

  if (!progress || !lesson) {
    return <div className="p-4 text-muted-foreground">Carregando...</div>
  }

  const hasBeenCompleted = progress.completedLessons.includes(lessonId)

  // ── Landing screen ──
  if (!started && !showIntro && !showResult) {
    return (
      <main className="space-y-4 py-4 px-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/trilha">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold truncate">{lesson.title}</h1>
            {unit && <p className="text-xs text-muted-foreground">{unit.title}</p>}
          </div>
          <div className="flex items-center gap-1 text-sm text-red-400">
            <Heart className="w-4 h-4" />
            <span>{progress.hearts}</span>
          </div>
        </div>

        <Card className="border-primary/20">
          <CardContent className="p-8 text-center space-y-4">
            <Sparkles className="w-10 h-10 text-primary mx-auto" />
            <h2 className="text-xl font-bold">{lesson.title}</h2>
            <p className="text-muted-foreground text-sm">{lesson.exerciseCount} exercícios</p>
            {hasBeenCompleted && (
              <p className="text-xs text-green-400">✓ Lição já concluída</p>
            )}
            <Button className="w-full" onClick={() => setShowIntro(true)}>
              {hasBeenCompleted ? 'Praticar novamente' : 'Começar lição'}
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  // ── Intro screen ──
  if (showIntro && !started) {
    return (
      <LessonIntroScreen
        intro={intro ?? {
          explanation: "Hora de praticar! Você já viu esse conteúdo antes. Vamos ver o que você lembra.",
          howToAnswer: "Leia a pergunta e escolha a melhor resposta.",
          tip: undefined,
        }}
        lessonTitle={lesson.title}
        unitTitle={unit?.title}
        hearts={progress.hearts}
        onStart={generateExercises}
      />
    )
  }

  // ── Result screen ──
  if (showResult) {
    const total = exercises?.length ?? 1
    const pct = Math.round((correctCount / total) * 100)
    return (
      <main className="space-y-4 py-4 px-4 max-w-2xl mx-auto">
        <Card className="border-primary/20">
          <CardContent className="p-8 text-center space-y-4">
            <Sparkles className={`w-12 h-12 mx-auto ${pct >= 80 ? 'text-yellow-400' : 'text-primary'}`} />
            <h2 className="text-xl font-bold">
              {pct === 100 ? 'Perfeito!' : pct >= 80 ? 'Excelente!' : pct >= 50 ? 'Bom trabalho!' : 'Continue treinando!'}
            </h2>
            <p className="text-muted-foreground">
              Você acertou {correctCount} de {total} ({pct}%)
            </p>
            <p className="text-2xl font-bold text-yellow-400">+{correctCount * 10} XP</p>
            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" onClick={() => { setShowIntro(true); setStarted(false); setShowResult(false); }}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Recomeçar
              </Button>
              <Button asChild>
                <Link href="/trilha">Voltar</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  // ── Exercise screen ──
  return (
    <main className="space-y-4 py-4 px-4 max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-4">
          {exercises && currentIndex < exercises.length && (
            <ExerciseCard
              key={currentIndex}
              exercise={exercises[currentIndex]}
              index={currentIndex}
              total={exercises.length}
              onAnswer={handleAnswer}
            />
          )}
        </CardContent>
      </Card>
    </main>
  )
}
