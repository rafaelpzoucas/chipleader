import Authenticate from '@/components/authenticate'
import { createClient } from '@/utils/supabase/server'
import { Spade } from 'lucide-react'
import { cookies } from 'next/headers'

export default async function Index() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="flex flex-row items-center justify-center gap-2 text-2xl font-bold">
        <Spade />
        Chipleader
      </h1>
      <p>Faça seu login para começar.</p>

      {isSupabaseConnected && <Authenticate />}
    </div>
  )
}
