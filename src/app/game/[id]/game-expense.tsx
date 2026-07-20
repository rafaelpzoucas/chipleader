'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Game, Expense } from '@/store/game-store'
import { useGameStore } from '@/store/game-store'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { CircleDollarSign, MoreVertical, Pencil, Trash } from 'lucide-react'
import { ExpensesForm } from './expenses-form'

type GameExpenseProps = {
  game: Game
  expense: Expense
}

export function GameExpense({ game, expense }: GameExpenseProps) {
  const removeExpense = useGameStore((s) => s.removeExpense)
  const decreaseAmountPaid = useGameStore((s) => s.decreaseAmountPaid)
  const player = game.players.find((p) => p.id === expense.playerId)

  function handleRemoveExpense() {
    removeExpense(game.id, expense.id)

    if (expense.playerId) {
      const currentPlayer = game.players.find(
        (p) => p.id === expense.playerId,
      )
      if (currentPlayer) {
        const newValue = currentPlayer.amountPaid - expense.price
        decreaseAmountPaid(game.id, expense.playerId, newValue)
      }
    }
  }

  return (
    <div className="flex flex-row items-center justify-between py-3 border-t">
      {expense.playerId && player ? (
        <Avatar className="w-8 h-8 mr-3">
          <AvatarFallback>{player.name[0]}</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-8 h-8 mr-3">
          <AvatarFallback>
            <CircleDollarSign className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <span>{expense.description}</span>

      <strong className="ml-auto mr-2">
        {formatCurrencyBRL(expense.price)}
      </strong>

      <Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2">
            <MoreVertical className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <SheetTrigger>
                <Pencil className="w-4 h-4 mr-2" /> Editar
              </SheetTrigger>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <button
                type="button"
                onClick={handleRemoveExpense}
                className="flex flex-row items-center gap-2"
              >
                <Trash className="w-4 h-4" /> Excluir
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Editar despesa</SheetTitle>
          </SheetHeader>

          <ExpensesForm
            players={game.players}
            gameId={game.id}
            expenseId={expense.id}
            defaultValues={expense}
            currentPlayerId={expense.playerId ?? undefined}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
