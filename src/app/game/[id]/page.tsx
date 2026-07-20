'use client'

import { useGameStore } from '@/store/game-store'
import { useParams } from 'next/navigation'
import ActiveGame from './active-game'
import { InactiveGame } from './inactive-game'

export default function Game() {
  const { id } = useParams<{ id: string }>()
  const game = useGameStore((s) => s.games.find((g) => g.id === id))

  if (!game) return null

  return (
    <main className="p-4 pb-10">
      {game.status === 'active' ? (
        <ActiveGame game={game} />
      ) : (
        <InactiveGame game={game} />
      )}
    </main>
  )
}
