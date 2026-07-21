'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { Game, PrizeItem } from '@/store/game-store'
import { useGameStore } from '@/store/game-store'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { getCaixaAmount, getPrizeDistribution } from '@/utils/prize'
import { Minus, MoreVertical, Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CurrencyInput } from 'react-currency-mask'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type Props = { game: Game }

export function GameOptions({ game }: Props) {
  const router = useRouter()
  const deleteGame = useGameStore((s) => s.deleteGame)
  const updateBuyIn = useGameStore((s) => s.updateBuyIn)
  const updateCaixaPercentage = useGameStore((s) => s.updateCaixaPercentage)
  const updateCaixaFixed = useGameStore((s) => s.updateCaixaFixed)
  const updateCaixaType = useGameStore((s) => s.updateCaixaType)
  const updatePrizeDistribution = useGameStore((s) => s.updatePrizeDistribution)

  const [openSheet, setOpenSheet] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const totalPayout = game.players.reduce((acc, p) => acc + p.amountSpent, 0)
  const distribution = getPrizeDistribution(game)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          <MoreVertical className="w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenSheet('buyin')}>
            Alterar buy-in
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenSheet('prizes')}>
            Configurar prêmios
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenSheet('caixa')}>
            {game.caixaType === 'percentage' && game.caixaPercentage > 0
              ? `Alterar caixa (${game.caixaPercentage}%)`
              : game.caixaType === 'fixed' && game.caixaFixed > 0
                ? `Alterar caixa (${formatCurrencyBRL(game.caixaFixed)})`
                : 'Definir caixa'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setConfirmDelete(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir jogo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={openSheet === 'buyin'} onOpenChange={(o) => !o && setOpenSheet(null)}>
        <SheetContent side="bottom" className="h-full sm:h-fit">
          <BuyInSheet game={game} onSave={(v) => { updateBuyIn(game.id, v); setOpenSheet(null) }} />
        </SheetContent>
      </Sheet>

      <Sheet open={openSheet === 'prizes'} onOpenChange={(o) => !o && setOpenSheet(null)}>
        <SheetContent side="bottom" className="h-full sm:h-fit overflow-y-auto">
          <PrizesSheet
            distribution={distribution}
            totalPayout={totalPayout}
            onSave={(d) => { updatePrizeDistribution(game.id, d); setOpenSheet(null) }}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={openSheet === 'caixa'} onOpenChange={(o) => !o && setOpenSheet(null)}>
        <SheetContent side="bottom" className="h-full sm:h-fit">
          <CaixaSheet
            game={game}
            totalPayout={totalPayout}
            onSave={(type, pct, fixed) => {
              updateCaixaType(game.id, type)
              updateCaixaPercentage(game.id, pct)
              updateCaixaFixed(game.id, fixed)
              setOpenSheet(null)
            }}
          />
        </SheetContent>
      </Sheet>

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir jogo</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este jogo? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setConfirmDelete(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                deleteGame(game.id)
                router.push('/dashboard')
              }}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function BuyInSheet({ game, onSave }: { game: Game; onSave: (v: number) => void }) {
  const [value, setValue] = useState(game.buyIn)
  return (
    <>
      <SheetHeader>
        <SheetTitle>Alterar buy-in</SheetTitle>
      </SheetHeader>
      <div className="space-y-4 mt-4">
        <CurrencyInput
          value={value}
          onChangeValue={(_, v) => setValue(Number(v))}
          InputElement={<input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" inputMode="numeric" />}
        />
        <Button className="w-full" onClick={() => onSave(value)}>Salvar</Button>
      </div>
    </>
  )
}

function CaixaSheet({
  game,
  totalPayout,
  onSave,
}: {
  game: Game
  totalPayout: number
  onSave: (type: 'percentage' | 'fixed', pct: number, fixed: number) => void
}) {
  const [type, setType] = useState<'percentage' | 'fixed'>(game.caixaType)
  const [pct, setPct] = useState(game.caixaPercentage)
  const [fixed, setFixed] = useState(game.caixaFixed)

  const amount = getCaixaAmount(totalPayout, type, pct, fixed)

  return (
    <>
      <SheetHeader>
        <SheetTitle>
          {game.caixaPercentage > 0 || game.caixaFixed > 0
            ? 'Alterar caixa'
            : 'Definir caixa'}
        </SheetTitle>
      </SheetHeader>

      <p className="text-sm text-muted-foreground mt-4">
        Valor separado não distribuído entre os jogadores.
      </p>

      <div className="flex flex-row gap-2 mt-4">
        <Button
          variant={type === 'percentage' ? 'default' : 'outline'}
          className="flex-1"
          onClick={() => setType('percentage')}
        >
          Porcentagem
        </Button>
        <Button
          variant={type === 'fixed' ? 'default' : 'outline'}
          className="flex-1"
          onClick={() => setType('fixed')}
        >
          Valor fixo
        </Button>
      </div>

      <div className="space-y-4 mt-4">
        {type === 'percentage' ? (
          <div className="flex flex-row items-center gap-2">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              type="number"
              min={0}
              max={100}
              value={pct}
              onChange={(e) => setPct(Math.min(100, Math.max(0, Number(e.target.value))))}
            />
            <span className="text-lg font-medium">%</span>
          </div>
        ) : (
          <CurrencyInput
            value={fixed}
            onChangeValue={(_, v) => setFixed(Number(v))}
            InputElement={<input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" inputMode="numeric" placeholder="0" />}
          />
        )}

        {amount > 0 && (
          <p className="text-sm text-amber-500 text-center">
            {formatCurrencyBRL(amount)} reservado para o caixa
          </p>
        )}

        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={() => onSave(type, pct, fixed)}>
            Salvar
          </Button>
          {(game.caixaPercentage > 0 || game.caixaFixed > 0) && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onSave('percentage', 0, 0)}
            >
              Remover caixa
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

function PrizesSheet({
  distribution,
  totalPayout,
  onSave,
}: {
  distribution: PrizeItem[]
  totalPayout: number
  onSave: (d: PrizeItem[]) => void
}) {
  const [items, setItems] = useState<PrizeItem[]>(
    distribution.map((i) => ({ ...i })),
  )

  function updateItem(idx: number, field: keyof PrizeItem, value: unknown) {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)),
    )
  }

  function addPlace() {
    setItems((prev) => [...prev, { type: 'percentage', value: 10 }])
  }

  function removePlace(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx))
  }

  const defaults: Record<string, PrizeItem[]> = {
    '3 lugares': [
      { type: 'percentage', value: 50 },
      { type: 'percentage', value: 30 },
      { type: 'percentage', value: 20 },
    ],
    '4 lugares': [
      { type: 'percentage', value: 50 },
      { type: 'percentage', value: 30 },
      { type: 'percentage', value: 20 },
      { type: 'fixed', value: 50 },
    ],
  }

  return (
    <>
      <SheetHeader>
        <SheetTitle>Configurar prêmios</SheetTitle>
      </SheetHeader>

      <p className="text-sm text-muted-foreground mt-4">
        Defina quantos lugares recebem prêmio e o valor de cada um.
      </p>

      <div className="flex flex-row gap-2 mt-4">
        {Object.entries(defaults).map(([label, dist]) => (
          <Button
            key={label}
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setItems(dist.map((i) => ({ ...i })))}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="space-y-3 mt-4">
        {items.map((item, idx) => {
          const prizeValue =
            item.type === 'percentage'
              ? totalPayout * item.value / 100
              : item.value
          return (
            <div key={idx} className="flex flex-row items-center gap-2">
              <span className="text-sm font-medium w-16">
                {idx + 1}º
              </span>
              <Button
                variant={item.type === 'percentage' ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
                onClick={() =>
                  updateItem(idx, 'type',
                    item.type === 'percentage' ? 'fixed' : 'percentage')
                }
              >
                {item.type === 'percentage' ? '%' : 'R$'}
              </Button>
              <CurrencyInput
                value={item.value}
                onChangeValue={(_, v) => updateItem(idx, 'value', Number(v))}
                InputElement={
                  <input
                    className="flex h-9 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    inputMode="numeric"
                  />
                }
              />
              <span className="text-xs text-muted-foreground w-20 text-right">
                {formatCurrencyBRL(prizeValue)}
              </span>
              {items.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => removePlace(idx)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          )
        })}
      </div>

      <Button variant="outline" className="w-full mt-3" onClick={addPlace}>
        <Plus className="w-4 h-4 mr-2" />
        Adicionar colocação
      </Button>

      <Button className="w-full mt-4" onClick={() => onSave(items)}>
        Salvar
      </Button>
    </>
  )
}
