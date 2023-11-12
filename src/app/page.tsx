import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import AuthButton from '../components/AuthButton'

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
      <h1 className="text-xl font-bold">Bem vindo, Chipleader!</h1>
      <p>Faça seu login para começar.</p>

      {isSupabaseConnected && <AuthButton />}
    </div>
  )
}
