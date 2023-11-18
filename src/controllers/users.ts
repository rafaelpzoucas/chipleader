import { UserDataType } from '@/models/users'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const cookieStore = cookies()
const supabase = createClient(cookieStore)

export async function getUserInfo(
  userId?: string,
): Promise<UserDataType[] | undefined> {
  'use server'

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: users, error } = await supabase
    .from('users')
    .select()
    .eq('id', userId)

  if (error) {
    throw error
  }

  return users || []
}

export async function getTop10UsersByRanking(): Promise<UserDataType[]> {
  'use server'

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: users, error } = await supabase
    .from('users')
    .select()
    .order('cumulative_winnings', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    throw error
  }

  return users || []
}
