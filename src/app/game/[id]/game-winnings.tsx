import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { Spade } from 'lucide-react'

export function GameWinnings({
  winners,
  totalPayout,
}: {
  totalPayout: number
  winners: 3 | 4
}) {
  return (
    <section className="flex flex-row items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center">
        <p className="text-muted-foreground text-xs mb-3">2º lugar</p>
        <Avatar className="w-12 h-12">
          <AvatarFallback>
            <Spade className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center mt-2">
          <strong className="text-sm">
            {winners === 4
              ? formatCurrencyBRL(totalPayout * 0.3 - 15)
              : formatCurrencyBRL(totalPayout * 0.3)}
          </strong>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-muted-foreground text-xs mb-3">1º lugar</p>
        <Avatar className="w-16 h-16">
          <AvatarFallback>
            <Spade className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center mt-2">
          <strong className="text-sm">
            {winners === 4
              ? formatCurrencyBRL(totalPayout * 0.5 - 25)
              : formatCurrencyBRL(totalPayout * 0.5)}
          </strong>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-muted-foreground text-xs mb-3">3º lugar</p>
        <Avatar>
          <AvatarFallback>
            <Spade className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center mt-2">
          <strong className="text-sm">
            {winners === 4
              ? formatCurrencyBRL(totalPayout * 0.2 - 10)
              : formatCurrencyBRL(totalPayout * 0.2)}
          </strong>
        </div>
      </div>
      {winners === 4 && (
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground text-xs mb-3">4º lugar</p>
          <Avatar className="w-8 h-8">
            <AvatarFallback>
              <Spade className="w-3 h-3" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center mt-2">
            <strong className="text-sm">{formatCurrencyBRL(50)}</strong>
          </div>
        </div>
      )}
    </section>
  )
}
