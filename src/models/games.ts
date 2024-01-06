import { UserDataType } from './users'

export type GamePlayerDataType = {
  id: string
  user_id: string
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
  game_player_id: string
  description: string
  price: number
}

export type GameDataType = {
  id: string
  payout: number
  status: boolean
  buy_in: number
  winners_amount: 3 | 4
  game_players: GamePlayerDataType[]
  game_expenses: GameExpenseDataType[]
  created_at: string
}
