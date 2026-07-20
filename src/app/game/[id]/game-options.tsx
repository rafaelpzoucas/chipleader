'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Game } from '@/store/game-store'
import { useGameStore } from '@/store/game-store'
import { MoreVertical } from 'lucide-react'

export function GameOptions({ game }: { game: Game }) {
  const updateWinnersAmount = useGameStore((s) => s.updateWinnersAmount)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto">
        <MoreVertical className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {game.winnersAmount === 3 ? (
          <DropdownMenuItem onClick={() => updateWinnersAmount(game.id, 4)}>
            Adicionar 4º lugar
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => updateWinnersAmount(game.id, 3)}>
            Remover 4º lugar
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
