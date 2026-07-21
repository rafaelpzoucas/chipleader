'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet'
import {
  Play,
  Pause,
  Square,
  ChevronRight,
  ChevronLeft,
  Coffee,
  X,
  Timer,
  MoreVertical,
  Settings,
  Maximize2,
} from 'lucide-react'
import { useBlindTimer } from '@/hooks/use-blind-timer'
import { BlindConfigSheet } from './blind-config-sheet'

export function BlindTimerFloating({ gameId }: { gameId: string }) {
  const timer = useBlindTimer(gameId)
  const [expanded, setExpanded] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [openSheet, setOpenSheet] = useState<string | null>(null)

  if (!timer) return null

  const {
    timeRemaining,
    isRunning,
    wasStarted,
    isLastLevel,
    isBreak,
    currentLevel,
    totalLevels,
    smallBlind,
    bigBlind,
    nextSmallBlind,
    nextBigBlind,
    start,
    pause,
    resume,
    reset,
    advanceLevel,
    previousLevel,
  } = timer

  const minutes = Math.floor(timeRemaining / 60000)
  const seconds = Math.floor((timeRemaining % 60000) / 1000)
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <>
      {expanded && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setExpanded(false)}
        />
      )}

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center transition-all duration-300 ease-in-out">
        {expanded ? (
          <div
            className="bg-card border shadow-xl rounded-2xl px-6 py-5 flex flex-col items-center gap-5 min-w-[320px] animate-in fade-in slide-in-from-bottom-2 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Blind Timer
                </span>
              </div>
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => { setOpenSheet('blinds'); setExpanded(false) }}>
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar rounds
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <span className="text-6xl font-bold tabular-nums tracking-tight">
              {timeStr}
            </span>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-full"
                onClick={previousLevel}
                disabled={currentLevel <= 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="text-lg font-semibold min-w-[160px] text-center">
                {isBreak ? 'INTERVALO' : `Nível ${currentLevel}/${totalLevels}`}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-full"
                onClick={advanceLevel}
                disabled={isLastLevel}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {isBreak ? (
              <div className="flex items-center gap-2 text-amber-500">
                <Coffee className="w-5 h-5" />
                <span className="text-lg font-medium">BREAK</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-0">
                <span className="text-3xl font-bold">{smallBlind}/{bigBlind}</span>
                {nextSmallBlind !== null && (
                  <>
                    <ChevronRight className="w-5 h-5 text-muted-foreground rotate-90 my-0.5" />
                    <span className="text-base text-muted-foreground">{nextSmallBlind}/{nextBigBlind}</span>
                  </>
                )}
              </div>
            )}

            {isLastLevel && !isBreak && (
              <span className="text-xs text-amber-500 font-medium">
                Último nível
              </span>
            )}

            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex items-center gap-2">
                {!wasStarted ? (
                  <Button onClick={start} size="icon" className="w-11 h-11 rounded-full">
                    <Play className="w-5 h-5" />
                  </Button>
                ) : isRunning ? (
                  <>
                    <Button onClick={pause} variant="secondary" size="icon" className="w-11 h-11 rounded-full">
                      <Pause className="w-5 h-5" />
                    </Button>
                    <Button onClick={reset} variant="ghost" size="icon" className="w-11 h-11 rounded-full">
                      <Square className="w-5 h-5" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={resume} variant="secondary" size="icon" className="w-11 h-11 rounded-full">
                      <Play className="w-5 h-5" />
                    </Button>
                    <Button onClick={reset} variant="ghost" size="icon" className="w-11 h-11 rounded-full">
                      <Square className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => { setFullscreen(true); setExpanded(false) }}
              >
                <Maximize2 className="w-4 h-4" />
                Tela cheia
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setExpanded(true)}
            className="bg-card border shadow-lg rounded-full pl-5 pr-4 py-3 animate-in fade-in duration-200"
          >
            <div className="flex items-center gap-3 text-xl">
              <Timer className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="tabular-nums font-medium">{timeStr}</span>
              <span className="text-muted-foreground tabular-nums">
                N{currentLevel}/{totalLevels}
              </span>
              {isBreak ? (
                <span className="flex items-center gap-1 text-amber-500 font-medium">
                  <Coffee className="w-4 h-4" />
                  BREAK
                </span>
              ) : (
                <span className="font-semibold">
                  {smallBlind}/{bigBlind}
                </span>
              )}
            </div>
          </button>
        )}
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-10 animate-in fade-in duration-200">
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Timer className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Blind Timer
            </span>
          </div>

          <div className="text-center">
            <span className="text-8xl font-bold tabular-nums tracking-tight">
              {timeStr}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full"
              onClick={previousLevel}
              disabled={currentLevel <= 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-2xl font-semibold min-w-[180px] text-center">
              {isBreak ? 'INTERVALO' : `Nível ${currentLevel}/${totalLevels}`}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full"
              onClick={advanceLevel}
              disabled={isLastLevel}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {isBreak ? (
            <div className="flex items-center gap-2 text-amber-500">
              <Coffee className="w-6 h-6" />
              <span className="text-xl font-medium">BREAK</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-0">
              <span className="text-4xl font-bold">{smallBlind}/{bigBlind}</span>
              {nextSmallBlind !== null && (
                <>
                  <ChevronRight className="w-6 h-6 text-muted-foreground rotate-90 my-1" />
                  <span className="text-lg text-muted-foreground">{nextSmallBlind}/{nextBigBlind}</span>
                </>
              )}
            </div>
          )}

          {isLastLevel && !isBreak && (
            <span className="text-sm text-amber-500 font-medium">
              Último nível
            </span>
          )}

          <div className="flex gap-3">
            {!wasStarted ? (
              <Button onClick={start} size="icon" className="w-14 h-14 rounded-full">
                <Play className="w-6 h-6" />
              </Button>
            ) : isRunning ? (
              <>
                <Button onClick={pause} variant="secondary" size="icon" className="w-14 h-14 rounded-full">
                  <Pause className="w-6 h-6" />
                </Button>
                <Button onClick={reset} variant="ghost" size="icon" className="w-14 h-14 rounded-full">
                  <Square className="w-6 h-6" />
                </Button>
              </>
            ) : (
              <>
                <Button onClick={resume} variant="secondary" size="icon" className="w-14 h-14 rounded-full">
                  <Play className="w-6 h-6" />
                </Button>
                <Button onClick={reset} variant="ghost" size="icon" className="w-14 h-14 rounded-full">
                  <Square className="w-6 h-6" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      <Sheet open={openSheet === 'blinds'} onOpenChange={(o) => !o && setOpenSheet(null)}>
        <SheetContent side="bottom" className="h-dvh overflow-y-auto">
          <BlindConfigSheet gameId={gameId} onClose={() => setOpenSheet(null)} />
        </SheetContent>
      </Sheet>
    </>
  )
}
