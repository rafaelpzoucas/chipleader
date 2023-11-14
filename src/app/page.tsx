import Authenticate from '@/components/authenticate'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import logo from '../../public/chipleader-logo.svg'

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
      <Image src={logo} width={100} height={100} alt="Chipleader" />
      <h1 className="flex flex-row items-center justify-center gap-2 text-2xl font-bold mt-4">
        Chipleader
      </h1>
      <p>Faça seu login para começar.</p>

      {isSupabaseConnected && <Authenticate />}
    </div>
  )
}
