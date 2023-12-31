'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { updateAmountSpent } from '@/controllers/game_players'
import { GamePlayerDataType } from '@/models/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { Loader, Minus, Plus, User } from 'lucide-react'
import { useState } from 'react'
import {
  bustPlayer,
  finishGame,
  getUnbustedGamePlayers,
  increaseAmountPaid,
  unbustPlayer,
  updateUserCumulativeWinnings,
} from '../actions'

interface ManagePlayerSheetProps {
  player: GamePlayerDataType
  amountSpent: number
  expensesEach: number
  setAmountSpent: React.Dispatch<React.SetStateAction<number>>
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  gameStatus: boolean
  gameWinnersAmount: 3 | 4
  payout: number
  placing: number
}

export function ManagePlayerSheet({
  player,
  amountSpent,
  expensesEach,
  setAmountSpent,
  setIsSheetOpen,
  gameStatus,
  gameWinnersAmount,
  payout,
  placing,
}: ManagePlayerSheetProps) {
  const playerPayout =
    placing < 3
      ? placing === 1
        ? payout * 0.5
        : placing === 2
          ? payout * 0.2
          : payout * 0.3
      : 0
  const buyInPrice = 25
  const isBusted = player.busted_at !== null
  const placings = [-15, -25, -10, 0, 50]
  const balance =
    gameWinnersAmount === 3
      ? player.amount_paid + playerPayout - player.amount_spent - expensesEach
      : placing <= 4
        ? player.amount_paid +
          playerPayout -
          player.amount_spent -
          expensesEach +
          placings[placing]
        : 0
  const playerName = player?.users?.user_metadata?.name

  const [isBustPlayerSheetOpen, setIsBustPlayerSheetOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isEliminating, setIsEliminating] = useState(false)

  function subBuyIn(buyInPrice: number) {
    if (amountSpent > 0) {
      setAmountSpent((state) => state - buyInPrice)
    }
  }

  function addBuyIn(buyInPrice: number) {
    setAmountSpent((state) => state + buyInPrice)
  }

  async function handleUpdateAmountSpent() {
    setIsSaving(true)

    const response = await updateAmountSpent(player.id, amountSpent)

    if (response) {
      setIsSheetOpen(false)
    }

    setIsSaving(false)
  }

  async function handleUpdateAmountPaid() {
    const response = await increaseAmountPaid(
      player.amount_paid + balance * -1,
      player.id,
    )

    if (response) {
      setIsSheetOpen(false)
    }
  }

  async function handleBustPlayer() {
    setIsEliminating(true)

    const unbustedPlayers = await getUnbustedGamePlayers(player.game_id)

    if (unbustedPlayers.length > 3) {
      const response = await bustPlayer(player.id)

      if (response) {
        setIsSheetOpen(false)
        setIsBustPlayerSheetOpen(false)
      }
    }

    if (gameWinnersAmount === 3) {
      if (unbustedPlayers.length === 3) {
        await bustPlayer(player.id)
        await updateUserCumulativeWinnings(payout * 0.2, player.user_id)
      }

      if (unbustedPlayers.length === 2) {
        await bustPlayer(player.id)
        await updateUserCumulativeWinnings(payout * 0.3, player.user_id)

        const unbustedPlayers: GamePlayerDataType[] =
          await getUnbustedGamePlayers(player.game_id)

        await bustPlayer(unbustedPlayers[0].id)
        await updateUserCumulativeWinnings(
          payout * 0.5,
          unbustedPlayers[0].user_id,
        )

        await finishGame(player.game_id)
      }
    }

    if (gameWinnersAmount === 4) {
      if (unbustedPlayers.length === 4) {
        await bustPlayer(player.id)
        await updateUserCumulativeWinnings(50, player.user_id)
      }

      if (unbustedPlayers.length === 3) {
        await bustPlayer(player.id)
        await updateUserCumulativeWinnings(payout * 0.2 - 10, player.user_id)
      }

      if (unbustedPlayers.length === 2) {
        await bustPlayer(player.id)
        await updateUserCumulativeWinnings(payout * 0.3 - 15, player.user_id)

        const unbustedPlayers: GamePlayerDataType[] =
          await getUnbustedGamePlayers(player.game_id)

        await bustPlayer(unbustedPlayers[0].id)
        await updateUserCumulativeWinnings(
          payout * 0.5 - 25,
          unbustedPlayers[0].user_id,
        )

        await finishGame(player.game_id)
      }
    }

    setIsEliminating(false)
  }

  async function handleUnbustPlayer() {
    const response = await unbustPlayer(player.id)

    if (response) {
      setIsSheetOpen(false)
      setIsBustPlayerSheetOpen(false)
    }
  }

  return (
    <>
      <header className="flex flex-row items-center gap-4 w-full">
        <Avatar>
          <AvatarImage src={player?.users?.user_metadata?.avatar_url} />
          <AvatarFallback>
            {playerName[0] ?? <User className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>

        <div className="text-left">
          <strong>{`${playerName.split(' ')[0]} ${
            playerName.split(' ')[playerName.split(' ').length - 1]
          }`}</strong>
        </div>
        {balance !== 0 ? (
          <strong className="ml-auto">{formatCurrencyBRL(balance)}</strong>
        ) : (
          <strong className="ml-auto uppercase text-green-500">Pago</strong>
        )}
      </header>

      <section className="space-y-2">
        {placing < 3 && (
          <div className="flex flex-row items-center justify-between text-xs text-muted-foreground">
            <span>Premio:</span>
            <strong className="ml-auto text-emerald-600">
              {formatCurrencyBRL(playerPayout)}
            </strong>
          </div>
        )}

        <div className="flex flex-row items-center justify-between text-xs text-muted-foreground">
          <span>Valor pago:</span>
          <strong className="ml-auto text-emerald-600">
            {formatCurrencyBRL(player.amount_paid)}
          </strong>
        </div>

        <div className="flex flex-row items-center justify-between text-xs text-muted-foreground">
          <span>Buy-ins:</span>
          <strong className="ml-auto text-destructive">
            {formatCurrencyBRL(player.amount_spent * -1)}
          </strong>
        </div>

        <div className="flex flex-row items-center justify-between text-xs text-muted-foreground">
          <span>Despesas:</span>
          <strong className="ml-auto text-destructive">
            {formatCurrencyBRL(expensesEach * -1)}
          </strong>
        </div>
      </section>

      {isBusted ? (
        gameStatus === true ? (
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
                    Eliminar <strong>{playerName.split(' ')[0]}</strong>?
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleBustPlayer}
                    disabled={isEliminating}
                  >
                    {isEliminating ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        <span>Eliminando jogador...</span>
                      </>
                    ) : (
                      <span>Sim, eliminar</span>
                    )}
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
                onClick={() => subBuyIn(buyInPrice)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <p className="text-sm">{formatCurrencyBRL(amountSpent)}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => addBuyIn(buyInPrice)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </Card>
          </div>
          <footer>
            <Button
              className="w-full"
              onClick={handleUpdateAmountSpent}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  <span>Salvando alterações...</span>
                </>
              ) : (
                <span>Salvar</span>
              )}
            </Button>
          </footer>
        </>
      )}
    </>
  )
}
