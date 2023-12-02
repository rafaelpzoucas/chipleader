'use client'

import {
  GameDataType,
  GameExpenseDataType,
  GamePlayerDataType,
} from '@/models/games'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PlayerCardSheet } from './player-card-sheet'

type RealTimeGamePlayersPropsType = {
  game: GameDataType
  players: GamePlayerDataType[]
  expenses: GameExpenseDataType[]
  totalPayout: number
}

export default function RealTimeGamePlayers({
  game,
  players,
  expenses,
  totalPayout,
}: RealTimeGamePlayersPropsType) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel('realtime game players')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_players',
        },
        () => {
          router.refresh()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, []) // eslint-disable-line

  return (
    game.game_players.length > 0 &&
    players.map((player) => (
      <PlayerCardSheet
        key={player.id}
        player={player}
        expenses={expenses}
        totalPlayers={players.length}
        gameStatus={game.status}
        payout={totalPayout}
      />
    ))
  )
}
