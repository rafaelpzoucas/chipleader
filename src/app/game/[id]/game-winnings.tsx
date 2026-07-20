import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { CaixaType, PrizeItem } from '@/store/game-store'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { getCaixaAmount } from '@/utils/prize'
import { Spade } from 'lucide-react'

const podiumOrder = [1, 0, 2]
const placeLabels = ['2º lugar', '1º lugar', '3º lugar']

export function GameWinnings({
  totalPayout,
  prizeDistribution,
  caixaType,
  caixaPercentage,
  caixaFixed,
}: {
  totalPayout: number
  prizeDistribution: PrizeItem[]
  caixaType: CaixaType
  caixaPercentage: number
  caixaFixed: number
}) {
  const caixaAmount = getCaixaAmount(totalPayout, caixaType, caixaPercentage, caixaFixed)
  const effectiveTotal = totalPayout - caixaAmount

  const displayOrder = prizeDistribution.length > 3
    ? [...podiumOrder, ...prizeDistribution.slice(3).map((_, i) => i + 3)]
    : podiumOrder.slice(0, prizeDistribution.length)

  return (
    <section className="flex flex-row items-center justify-center gap-8 p-4">
      {displayOrder.map((idx, pos) => {
        const item = prizeDistribution[idx]
        if (!item) return null
        const prize =
          item.type === 'percentage'
            ? effectiveTotal * item.value / 100
            : item.value
        const label = placeLabels[pos] ?? `${idx + 1}º lugar`
        return (
          <div key={idx} className="flex flex-col items-center">
            <p className="text-muted-foreground text-xs mb-3">{label}</p>
            <Avatar className={idx === 0 ? 'w-16 h-16' : idx < 3 ? 'w-12 h-12' : 'w-8 h-8'}>
              <AvatarFallback>
                <Spade className={idx === 0 ? 'w-5 h-5' : idx < 3 ? 'w-4 h-4' : 'w-3 h-3'} />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center mt-2">
              <strong className="text-sm">{formatCurrencyBRL(prize)}</strong>
              {item.type === 'percentage' && (
                <span className="text-xs text-muted-foreground">{item.value}%</span>
              )}
            </div>
          </div>
        )
      })}

    </section>
  )
}
