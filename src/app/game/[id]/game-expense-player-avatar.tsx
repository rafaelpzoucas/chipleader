import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserDataType } from '@/models/users'
import { createClient } from '@/utils/supabase/server'
import { User } from 'lucide-react'
import { cookies } from 'next/headers'

async function getExpenseUserById(gamePlayerId: string) {
  'use server'

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', gamePlayerId)

  if (error) {
    throw error
  }

  return data || []
}

type GameExpensePlayerAvatarPropsType = {
  expenseGamePlayerId: string
}

export async function GameExpensePlayerAvatar({
  expenseGamePlayerId,
}: GameExpensePlayerAvatarPropsType) {
  const expensePlayer: UserDataType[] =
    await getExpenseUserById(expenseGamePlayerId)

  return (
    <Avatar className="w-8 h-8 mr-3">
      <AvatarImage
        src={expensePlayer && expensePlayer[0]?.user_metadata?.avatar_url}
      />
      <AvatarFallback>
        {(expensePlayer &&
          expensePlayer[0]?.user_metadata &&
          expensePlayer[0]?.user_metadata?.name &&
          expensePlayer[0]?.user_metadata?.name[0]) ?? (
          <User className="w-4 h-4" />
        )}
      </AvatarFallback>
    </Avatar>
  )
}
