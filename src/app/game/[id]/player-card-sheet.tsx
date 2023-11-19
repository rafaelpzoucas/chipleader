'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
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
}

export function PlayerCardSheet({
  player,
  expenses,
  totalPlayers,
}: PlayerCardSheetPropsType) {
  const [amountSpent, setAmountSpent] = useState(player.amount_spent)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const isBusted = player.busted_at !== null

  const totalExpensesPrice = expenses.reduce((acc, expense) => {
    return acc + expense.price
  }, 0)

  const totalExpensesEach = totalExpensesPrice / totalPlayers

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="w-full" asChild>
        <Card
          className={cn(
            'p-4 w-full',
            isBusted && 'bg-muted text-muted-foreground',
          )}
        >
          <header className="relative flex flex-row items-end gap-4 w-full">
            <Avatar className={cn(isBusted && 'opacity-50')}>
              <AvatarImage src={player?.users?.user_metadata?.avatar_url} />
              <AvatarFallback>
                {player?.users?.name[0] ?? <User className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>

            <div className="text-left">
              <strong>
                {player?.users?.name}{' '}
                <span className="text-xs text-muted-foreground">
                  {isBusted && '(Eliminado)'}
                </span>
              </strong>
              <p className="text-muted-foreground text-xs">
                Ganhos {formatCurrencyBRL(player?.users?.cumulative_winnings)}
              </p>
            </div>

            <div className="flex flex-col ml-auto text-sm h-full text-right">
              <strong>
                {formatCurrencyBRL(
                  player.amount_paid - player.amount_spent - totalExpensesEach,
                )}
              </strong>
            </div>
          </header>
        </Card>
      </SheetTrigger>
      <SheetContent side="bottom" className="flex flex-col gap-5">
        <ManagePlayerSheet
          player={player}
          amountSpent={amountSpent}
          expensesEach={totalExpensesEach}
          setAmountSpent={setAmountSpent}
          setIsSheetOpen={setIsSheetOpen}
        />
      </SheetContent>
    </Sheet>
  )
}
