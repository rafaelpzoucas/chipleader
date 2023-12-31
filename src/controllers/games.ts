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
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return games || []
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
