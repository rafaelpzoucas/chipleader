import type { Game, PrizeItem, CaixaType } from '@/store/game-store'

export function getPrizeDistribution(game: Game): PrizeItem[] {
  if (game.prizeDistribution && game.prizeDistribution.length > 0)
    return game.prizeDistribution
  const winners = (game as Record<string, unknown>).winnersAmount
  if (winners === 4)
    return [
      { type: 'percentage', value: 50 },
      { type: 'percentage', value: 30 },
      { type: 'percentage', value: 20 },
      { type: 'fixed', value: 50 },
    ]
  return [
    { type: 'percentage', value: 50 },
    { type: 'percentage', value: 30 },
    { type: 'percentage', value: 20 },
  ]
}

export function getCaixaAmount(
  totalPayout: number,
  caixaType: CaixaType | undefined,
  caixaPercentage: number | undefined,
  caixaFixed: number | undefined,
): number {
  if (caixaType === 'percentage') return totalPayout * ((caixaPercentage ?? 0) / 100)
  return Math.min(caixaFixed ?? 0, totalPayout)
}

export function getEffectivePayout(
  totalPayout: number,
  caixaType: CaixaType | undefined,
  caixaPercentage: number | undefined,
  caixaFixed: number | undefined,
): number {
  return totalPayout - getCaixaAmount(totalPayout, caixaType, caixaPercentage, caixaFixed)
}

const placeOrder = [1, 0, 2]

export function getDistIdx(placing: number): number {
  if (placing <= 2) return placeOrder[placing] ?? placing
  return placing - 1
}

export function getPrizeForPlacing(
  placing: number,
  distribution: PrizeItem[],
  totalPayout: number,
  prizeSplit?: boolean,
): number {
  if (prizeSplit && (placing === 0 || placing === 1)) {
    const getRaw = (p: number) => {
      const idx = getDistIdx(p)
      const item = distribution[idx]
      return item?.type === 'percentage' ? totalPayout * item.value / 100 : (item?.value ?? 0)
    }
    return (getRaw(0) + getRaw(1)) / 2
  }
  const idx = getDistIdx(placing)
  const item = distribution[idx]
  if (!item) return 0
  return item.type === 'percentage' ? totalPayout * item.value / 100 : item.value
}
