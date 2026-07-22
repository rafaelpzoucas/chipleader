'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Swords, MapPin, Banknote } from 'lucide-react'
import type { Scenario, Card, CardSuit } from '@/models/learning'

const suitSymbol: Record<CardSuit, string> = {
  s: '♠',
  h: '♥',
  d: '♦',
  c: '♣',
}

const suitColor: Record<CardSuit, string> = {
  s: 'text-gray-200',
  h: 'text-red-400',
  d: 'text-blue-400',
  c: 'text-green-400',
}

function CardView({ card }: { card: Card }) {
  return (
    <div className={`inline-flex items-center justify-center w-10 h-14 rounded-lg border border-border bg-card ${suitColor[card.suit]}`}>
      <div className="text-center leading-tight">
        <div className="text-sm font-bold">{card.rank}</div>
        <div className="text-xs">{suitSymbol[card.suit]}</div>
      </div>
    </div>
  )
}

function BoardView({ cards }: { cards: Card[] }) {
  return (
    <div className="flex items-center gap-1.5">
      {cards.map((card, i) => (
        <CardView key={i} card={card} />
      ))}
    </div>
  )
}

function HandView({ cards }: { cards: [Card, Card] }) {
  return (
    <div className="flex items-center gap-1.5">
      {cards.map((card, i) => (
        <CardView key={i} card={card} />
      ))}
    </div>
  )
}

export function ScenarioQuestion({
  scenario,
  scenarioIndex,
  total,
  onComplete,
}: {
  scenario: Scenario
  scenarioIndex: number
  total: number
  onComplete: (correct: boolean) => void
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  function handleSelect(index: number) {
    if (answered) return
    setSelectedIndex(index)
    setAnswered(true)
  }

  const isCorrect = selectedIndex === scenario.correctIndex

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Mão {scenarioIndex + 1} de {total}
        </span>
        {answered && (
          <Badge variant="outline" className={isCorrect ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}>
            {isCorrect ? 'Boa decisão!' : 'Não ideal'}
          </Badge>
        )}
      </div>

      <div className="bg-muted rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>Sua posição: <strong className="text-foreground">{scenario.heroPosition}</strong></span>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1.5">Sua mão</p>
          <HandView cards={scenario.heroCards} />
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1.5">Board</p>
          <BoardView cards={scenario.board} />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Swords className="w-4 h-4" />
          <span>{scenario.villainAction}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Banknote className="w-4 h-4" />
          <span>Pote: <strong className="text-foreground">R$ {scenario.potSize}</strong></span>
        </div>
      </div>

      <p className="font-medium">{scenario.question}</p>

      <div className="space-y-2">
        {scenario.options.map((option, i) => {
          let variant: 'outline' | 'default' | 'secondary' = 'outline'
          let className = 'w-full justify-start h-auto py-3 px-4 text-left'

          if (answered) {
            if (i === scenario.correctIndex) {
              variant = 'default'
              className += ' bg-green-600 hover:bg-green-600'
            } else if (i === selectedIndex && i !== scenario.correctIndex) {
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
              <span className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-mono flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm">{option}</span>
                {answered && i === scenario.correctIndex && <Check className="w-4 h-4 ml-auto shrink-0" />}
                {answered && i === selectedIndex && i !== scenario.correctIndex && <X className="w-4 h-4 ml-auto shrink-0" />}
              </span>
            </Button>
          )
        })}
      </div>

      {answered && (
        <div className="space-y-3">
          <div className={`p-4 rounded-xl text-sm leading-relaxed ${isCorrect ? 'bg-green-500/10 text-green-200' : 'bg-red-500/10 text-red-200'}`}>
            {scenario.explanation}
          </div>
          {!isCorrect && (
            <div className="p-4 rounded-xl text-sm leading-relaxed bg-blue-500/10 text-blue-200">
              <p className="font-medium mb-1">💭 Alternativa correta: {scenario.options[scenario.correctIndex]}</p>
              {scenario.alternativeAnalysis}
            </div>
          )}
          <Button className="w-full" onClick={() => onComplete(isCorrect)}>
            {scenarioIndex + 1 >= total ? 'Ver resultado final' : 'Próxima mão'}
          </Button>
        </div>
      )}
    </div>
  )
}
