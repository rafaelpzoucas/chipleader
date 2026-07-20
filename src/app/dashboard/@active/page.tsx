'use client'

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useGameStore } from '@/store/game-store'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { ChevronRight, Users } from 'lucide-react'
import Link from 'next/link'
import { NewGameForm } from '../new-game-form'

export default function Active() {
  const allGames = useGameStore((s) => s.games)
  const games = allGames.filter((g) => g.status === 'active')

  return (
    <>
      {games.length > 0 ? (
        games.map((game) => (
          <Link key={game.id} href={`/game/${game.id}`}>
            <Card className="bg-primary text-white dark:text-background">
              <CardHeader className="flex flex-row w-full items-center gap-2">
                <CardTitle>Jogo ativo</CardTitle>
                <div className="ml-auto text-right">
                  <p className="text-xs opacity-50">Buy-in:</p>
                  <strong>{formatCurrencyBRL(game.buyIn)}</strong>
                </div>
              </CardHeader>
              <CardFooter>
                <div className="flex flex-row items-center gap-2">
                  <Users className="w-4 h-4" />
                  {game.players.length} jogador
                  {game.players.length > 1 && 'es'}
                </div>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </CardFooter>
            </Card>
          </Link>
        ))
      ) : (
        <NewGameForm />
      )}
    </>
  )
}
