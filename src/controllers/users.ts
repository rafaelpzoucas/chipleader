import { UserDataType } from '@/models/users'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

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
