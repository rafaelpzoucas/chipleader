import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('users')
    .update({ user_metadata: user?.user_metadata })
    .eq('id', user?.id)
    .select()

  if (error) {
    console.log(error)
  }
  return <></>
}
