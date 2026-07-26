'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Check, X, Swords, User, Bot } from 'lucide-react'
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

function CardView({ card, used, size = 'md' }: { card: CardDisplay; used?: boolean; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'w-8 h-11' : 'w-10 h-14'
  return (
    <div className={`inline-flex items-center justify-center ${dim} rounded-lg border ${used ? 'border-yellow-400 ring-1 ring-yellow-400/50 bg-yellow-400/10' : 'border-border bg-card'} ${suitColor[card.suit]} transition-all`}>
      <div className="text-center leading-tight">
        <div className="text-sm font-bold">{rankDisplay[card.rank] ?? card.rank}</div>
        <div className="text-xs">{suitSymbol[card.suit]}</div>
      </div>
    </div>
  )
}

function BoardView({ cards, used }: { cards: CardDisplay[]; used: boolean[] }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {cards.map((card, i) => (
        <CardView key={i} card={card} used={used?.[i]} size="md" />
      ))}
    </div>
  )
}

function HoleCards({ cards, used, label }: { cards: CardDisplay[]; used: boolean[]; label: string }) {
  return (
    <div className="flex items-center gap-1">
      {cards.map((card, i) => (
        <CardView key={i} card={card} used={used?.[i]} size="md" />
      ))}
    </div>
  )
}

function TableLayout({ data }: { data: Record<string, unknown> }) {
  const board = data.board as CardDisplay[]
  const heroCards = data.heroCards as CardDisplay[]
  const villainCards = data.villainCards as CardDisplay[]
  const heroDesc = data.heroDesc as string
  const villainDesc = data.villainDesc as string
  const heroHoleUsed = data.heroHoleUsed as boolean[]
  const villainHoleUsed = data.villainHoleUsed as boolean[]
  const heroBoardUsed = data.heroBoardUsed as boolean[]
  const villainBoardUsed = data.villainBoardUsed as boolean[]

  if (!board || !heroCards || !villainCards) return null

  return (
    <div className="bg-muted rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Oponente</span>
        </div>
        <HoleCards cards={villainCards} used={villainHoleUsed} label="Oponente" />
      </div>

      <div className="text-center">
        {villainDesc && <p className="text-xs text-muted-foreground mb-1">— {villainDesc} —</p>}
      </div>

      <div className="bg-background/60 rounded-xl p-4 border border-border">
        <p className="text-center text-xs text-muted-foreground mb-2">Board</p>
        <BoardView cards={board} used={heroBoardUsed} />
      </div>

      <div className="text-center">
        {heroDesc && <p className="text-xs text-muted-foreground mb-1">— {heroDesc} —</p>}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          <span className="text-xs text-muted-foreground">Jogador</span>
        </div>
        <HoleCards cards={heroCards} used={heroHoleUsed} label="Jogador" />
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

  const isCorrect = selected === exercise.correctAnswer
  const progressValue = total > 0 ? Math.min(100, (index / total) * 100) : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Exercício {index + 1}{Number.isFinite(total) ? ` de ${total}` : ''}
        </span>
        {answered && (
          <Badge variant="outline" className={isCorrect ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}>
            {isCorrect ? 'Correto!' : 'Errado!'}
          </Badge>
        )}
      </div>

      <Progress value={progressValue} className="h-1" />

      {exercise.skillTag === 'hand_ranking' && <TableLayout data={exercise.data} />}

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
          <div className={`p-4 rounded-xl text-sm leading-relaxed ${isCorrect ? 'bg-green-500/10 text-green-200' : 'bg-red-500/10 text-red-200'}`}>
            {exercise.explanation}
          </div>
          <Button className="w-full" onClick={() => onAnswer(isCorrect)}>
            {Number.isFinite(total) && index + 1 >= total ? 'Ver resultado' : 'Próximo'}
          </Button>
        </div>
      )}
    </div>
  )
}
