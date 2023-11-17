import { GameDataType } from '@/models/games'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

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

export async function getGameById(id: string): Promise<GameDataType[]> {
  const { data: games, error } = await supabase
    .from('games')
    .select(
      `
      *,
      game_players(*),
      game_expenses(*)
    `,
    )
    .eq('id', id)

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

export async function createGame(buyIn: number) {
  const { data, error } = await supabase
    .from('games')
    .insert([{ buy_in: buyIn }])
    .select()

  if (error) {
    console.log(error)
  }

  return data || []
}

export async function updateGameStatus(gameId: string) {
  const { data: games, error } = await supabase
    .from('games')
    .update({ status: false })
    .eq('id', gameId)
    .select()

  if (error) {
    throw error
  }

  return games || []
}
