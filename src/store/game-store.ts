import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

export type Expense = {
  id: string
  description: string
  price: number
  playerId: string | null
  createdAt: string
}

export type Game = {
  id: string
  createdAt: string
  status: 'active' | 'finished'
  buyIn: number
  winnersAmount: 3 | 4
  players: Player[]
  expenses: Expense[]
}

type GameStore = {
  games: Game[]
  registeredPlayers: RegisteredPlayer[]
  createGame: (buyIn: number) => string
  registerPlayer: (name: string) => string
  deleteRegisteredPlayer: (id: string) => void
  updateRegisteredPlayer: (id: string, name: string) => void
  addPlayer: (gameId: string, name: string) => void
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
  getGame: (gameId: string) => Game | undefined
  deleteGame: (gameId: string) => void
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
        }
        set((state) => ({ games: [...state.games, game] }))
        return id
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
        set((state) => ({
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, winnersAmount: amount } : g,
          ),
        }))
      },

      getGame: (gameId: string) => {
        return get().games.find((g) => g.id === gameId)
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
    },
  ),
)
