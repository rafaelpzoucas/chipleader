import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { UserDataType } from '@/models/users'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { createClient } from '@/utils/supabase/server'
import { ChevronRight, User } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

async function getTop10UsersByRanking(): Promise<UserDataType[]> {
  'use server'

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: users, error } = await supabase
    .from('users')
    .select()
    .order('cumulative_winnings', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    throw error
  }

  return users || []
}

export default async function Ranking() {
  const users: UserDataType[] = await getTop10UsersByRanking()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking top 10</CardTitle>
      </CardHeader>

      <CardContent>
        <ol>
          {users.length > 0 &&
            users.map((user) => (
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
                      ? user.user_metadata.name
                      : user.name}
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
      </CardContent>

      <Link href="/ranking">
        <CardFooter className="p-4">
          <p>Ver todos</p>

          <ChevronRight className="w-4 h-4 ml-auto" />
        </CardFooter>
      </Link>
    </Card>
  )
}
