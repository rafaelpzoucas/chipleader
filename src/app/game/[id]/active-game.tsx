import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import {
  GameDataType,
  GameExpenseDataType,
  GamePlayerDataType,
} from '@/models/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import { getExpensesByGame, getUsersByGame } from './actions'
import { GameExpense } from './game-expense'
import { GameWinnings } from './game-winnings'
import { InvitePlayersSheet } from './invite-players-sheet'
import { PlayerCardSheet } from './player-card-sheet'

export default async function ActiveGame({ game }: { game: GameDataType }) {
  const players: GamePlayerDataType[] = await getUsersByGame(game.id)
  const expenses: GameExpenseDataType[] = await getExpensesByGame(game.id)

  const totalPayout = players.reduce((acc, player) => {
    return acc + player.amount_spent
  }, 0)

  const totalExpensesPrice = expenses.reduce((acc, expense) => {
    return acc + expense.expenses.price
  }, 0)

  return (
    <div className="space-y-8 p-4 pb-10">
      <header className="flex flex-row items-center">
        <Link href="/dashboard" className="p-3">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold">Jogo ativo agora</h1>
      </header>

      <GameWinnings totalPayout={totalPayout} />

      <section className="space-y-2">
        <InvitePlayersSheet gameId={game.id} />

        {game.game_players.length > 0 &&
          game.game_players.map(() =>
            players.map((player) => (
              <PlayerCardSheet key={player.id} player={player} />
            )),
          )}
      </section>

      <section className="space-y-3">
        <header className="flex flex-row items-center justify-between">
          <h1 className="text-lg font-bold">Despesas</h1>

          {totalExpensesPrice > 0 && (
            <span className="text-sm">
              {formatCurrencyBRL(totalExpensesPrice / players.length)} para cada
            </span>
          )}
        </header>

        <div>
          {expenses.map((expense) => (
            <GameExpense key={expense.id} expense={expense} />
          ))}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar despesa
              </Button>
            </SheetTrigger>

            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Nova despesa</SheetTitle>
              </SheetHeader>

              <form action="" className="space-y-4">
                <div className="space-y-1">
                  <Label>Descrição</Label>
                  <Input placeholder="Digite a descrição..." />
                </div>

                <div className="space-y-1">
                  <Label>Valor</Label>
                  <Input placeholder="R$ 0,00" />
                </div>

                <Button className="w-full">Adicionar despesa</Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </section>
    </div>
  )
}
