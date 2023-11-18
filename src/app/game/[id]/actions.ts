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
import { expensesFormSchema } from './expenses-form'

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
        game_player: values.userId,
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

export async function updateExpense(
  values: z.infer<typeof expensesFormSchema>,
  expenseId?: string,
) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { error } = await supabase
    .from('game_expenses')
    .update({
      game_player: values.userId,
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

export async function updateAmountPaid(value: number, gamePlayerId?: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { error } = await supabase
    .from('game_players')
    .update({
      amount_paid: value,
    })
    .eq('id', gamePlayerId)
    .select()

  if (error) {
    throw error
  }

  revalidatePath('game')
}
