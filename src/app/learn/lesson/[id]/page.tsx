'use client'

import { useState, use } from 'react'
import { notFound, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useLearningStore } from '@/store/learning-store'
import { getLessonById } from '@/data/lessons'
import { categoryInfo } from '@/data/lessons'
import type { Lesson, LessonCategory } from '@/models/learning'
import { ArrowLeft, Check, X, ChevronRight, Sparkles, BookOpen, RotateCcw } from 'lucide-react'
import Link from 'next/link'

function categoryBadgeClass(category: LessonCategory): string {
  const map: Record<LessonCategory, string> = {
    hands: 'bg-green-500/10 text-green-400',
    odds: 'bg-blue-500/10 text-blue-400',
    position: 'bg-purple-500/10 text-purple-400',
  }
  return map[category]
}

function renderContent(content: Lesson['content'][0], index: number) {
  const lines = content.text.split('\n')
  switch (content.type) {
    case 'text':
      return (
        <p key={index} className="text-sm leading-relaxed text-muted-foreground">
          {content.text}
        </p>
      )
    case 'tip':
      return (
        <div key={index} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-sm font-medium text-yellow-400 mb-1">💡 Dica</p>
          <p className="text-sm text-yellow-300/80">{content.text.replace('Dica: ', '')}</p>
        </div>
      )
    case 'example':
      return (
        <div key={index} className="bg-muted rounded-lg p-4">
          <p className="text-sm whitespace-pre-line leading-relaxed">{content.text}</p>
        </div>
      )
  }
}

function QuizQuestion({
  question,
  questionIndex,
  total,
  onAnswer,
}: {
  question: Lesson['questions'][0]
  questionIndex: number
  total: number
  onAnswer: (correct: boolean) => void
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  function handleSelect(index: number) {
    if (answered) return
    setSelectedIndex(index)
    setAnswered(true)
    const correct = index === question.correctIndex
    setTimeout(() => {
      onAnswer(correct)
    }, 1500)
  }

  const isCorrect = selectedIndex === question.correctIndex

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Pergunta {questionIndex + 1} de {total}
        </span>
        <Badge variant="outline" className={isCorrect && answered ? 'bg-green-500/10 text-green-400' : answered ? 'bg-red-500/10 text-red-400' : ''}>
          {answered ? (isCorrect ? 'Correta!' : 'Errada!') : '?'}
        </Badge>
      </div>
      <Progress value={((questionIndex) / total) * 100} className="h-1" />
      <p className="font-medium">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, i) => {
          let variant: 'outline' | 'default' | 'secondary' = 'outline'
          let className = 'w-full justify-start h-auto py-3 px-4 text-left'

          if (answered) {
            if (i === question.correctIndex) {
              variant = 'default'
              className += ' bg-green-600 hover:bg-green-600'
            } else if (i === selectedIndex && i !== question.correctIndex) {
              variant = 'secondary'
              className += ' bg-red-600/20 hover:bg-red-600/20 text-red-400 line-through'
            } else {
              className += ' opacity-50'
            }
          } else if (selectedIndex === i) {
            variant = 'default'
          }

          return (
            <Button
              key={i}
              variant={variant}
              className={className}
              onClick={() => handleSelect(i)}
              disabled={answered}
            >
              <span className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-mono flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm">{option}</span>
                {answered && i === question.correctIndex && <Check className="w-4 h-4 ml-auto shrink-0" />}
                {answered && i === selectedIndex && i !== question.correctIndex && <X className="w-4 h-4 ml-auto shrink-0" />}
              </span>
            </Button>
          )
        })}
      </div>
      {answered && (
        <div className={`p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
          {question.explanation}
        </div>
      )}
    </div>
  )
}

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const lesson = getLessonById(id)
  const { completeLesson, completedLessons } = useLearningStore()

  const [step, setStep] = useState<'content' | 'quiz' | 'result'>('content')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)

  if (!lesson) { notFound(); return null }
  const lessonData = lesson

  const progress = completedLessons[lessonData.id]
  const allAnswered = currentQuestion >= lessonData.questions.length
  const questions = lessonData.questions

  function handleAnswer(correct: boolean) {
    if (correct) setCorrectCount((c) => c + 1)
    const next = currentQuestion + 1
    if (next >= questions.length) {
      completeLesson(lessonData.id, correct ? correctCount + 1 : correctCount, questions.length, lessonData.xpReward)
      setTimeout(() => setStep('result'), 500)
    } else {
      setCurrentQuestion(next)
    }
  }

  function handleRestart() {
    setStep('content')
    setCurrentQuestion(0)
    setCorrectCount(0)
    setQuizStarted(false)
  }

  return (
    <main className="space-y-4 py-4 px-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Link href="/learn">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold truncate">{lessonData.title}</h1>
          <Badge variant="outline" className={categoryBadgeClass(lessonData.category)}>
            {categoryInfo[lessonData.category].title}
          </Badge>
        </div>
      </div>

      {step === 'result' && (
        <Card className="border-primary/20">
          <CardContent className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              {correctCount === questions.length ? (
                <Sparkles className="w-12 h-12 text-yellow-400" />
              ) : (
                <BookOpen className="w-12 h-12 text-primary" />
              )}
            </div>
            <h2 className="text-xl font-bold">
              {correctCount === questions.length ? 'Perfeito!' : 'Bom treino!'}
            </h2>
            <p className="text-muted-foreground">
              Você acertou {correctCount} de {questions.length} perguntas
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-bold text-yellow-400">+{lessonData.xpReward} XP</span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Recomeçar
              </Button>
              <Button asChild>
                <Link href="/learn">
                  Voltar
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'content' && !progress && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conteúdo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lessonData.content.map((c, i) => renderContent(c, i))}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                setStep('quiz')
                setQuizStarted(true)
              }}
            >
              Começar Quiz
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 'content' && progress && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conteúdo</CardTitle>
            <CardDescription>Você já completou esta lição ({progress.correctAnswers}/{progress.totalQuestions})</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lessonData.content.map((c, i) => renderContent(c, i))}
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button
              className="flex-1"
              variant="outline"
              onClick={handleRestart}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Refazer
            </Button>
            <Button asChild className="flex-1">
              <Link href="/learn">Voltar</Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      {(step === 'quiz' || step === 'result') && step !== 'result' && (
        <Card>
          <CardContent className="p-4">
            {currentQuestion < questions.length && (
              <QuizQuestion
                question={questions[currentQuestion]}
                questionIndex={currentQuestion}
                total={questions.length}
                onAnswer={handleAnswer}
              />
            )}
          </CardContent>
        </Card>
      )}
    </main>
  )
}
