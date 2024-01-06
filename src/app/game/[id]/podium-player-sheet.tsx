'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { GameExpenseDataType, GamePlayerDataType } from '@/models/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { User } from 'lucide-react'
import { useState } from 'react'
import { ManagePlayerSheet } from './manage-player-sheet'

type PlayerCardSheetPropsType = {
  player: GamePlayerDataType
  expenses: GameExpenseDataType[]
  totalPlayers: number
  gameStatus: boolean
  gameWinnersAmount: 3 | 4
  payout: number
  index: number
  placing: number
}

export function PodiumPlayerSheet({
  player,
  expenses,
  totalPlayers,
  gameStatus,
  gameWinnersAmount,
  payout,
  index,
  placing,
}: PlayerCardSheetPropsType) {
  const [amountSpent, setAmountSpent] = useState(player?.amount_spent)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const playerName = player?.users?.user_metadata?.name

  const totalExpensesPrice = expenses.reduce((acc, expense) => {
    return acc + expense.price
  }, 0)

  const totalExpensesEach =
    totalPlayers > 0 ? totalExpensesPrice / totalPlayers : 0

  function calculatePayout(index: number, amountSpent: number) {
    const percentages = [0.3, 0.5, 0.2]
    const percentage = percentages[index] || 0
    const fourthPlaceDiscounts = [15, 25, 10]
    const fourthPlaceDiscount = fourthPlaceDiscounts[index]
    const balance =
      gameWinnersAmount === 3
        ? payout * percentage +
          player.amount_paid -
          totalExpensesEach -
          amountSpent
        : payout * percentage -
          fourthPlaceDiscount +
          player.amount_paid -
          totalExpensesEach -
          amountSpent

    return balance
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="w-full" asChild>
        <div key={player?.id} className="flex flex-col items-center">
          <p className="text-muted-foreground text-xs mb-3">
            {index === 0 ? '2' : index === 1 ? '1' : '3'}º lugar
          </p>
          <Avatar className={cn(index === 1 && 'w-16 h-16')}>
            <AvatarImage src={player?.users?.user_metadata?.avatar_url} />
            <AvatarFallback>
              {playerName ? playerName[0] : <User className="w-4 h-4" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <strong>{playerName.split(' ')[0]}</strong>
            <strong
              className={cn(
                calculatePayout(index, player?.amount_spent) < 0 &&
                  'text-destructive',
                calculatePayout(index, player?.amount_spent) >= 0 &&
                  'text-emerald-600',
              )}
            >
              {calculatePayout(index, player?.amount_spent) !== 0
                ? formatCurrencyBRL(
                    calculatePayout(index, player?.amount_spent),
                  )
                : 'PAGO'}
            </strong>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="flex flex-col gap-5">
        <ManagePlayerSheet
          player={player}
          amountSpent={amountSpent}
          expensesEach={totalExpensesEach}
          setAmountSpent={setAmountSpent}
          setIsSheetOpen={setIsSheetOpen}
          gameStatus={gameStatus}
          gameWinnersAmount={gameWinnersAmount}
          payout={payout}
          placing={placing}
        />
      </SheetContent>
    </Sheet>
  )
}
