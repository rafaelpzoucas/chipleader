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
import { Minus, Plus, User } from 'lucide-react'
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
  payout: number
}

export function ManagePlayerSheet({
  player,
  amountSpent,
  expensesEach,
  setAmountSpent,
  setIsSheetOpen,
  gameStatus,
  payout,
}: ManagePlayerSheetProps) {
  const [isBustPlayerSheetOpen, setIsBustPlayerSheetOpen] = useState(false)
  const buyInPrice = 25
  const isBusted = player.busted_at !== null
  const balance = player.amount_paid - player.amount_spent - expensesEach

  function subBuyIn(buyInPrice: number) {
    if (amountSpent > 0) {
      setAmountSpent((state) => state - buyInPrice)
    }
  }

  function addBuyIn(buyInPrice: number) {
    setAmountSpent((state) => state + buyInPrice)
  }

  async function handleUpdateAmountSpent() {
    const response = await updateAmountSpent(player.id, amountSpent)

    if (response) {
      setIsSheetOpen(false)
    }
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
    const unbustedPlayers = await getUnbustedGamePlayers(player.game_id)

    if (unbustedPlayers.length > 3) {
      const response = await bustPlayer(player.id)

      if (response) {
        setIsSheetOpen(false)
        setIsBustPlayerSheetOpen(false)
      }
    }

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
            {player?.users?.name[0] ?? <User className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>

        <div className="text-left">
          <strong>{player.users.name}</strong>
          {/* <p className="text-muted-foreground text-xs">
            Ganhos {formatCurrencyBRL(player.users.cumulative_winnings)}
          </p> */}
        </div>

        <strong className="ml-auto">{formatCurrencyBRL(balance)}</strong>
      </header>

      <section className="space-y-2">
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
          <Button onClick={handleUpdateAmountPaid}>Marcar como pago</Button>
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
                    Eliminar <strong>{player.users.name}</strong>?
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleBustPlayer}
                  >
                    Sim, eliminar
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
            <Button className="w-full" onClick={handleUpdateAmountSpent}>
              Salvar
            </Button>
          </footer>
        </>
      )}
    </>
  )
}
