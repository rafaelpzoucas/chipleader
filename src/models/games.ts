import { ExpenseDataType } from './expenses'
import { UserDataType } from './users'

export type GamePlayerDataType = {
  id: string
  player_id: string
  game_id: string
  busted_at: string
  amount_spent: number
  users: UserDataType
  created_at: string
}

export type GameExpenseDataType = {
  id: string
  created_at: string
  game_id: string
  expense_id: string
  expenses: ExpenseDataType
}

export type GameDataType = {
  id: string
  payout: number
  status: boolean
  buy_in: number
  game_players: GamePlayerDataType[]
  game_expenses: []
  created_at: string
}
