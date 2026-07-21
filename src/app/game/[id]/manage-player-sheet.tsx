'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Game, Player } from '@/store/game-store'
import { useGameStore } from '@/store/game-store'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { getCaixaAmount, getDistIdx, getPrizeDistribution, getPrizeForPlacing } from '@/utils/prize'
import { Minus, Plus, User } from 'lucide-react'
import { useState } from 'react'

interface Props {
  game: Game
  player: Player
  amountSpent: number
  expensesEach: number
  setAmountSpent: React.Dispatch<React.SetStateAction<number>>
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  placing: number
  totalPayout: number
  prizeSplit?: boolean
}

export function ManagePlayerSheet({
  game,
  player,
  amountSpent,
  expensesEach,
  setAmountSpent,
  setIsSheetOpen,
  placing,
  totalPayout,
}: Props) {
  const bustPlayer = useGameStore((s) => s.bustPlayer)
  const unbustPlayer = useGameStore((s) => s.unbustPlayer)
  const updatePlayerAmountSpent = useGameStore((s) => s.updatePlayerAmountSpent)
  const increaseAmountPaid = useGameStore((s) => s.increaseAmountPaid)
  const finishGame = useGameStore((s) => s.finishGame)
  const removePlayer = useGameStore((s) => s.removePlayer)

  const isFinished = game.status === 'finished'
  const distribution = getPrizeDistribution(game)
  const caixaAmount = getCaixaAmount(totalPayout, game.caixaType, game.caixaPercentage, game.caixaFixed)
  const effectiveTotal = totalPayout - caixaAmount
  const prizeSplit = game.prizeSplit
  const playerPayout = isFinished
    ? getPrizeForPlacing(placing, distribution, effectiveTotal, prizeSplit)
    : 0
  const buyInPrice = game.buyIn
  const isBusted = player.bustedAt !== null
  const balance = isFinished && getDistIdx(placing) < distribution.length
    ? player.amountPaid + playerPayout - amountSpent - expensesEach
    : player.amountPaid - amountSpent - expensesEach

  const [isBustPlayerSheetOpen, setIsBustPlayerSheetOpen] = useState(false)
  const [isRemovePlayerSheetOpen, setIsRemovePlayerSheetOpen] = useState(false)

  function subBuyIn() {
    if (amountSpent > 0) {
      setAmountSpent((state) => state - buyInPrice)
    }
  }

  function addBuyIn() {
    setAmountSpent((state) => state + buyInPrice)
  }

  function handleUpdateAmountSpent() {
    updatePlayerAmountSpent(game.id, player.id, amountSpent)
    setIsSheetOpen(false)
  }

  function handleUpdateAmountPaid() {
    increaseAmountPaid(game.id, player.id, balance * -1)
    setIsSheetOpen(false)
  }

  function handleBustPlayer() {
    const unbustedPlayers = game.players.filter((p) => p.bustedAt === null)

    if (unbustedPlayers.length > 3) {
      bustPlayer(game.id, player.id)
      setIsSheetOpen(false)
      setIsBustPlayerSheetOpen(false)
      return
    }

    if (unbustedPlayers.length > 2) {
      bustPlayer(game.id, player.id)
      setIsSheetOpen(false)
      setIsBustPlayerSheetOpen(false)
      return
    }

    bustPlayer(game.id, player.id)
    const remaining = game.players.filter((p) => p.bustedAt === null && p.id !== player.id)
    if (remaining.length > 0) {
      bustPlayer(game.id, remaining[0].id)
    }
    finishGame(game.id)
    setIsSheetOpen(false)
    setIsBustPlayerSheetOpen(false)
  }

  function handleUnbustPlayer() {
    unbustPlayer(game.id, player.id)
    setIsSheetOpen(false)
    setIsBustPlayerSheetOpen(false)
  }

  function handleRemovePlayer() {
    removePlayer(game.id, player.id)
    setIsSheetOpen(false)
    setIsRemovePlayerSheetOpen(false)
  }

  return (
    <>
      <header className="flex flex-row items-center gap-4 w-full">
        <Avatar>
          <AvatarFallback>
            {player.name[0] ?? <User className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>

        <div className="text-left">
          <strong>{player.name}</strong>
        </div>
        {balance !== 0 ? (
          <strong className="ml-auto">{formatCurrencyBRL(balance)}</strong>
        ) : (
          <strong className="ml-auto uppercase text-green-500">Pago</strong>
        )}
      </header>

      <section className="space-y-2">
        {isFinished && placing < 3 ? (
          <>
            <div className="flex flex-row items-center justify-between text-xs text-muted-foreground">
              <span>Prêmio total:</span>
              <strong className="ml-auto text-emerald-600">
                {formatCurrencyBRL(playerPayout)}
              </strong>
            </div>
            <div className="flex flex-row items-center justify-between text-xs text-muted-foreground">
              <span>Valor gasto:</span>
              <strong className="ml-auto text-destructive">
                {formatCurrencyBRL(amountSpent * -1)}
              </strong>
            </div>
            {expensesEach > 0 && (
              <div className="flex flex-row items-center justify-between text-xs text-muted-foreground">
                <span>Despesas:</span>
                <strong className="ml-auto text-destructive">
                  {formatCurrencyBRL(expensesEach * -1)}
                </strong>
              </div>
            )}
            <div className="flex flex-row items-center justify-between text-xs">
              <span>Prêmio líquido:</span>
              <strong className={`ml-auto ${balance < 0 ? 'text-destructive' : 'text-emerald-600'}`}>
                {formatCurrencyBRL(balance)}
              </strong>
            </div>
            {balance < 0 && (
              <div className="flex flex-row items-center justify-between text-xs text-muted-foreground">
                <span>Valor pago:</span>
                <strong className="ml-auto text-emerald-600">
                  {formatCurrencyBRL(player.amountPaid)}
                </strong>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-row items-center justify-between text-xs text-muted-foreground">
              <span>Valor pago:</span>
              <strong className="ml-auto text-emerald-600">
                {formatCurrencyBRL(player.amountPaid)}
              </strong>
            </div>
            <div className="flex flex-row items-center justify-between text-xs text-muted-foreground">
              <span>Buy-ins:</span>
              <strong className="ml-auto text-destructive">
                {formatCurrencyBRL(amountSpent * -1)}
              </strong>
            </div>
            <div className="flex flex-row items-center justify-between text-xs text-muted-foreground">
              <span>Despesas:</span>
              <strong className="ml-auto text-destructive">
                {formatCurrencyBRL(expensesEach * -1)}
              </strong>
            </div>
          </>
        )}
      </section>

      {isBusted ? (
        game.status === 'active' ? (
          <Button className="w-full" onClick={handleUnbustPlayer}>
            Voltar para o jogo
          </Button>
        ) : (
          balance !== 0 && (
            <Button onClick={handleUpdateAmountPaid}>Marcar como pago</Button>
          )
        )
      ) : (
        <>
          <div className="flex flex-row items-center justify-between gap-4">
            <Sheet
              open={isBustPlayerSheetOpen}
              onOpenChange={setIsBustPlayerSheetOpen}
            >
              <SheetTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Eliminar
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    Eliminar <strong>{player.name.split(' ')[0]}</strong>?
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleBustPlayer}
                  >
                    <span>Sim, eliminar</span>
                  </Button>
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full">
                      Não, cancelar
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
            <Card className="flex flex-row items-center justify-between w-full">
              <Button
                variant="ghost"
                size="icon"
                disabled={!amountSpent}
                onClick={subBuyIn}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <p className="text-sm">{formatCurrencyBRL(amountSpent)}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={addBuyIn}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </Card>
          </div>
          <footer>
            <Button
              className="w-full"
              onClick={handleUpdateAmountSpent}
            >
              <span>Salvar</span>
            </Button>
          </footer>
        </>
      )}

      <div className="pt-4">
        <Sheet
          open={isRemovePlayerSheetOpen}
          onOpenChange={setIsRemovePlayerSheetOpen}
        >
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-destructive">
              Remover do jogo
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle className="text-left">
                Remover <strong>{player.name.split(' ')[0]}</strong> do jogo?
              </SheetTitle>
            </SheetHeader>

            <p className="text-sm text-muted-foreground mt-2">
              Essa ação não pode ser desfeita. As despesas vinculadas a esse
              jogador serão desvinculadas.
            </p>

            <div className="flex flex-col gap-2 mt-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleRemovePlayer}
              >
                <span>Sim, remover</span>
              </Button>
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  Não, cancelar
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
