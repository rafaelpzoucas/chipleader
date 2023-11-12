import { getGameById } from '@/controllers/games'
import { GameDataType } from '@/models/games'
import { create } from 'zustand'

type useGameStoreType = {
  game: GameDataType[]
  payout: number

  getGameById: (gameId: string) => void
  setPayout: (buyIn: number) => void
}

export const useGame = create<useGameStoreType>((set) => ({
  game: [],
  payout: 0,

  getGameById: async (gameId: string) => {
    const response = await getGameById(gameId)

    if (response) {
      set({ game: response })
    }
  },
  setPayout: (buyIn: number) =>
    set((state) => ({ payout: state.payout + buyIn })),
}))
