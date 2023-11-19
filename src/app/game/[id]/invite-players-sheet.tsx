'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { copyToClipboard } from '@/utils/copyToClipboard'
import { Check, Copy, Plus } from 'lucide-react'
import { useState } from 'react'

type InvitePlayersSheetProps = {
  gameId: string
  buyIn: number
}

export function InvitePlayersSheet({ gameId, buyIn }: InvitePlayersSheetProps) {
  const [isCopied, setIsCopied] = useState(false)

  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/invite/game?code=${gameId}&buyin=${buyIn}`

  function handleCopy() {
    copyToClipboard(inviteLink)

    setIsCopied((state) => !state)

    setTimeout(() => {
      setIsCopied((state) => !state)
    }, 3000)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Convidar jogadores
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Compartilhar link</SheetTitle>

          <div className="flex flex-row gap-3">
            <Card className="flex items-center px-4 w-full truncate text-muted-foreground bg-secondary">
              <span className="w-full truncate">{inviteLink}</span>
            </Card>
            <Button
              variant={isCopied ? 'default' : 'outline'}
              onClick={handleCopy}
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </>
              )}
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
