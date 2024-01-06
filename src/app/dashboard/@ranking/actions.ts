import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function getTop5UsersByRanking() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .order('cumulative_winnings', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(5)

  if (error) {
    throw error
  }

  return users || []
}
