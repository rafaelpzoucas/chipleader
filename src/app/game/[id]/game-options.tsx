'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GameDataType } from '@/models/games'
import { MoreVertical } from 'lucide-react'
import { updateWinnersAmount } from '../actions'

export function GameOptions({ game }: { game: GameDataType }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto">
        <MoreVertical className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {game.winners_amount === 3 ? (
          <DropdownMenuItem onClick={() => updateWinnersAmount(4, game.id)}>
            Adicionar 4º lugar
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => updateWinnersAmount(3, game.id)}>
            Remover 4º lugar
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
