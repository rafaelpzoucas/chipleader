import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const buyin = searchParams.get('buyin')

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('game_players')
      .insert([{ player_id: user?.id, game_id: code, amount_spent: buyin }])
      .select()

    if (!error) {
      return NextResponse.redirect(`${origin}/game/${code}`)
    }
  }
}