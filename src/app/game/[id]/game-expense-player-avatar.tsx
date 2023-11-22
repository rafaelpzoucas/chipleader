import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GamePlayerDataType } from '@/models/games'
import { UserDataType } from '@/models/users'
import { createClient } from '@/utils/supabase/server'
import { User } from 'lucide-react'
import { cookies } from 'next/headers'

type GameExpensePlayerAvatarPropsType = {
  expenseGamePlayerId: string
}

async function getGameplayerById(expenseGamePlayerId: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('game_players')
    .select('*')
    .eq('id', expenseGamePlayerId)

  if (error) {
    throw error
  }

  return data[0] || []
}

async function getUserById(userId: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)

  if (error) {
    throw error
  }

  return users[0] || []
}

export async function GameExpensePlayerAvatar({
  expenseGamePlayerId,
}: GameExpensePlayerAvatarPropsType) {
  const gamePlayer: GamePlayerDataType =
    await getGameplayerById(expenseGamePlayerId)

  const expensePlayer: UserDataType = await getUserById(gamePlayer?.user_id)

  return (
    <Avatar className="w-8 h-8 mr-3">
      <AvatarImage
        src={expensePlayer && expensePlayer?.user_metadata?.avatar_url}
      />
      <AvatarFallback>
        {(expensePlayer &&
          expensePlayer?.user_metadata &&
          expensePlayer?.user_metadata?.name &&
          expensePlayer?.user_metadata?.name[0]) ?? (
          <User className="w-4 h-4" />
        )}
      </AvatarFallback>
    </Avatar>
  )
}
