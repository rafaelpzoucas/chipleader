'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
  index: number
  placing: number
  totalPayout: number
  prizeSplit: boolean
}

export function PodiumPlayerSheet({
  game,
  player,
  index,
  placing,
  totalPayout,
  prizeSplit,
}: Props) {
  const [amountSpent, setAmountSpent] = useState(player.amountSpent)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    setAmountSpent(player.amountSpent)
  }, [player.amountSpent])

  const playerName = player.name

  const totalExpensesPrice = game.expenses.reduce((acc, e) => acc + e.price, 0)
  const totalExpensesEach =
    game.players.length > 0 ? totalExpensesPrice / game.players.length : 0

  const distribution = getPrizeDistribution(game)
  const caixaAmount = getCaixaAmount(totalPayout, game.caixaType, game.caixaPercentage, game.caixaFixed)
  const effectiveTotal = totalPayout - caixaAmount

  const netPrize = getPrizeForPlacing(index, distribution, effectiveTotal, prizeSplit)
    + player.amountPaid - player.amountSpent - totalExpensesEach

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="w-full" asChild>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground text-xs mb-3">
            {index === 0 ? '2' : index === 1 ? '1' : '3'}º lugar
          </p>
          <Avatar className={cn(index === 1 && 'w-16 h-16')}>
            <AvatarFallback>
              {playerName ? playerName[0] : <User className="w-4 h-4" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <strong>{playerName.split(' ')[0]}</strong>
            <strong
              className={cn(
                netPrize < 0 && 'text-destructive',
                netPrize >= 0 && 'text-emerald-600',
              )}
            >
              {netPrize !== 0
                ? formatCurrencyBRL(netPrize)
                : 'PAGO'}
            </strong>
          </div>
        </div>
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
