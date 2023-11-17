import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function UserHeader() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userName = user?.user_metadata.name
  const userAvatarURL = user?.user_metadata.avatar_url

  return (
    <header className="flex flex-row items-end gap-4 w-full p-4">
      <form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={userAvatarURL} />
              <AvatarFallback>{userName[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <button type="submit">Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </form>

      <div className="text-left">
        <strong>{userName}</strong>
        <p className="text-muted-foreground text-xs">
          Ganhos {formatCurrencyBRL(100)}
        </p>
      </div>
    </header>
  )
}
