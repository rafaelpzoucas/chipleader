import { getExpensesByGame } from '@/controllers/game_expenses'
import { GameExpenseDataType } from '@/models/games'
import { create } from 'zustand'

type UseGameExpensesType = {
  gameExpenses: GameExpenseDataType[]

  getExpensesByGame: (gameId: string) => void
}

export const useGameExpenses = create<UseGameExpensesType>((set) => ({
  gameExpenses: [],

  getExpensesByGame: async (gameId: string) => {
    const response = await getExpensesByGame(gameId)

    if (response) {
      set({ gameExpenses: response })
    }
  },
}))
