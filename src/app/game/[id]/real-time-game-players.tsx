'use client'

import type { Game } from '@/store/game-store'
import { PlayerCardSheet } from './player-card-sheet'

type Props = {
  game: Game
  totalPayout: number
}

export default function RealTimeGamePlayers({ game, totalPayout }: Props) {
  return (
    game.players.length > 0 &&
    game.players.map((player, index) => (
      <PlayerCardSheet
        key={player.id}
        game={game}
        player={player}
        placing={index}
        totalPayout={totalPayout}
        prizeSplit={game.prizeSplit}
      />
    ))
  )
}
