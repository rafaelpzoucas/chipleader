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
import { GameExpenseDataType, GamePlayerDataType } from '@/models/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { createClient } from '@/utils/supabase/server'
import { CircleDollarSign, MoreVertical, Pencil, Trash } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import {
  decreaseAmountPaid,
  getCurrentAmountPaid,
  getUsersByGame,
} from '../actions'
import { ExpensesForm } from './expenses-form'
import { GameExpensePlayerAvatar } from './game-expense-player-avatar'

type GameExpensePropsType = {
  expense: GameExpenseDataType
}

export async function GameExpense({ expense }: GameExpensePropsType) {
  const players: GamePlayerDataType[] = await getUsersByGame(expense.game_id)

  async function handleRemoveExpense() {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from('game_expenses')
      .delete()
      .eq('id', expense.id)
      .select()

    if (error) {
      throw error
    }

    if (expense.game_player_id) {
      const currentPlayer = await getCurrentAmountPaid(expense.game_player_id)

      const newDecreaseValue = currentPlayer.amount_paid - expense.price

      await decreaseAmountPaid(newDecreaseValue, expense.game_player_id)
    }

    revalidatePath('game')

    return data || []
  }

  return (
    <div
      key={expense.id}
      className="flex flex-row items-center justify-between py-3 border-t"
    >
      {expense.game_player_id ? (
        <GameExpensePlayerAvatar expenseGamePlayerId={expense.game_player_id} />
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
              <form action={handleRemoveExpense}>
                <button
                  type="submit"
                  className="flex flex-row items-center gap-2"
                >
                  <Trash className="w-4 h-4" /> Excluir
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Editar despesa</SheetTitle>
          </SheetHeader>

          <ExpensesForm
            players={players}
            gameId={expense.game_id}
            expenseId={expense.id}
            defaultValues={expense}
            currentPlayerId={expense.game_player_id}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
