'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Game } from '@/store/game-store'
import { useGameStore } from '@/store/game-store'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { getCaixaAmount } from '@/utils/prize'
import { ArrowLeft, Handshake } from 'lucide-react'
import Link from 'next/link'
import { GameExpenseList } from './game-expense-list'
import { GameOptions } from './game-options'
import { PlayerCardSheet } from './player-card-sheet'
import { PodiumPlayerSheet } from './podium-player-sheet'

export function InactiveGame({ game }: { game: Game }) {
  const togglePrizeSplit = useGameStore((s) => s.togglePrizeSplit)
  const sortedPlayers = [...game.players].sort((a, b) => {
    if (a.bustedAt && b.bustedAt) {
      return new Date(b.bustedAt).getTime() - new Date(a.bustedAt).getTime()
    }
    if (a.bustedAt) return -1
    if (b.bustedAt) return 1
    return 0
  })

  const podiumPlayers = [sortedPlayers[1], sortedPlayers[0], sortedPlayers[2]]

  const totalPayout = game.players.reduce((acc, p) => acc + p.amountSpent, 0)

  const totalExpensesPrice = game.expenses.reduce((acc, e) => acc + e.price, 0)

  const expensesPriceEach =
    game.players.length > 0
      ? totalExpensesPrice / game.players.length
      : 0

  const caixaAmount = getCaixaAmount(totalPayout, game.caixaType, game.caixaPercentage, game.caixaFixed)

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-row gap-2 items-center">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Jogo finalizado</h1>
        <GameOptions game={game} />
      </header>

      <div className="flex flex-row items-center justify-center gap-2 -mt-4">
        <Badge variant="secondary">Buy-in {formatCurrencyBRL(game.buyIn)}</Badge>
        {caixaAmount > 0 && (
          <Badge variant="outline">Caixa {formatCurrencyBRL(caixaAmount)}</Badge>
        )}
      </div>
      <section className="flex flex-row items-center justify-center gap-8 p-4">
        {podiumPlayers.map((player, index) =>
          player ? (
            <PodiumPlayerSheet
              key={player.id}
              game={game}
              player={player}
              index={index}
              placing={index}
              totalPayout={totalPayout}
              prizeSplit={game.prizeSplit}
            />
          ) : null,
        )}
      </section>

      <section className="flex flex-row items-center justify-center">
        <Button
          variant={game.prizeSplit ? 'default' : 'outline'}
          size="sm"
          onClick={() => togglePrizeSplit(game.id)}
          className="gap-2"
        >
          <Handshake className="w-4 h-4" />
          Rachar prêmio
        </Button>
      </section>

      <section className="space-y-2">
        {sortedPlayers.slice(3).map((player, index) => (
          <div key={player.id} className="flex flex-row gap-4 items-center">
            <strong className="w-10">{index + 4}º</strong>
            <PlayerCardSheet
              game={game}
              player={player}
              placing={index + 4}
              totalPayout={totalPayout}
              prizeSplit={game.prizeSplit}
            />
          </div>
        ))}
      </section>
      <section className="space-y-3">
        <header className="flex flex-row items-center justify-between">
          <h1 className="text-lg font-bold">Despesas</h1>
          {totalExpensesPrice > 0 && (
            <span className="text-sm">
              {formatCurrencyBRL(expensesPriceEach)} para cada
            </span>
          )}
        </header>
        <div>
          <GameExpenseList game={game} />
        </div>
      </section>
    </div>
  )
}
