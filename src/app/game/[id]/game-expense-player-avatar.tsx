'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useGameStore } from '@/store/game-store'

type Props = {
  gameId: string
  expenseGamePlayerId: string
}

export function GameExpensePlayerAvatar({
  gameId,
  expenseGamePlayerId,
}: Props) {
  const player = useGameStore((s) =>
    s.games
      .find((g) => g.id === gameId)
      ?.players.find((p) => p.id === expenseGamePlayerId),
  )

  return (
    <Avatar className="w-8 h-8 mr-3">
      <AvatarFallback>
        {player?.name?.[0] ?? '?'}
      </AvatarFallback>
    </Avatar>
  )
}
