'use server'

import { GamePlayerDataType } from '@/models/games'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

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

export async function updateAmountSpent(playerId: string, amountSpent: number) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('game_players')
    .update({ amount_spent: amountSpent })
    .eq('id', playerId)
    .select()

  if (error) {
    throw error
  }

  revalidatePath('game')

  return data || []
}
