import { getGameById } from '@/app/game/actions'
import { createGame } from '@/controllers/games'
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
  createGame: async (buyIn: number) => {
    const response = await createGame(buyIn)

    if (response) {
      console.log('created')
    }
  },
  setPayout: (buyIn: number) =>
    set((state) => ({ payout: state.payout + buyIn })),
}))
