import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getTop10UsersByRanking } from '@/controllers/users'
import { cn } from '@/lib/utils'
import { UserDataType } from '@/models/users'

import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { User } from 'lucide-react'

export default async function RankingPage() {
  const users: UserDataType[] = await getTop10UsersByRanking()

  const podiumPlayers = [users[1], users[0], users[2]]

  return (
    <section className="p-4">
      <header className="py-2">
        <h1 className="text-xl">Ranking</h1>
      </header>

      <section className="flex flex-row items-center justify-center gap-10 p-4 py-8">
        {podiumPlayers.map((player, index) => (
          <div key={player.id} className="flex flex-col items-center">
            <p className="text-muted-foreground text-xs mb-3">
              {index === 0 ? '2' : index === 1 ? '1' : '3'}º lugar
            </p>
            <Avatar className={cn(index === 1 && 'w-16 h-16')}>
              <AvatarImage src={player?.user_metadata?.avatar_url} />
              <AvatarFallback>
                {player?.user_metadata?.name ? (
                  player?.user_metadata?.name[0]
                ) : (
                  <User className="w-4 h-4" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
              <strong>{player.name.split(' ')[0]}</strong>
              <strong>{formatCurrencyBRL(player.cumulative_winnings)}</strong>
            </div>
          </div>
        ))}
      </section>

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
    </section>
  )
}
