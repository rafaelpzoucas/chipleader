import { UserDataType } from './users'

export type GamePlayerDataType = {
  id: string
  player_id: string
  game_id: string
  busted_at: string
  amount_spent: number
  amount_paid: number
  users: UserDataType
  created_at: string
}

export type GameExpenseDataType = {
  id: string
  created_at: string
  game_id: string
  game_player: string
  description: string
  price: number
}

export type GameDataType = {
  id: string
  payout: number
  status: boolean
  buy_in: number
  game_players: GamePlayerDataType[]
  game_expenses: GameExpenseDataType[]
  created_at: string
}
