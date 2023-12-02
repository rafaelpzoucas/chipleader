'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { GameDataType, GamePlayerDataType } from '@/models/games'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { ExpensesForm } from './expenses-form'

type CreateExpenseSheetPropsType = {
  players: GamePlayerDataType[]
  game: GameDataType
}

export function CreateExpenseSheet({
  players,
  game,
}: CreateExpenseSheetPropsType) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          <Plus className="w-4 h-4 mr-2" />
          Despesa
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-full sm:h-fit">
        <SheetHeader>
          <SheetTitle>Nova despesa</SheetTitle>
        </SheetHeader>

        <ExpensesForm
          players={players}
          gameId={game.id}
          onOpenSheetChange={setIsOpen}
        />
      </SheetContent>
    </Sheet>
  )
}
