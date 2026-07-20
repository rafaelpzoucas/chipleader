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
import { Check, Plus, X } from 'lucide-react'
import { useState } from 'react'

type Props = {
  gameId: string
}

export function InvitePlayersSheet({ gameId }: Props) {
  const addPlayer = useGameStore((s) => s.addPlayer)
  const registerPlayer = useGameStore((s) => s.registerPlayer)
  const registeredPlayers = useGameStore((s) => s.registeredPlayers)
  const game = useGameStore((s) => s.getGame(gameId))
  const [name, setName] = useState('')
  const [added, setAdded] = useState(false)

  const gamePlayerNames = new Set(game?.players.map((p) => p.name.toLowerCase()) ?? [])

  function handleAddNew() {
    if (name.trim()) {
      registerPlayer(name.trim())
      addPlayer(gameId, name.trim())
      setName('')
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  function handleSelectPlayer(playerName: string) {
    addPlayer(gameId, playerName)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const availablePlayers = registeredPlayers.filter(
    (p) => !gamePlayerNames.has(p.name.toLowerCase()),
  )

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
            <Button onClick={handleAddNew}>
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

          {availablePlayers.length > 0 && (
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-2 text-left">
                Jogadores salvos
              </p>
              <div className="flex flex-col gap-2">
                {availablePlayers.map((player) => (
                  <button
                    key={player.id}
                    type="button"
                    onClick={() => handleSelectPlayer(player.name)}
                    className="flex items-center justify-between w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm hover:bg-accent text-left"
                  >
                    {player.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
