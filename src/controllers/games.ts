import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export type GameDataType = {
  id: string
  payout: number
  status: boolean
  buy_in: number
  game_players: []
  game_expenses: []
  created_at: string
}

const cookieStore = cookies()
const supabase = createClient(cookieStore)

export async function getGames(): Promise<GameDataType[]> {
  const { data: games, error } = await supabase.from('games').select(`
      *,
      game_players (*),
      game_expenses (*)
    `)

  if (error) {
    throw error
  }

  return games || []
}

export async function getActiveGames(): Promise<GameDataType[]> {
  const { data: games, error } = await supabase
    .from('games')
    .select(
      `
      *,
      game_players (*),
      game_expenses (*)
    `,
    )
    .eq('status', 'TRUE')

  if (error) {
    throw error
  }

  return games || []
}

export async function getFinishedGames(): Promise<GameDataType[]> {
  const { data: games, error } = await supabase
    .from('games')
    .select(
      `
      *,
      game_players (*),
      game_expenses (*)
    `,
    )
    .eq('status', 'FALSE')

  if (error) {
    throw error
  }

  return games || []
}
