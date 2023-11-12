import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GameExpenseDataType } from '@/models/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { createClient } from '@/utils/supabase/server'
import { MoreVertical, Trash } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export function GameExpense({ expense }: { expense: GameExpenseDataType }) {
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

    revalidatePath('game')

    return data || []
  }

  return (
    <div
      key={expense.id}
      className="flex flex-row items-center justify-between py-3 border-t"
    >
      <span>{expense.expenses.description}</span>
      <strong className="ml-auto mr-2">
        {formatCurrencyBRL(expense.expenses.price)}
      </strong>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2">
          <MoreVertical className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Editar</DropdownMenuItem>
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
    </div>
  )
}
