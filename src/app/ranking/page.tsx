import { Podium } from '@/components/podium'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserDataType } from '@/models/users'

import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft, User } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

async function getUsersByRanking(): Promise<UserDataType[]> {
  'use server'

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: users, error } = await supabase
    .from('users')
    .select()
    .order('cumulative_winnings', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return users || []
}

export default async function RankingPage() {
  const users: UserDataType[] = await getUsersByRanking()

  const podiumPlayers = [users[1], users[0], users[2]]

  return (
    <section className="p-4">
      <header className="flex flex-row items-center">
        <Link href="/dashboard" className="p-3">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold">Ranking</h1>
      </header>

      <Podium podiumPlayers={podiumPlayers} />

      <ol>
        {users.length > 0 &&
          users.slice(3).map((user) => (
            <li
              key={user.id}
              className="flex flex-row items-center gap-4 py-4 w-full"
            >
              <Avatar>
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {user?.user_metadata?.name ? (
                    user?.user_metadata?.name[0]
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </AvatarFallback>
              </Avatar>

              <div>
                <strong>
                  {user && user?.user_metadata?.name
                    ? user.user_metadata.name.split(' ')[0]
                    : user.name.split(' ')[0]}
                </strong>
                <p className="text-muted-foreground text-xs">
                  Ranking #{users.indexOf(user) + 1}
                </p>
              </div>

              <div className="flex flex-col text-right ml-auto">
                <strong>{formatCurrencyBRL(user.cumulative_winnings)}</strong>
                <span className="text-muted-foreground text-xs">
                  Acumulados
                </span>
              </div>
            </li>
          ))}
      </ol>
    </section>
  )
}
