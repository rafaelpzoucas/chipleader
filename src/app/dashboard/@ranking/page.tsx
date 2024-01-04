import { Podium } from '@/components/podium'
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
import { ChevronRight, Spade, User } from 'lucide-react'
import Link from 'next/link'
import { getTop5UsersByRanking } from './actions'

export default async function Ranking() {
  const users: UserDataType[] = await getTop5UsersByRanking()

  const podiumPlayers = [users[1], users[0], users[2]]

  return (
    <Link href="/ranking">
      <Card>
        <CardHeader>
          <CardTitle>Ranking top 5</CardTitle>
        </CardHeader>

        <CardContent>
          {users.length > 3 ? (
            <>
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
                        <strong className="text-sm">
                          {user && user?.user_metadata?.name
                            ? user?.user_metadata?.name?.split(' ')[0]
                            : user?.name?.split(' ')[0]}
                        </strong>
                        <p className="text-muted-foreground text-xs">
                          Ranking #{users.indexOf(user) + 1}
                        </p>
                      </div>

                      <div className="flex flex-col text-right ml-auto">
                        <strong>
                          {formatCurrencyBRL(user.cumulative_winnings)}
                        </strong>
                        <span className="text-muted-foreground text-xs">
                          Acumulados
                        </span>
                      </div>
                    </li>
                  ))}
              </ol>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-4 opacity-30">
              <Spade className="w-20 h-20" />
              <h1>Aguardando mais jogadores.</h1>
            </div>
          )}
        </CardContent>

        <CardFooter className="px-4">
          <p>Ver todos</p>

          <ChevronRight className="w-4 h-4 ml-auto" />
        </CardFooter>
      </Card>
    </Link>
  )
}
