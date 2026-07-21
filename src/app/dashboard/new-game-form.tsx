'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, Plus, Swords, DollarSign } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CurrencyInput } from 'react-currency-mask'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useGameStore } from '@/store/game-store'

const newGameFormSchema = z.object({
  buyin: z.number(),
  gameMode: z.enum(['cash', 'tournament']),
  blindInterval: z.number(),
})

const BLIND_INTERVALS = [
  { value: 300, label: '5 min' },
  { value: 480, label: '8 min' },
  { value: 600, label: '10 min' },
  { value: 720, label: '12 min' },
  { value: 900, label: '15 min' },
] as const

export function NewGameForm() {
  const router = useRouter()
  const createGame = useGameStore((s) => s.createGame)
  const createTournamentGame = useGameStore((s) => s.createTournamentGame)
  const [isCreatingGame, setIsCreatingGame] = useState(false)

  const newGameForm = useForm<z.infer<typeof newGameFormSchema>>({
    resolver: zodResolver(newGameFormSchema),
    defaultValues: {
      buyin: 25,
      gameMode: 'cash',
      blindInterval: 900,
    },
  })

  const gameMode = newGameForm.watch('gameMode')

  function handleCreateGame(values: z.infer<typeof newGameFormSchema>) {
    setIsCreatingGame(true)
    const id =
      values.gameMode === 'tournament'
        ? createTournamentGame(values.buyin, values.blindInterval)
        : createGame(values.buyin)
    router.push(`/game/${id}`)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Novo jogo
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-full sm:h-fit">
        <SheetHeader>
          <SheetTitle>Novo jogo</SheetTitle>
        </SheetHeader>
        <Form {...newGameForm}>
          <form
            onSubmit={newGameForm.handleSubmit(handleCreateGame)}
            className="space-y-4"
          >
            <FormField
              control={newGameForm.control}
              name="gameMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modo de jogo</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={field.value === 'cash' ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => field.onChange('cash')}
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Cash Game
                      </Button>
                      <Button
                        type="button"
                        variant={field.value === 'tournament' ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => field.onChange('tournament')}
                      >
                        <Swords className="w-4 h-4 mr-2" />
                        Torneio
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={newGameForm.control}
              name="buyin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buy-in</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={field.value}
                      onChangeValue={(_, value) => {
                        field.onChange(value)
                      }}
                      InputElement={
                        <Input placeholder="R$ 0,00" inputMode="numeric" />
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {gameMode === 'tournament' && (
              <FormField
                control={newGameForm.control}
                name="blindInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intervalo de blinds</FormLabel>
                    <FormControl>
                      <Select
                        value={String(field.value)}
                        onValueChange={(v) => field.onChange(Number(v))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {BLIND_INTERVALS.map((i) => (
                            <SelectItem key={i.value} value={String(i.value)}>
                              {i.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full" disabled={isCreatingGame}>
              {isCreatingGame ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  <span>Criando jogo</span>
                </>
              ) : (
                <span>Criar jogo</span>
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
