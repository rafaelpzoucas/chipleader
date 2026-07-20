'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Expense, Player } from '@/store/game-store'
import { useState } from 'react'
import { ExpensesForm } from './expenses-form'

type Props = {
  players: Player[]
  expense: Expense
  gameId: string
}

export function EditExpenseSheet({ players, expense, gameId }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <span>Editar</span>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-full sm:h-fit">
        <SheetHeader>
          <SheetTitle>Editar despesa</SheetTitle>
        </SheetHeader>

        <ExpensesForm
          onOpenSheetChange={setIsOpen}
          players={players}
          gameId={gameId}
          expenseId={expense.id}
          defaultValues={expense}
          currentPlayerId={expense.playerId ?? undefined}
        />
      </SheetContent>
    </Sheet>
  )
}
