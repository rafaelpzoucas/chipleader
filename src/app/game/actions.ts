'use server'

import { z } from 'zod'

import {
  GameDataType,
  GameExpenseDataType,
  GamePlayerDataType,
} from '@/models/games'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { expensesFormSchema } from './[id]/expenses-form'

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

  revalidatePath('game')

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

export async function finishGame(gameId: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('games')
    .update({ status: false })
    .eq('id', gameId)
    .select()

  if (error) {
    throw error
  }

  revalidatePath('game')

  return data || []
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
      *
    `,
    )
    .eq('game_id', id)

  if (error) {
    throw error
  }

  return expenses || []
}

export async function createExpense(
  gameId: string,
  values: z.infer<typeof expensesFormSchema>,
) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { error } = await supabase
    .from('game_expenses')
    .insert([
      {
        game_id: gameId,
        game_player_id: values.gamePlayerId,
        description: values.description,
        price: values.price,
      },
    ])
    .select()

  if (error) {
    throw error
  }

  revalidatePath('game')
}

export async function getExpenseById(expenseId?: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: gameExpense, error } = await supabase
    .from('game_expenses')
    .select('*')
    .eq('id', expenseId)

  if (error) {
    throw error
  }

  return gameExpense[0] || []
}

export async function updateExpense(
  values: z.infer<typeof expensesFormSchema>,
  expenseId?: string,
) {
  const expense = await getExpenseById(expenseId)

  if (expense.game_player_id === values.gamePlayerId) {
    console.log('Essa despesa já está com esse jogador.')
    return
  }

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase
    .from('game_expenses')
    .update({
      game_player_id: values.gamePlayerId,
      description: values.description,
      price: values.price,
    })
    .eq('id', expenseId)
    .select()

  if (error) {
    throw error
  }

  revalidatePath('game')
}

export async function getCurrentAmountPaid(currentPlayerId?: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: gamePlayers, error } = await supabase
    .from('game_players')
    .select('amount_paid')
    .eq('id', currentPlayerId)

  if (error) {
    throw error
  }

  return gamePlayers[0] || []
}

export async function increaseAmountPaid(value: number, gamePlayerId: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('game_players')
    .update({ amount_paid: value })
    .eq('id', gamePlayerId)
    .select()

  if (error) {
    throw error
  }

  revalidatePath('game')

  return data || []
}

export async function decreaseAmountPaid(
  price: number,
  currentGamePlayerId?: string,
) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase
    .from('game_players')
    .update({ amount_paid: price })
    .eq('id', currentGamePlayerId)
    .select()

  if (error) {
    throw error
  }

  revalidatePath('game')
}

export async function bustPlayer(gamePlayerId: string) {
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

  revalidatePath('game')

  return data || []
}

export async function getUnbustedGamePlayers(gameId: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('game_players')
    .select('*')
    .eq('game_id', gameId)
    .is('busted_at', null)

  if (error) {
    throw error
  }

  revalidatePath('game')

  return data || []
}

export async function updateUserCumulativeWinnings(
  winning: number,
  userId: string,
) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('users')
    .update({ cumulative_winnings: winning })
    .eq('id', userId)
    .select()

  if (error) {
    throw error
  }

  revalidatePath('game')

  return data || []
}
