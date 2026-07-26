'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, Play } from 'lucide-react'
import type { LessonIntro } from '@/lib/curriculum/content/lesson-intros'

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

function MiniCard({ rank, suit, highlight }: { rank: string; suit: string; highlight?: boolean }) {
  return (
    <div className={`inline-flex items-center justify-center w-8 h-11 rounded-lg border ${highlight ? 'border-yellow-400 ring-1 ring-yellow-400/50 bg-yellow-400/10' : 'border-border bg-card'} ${suitColor[suit]}`}>
      <div className="text-center leading-tight">
        <div className="text-xs font-bold">{rankDisplay[rank] ?? rank}</div>
        <div className="text-[10px]">{suitSymbol[suit]}</div>
      </div>
    </div>
  )
}

function HandRankingExample() {
  return (
    <div className="bg-background/60 rounded-xl p-4 border border-border space-y-3">
      <p className="text-xs text-center text-muted-foreground">Exemplo</p>
      <div className="flex items-center justify-center gap-6">
        <div className="text-center space-y-1">
          <p className="text-[10px] text-muted-foreground">Mão fraca</p>
          <div className="flex gap-0.5 justify-center">
            <MiniCard rank="K" suit="s" />
            <MiniCard rank="7" suit="h" />
            <MiniCard rank="5" suit="d" />
            <MiniCard rank="3" suit="c" />
            <MiniCard rank="2" suit="s" />
          </div>
          <p className="text-[10px] text-muted-foreground">High Card (K)</p>
        </div>
        <span className="text-muted-foreground text-lg font-bold">VS</span>
        <div className="text-center space-y-1">
          <p className="text-[10px] text-muted-foreground">Mão forte</p>
          <div className="flex gap-0.5 justify-center">
            <MiniCard rank="A" suit="h" highlight />
            <MiniCard rank="A" suit="d" highlight />
            <MiniCard rank="9" suit="c" />
            <MiniCard rank="4" suit="s" />
            <MiniCard rank="2" suit="h" />
          </div>
          <p className="text-[10px] text-green-400">Pair, A&apos;s (vence!)</p>
        </div>
      </div>
    </div>
  )
}

function PositionExample() {
  const seats = [
    { label: 'UTG', x: 50, y: 5, desc: '1º a agir' },
    { label: 'HJ', x: 80, y: 20, desc: '2º' },
    { label: 'CO', x: 90, y: 50, desc: '3º' },
    { label: 'BTN', x: 80, y: 80, desc: 'Melhor!' },
    { label: 'SB', x: 50, y: 95, desc: 'Paga pouco' },
    { label: 'BB', x: 20, y: 80, desc: 'Paga muito' },
  ]
  return (
    <div className="bg-background/60 rounded-xl p-4 border border-border">
      <p className="text-xs text-center text-muted-foreground mb-3">Mesa 6-max</p>
      <div className="relative w-full aspect-[4/3] max-w-[260px] mx-auto">
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-border flex items-center justify-center">
          <span className="text-[10px] text-muted-foreground">MESA</span>
        </div>
        {seats.map(s => (
          <div
            key={s.label}
            className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold">
              {s.label}
            </div>
            <span className="text-[8px] text-muted-foreground mt-0.5 whitespace-nowrap">{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PotOddsExample() {
  return (
    <div className="bg-background/60 rounded-xl p-4 border border-border space-y-2">
      <p className="text-xs text-center text-muted-foreground">Exemplo</p>
      <div className="flex items-center justify-center gap-4 text-sm">
        <div className="text-center">
          <p className="text-muted-foreground">Pote</p>
          <p className="text-lg font-bold text-yellow-400">R$ 100</p>
        </div>
        <span className="text-2xl text-muted-foreground">+</span>
        <div className="text-center">
          <p className="text-muted-foreground">Aposta</p>
          <p className="text-lg font-bold text-red-400">R$ 50</p>
        </div>
        <span className="text-2xl text-muted-foreground">=</span>
        <div className="text-center">
          <p className="text-muted-foreground">Total</p>
          <p className="text-lg font-bold">R$ 200</p>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground bg-muted rounded-lg p-2">
        Pot Odds = 50 ÷ 200 = <strong className="text-foreground">25%</strong>
      </div>
    </div>
  )
}

function TerminologyExample() {
  const terms = [
    { letter: 'F', term: 'Fold', def: 'Desistir' },
    { letter: 'C', term: 'Call', def: 'Pagar' },
    { letter: 'R', term: 'Raise', def: 'Aumentar' },
    { letter: 'X', term: 'Check', def: 'Passar' },
  ]
  return (
    <div className="bg-background/60 rounded-xl p-4 border border-border">
      <p className="text-xs text-center text-muted-foreground mb-2">Ações básicas</p>
      <div className="grid grid-cols-2 gap-2">
        {terms.map(t => (
          <div key={t.letter} className="flex items-center gap-2 bg-muted rounded-lg p-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
              {t.letter}
            </div>
            <div>
              <p className="text-xs font-medium">{t.term}</p>
              <p className="text-[10px] text-muted-foreground">{t.def}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LessonIntroScreen({
  intro,
  lessonTitle,
  unitTitle,
  onStart,
}: {
  intro: LessonIntro
  lessonTitle: string
  unitTitle?: string
  onStart: () => void
}) {
  return (
    <main className="space-y-4 py-4 px-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold truncate">{lessonTitle}</h1>
          {unitTitle && <p className="text-xs text-muted-foreground">{unitTitle}</p>}
        </div>
      </div>

      <Card className="border-primary/20">
        <CardContent className="p-5 space-y-4">
          <h2 className="text-base font-bold">📖 Como funciona</h2>

          <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
            {intro.explanation.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {intro.visualType === 'hand_ranking' && <HandRankingExample />}
          {intro.visualType === 'position' && <PositionExample />}
          {intro.visualType === 'pot_odds' && <PotOddsExample />}
          {intro.visualType === 'terminology' && <TerminologyExample />}

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-400">
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium">Como responder</span>
            </div>
            <p className="text-sm text-blue-200/80">{intro.howToAnswer}</p>
          </div>

          {intro.tip && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-sm text-yellow-200/80">{intro.tip}</p>
            </div>
          )}

          <Button className="w-full" size="lg" onClick={onStart}>
            Entendi! Vamos praticar
            <Play className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
