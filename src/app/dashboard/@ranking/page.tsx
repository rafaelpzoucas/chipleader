import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getTop10UsersByRanking } from '@/controllers/users'
import { UserDataType } from '@/models/users'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { ChevronRight } from 'lucide-react'

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
                    {user && user?.user_metadata?.name[0]}
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
                  <span className="text-muted-foreground text-xs">
                    Prêmio acumulado
                  </span>
                  <strong>{formatCurrencyBRL(user.cumulative_winnings)}</strong>
                </div>
              </li>
            ))}
        </ol>
      </CardContent>

      <CardFooter>
        <p>Ver todos</p>

        <ChevronRight className="w-4 h-4 ml-auto" />
      </CardFooter>
    </Card>
  )
}
