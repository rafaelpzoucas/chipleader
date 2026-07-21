import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_BLIND_STRUCTURE, generateBlindLevels, type BlindLevel } from '@/data/blind-structure'

export type GameMode = 'cash' | 'tournament'

export type RegisteredPlayer = {
  id: string
  name: string
}

export type Player = {
  id: string
  name: string
  bustedAt: string | null
  amountSpent: number
  amountPaid: number
}

export type CaixaType = 'percentage' | 'fixed'

export type PrizeItem = {
  type: 'percentage' | 'fixed'
  value: number
}

export type Expense = {
  id: string
  description: string
  price: number
  playerId: string | null
  createdAt: string
}

export type BlindTimerState = {
  currentLevel: number
  isRunning: boolean
  levelStartedAt: number | null
  pausedAt: number | null
  totalPausedMs: number
}

export type Game = {
  id: string
  createdAt: string
  status: 'active' | 'finished'
  buyIn: number
  winnersAmount: 3 | 4
  players: Player[]
  expenses: Expense[]
  prizeDistribution: PrizeItem[]
  caixaType: CaixaType
  caixaPercentage: number
  caixaFixed: number
  gameMode: GameMode
  blindInterval: number
  blindLevels: BlindLevel[]
  blindTimer: BlindTimerState
  prizeSplit: boolean
}

type GameStore = {
  games: Game[]
  registeredPlayers: RegisteredPlayer[]
  createGame: (buyIn: number) => string
  registerPlayer: (name: string) => string
  deleteRegisteredPlayer: (id: string) => void
  updateRegisteredPlayer: (id: string, name: string) => void
  addPlayer: (gameId: string, name: string) => void
  removePlayer: (gameId: string, playerId: string) => void
  updatePlayerAmountSpent: (gameId: string, playerId: string, amountSpent: number) => void
  increaseAmountPaid: (gameId: string, playerId: string, value: number) => void
  decreaseAmountPaid: (gameId: string, playerId: string, value: number) => void
  bustPlayer: (gameId: string, playerId: string) => void
  unbustPlayer: (gameId: string, playerId: string) => void
  addExpense: (gameId: string, description: string, price: number, playerId?: string) => void
  updateExpense: (gameId: string, expenseId: string, data: { description?: string; price?: number; playerId?: string | null }) => void
  removeExpense: (gameId: string, expenseId: string) => void
  finishGame: (gameId: string) => void
  updateWinnersAmount: (gameId: string, amount: 3 | 4) => void
  updateBuyIn: (gameId: string, buyIn: number) => void
  updateCaixaPercentage: (gameId: string, percentage: number) => void
  updateCaixaFixed: (gameId: string, value: number) => void
  updateCaixaType: (gameId: string, type: CaixaType) => void
  updatePrizeDistribution: (gameId: string, distribution: PrizeItem[]) => void
  getGame: (gameId: string) => Game | undefined
  deleteGame: (gameId: string) => void
  createTournamentGame: (buyIn: number, blindInterval: number) => string
  setGameMode: (gameId: string, mode: GameMode) => void
  setBlindInterval: (gameId: string, interval: number) => void
  setBlindLevels: (gameId: string, levels: BlindLevel[]) => void
  updateBlindLevel: (gameId: string, index: number, data: Partial<BlindLevel>) => void
  startBlindTimer: (gameId: string) => void
  pauseBlindTimer: (gameId: string) => void
  resumeBlindTimer: (gameId: string) => void
  advanceBlindLevel: (gameId: string) => void
  previousBlindLevel: (gameId: string) => void
  resetBlindTimer: (gameId: string) => void
  togglePrizeSplit: (gameId: string) => void
}

