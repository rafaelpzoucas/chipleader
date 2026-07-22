'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Swords, MapPin, Banknote, HelpCircle } from 'lucide-react'
import type { Scenario, Card, CardSuit } from '@/models/learning'

const positionGlossary: Record<string, string> = {
  UTG: 'Under the Gun - age primeiro (posição mais inicial)',
  MP: 'Middle Position (posição média)',
  CO: 'Cut-Off (antes do botão)',
  BTN: 'Botão/Dealer - melhor posição (age por último)',
  SB: 'Small Blind ($ cego menor)',
  BB: 'Big Blind ($ cego maior)',
}

const termGlossary: Record<string, string> = {
  'fold': 'Desistir da mão',
  'call': 'Pagar a aposta',
  'raise': 'Aumentar a aposta',
  'check': 'Passar a vez (sem pagar)',
  'pot odds': 'Relação entre o valor do call e o pote total',
  'outs': 'Cartas que melhoram sua mão',
  'equity': 'Chance de vencer a mão',
  'flush draw': '4 cartas do mesmo naipe, precisa de 1 para flush',
  'straight draw': 'Sequência incompleta',
  'gutshot': 'Sequência de 4 cartas (abertura interna)',
  'overcards': 'Cartas maiores que qualquer carta do board',
  'overpair': 'Par maior que qualquer carta no board',
  'implied odds': 'Ganhos futuros esperados se acertar o draw',
  'c-bet': 'Continuação da aposta (quem deu raise pré-flop aposta no flop)',
  'range': 'Conjunto de mãos que o oponente pode ter',
  'value': 'Apostar para ser pago por mãos piores',
  'bluff': 'Apostar para fazer o oponente foldar mão melhor',
  'semibluff': 'Apostar com um draw que pode virar a melhor mão',
}

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

const rankDisplay: Record<string, string> = {
  A: 'A', K: 'K', Q: 'Q', J: 'J',
  T: '10',
  '9': '9', '8': '8', '7': '7', '6': '6',
  '5': '5', '4': '4', '3': '3', '2': '2',
}

function CardView({ card }: { card: Card }) {
  return (
    <div className={`inline-flex items-center justify-center w-10 h-14 rounded-lg border border-border bg-card ${suitColor[card.suit]}`}>
      <div className="text-center leading-tight">
        <div className="text-sm font-bold">{rankDisplay[card.rank] ?? card.rank}</div>
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
  const [showGlossary, setShowGlossary] = useState(false)

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
          {Number.isFinite(total) ? `Mão ${scenarioIndex + 1} de ${total}` : `Mão #${scenarioIndex + 1}`}
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
          <Button
            variant="ghost"
            size="icon"
            className="w-5 h-5 ml-auto"
            onClick={() => setShowGlossary(!showGlossary)}
          >
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>

        {showGlossary && (
          <div className="space-y-2 text-xs bg-background rounded-lg p-3 border">
            <p className="font-semibold mb-2">Glossário de Posições</p>
            {Object.entries(positionGlossary).map(([key, val]) => (
              <div key={key} className="flex gap-2">
                <span className="font-mono font-bold shrink-0">{key}</span>
                <span className="text-muted-foreground">{val}</span>
              </div>
            ))}
            <p className="font-semibold mt-3 mb-2">Termos de Poker</p>
            {Object.entries(termGlossary).slice(0, 10).map(([key, val]) => (
              <div key={key} className="flex gap-2">
                <span className="font-mono font-bold shrink-0">{key}</span>
                <span className="text-muted-foreground">{val}</span>
              </div>
            ))}
          </div>
        )}

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
            {Number.isFinite(total) && scenarioIndex + 1 >= total ? 'Ver resultado final' : 'Próxima mão'}
          </Button>
        </div>
      )}
    </div>
  )
}
