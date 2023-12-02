import { GameExpenseDataType } from '@/models/games'
import { create } from 'zustand'

type UseGameExpensesType = {
  gameExpenses: GameExpenseDataType[]
  isExpenseFormOpen: boolean

  setIsExpenseFormOpen: () => void
}

export const useGameExpenses = create<UseGameExpensesType>((set) => ({
  gameExpenses: [],
  isExpenseFormOpen: false,

  setIsExpenseFormOpen: () => set((state) => ({ isExpenseFormOpen: !state })),
}))
