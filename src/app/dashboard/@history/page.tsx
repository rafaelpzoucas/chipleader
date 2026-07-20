'use client'

import { useGameStore } from '@/store/game-store'
import { Spade } from 'lucide-react'
import { HistoryCard } from './history-card'

export default function History() {
  const allGames = useGameStore((s) => s.games)
  const games = [...allGames.filter((g) => g.status === 'finished')].reverse()

  return (
    <>
      {games.length > 0 ? (
        games.map((game) => <HistoryCard key={game.id} game={game} />)
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 p-4 opacity-30">
          <Spade className="w-20 h-20" />
          <h1>Nenhum jogo recente.</h1>
        </div>
      )}
    </>
  )
}
