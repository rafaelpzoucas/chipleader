'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useGameStore } from '@/store/game-store'
import { Check, Plus } from 'lucide-react'
import { useState } from 'react'

type Props = {
  gameId: string
  buyIn: number
}

export function InvitePlayersSheet({ gameId }: Props) {
  const addPlayer = useGameStore((s) => s.addPlayer)
  const [name, setName] = useState('')
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (name.trim()) {
      addPlayer(gameId, name.trim())
      setName('')
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar jogador
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Adicionar jogador</SheetTitle>
          <div className="flex flex-row gap-3 pt-4">
            <input
              type="text"
              placeholder="Nome do jogador"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <Button onClick={handleAdd}>
              {added ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Adicionado
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </>
              )}
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
