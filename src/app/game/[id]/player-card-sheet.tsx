'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { GamePlayerDataType } from '@/models/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { useState } from 'react'
import { ManagePlayerSheet } from './manage-player-sheet'

export function PlayerCardSheet({ player }: { player: GamePlayerDataType }) {
  const [amountSpent, setAmountSpent] = useState(player.amount_spent)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const isBusted = player.busted_at !== null

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
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{player.users.name[0]}</AvatarFallback>
            </Avatar>

            <div className="text-left">
              <strong>
                {player.users.name}{' '}
                <span className="text-xs text-muted-foreground">
                  {isBusted && '(Eliminado)'}
                </span>
              </strong>
              <p className="text-muted-foreground text-xs">
                Ganhos {formatCurrencyBRL(player.users.cumulative_winnings)}
              </p>
            </div>

            <div className="flex flex-col ml-auto text-sm h-full">
              <strong>{formatCurrencyBRL(amountSpent)}</strong>
            </div>
          </header>
        </Card>
      </SheetTrigger>
      <SheetContent side="bottom" className="flex flex-col gap-5">
        <ManagePlayerSheet
          player={player}
          amountSpent={amountSpent}
          setAmountSpent={setAmountSpent}
          setIsSheetOpen={setIsSheetOpen}
        />
      </SheetContent>
    </Sheet>
  )
}
