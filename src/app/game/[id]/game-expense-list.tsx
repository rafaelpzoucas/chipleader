'use client'

import type { Game } from '@/store/game-store'
import { GameExpense } from './game-expense'

export function GameExpenseList({ game }: { game: Game }) {
  return (
    <>
      {game.expenses.map((expense) => (
        <GameExpense key={expense.id} game={game} expense={expense} />
      ))}
    </>
  )
}
