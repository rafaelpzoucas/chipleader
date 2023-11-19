import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import {
  GameDataType,
  GameExpenseDataType,
  GamePlayerDataType,
} from '@/models/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { ArrowLeft, Plus, User } from 'lucide-react'
import Link from 'next/link'
import { getExpensesByGame, getUsersByGame } from '../actions'
import { GameExpense } from './game-expense'

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

  function calculatePayout(index: number, amountSpent: number) {
    const percentages = [0.3, 0.5, 0.2]
    const percentage = percentages[index] || 0
    const payout = totalPayout * percentage - amountSpent - expensesPriceEach

    return payout
  }

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
          <div key={player?.id} className="flex flex-col items-center">
            <p className="text-muted-foreground text-xs mb-3">
              {index === 0 ? '2' : index === 1 ? '1' : '3'}º lugar
            </p>
            <Avatar className={cn(index === 1 && 'w-16 h-16')}>
              <AvatarImage src={player?.users?.user_metadata?.avatar_url} />
              <AvatarFallback>
                {player?.users?.user_metadata?.name ? (
                  player?.users?.user_metadata?.name[0]
                ) : (
                  <User className="w-4 h-4" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
              <strong>{player?.users?.name.split(' ')[0]}</strong>
              <strong
                className={cn(
                  calculatePayout(index, player?.amount_spent) < 0 &&
                    'text-destructive',
                  calculatePayout(index, player?.amount_spent) > 0 &&
                    'text-emerald-600',
                )}
              >
                {formatCurrencyBRL(
                  calculatePayout(index, player?.amount_spent),
                )}
              </strong>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-2">
        {game.game_players.length > 0 &&
          players.slice(3).map((player, index) => (
            <div key={player.id} className="flex flex-row gap-4 items-center">
              <strong>{index + 4}º</strong>

              <Card className="p-4 w-full">
                <header className="relative flex flex-row items-end gap-4 w-full">
                  <Avatar>
                    <AvatarImage
                      src={player?.users?.user_metadata?.avatar_url}
                    />
                    <AvatarFallback>
                      {player?.users?.user_metadata?.name ? (
                        player?.users?.user_metadata?.name[0]
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-left">
                    <strong>{player.users.name}</strong>
                    <p className="text-muted-foreground text-xs">
                      Ganhos {formatCurrencyBRL(100)}
                    </p>
                  </div>

                  <div className="flex flex-col ml-auto text-sm h-full text-right">
                    <strong>- {formatCurrencyBRL(player.amount_spent)}</strong>
                  </div>
                </header>
              </Card>
            </div>
          ))}
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
      </section>
    </div>
  )
}
