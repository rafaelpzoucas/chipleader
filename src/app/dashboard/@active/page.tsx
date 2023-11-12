import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getActiveGames } from '@/controllers/games'
import { GameDataType } from '@/models/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { ChevronRight, Users } from 'lucide-react'
import Link from 'next/link'

export default async function Active() {
  const games: GameDataType[] = await getActiveGames()

  return (
    <>
      {games.length > 0 &&
        games.map((game) => (
          <Card key={game.id}>
            <CardHeader className="flex flex-row w-full items-center gap-2">
              <CardTitle>Jogo ativo</CardTitle>
              <div className="ml-auto text-right">
                <p className="text-xs text-muted-foreground">Buy-in:</p>
                <strong>{formatCurrencyBRL(game.buy_in)}</strong>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Despesas:</p>
                <strong>{formatCurrencyBRL(0)}</strong>
              </div>
            </CardContent>
            <Link href={`/game/${game.id}`}>
              <CardFooter>
                <div className="flex flex-row items-center gap-2">
                  <Users className="w-4 h-4" />
                  {game.game_players.length} jogador
                  {game.game_players.length > 1 && 'es'}
                </div>

                <ChevronRight className="w-4 h-4 ml-auto" />
              </CardFooter>
            </Link>
          </Card>
        ))}
    </>
  )
}
