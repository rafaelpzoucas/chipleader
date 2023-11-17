import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUsersByGame } from '@/controllers/game_players'
import { GameDataType, GamePlayerDataType } from '@/models/games'

import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { User } from 'lucide-react'
import Link from 'next/link'

export async function HistoryCard({ game }: { game: GameDataType }) {
  const players: GamePlayerDataType[] = await getUsersByGame(game.id)

  console.log(players[0])

  return (
    <Link href={`/game/${game.id}`}>
      <div
        key={game.id}
        className="flex flex-row justify-between gap-3 p-4 border-t"
      >
        <section className="flex flex-row items-center justify-center gap-8">
          {players.slice(0, 3).map((player, index) => (
            <div key={player.id} className="flex flex-col items-center">
              <p className="text-muted-foreground text-xs mb-2">
                {index + 1}º lugar
              </p>
              <Avatar>
                <AvatarImage src={player.users?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {player.users.user_metadata ? (
                    player.users.user_metadata.name[0]
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-baseline">
                <strong>{player.users.name.split(' ')[0]}</strong>
              </div>
            </div>
          ))}
        </section>
        <aside className="flex flex-col items-end justify-between text-xs">
          <span>{formatDate(game.created_at, 'dd MMM')}</span>
          <span>Buy-in: {formatCurrencyBRL(game.buy_in)}</span>
          <span>Despesas: R$ 150,00</span>
        </aside>
      </div>
    </Link>
  )
}
