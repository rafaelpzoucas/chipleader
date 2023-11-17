'use server'

import {
  GameDataType,
  GameExpenseDataType,
  GamePlayerDataType,
} from '@/models/games'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function getGameById(id: string): Promise<GameDataType[]> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

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

export async function getUsersByGame(
  id: string,
): Promise<GamePlayerDataType[]> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: users, error } = await supabase
    .from('game_players')
    .select(
      `
      *,
      users(*)
    `,
    )
    .eq('game_id', id)
    .order('busted_at', { ascending: false })

  if (error) {
    throw error
  }

  return users || []
}

export async function getExpensesByGame(
  id: string,
): Promise<GameExpenseDataType[]> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: expenses, error } = await supabase
    .from('game_expenses')
    .select(
      `
      *,
      expenses(*)
    `,
    )
    .eq('game_id', id)

  if (error) {
    throw error
  }

  return expenses || []
}
