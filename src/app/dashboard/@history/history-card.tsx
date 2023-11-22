import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUsersByGame } from '@/controllers/game_players'
import { GameDataType, GamePlayerDataType } from '@/models/games'

import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { User } from 'lucide-react'
import Link from 'next/link'

export async function HistoryCard({ game }: { game: GameDataType }) {
  const players: GamePlayerDataType[] = await getUsersByGame(game.id)

  const totalExpensesPrice = game.game_expenses.reduce((acc, expense) => {
    return acc + expense.price
  }, 0)

  return (
    <Link href={`/game/${game.id}`}>
      <div
        key={game.id}
        className="flex flex-row justify-between gap-3 p-4 border-t"
      >
        <section className="grid grid-cols-3 items-center justify-center gap-8">
          {players.slice(0, 3).map((player, index) => (
            <div key={player.id} className="flex flex-col items-center">
              <p className="text-muted-foreground text-xs mb-2">
                {index + 1}º lugar
              </p>
              <Avatar className="w-8 h-8">
                <AvatarImage src={player.users?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {player?.users?.user_metadata?.name ? (
                    player?.users?.user_metadata.name[0]
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
        <aside className="flex flex-col gap-1 items-end justify-between text-xs text-right">
          <span>{formatDate(game.created_at, 'dd/MM/yyyy')}</span>
          <span>
            <span className="text-muted-foreground">Buy-in:</span>
            <br />
            <strong>{formatCurrencyBRL(game.buy_in)}</strong>
          </span>
        </aside>
      </div>
    </Link>
  )
}