function genId() {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 11)
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      games: [],
      registeredPlayers: [],

      registerPlayer: (name: string) => {
        const id = genId()
        set((state) => ({
          registeredPlayers: [...state.registeredPlayers, { id, name }],
        }))
        return id
      },

      deleteRegisteredPlayer: (id: string) => {
        set((state) => ({
          registeredPlayers: state.registeredPlayers.filter((p) => p.id !== id),
        }))
      },

      updateRegisteredPlayer: (id: string, name: string) => {
        set((state) => ({
          registeredPlayers: state.registeredPlayers.map((p) =>
            p.id === id ? { ...p, name } : p,
          ),
        }))
      },

      createGame: (buyIn: number) => {
        const id = genId()
        const game: Game = {
          id,
          createdAt: new Date().toISOString(),
          status: 'active',
          buyIn,
          winnersAmount: 3,
          players: [],
          expenses: [],
          prizeDistribution: [
            { type: 'percentage', value: 50 },
            { type: 'percentage', value: 30 },
            { type: 'percentage', value: 20 },
          ],
          caixaType: 'percentage',
          caixaPercentage: 0,
          caixaFixed: 0,
          gameMode: 'cash',
          blindInterval: 900,
          blindLevels: generateBlindLevels(DEFAULT_BLIND_STRUCTURE.length),
          blindTimer: {
            currentLevel: 0,
            isRunning: false,
            levelStartedAt: null,
            pausedAt: null,
            totalPausedMs: 0,
          },
          prizeSplit: false,
        }
        set((state) => ({ games: [...state.games, game] }))
        return id
      },

      createTournamentGame: (buyIn: number, blindInterval: number) => {
        const id = genId()
        const game: Game = {
          id,
          createdAt: new Date().toISOString(),
          status: 'active',
          buyIn,
          winnersAmount: 3,
          players: [],
          expenses: [],
          prizeDistribution: [
            { type: 'percentage', value: 50 },
            { type: 'percentage', value: 30 },
            { type: 'percentage', value: 20 },
          ],
          caixaType: 'percentage',
          caixaPercentage: 0,
          caixaFixed: 0,
          gameMode: 'tournament',
          blindInterval,
          blindLevels: generateBlindLevels(DEFAULT_BLIND_STRUCTURE.length),
          blindTimer: {
            currentLevel: 0,
            isRunning: false,
            levelStartedAt: null,
            pausedAt: null,
            totalPausedMs: 0,
          },
          prizeSplit: false,
        }
        set((state) => ({ games: [...state.games, game] }))
        return id
      },

      removePlayer: (gameId: string, playerId: string) => {
    set((state) => ({
      games: state.games.map((g) =>
        g.id === gameId
          ? {
              ...g,
              players: g.players.filter((p) => p.id !== playerId),
              expenses: g.expenses.map((e) =>
                e.playerId === playerId ? { ...e, playerId: null } : e,
              ),
            }
          : g,
      ),
    }))
  },

  addPlayer: (gameId: string, name: string) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  players: [
                    ...g.players,
                    {
                      id: genId(),
                      name,
                      bustedAt: null,
                      amountSpent: g.buyIn,
                      amountPaid: 0,
                    },
                  ],
                }
              : g,
          ),
        }))
      },

      updatePlayerAmountSpent: (gameId: string, playerId: string, amountSpent: number) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  players: g.players.map((p) =>
                    p.id === playerId ? { ...p, amountSpent } : p,
                  ),
                }
              : g,
          ),
        }))
      },

      increaseAmountPaid: (gameId: string, playerId: string, value: number) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  players: g.players.map((p) =>
                    p.id === playerId ? { ...p, amountPaid: p.amountPaid + value } : p,
                  ),
                }
              : g,
          ),
        }))
      },

      decreaseAmountPaid: (gameId: string, playerId: string, value: number) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  players: g.players.map((p) =>
                    p.id === playerId ? { ...p, amountPaid: value } : p,
                  ),
                }
              : g,
          ),
        }))
      },

      bustPlayer: (gameId: string, playerId: string) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  players: g.players.map((p) =>
                    p.id === playerId ? { ...p, bustedAt: new Date().toISOString() } : p,
                  ),
                }
              : g,
          ),
        }))
      },

      unbustPlayer: (gameId: string, playerId: string) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  players: g.players.map((p) =>
                    p.id === playerId ? { ...p, bustedAt: null } : p,
                  ),
                }
              : g,
          ),
        }))
      },

      addExpense: (gameId: string, description: string, price: number, playerId?: string) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  expenses: [
                    ...g.expenses,
                    {
                      id: genId(),
                      description,
                      price,
                      playerId: playerId ?? null,
                      createdAt: new Date().toISOString(),
                    },
                  ],
                }
              : g,
          ),
        }))
      },

      updateExpense: (gameId: string, expenseId: string, data) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  expenses: g.expenses.map((e) =>
                    e.id === expenseId ? { ...e, ...data } : e,
                  ),
                }
              : g,
          ),
        }))
      },

      removeExpense: (gameId: string, expenseId: string) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  expenses: g.expenses.filter((e) => e.id !== expenseId),
                }
              : g,
          ),
        }))
      },

      finishGame: (gameId: string) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, status: 'finished' as const } : g,
          ),
        }))
      },

      updateWinnersAmount: (gameId: string, amount: 3 | 4) => {
        const distribution: PrizeItem[] = amount === 3
          ? [{ type: 'percentage', value: 50 }, { type: 'percentage', value: 30 }, { type: 'percentage', value: 20 }]
          : [{ type: 'percentage', value: 50 }, { type: 'percentage', value: 30 }, { type: 'percentage', value: 20 }, { type: 'fixed', value: 50 }]
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, winnersAmount: amount, prizeDistribution: distribution } : g,
          ),
        }))
      },

      updateBuyIn: (gameId: string, buyIn: number) => {
        set((state) => ({
          games: state.games.map((g) => {
            if (g.id !== gameId) return g
            const oldBuyIn = g.buyIn
            const ratio = oldBuyIn > 0 ? buyIn / oldBuyIn : 1
            return {
              ...g,
              buyIn,
              players: g.players.map((p) => ({
                ...p,
                amountSpent: Math.round(p.amountSpent * ratio),
              })),
            }
          }),
        }))
      },

      updateCaixaPercentage: (gameId: string, percentage: number) => {
        const clamped = Math.max(0, Math.min(100, percentage))
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, caixaPercentage: clamped } : g,
          ),
        }))
      },

      updateCaixaFixed: (gameId: string, value: number) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, caixaFixed: Math.max(0, value) } : g,
          ),
        }))
      },

      updateCaixaType: (gameId: string, type: CaixaType) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, caixaType: type } : g,
          ),
        }))
      },

      updatePrizeDistribution: (gameId: string, distribution: PrizeItem[]) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, prizeDistribution: distribution } : g,
          ),
        }))
      },

      setGameMode: (gameId: string, mode: GameMode) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, gameMode: mode } : g,
          ),
        }))
      },

      setBlindInterval: (gameId: string, interval: number) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, blindInterval: interval } : g,
          ),
        }))
      },

      setBlindLevels: (gameId: string, levels: BlindLevel[]) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, blindLevels: levels } : g,
          ),
        }))
      },

      updateBlindLevel: (gameId: string, index: number, data: Partial<BlindLevel>) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  blindLevels: g.blindLevels.map((level, i) =>
                    i === index ? { ...level, ...data } : level,
                  ),
                }
              : g,
          ),
        }))
      },

      startBlindTimer: (gameId: string) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  blindTimer: {
                    currentLevel: 0,
                    isRunning: true,
                    levelStartedAt: Date.now(),
                    pausedAt: null,
                    totalPausedMs: 0,
                  },
                }
              : g,
          ),
        }))
      },

      pauseBlindTimer: (gameId: string) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId && g.blindTimer.isRunning
              ? {
                  ...g,
                  blindTimer: {
                    ...g.blindTimer,
                    isRunning: false,
                    pausedAt: Date.now(),
                  },
                }
              : g,
          ),
        }))
      },

      resumeBlindTimer: (gameId: string) => {
        set((state) => ({
          games: state.games.map((g) => {
            if (g.id !== gameId || g.blindTimer.pausedAt === null) return g
            const pausedDuration = Date.now() - g.blindTimer.pausedAt
            return {
              ...g,
              blindTimer: {
                ...g.blindTimer,
                isRunning: true,
                pausedAt: null,
                totalPausedMs: g.blindTimer.totalPausedMs + pausedDuration,
              },
            }
          }),
        }))
      },

      advanceBlindLevel: (gameId: string) => {
        set((state) => ({
          games: state.games.map((g) => {
            if (g.id !== gameId) return g
            const nextLevel = g.blindTimer.currentLevel + 1
            const maxLevel = (g.blindLevels?.length ?? DEFAULT_BLIND_STRUCTURE.length) - 1
            return {
              ...g,
              blindTimer: {
                currentLevel: Math.min(nextLevel, maxLevel),
                isRunning: nextLevel > maxLevel ? false : g.blindTimer.isRunning,
                levelStartedAt: nextLevel > maxLevel ? null : Date.now(),
                pausedAt: null,
                totalPausedMs: 0,
              },
            }
          }),
        }))
      },

      previousBlindLevel: (gameId: string) => {
        set((state) => ({
          games: state.games.map((g) => {
            if (g.id !== gameId) return g
            const prevLevel = Math.max(0, g.blindTimer.currentLevel - 1)
            return {
              ...g,
              blindTimer: {
                ...g.blindTimer,
                currentLevel: prevLevel,
                levelStartedAt: Date.now(),
                pausedAt: null,
                totalPausedMs: 0,
              },
            }
          }),
        }))
      },

      resetBlindTimer: (gameId: string) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  blindTimer: {
                    currentLevel: 0,
                    isRunning: false,
                    levelStartedAt: null,
                    pausedAt: null,
                    totalPausedMs: 0,
                  },
                }
              : g,
          ),
        }))
      },

      getGame: (gameId: string) => {
        return get().games.find((g) => g.id === gameId)
      },

      togglePrizeSplit: (gameId: string) => {
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, prizeSplit: !g.prizeSplit } : g,
          ),
        }))
      },

      deleteGame: (gameId: string) => {
        set((state) => ({
          games: state.games.filter((g) => g.id !== gameId),
        }))
      },
    }),
    {
      name: 'chipleader-games',
      skipHydration: true,
      merge: (persisted: unknown, current) => {
        const merged = { ...current, ...(persisted as typeof current) }
        merged.games = merged.games.map((game) => ({
          ...game,
          gameMode: game.gameMode ?? ('cash' as const),
          blindInterval: game.blindInterval ?? 900,
          blindLevels: game.blindLevels ?? generateBlindLevels(DEFAULT_BLIND_STRUCTURE.length),
          blindTimer: game.blindTimer ?? {
            currentLevel: 0,
            isRunning: false,
            levelStartedAt: null,
            pausedAt: null,
            totalPausedMs: 0,
          },
          prizeSplit: game.prizeSplit ?? false,
        }))
        return merged
      },
    },
  ),
)
