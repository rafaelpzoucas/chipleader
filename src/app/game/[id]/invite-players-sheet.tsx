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
import { Check, PencilLine, Plus, Trash2, X } from 'lucide-react'
import { useRef, useState } from 'react'

type Props = {
  gameId: string
}

export function InvitePlayersSheet({ gameId }: Props) {
  const addPlayer = useGameStore((s) => s.addPlayer)
  const registerPlayer = useGameStore((s) => s.registerPlayer)
  const deleteRegisteredPlayer = useGameStore((s) => s.deleteRegisteredPlayer)
  const updateRegisteredPlayer = useGameStore((s) => s.updateRegisteredPlayer)
  const registeredPlayers = useGameStore((s) => s.registeredPlayers)
  const game = useGameStore((s) => s.getGame(gameId))
  const [name, setName] = useState('')
  const [added, setAdded] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const gamePlayerNames = new Set(game?.players.map((p) => p.name.toLowerCase()) ?? [])

  function handleAddNew() {
    if (name.trim()) {
      registerPlayer(name.trim())
      addPlayer(gameId, name.trim())
      setName('')
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
      inputRef.current?.focus()
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
              ref={inputRef}
              type="text"
              placeholder="Nome do jogador"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddNew()}
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
                  <div
                    key={player.id}
                    className="flex items-center gap-2 w-full"
                  >
                    {editingId === player.id ? (
                      <>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              updateRegisteredPlayer(player.id, editName.trim() || player.name)
                              setEditingId(null)
                            }
                            if (e.key === 'Escape') setEditingId(null)
                          }}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          autoFocus
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSelectPlayer(player.name)}
                          className="flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-sm hover:bg-accent text-left truncate"
                        >
                          {player.name}
                        </button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(player.id)
                            setEditName(player.name)
                          }}
                        >
                          <PencilLine className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteRegisteredPlayer(player.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
