'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader, User } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import type { Expense, Player } from '@/store/game-store'
import { useGameStore } from '@/store/game-store'
import { Dispatch, SetStateAction, useState } from 'react'
import { CurrencyInput } from 'react-currency-mask'

export const expensesFormSchema = z.object({
  gamePlayerId: z.string().optional(),
  description: z.string(),
  price: z.number(),
})

type Props = {
  players: Player[]
  gameId: string
  expenseId?: string
  defaultValues?: Expense
  currentPlayerId?: string
  onOpenSheetChange?: Dispatch<SetStateAction<boolean>>
}

export function ExpensesForm({
  players,
  gameId,
  expenseId,
  defaultValues,
  currentPlayerId,
  onOpenSheetChange,
}: Props) {
  const { toast } = useToast()
  const addExpense = useGameStore((s) => s.addExpense)
  const updateExpense = useGameStore((s) => s.updateExpense)
  const increaseAmountPaid = useGameStore((s) => s.increaseAmountPaid)
  const decreaseAmountPaid = useGameStore((s) => s.decreaseAmountPaid)

  const [isCreatingExpense, setIsCreatingExpense] = useState(false)
  const [isSavingExpense, setIsSavingExpense] = useState(false)

  const form = useForm<z.infer<typeof expensesFormSchema>>({
    resolver: zodResolver(expensesFormSchema),
    defaultValues: {
      description: defaultValues?.description,
      price: defaultValues?.price,
      gamePlayerId: defaultValues?.playerId ?? undefined,
    },
  })

  function onSubmit(values: z.infer<typeof expensesFormSchema>) {
    if (defaultValues) {
      setIsSavingExpense(true)

      updateExpense(gameId, expenseId!, {
        description: values.description,
        price: values.price,
        playerId: values.gamePlayerId ?? null,
      })

      if (values.gamePlayerId) {
        const gamePlayer = players.find(
          (p) => p.id === values.gamePlayerId,
        )
        if (gamePlayer) {
          const newIncreaseValue = gamePlayer.amountPaid + values.price
          increaseAmountPaid(gameId, gamePlayer.id, newIncreaseValue)

          if (currentPlayerId) {
            const currentPlayer = players.find(
              (p) => p.id === currentPlayerId,
            )
            if (currentPlayer) {
              const newDecreaseValue = currentPlayer.amountPaid - values.price
              decreaseAmountPaid(gameId, currentPlayerId, newDecreaseValue)
            }
          }
        }
      }

      toast({
        title: 'Despesa atualizada com sucesso!',
        variant: 'success',
      })
    } else {
      setIsCreatingExpense(true)

      addExpense(gameId, values.description, values.price, values.gamePlayerId)

      if (values.gamePlayerId) {
        const gamePlayer = players.find(
          (p) => p.id === values.gamePlayerId,
        )
        if (gamePlayer) {
          const newValue = values.price + gamePlayer.amountPaid
          increaseAmountPaid(gameId, gamePlayer.id, newValue)
        }
      }

      form.reset({
        description: '',
        price: 0,
        gamePlayerId: '',
      })

      if (onOpenSheetChange) {
        onOpenSheetChange(false)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="gamePlayerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vincular a um jogador</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-14">
                    <SelectValue placeholder="Selecione um jogador..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {players.length > 0 &&
                    players.map((player) => (
                      <SelectItem key={player.id} value={player.id}>
                        <header className="relative flex flex-row items-center gap-4 w-full">
                          <Avatar>
                            <AvatarFallback>
                              {player.name ? (
                                player.name[0]
                              ) : (
                                <User className="w-4 h-4" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-left">
                            <strong>{player.name}</strong>
                          </div>
                        </header>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Digite a descrição..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <CurrencyInput
                  value={field.value}
                  onChangeValue={(_, value) => {
                    field.onChange(value)
                  }}
                  InputElement={
                    <Input inputMode="numeric" placeholder="R$ 0,00" />
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isCreatingExpense || isSavingExpense}>
          {defaultValues
            ? 'Salvar alterações'
            : isCreatingExpense
              ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  <span>Adicionando despesa...</span>
                </>
              )
              : (
                <span>Adicionar despesa</span>
              )}
        </Button>
      </form>
    </Form>
  )
}
