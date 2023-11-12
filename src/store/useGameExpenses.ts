import { GameExpenseDataType } from '@/models/games'
import { create } from 'zustand'

type UseGameExpensesType = {
  gameExpenses: GameExpenseDataType[]
}

export const useGameExpenses = create<UseGameExpensesType>((set) => ({
  gameExpenses: [],
}))
