'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useGameStore } from '@/store/game-store'
import { DEFAULT_BLIND_STRUCTURE, generateBlindLevels, type BlindLevel } from '@/data/blind-structure'
import { Minus, Plus, Coffee } from 'lucide-react'

const BLIND_OPTIONS = DEFAULT_BLIND_STRUCTURE.map((l) => l.bigBlind)

function closestBlindIndex(value: number): number {
  if (value <= BLIND_OPTIONS[0]) return 0
  if (value >= BLIND_OPTIONS[BLIND_OPTIONS.length - 1]) return BLIND_OPTIONS.length - 1
  const idx = BLIND_OPTIONS.findIndex((b) => b >= value)
  const prev = BLIND_OPTIONS[idx - 1]
  const next = BLIND_OPTIONS[idx]
  return value - prev < next - value ? idx - 1 : idx
}

type Props = {
  gameId: string
  onClose: () => void
}

export function BlindConfigSheet({ gameId, onClose }: Props) {
  const game = useGameStore((s) => s.games.find((g) => g.id === gameId))
  const setBlindLevels = useGameStore((s) => s.setBlindLevels)

  const [levels, setLevels] = useState<BlindLevel[]>(
    () => game?.blindLevels ?? [],
  )

  const prevBlindsRef = useRef<Map<number, { smallBlind: number; bigBlind: number }>>(new Map())

  if (!game) return null

  function updateRound(idx: number, data: Partial<BlindLevel>) {
    setLevels((prev) =>
      prev.map((l, i) => (i === idx ? { ...l, ...data } : l)),
    )
  }

  function toggleBreak(idx: number) {
    setLevels((prev) =>
      prev.map((l, i) => {
        if (i !== idx) return l
        if (l.isBreak) {
          const saved = prevBlindsRef.current.get(i)
          if (saved) {
            prevBlindsRef.current.delete(i)
            return { ...l, isBreak: false, smallBlind: saved.smallBlind, bigBlind: saved.bigBlind }
          }
          return { ...l, isBreak: false }
        }
        prevBlindsRef.current.set(i, { smallBlind: l.smallBlind, bigBlind: l.bigBlind })
        return { ...l, isBreak: true, smallBlind: 0, bigBlind: 0 }
      }),
    )
  }

  function changeRoundCount(newCount: number) {
    if (newCount < 1) return
    if (newCount > levels.length) {
      const extra = generateBlindLevels(newCount).slice(levels.length)
      setLevels([...levels, ...extra])
    } else {
      setLevels(levels.slice(0, newCount))
    }
  }

  function handleSave() {
    setBlindLevels(gameId, levels)
    onClose()
  }

  const breakIdx = levels.findIndex((l) => l.isBreak)

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle>Configurar blinds</SheetTitle>
      </SheetHeader>

      <div className="mt-4 flex flex-col flex-1 min-h-0 gap-5">
        <div className="flex items-center justify-between gap-4 shrink-0">
          <span className="text-sm font-medium">Número de rounds</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={() => changeRoundCount(levels.length - 1)}
              disabled={levels.length <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-medium tabular-nums">
              {levels.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={() => changeRoundCount(levels.length + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 shrink-0">
          <span className="text-sm font-medium">Round de intervalo</span>
          <select
            value={breakIdx >= 0 ? breakIdx : ''}
            onChange={(e) => {
              const val = e.target.value
              const newVal = val !== '' ? Number(val) : null
              setLevels((prev) => {
                const oldBreakIdx = prev.findIndex((l) => l.isBreak)
                if (newVal !== null && newVal === oldBreakIdx) return prev
                return prev.map((l, i) => {
                  if (i === oldBreakIdx && oldBreakIdx >= 0) {
                    const saved = prevBlindsRef.current.get(i)
                    if (saved) {
                      prevBlindsRef.current.delete(i)
                      return { ...l, isBreak: false, smallBlind: saved.smallBlind, bigBlind: saved.bigBlind }
                    }
                    return { ...l, isBreak: false }
                  }
                  if (newVal !== null && i === newVal) {
                    prevBlindsRef.current.set(i, { smallBlind: l.smallBlind, bigBlind: l.bigBlind })
                    return { ...l, isBreak: true, smallBlind: 0, bigBlind: 0 }
                  }
                  return { ...l, isBreak: false }
                })
              })
            }}
            className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            <option value="">Nenhum</option>
            {levels.map((_, i) => (
              <option key={i} value={i} disabled={levels[i].isBreak && i !== breakIdx}>
                Round {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="border rounded-lg divide-y flex-1 overflow-y-auto">
          {levels.map((level, idx) => (
            <div
              key={idx}
              className={`p-3 flex items-center gap-3 ${level.isBreak ? 'bg-muted/30' : ''}`}
            >
              <span className="text-sm font-medium w-8 shrink-0">
                {idx + 1}
              </span>

              {level.isBreak ? (
                <div className="flex-1 flex items-center gap-2 text-amber-500">
                  <Coffee className="w-4 h-4" />
                  <span className="text-sm font-medium">BREAK</span>
                </div>
              ) : (
                <div className="flex-1 space-y-1">
                  <input
                    type="range"
                    min={0}
                    max={BLIND_OPTIONS.length - 1}
                    step={1}
                    value={closestBlindIndex(level.bigBlind)}
                    onChange={(e) => {
                      const vi = Number(e.target.value)
                      const big = BLIND_OPTIONS[vi]
                      updateRound(idx, { smallBlind: big / 2, bigBlind: big })
                    }}
                    className="w-full h-4 accent-foreground"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-14">
                      SB {level.smallBlind}
                    </span>
                    <input
                      className="flex h-8 w-24 rounded-md border border-input bg-background px-2 py-1 text-sm tabular-nums text-right"
                      type="number"
                      min={0}
                      value={level.bigBlind}
                      onChange={(e) => {
                        const big = Number(e.target.value)
                        updateRound(idx, { smallBlind: Math.round(big / 2), bigBlind: big })
                      }}
                    />
                    <span className="text-xs text-muted-foreground">BB</span>
                  </div>
                </div>
              )}

              <Button
                variant={level.isBreak ? 'secondary' : 'ghost'}
                size="icon"
                className="w-8 h-8 shrink-0"
                onClick={() => toggleBreak(idx)}
                title={level.isBreak ? 'Remover break' : 'Marcar como break'}
              >
                <Coffee className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button className="w-full shrink-0" onClick={handleSave}>
          Salvar
        </Button>
      </div>
    </div>
  )
}
