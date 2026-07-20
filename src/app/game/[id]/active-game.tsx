'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Game } from '@/store/game-store'
import { useGameStore } from '@/store/game-store'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { getCaixaAmount, getPrizeDistribution } from '@/utils/prize'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { CreateExpenseSheet } from './create-expense-sheet'
import { GameExpenseList } from './game-expense-list'
import { GameOptions } from './game-options'
import { GameWinnings } from './game-winnings'
import { InvitePlayersSheet } from './invite-players-sheet'
import RealTimeGamePlayers from './real-time-game-players'

export default function ActiveGame({ game }: { game: Game }) {
  const totalPayout = game.players.reduce((acc, p) => acc + p.amountSpent, 0)
  const totalExpensesPrice = game.expenses.reduce((acc, e) => acc + e.price, 0)
  const totalExpensesEach =
    game.players.length > 0 ? totalExpensesPrice / game.players.length : 0
  const distribution = getPrizeDistribution(game)
  const caixaAmount = getCaixaAmount(totalPayout, game.caixaType, game.caixaPercentage, game.caixaFixed)

  return (
    <div className="space-y-8">
      <header className="flex flex-row items-center">
        <Link href="/dashboard" className="p-3">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold">Jogo ativo agora</h1>
        <GameOptions game={game} />
      </header>

      <div className="flex flex-row items-center justify-center gap-2 -mt-6">
        <Badge variant="secondary">Buy-in {formatCurrencyBRL(game.buyIn)}</Badge>
        {caixaAmount > 0 && (
          <Badge variant="outline">Caixa {formatCurrencyBRL(caixaAmount)}</Badge>
        )}
      </div>

      <GameWinnings
        totalPayout={totalPayout}
        prizeDistribution={distribution}
        caixaType={game.caixaType}
        caixaPercentage={game.caixaPercentage}
        caixaFixed={game.caixaFixed}
      />

      <section className="space-y-2">
        <InvitePlayersSheet gameId={game.id} />
        <RealTimeGamePlayers game={game} totalPayout={totalPayout} />
      </section>

      <section className="space-y-3">
        <header className="flex flex-row items-center justify-between">
          <h1 className="text-lg font-bold">Despesas</h1>
          {totalExpensesPrice > 0 && (
            <span className="text-sm">
              {formatCurrencyBRL(totalExpensesEach)} para cada
            </span>
          )}
        </header>
        <div>
          <GameExpenseList game={game} />
          <CreateExpenseSheet players={game.players} game={game} />
        </div>
      </section>
    </div>
  )
}
