import { getUsersByGame } from '@/controllers/game_players'
import { GamePlayerDataType } from '@/models/games'
import { create } from 'zustand'

type UseGamePlayersType = {
  gamePlayers: GamePlayerDataType[]
  amountSpent: number
  totalPayout: number

  getPlayersByGame: (gameId: string) => void
}

export const useGamePlayers = create<UseGamePlayersType>((set) => ({
  gamePlayers: [],
  amountSpent: 0,
  totalPayout: 0,

  getPlayersByGame: async (gameId: string) => {
    const response = await getUsersByGame(gameId)

    if (response) {
      set({ gamePlayers: response })

      const newTotalPayout = response.reduce((acc, player) => {
        return acc + player.amount_spent
      }, 0)

      set({ totalPayout: newTotalPayout })
    }
  },
}))
