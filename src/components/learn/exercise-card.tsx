'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Check, X } from 'lucide-react'
import type { Exercise, CardDisplay } from '@/lib/curriculum/types'

const suitSymbol: Record<string, string> = {
  s: '♠', h: '♥', d: '♦', c: '♣',
}

const suitColor: Record<string, string> = {
  s: 'text-gray-200', h: 'text-red-400', d: 'text-blue-400', c: 'text-green-400',
}

const rankDisplay: Record<string, string> = {
  A: 'A', K: 'K', Q: 'Q', J: 'J', T: '10',
  '9': '9', '8': '8', '7': '7', '6': '6',
  '5': '5', '4': '4', '3': '3', '2': '2',
}

function CardView({ card }: { card: CardDisplay }) {
  return (
    <div className={`inline-flex items-center justify-center w-10 h-14 rounded-lg border border-border bg-card ${suitColor[card.suit]}`}>
      <div className="text-center leading-tight">
        <div className="text-sm font-bold">{rankDisplay[card.rank] ?? card.rank}</div>
        <div className="text-xs">{suitSymbol[card.suit]}</div>
      </div>
    </div>
  )
}

function HandRow({ cards, label }: { cards: CardDisplay[]; label?: string }) {
  return (
    <div className="space-y-1">
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <div className="flex items-center gap-1">
        {cards.map((card, i) => (
          <CardView key={i} card={card} />
        ))}
      </div>
    </div>
  )
}

function HandRankingContent({ data }: { data: Record<string, unknown> }) {
  const hand1 = data.hand1 as CardDisplay[] | undefined
  const hand2 = data.hand2 as CardDisplay[] | undefined
  const desc1 = data.hand1Desc as string | undefined
  const desc2 = data.hand2Desc as string | undefined

  return (
    <div className="bg-muted rounded-xl p-5 space-y-4">
      <div>
        <HandRow cards={hand1 ?? []} label="Mão 1" />
        {desc1 && <p className="text-xs text-muted-foreground mt-1">{desc1}</p>}
      </div>
      <div>
        <HandRow cards={hand2 ?? []} label="Mão 2" />
        {desc2 && <p className="text-xs text-muted-foreground mt-1">{desc2}</p>}
      </div>
    </div>
  )
}

export function ExerciseCard({
  exercise,
  index,
  total,
  onAnswer,
}: {
  exercise: Exercise
  index: number
  total: number
  onAnswer: (correct: boolean) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  function handleSelect(i: number) {
    if (answered) return
    setSelected(i)
    setAnswered(true)
  }

  const correct = selected === exercise.correctAnswer
  const progressValue = total > 0 ? (index / total) * 100 : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Exercício {index + 1} de {total}
        </span>
        {answered && (
          <Badge variant="outline" className={correct ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}>
            {correct ? 'Correto!' : 'Errado!'}
          </Badge>
        )}
      </div>

      <Progress value={progressValue} className="h-1" />

      {exercise.skillTag === 'hand_ranking' && (
        <HandRankingContent data={exercise.data} />
      )}

      {exercise.skillTag === 'position' && (
        <div className="bg-muted rounded-xl p-4 flex items-center gap-2 text-sm">
          {exercise.prompt}
        </div>
      )}

      <p className="font-medium">{exercise.prompt}</p>

      <div className="space-y-2">
        {exercise.options?.map((option, i) => {
          let variant: 'outline' | 'default' | 'secondary' = 'outline'
          let className = 'w-full justify-start h-auto py-3 px-4 text-left'

          if (answered) {
            if (i === exercise.correctAnswer) {
              variant = 'default'
              className += ' bg-green-600 hover:bg-green-600'
            } else if (i === selected && i !== exercise.correctAnswer) {
              variant = 'secondary'
              className += ' bg-red-600/20 hover:bg-red-600/20 text-red-400 line-through'
            } else {
              className += ' opacity-50'
            }
          }

          return (
            <Button
              key={i}
              variant={variant}
              className={className}
              onClick={() => handleSelect(i)}
              disabled={answered}
            >
              <span className="flex items-center gap-3 w-full">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-mono flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm">{option}</span>
                {answered && i === exercise.correctAnswer && <Check className="w-4 h-4 ml-auto shrink-0" />}
                {answered && i === selected && i !== exercise.correctAnswer && <X className="w-4 h-4 ml-auto shrink-0" />}
              </span>
            </Button>
          )
        })}
      </div>

      {answered && (
        <div className="space-y-3">
          <div className={`p-4 rounded-xl text-sm leading-relaxed ${correct ? 'bg-green-500/10 text-green-200' : 'bg-red-500/10 text-red-200'}`}>
            {exercise.explanation}
          </div>
          <Button className="w-full" onClick={() => onAnswer(correct)}>
            {index + 1 >= total ? 'Ver resultado' : 'Próximo'}
          </Button>
        </div>
      )}
    </div>
  )
}
