import { UserDataType } from '@/models/users'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const cookieStore = cookies()
const supabase = createClient(cookieStore)

export async function getLoggedUser(): Promise<UserDataType[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: users, error } = await supabase
    .from('users')
    .select()
    .eq('id', user?.id)

  if (error) {
    throw error
  }

  return users || []
}

export async function getTop10UsersByRanking(): Promise<UserDataType[]> {
  const { data: users, error } = await supabase
    .from('users')
    .select()
    .order('cumulative_winnings', { ascending: false })
    .limit(10)

  if (error) {
    throw error
  }

  return users || []
}
