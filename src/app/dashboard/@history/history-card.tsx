'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Game } from '@/store/game-store'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { User } from 'lucide-react'
import Link from 'next/link'

export function HistoryCard({ game }: { game: Game }) {
  const top3 = game.players.slice(0, 3)

  return (
    <Link href={`/game/${game.id}`}>
      <div className="flex flex-row justify-between gap-3 p-4 border-t">
        <section className="grid grid-cols-3 items-center justify-center gap-8">
          {top3.map((player, index) => (
            <div key={player.id} className="flex flex-col items-center">
              <p className="text-muted-foreground text-xs mb-2">
                {index + 1}º lugar
              </p>
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  {player.name ? (
                    player.name[0]
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-baseline">
                <strong>{player.name.split(' ')[0]}</strong>
              </div>
            </div>
          ))}
        </section>
        <aside className="flex flex-col gap-1 items-end justify-between text-xs text-right">
          <span>{formatDate(game.createdAt, 'dd/MM/yyyy')}</span>
          <span>
            <span className="text-muted-foreground">Buy-in:</span>
            <br />
            <strong>{formatCurrencyBRL(game.buyIn)}</strong>
          </span>
        </aside>
      </div>
    </Link>
  )
}
