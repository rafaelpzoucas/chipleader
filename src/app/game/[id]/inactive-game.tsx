import { Button } from '@/components/ui/button'
import {
  GameDataType,
  GameExpenseDataType,
  GamePlayerDataType,
} from '@/models/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getExpensesByGame, getUsersByGame } from '../actions'
import { GameExpense } from './game-expense'
import { PlayerCardSheet } from './player-card-sheet'
import { PodiumPlayerSheet } from './podium-player-sheet'

export async function InactiveGame({ game }: { game: GameDataType }) {
  const players: GamePlayerDataType[] = await getUsersByGame(game.id)
  const expenses: GameExpenseDataType[] = await getExpensesByGame(game.id)

  const podiumPlayers = [players[1], players[0], players[2]]

  const totalPayout = players.reduce((acc, player) => {
    return acc + player.amount_spent
  }, 0)

  const totalExpensesPrice = expenses.reduce((acc, expense) => {
    return acc + expense.price
  }, 0)

  const expensesPriceEach = totalExpensesPrice / players.length

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-row gap-2 items-center">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Jogo finalizado</h1>
      </header>
      <section className="flex flex-row items-center justify-center gap-8 p-4">
        {podiumPlayers.map((player, index) => (
          <PodiumPlayerSheet
            key={player?.id}
            player={player}
            expenses={expenses}
            totalPlayers={players.length}
            gameStatus={game.status}
            payout={totalPayout}
            index={index}
            placing={index}
          />
        ))}
      </section>

      <section className="space-y-2">
        {game.game_players.length > 0 &&
          players.slice(3).map((player, index) => (
            <div key={player.id} className="flex flex-row gap-4 items-center">
              <strong>{index + 4}º</strong>

              <PlayerCardSheet
                player={player}
                expenses={expenses}
                totalPlayers={players.length}
                gameStatus={game.status}
                payout={totalPayout}
                placing={index + 4}
              />
            </div>
          ))}
      </section>
      <section className="space-y-3">
        <header className="flex flex-row items-center justify-between">
          <h1 className="text-lg font-bold">Despesas</h1>

          {totalExpensesPrice > 0 && (
            <span className="text-sm">
              {formatCurrencyBRL(expensesPriceEach)} para cada
            </span>
          )}
        </header>

        <div>
          {expenses.map((expense) => (
            <GameExpense key={expense.id} expense={expense} />
          ))}
        </div>
      </section>
    </div>
  )
}
