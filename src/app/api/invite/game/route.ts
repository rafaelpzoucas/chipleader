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

    if (!user) {
      return NextResponse.redirect(
        `${origin}/login?invite=${code}&buyin=${buyin}`,
      )
    }

    const { data: gamePlayers, error: gamePlayersError } = await supabase
      .from('game_players')
      .select('*')
      .eq('game_id', code)
      .eq('user_id', user.id)

    if (!gamePlayersError && gamePlayers.length > 0) {
      return NextResponse.redirect(`${origin}/game/${code}`)
    }

    const { error } = await supabase
      .from('game_players')
      .insert([{ user_id: user?.id, game_id: code, amount_spent: buyin }])
      .select()

    if (!error) {
      return NextResponse.redirect(`${origin}/game/${code}`)
    }
  }
}
