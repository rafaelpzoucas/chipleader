import { cn } from '@/lib/utils'
import { UserDataType } from '@/models/users'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type PodiumPropsType = {
  podiumPlayers: UserDataType[]
}

export function Podium({ podiumPlayers }: PodiumPropsType) {
  return (
    <section className="flex flex-row items-center justify-center gap-10 p-4 py-8">
      {podiumPlayers.map((player, index) => (
        <div key={player.id} className="flex flex-col items-center">
          <p className="text-muted-foreground text-xs mb-3">
            {index === 0 ? '2' : index === 1 ? '1' : '3'}º lugar
          </p>
          <Avatar
            className={cn(
              index === 1 && 'w-16 h-16',
              index === 0 && 'h-12 w-12',
            )}
          >
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
  )
}
