import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUserInfo } from '@/controllers/users'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function UserHeader() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userName = user?.user_metadata.name ?? user?.email
  const userAvatarURL = user?.user_metadata.avatar_url
  const userInfo = await getUserInfo(user?.id)

  return (
    <header className="flex flex-row items-end gap-4 w-full p-4">
      <Avatar>
        <AvatarImage src={userAvatarURL} />
        <AvatarFallback>{userName[0]}</AvatarFallback>
      </Avatar>

      <div className="text-left">
        <strong>{userName}</strong>
        <p className="text-muted-foreground text-xs">
          Ganhos{' '}
          {formatCurrencyBRL(userInfo ? userInfo[0].cumulative_winnings : 0)}
        </p>
      </div>
    </header>
  )
}
