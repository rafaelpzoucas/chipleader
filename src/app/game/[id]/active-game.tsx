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
import { ArrowLeft, PencilLine } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { CurrencyInput } from 'react-currency-mask'
import { CreateExpenseSheet } from './create-expense-sheet'
import { GameExpenseList } from './game-expense-list'
import { GameOptions } from './game-options'
import { GameWinnings } from './game-winnings'
import { InvitePlayersSheet } from './invite-players-sheet'
import RealTimeGamePlayers from './real-time-game-players'

export default function ActiveGame({ game }: { game: Game }) {
  const updateBuyIn = useGameStore((s) => s.updateBuyIn)
  const [buyInValue, setBuyInValue] = useState(game.buyIn)
  const [isBuyInSheetOpen, setIsBuyInSheetOpen] = useState(false)

  const totalPayout = game.players.reduce((acc, p) => acc + p.amountSpent, 0)

  const totalExpensesPrice = game.expenses.reduce((acc, e) => acc + e.price, 0)

  const totalExpensesEach =
    game.players.length > 0
      ? totalExpensesPrice / game.players.length
      : 0

  function handleSaveBuyIn() {
    updateBuyIn(game.id, buyInValue)
    setIsBuyInSheetOpen(false)
  }

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
        <span className="text-sm text-muted-foreground">
          Buy-in: <strong>{formatCurrencyBRL(game.buyIn)}</strong>
        </span>
        <Sheet open={isBuyInSheetOpen} onOpenChange={setIsBuyInSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="w-5 h-5">
              <PencilLine className="w-3.5 h-3.5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-full sm:h-fit">
            <SheetHeader>
              <SheetTitle>Alterar buy-in</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-4">
              <CurrencyInput
                value={buyInValue}
                onChangeValue={(_, value) => setBuyInValue(Number(value))}
                InputElement={
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    inputMode="numeric"
                  />
                }
              />
              <Button className="w-full" onClick={handleSaveBuyIn}>
                Salvar
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <GameWinnings winners={game.winnersAmount} totalPayout={totalPayout} />

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
