'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import type { Game, Player } from '@/store/game-store'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { User } from 'lucide-react'
import { useState } from 'react'
import { ManagePlayerSheet } from './manage-player-sheet'

type Props = {
  game: Game
  player: Player
  placing: number
  totalPayout: number
}

export function PlayerCardSheet({
  game,
  player,
  placing,
  totalPayout,
}: Props) {
  const [amountSpent, setAmountSpent] = useState(player.amountSpent)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const isBusted = player.bustedAt !== null && game.status === 'active'

  const totalExpensesPrice = game.expenses.reduce((acc, e) => acc + e.price, 0)
  const totalExpensesEach =
    game.players.length > 0 ? totalExpensesPrice / game.players.length : 0

  const balance =
    game.status === 'finished' && game.winnersAmount === 4 && placing === 4
      ? player.amountPaid - amountSpent - totalExpensesEach + 50
      : player.amountPaid - amountSpent - totalExpensesEach

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

            <div className="text-left max-w-[160px] truncate">
              <strong>
                {player.name.split(' ')[0] || 'Anônimo'}
              </strong>
            </div>

            <div className="flex flex-col ml-auto text-sm h-full text-right">
              {balance !== 0 ? (
                <strong>{formatCurrencyBRL(balance)}</strong>
              ) : (
                <strong className="text-green-500 uppercase">pago</strong>
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
        />
      </SheetContent>
    </Sheet>
  )
}
