'use server'

import { GamePlayerDataType } from '@/models/games'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { updateGameStatus } from './games'

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

async function bustLastPlayer(gamePlayersId: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('game_players')
    .update({ busted_at: new Date() })
    .eq('id', gamePlayersId)
    .select()

  if (error) {
    throw error
  }

  revalidatePath('game')
  console.log('teste', data)

  return data || []
}

async function verifyBustedPlayersLength() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('game_players')
    .select()
    .is('busted_at', null)

  if (error) {
    throw error
  }

  if (data.length === 1) {
    Promise.all([updateGameStatus(data[0].game_id), bustLastPlayer(data[0].id)])
  }

  return data || []
}

export async function bustPlayer(playerId: string, bustedAt: Date | null) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('game_players')
    .update({ busted_at: bustedAt ? bustedAt.toISOString() : null })
    .eq('id', playerId)
    .select()

  if (error) {
    throw error
  }

  await verifyBustedPlayersLength()

  revalidatePath('game')

  return data || []
}
