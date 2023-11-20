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

async function bustLastPlayer(
  gamePlayerId: string,
  winning: number,
  userId: string,
) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('game_players')
    .update({ busted_at: new Date() })
    .eq('id', gamePlayerId)
    .select()

  if (error) {
    throw error
  }

  // const currentPlayer = await supabase
  //   .from('users')
  //   .select('cumulative_winnings')
  //   .eq('id', userId)

  // const cumulativeWinnings = currentPlayer.data
  //   ? currentPlayer.data[0].cumulative_winnings
  //   : 0

  // const updatedWinnings = await supabase
  //   .from('users')
  //   .update({
  //     cumulative_winnings: cumulativeWinnings + winning * 0.5,
  //   })
  //   .eq('id', userId)
  //   .select()

  // if (updatedWinnings.error) {
  //   throw updatedWinnings.error
  // }

  revalidatePath('game')

  return data || []
}

async function verifyBustedPlayersLength(winning: number, userId: string) {
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
    await updateGameStatus(data[0].game_id)

    console.log('primeiro lugar')

    const bustLastPlayerPromise = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          bustLastPlayer(data[0].id, winning, userId)
          resolve('')
        }, 1000)
      })

    await bustLastPlayerPromise()
  }

  revalidatePath('game')

  return data || []
}

export async function bustPlayer(
  gamePlayerId: string,
  bustedAt: Date | null,
  userId: string,
  winning: number,
) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  await updateCumulativeWinnings(winning, userId)

  const { data, error } = await supabase
    .from('game_players')
    .update({ busted_at: bustedAt ? bustedAt.toISOString() : null })
    .eq('id', gamePlayerId)
    .select()

  if (error) {
    throw error
  }

  await verifyBustedPlayersLength(winning, userId)

  revalidatePath('game')

  return data || []
}

export async function updateCumulativeWinnings(
  winning: number,
  userId: string,
) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const players = await supabase
    .from('game_players')
    .select()
    .is('busted_at', null)

  const currentPlayer = await supabase
    .from('users')
    .select('cumulative_winnings')
    .eq('id', userId)

  const cumulativeWinnings = currentPlayer.data
    ? currentPlayer.data[0].cumulative_winnings
    : 0

  if (players.error) {
    throw players.error
  }

  if (players.data.length === 3) {
    const { data, error } = await supabase
      .from('users')
      .update({
        cumulative_winnings: cumulativeWinnings + winning * 0.2,
      })
      .eq('id', userId)
      .select()

    if (error) {
      throw error
    }

    return data || []
  }

  if (players.data.length === 2) {
    const { data, error } = await supabase
      .from('users')
      .update({
        cumulative_winnings: cumulativeWinnings + winning * 0.3,
      })
      .eq('id', userId)
      .select()

    if (error) {
      throw error
    }

    return data || []
  }

  if (players.data.length === 1) {
    const { data, error } = await supabase
      .from('users')
      .update({
        cumulative_winnings: cumulativeWinnings + winning * 0.5,
      })
      .eq('id', userId)
      .select()

    if (error) {
      throw error
    }

    return data || []
  }

  revalidatePath('game')
}
