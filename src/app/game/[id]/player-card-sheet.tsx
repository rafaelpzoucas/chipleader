'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import type { Game, Player } from '@/store/game-store'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { getCaixaAmount, getPrizeDistribution, getPrizeForPlacing } from '@/utils/prize'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ManagePlayerSheet } from './manage-player-sheet'

type Props = {
  game: Game
  player: Player
  placing: number
  totalPayout: number
  prizeSplit: boolean
}

export function PlayerCardSheet({
  game,
  player,
  placing,
  totalPayout,
  prizeSplit,
}: Props) {
  const [amountSpent, setAmountSpent] = useState(player.amountSpent)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    setAmountSpent(player.amountSpent)
  }, [player.amountSpent])

  const isBusted = player.bustedAt !== null && game.status === 'active'

  const totalExpensesPrice = game.expenses.reduce((acc, e) => acc + e.price, 0)
  const totalExpensesEach =
    game.players.length > 0 ? totalExpensesPrice / game.players.length : 0

  const distribution = getPrizeDistribution(game)
  const caixaAmount = getCaixaAmount(totalPayout, game.caixaType, game.caixaPercentage, game.caixaFixed)
  const effectiveTotal = totalPayout - caixaAmount
  const prize = game.status === 'finished' ? getPrizeForPlacing(placing, distribution, effectiveTotal, prizeSplit) : 0
  const balance = player.amountPaid + prize - player.amountSpent - totalExpensesEach
  const totalSpent = player.amountSpent + totalExpensesEach

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="w-full" asChild>
        <Card
          className={cn(
            'p-4 w-full',
            isBusted && 'bg-muted text-muted-foreground',
          )}
        >
          <header className="relative flex flex-row items-center gap-4 w-full">
            <Avatar className={cn(isBusted && 'opacity-50')}>
              <AvatarFallback>
                {player.name ? (
                  player.name[0]
                ) : (
                  <User className="w-4 h-4" />
                )}
              </AvatarFallback>
            </Avatar>

            <div className="text-left max-w-[140px] truncate">
              <strong>
                {player.name.split(' ')[0] || 'Anônimo'}
              </strong>
            </div>

            <div className="flex flex-col ml-auto text-xs text-right">
              <span className="text-muted-foreground">
                {formatCurrencyBRL(totalSpent * -1)}
              </span>
              {balance !== 0 ? (
                <strong className="text-sm">{formatCurrencyBRL(balance)}</strong>
              ) : (
                <strong className="text-sm text-green-500 uppercase">pago</strong>
              )}
            </div>
          </header>
        </Card>
      </SheetTrigger>
      <SheetContent side="bottom" className="flex flex-col gap-5">
        <ManagePlayerSheet
          game={game}
          player={player}
          amountSpent={amountSpent}
          expensesEach={totalExpensesEach}
          setAmountSpent={setAmountSpent}
          setIsSheetOpen={setIsSheetOpen}
          placing={placing}
          totalPayout={totalPayout}
          prizeSplit={prizeSplit}
        />
      </SheetContent>
    </Sheet>
  )
}
