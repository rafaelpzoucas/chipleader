import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { User } from 'lucide-react'

export function GameWinnings({ totalPayout }: { totalPayout: number }) {
  return (
    <section className="flex flex-row items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center">
        <p className="text-muted-foreground text-xs mb-3">2º lugar</p>
        <Avatar>
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center">
          <strong>{formatCurrencyBRL(totalPayout * 0.3)}</strong>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-muted-foreground text-xs mb-3">1º lugar</p>
        <Avatar className="w-16 h-16">
          <AvatarFallback>
            <User className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center">
          <strong>{formatCurrencyBRL(totalPayout * 0.5)}</strong>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-muted-foreground text-xs mb-3">3º lugar</p>
        <Avatar>
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center">
          <strong>{formatCurrencyBRL(totalPayout * 0.2)}</strong>
        </div>
      </div>
    </section>
  )
}
