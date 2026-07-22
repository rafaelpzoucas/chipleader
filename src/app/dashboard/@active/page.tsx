'use client'

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useGameStore } from '@/store/game-store'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { ChevronRight, Users, BookOpen } from 'lucide-react'
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
        <div className="space-y-3">
          <NewGameForm />
          <Link href="/learn">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 cursor-pointer hover:opacity-80 transition-opacity">
              <CardHeader className="flex flex-row w-full items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <CardTitle className="text-base">Poker Academy</CardTitle>
                <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
              </CardHeader>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Aprenda poker com lições interativas
                </p>
              </CardFooter>
            </Card>
          </Link>
        </div>
      )}
    </>
  )
}
