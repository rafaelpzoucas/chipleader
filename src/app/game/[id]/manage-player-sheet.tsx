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
import { bustPlayer, updateAmountSpent } from '@/controllers/game_players'
import { GamePlayerDataType } from '@/models/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

interface ManagePlayerSheetProps {
  player: GamePlayerDataType
  amountSpent: number
  setAmountSpent: React.Dispatch<React.SetStateAction<number>>
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function ManagePlayerSheet({
  player,
  amountSpent,
  setAmountSpent,
  setIsSheetOpen,
}: ManagePlayerSheetProps) {
  const [isBustPlayerSheetOpen, setIsBustPlayerSheetOpen] = useState(false)
  const buyInPrice = 25
  const isBusted = player.busted_at !== null

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

  async function handleBustPlayer(bustedAt: Date | null) {
    const response = await bustPlayer(player.id, bustedAt)

    if (response) {
      setIsSheetOpen(false)
      setIsBustPlayerSheetOpen(false)
    }
  }

  return (
    <>
      <header className="flex flex-row items-end gap-4 w-full">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{player.users.name[0]}</AvatarFallback>
        </Avatar>

        <div className="text-left">
          <strong>
            {player.users.name} {isBusted && '(Eliminado)'}
          </strong>
          <p className="text-muted-foreground text-xs">
            Ganhos {formatCurrencyBRL(player.users.cumulative_winnings)}
          </p>
        </div>

        <strong className="ml-auto">
          {formatCurrencyBRL(player.amount_spent)}
        </strong>
      </header>

      {isBusted ? (
        <Button className="w-full" onClick={() => handleBustPlayer(null)}>
          Voltar para o jogo
        </Button>
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
                    onClick={() => handleBustPlayer(new Date())}
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
