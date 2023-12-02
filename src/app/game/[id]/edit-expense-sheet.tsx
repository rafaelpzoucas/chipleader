'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { GameExpenseDataType, GamePlayerDataType } from '@/models/games'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { ExpensesForm } from './expenses-form'

type EditExpenseSheetPropsType = {
  players: GamePlayerDataType[]
  expense: GameExpenseDataType
}

export function EditExpenseSheet({
  players,
  expense,
}: EditExpenseSheetPropsType) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          <Plus className="w-4 h-4 mr-2" />
          Editar despesa
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Nova despesa</SheetTitle>
        </SheetHeader>

        <ExpensesForm
          onOpenSheetChange={setIsOpen}
          players={players}
          gameId={expense.game_id}
          expenseId={expense.id}
          defaultValues={expense}
          currentPlayerId={expense.game_player_id}
        />
      </SheetContent>
    </Sheet>
  )
}
