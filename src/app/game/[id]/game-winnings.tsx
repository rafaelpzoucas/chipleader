import { formatCurrencyBRL } from '@/utils/formatCurrency'

export function GameWinnings({ totalPayout }: { totalPayout: number }) {
  return (
    <section>
      <h1 className="text-lg font-bold">Prêmios</h1>

      <ul>
        <li>1º lugar: {formatCurrencyBRL(totalPayout * 0.5)}</li>
        <li>2º lugar: {formatCurrencyBRL(totalPayout * 0.3)}</li>
        <li>3º lugar: {formatCurrencyBRL(totalPayout * 0.2)}</li>
      </ul>
    </section>
  )
}
