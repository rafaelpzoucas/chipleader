'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { GameExpenseDataType, GamePlayerDataType } from '@/models/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'
import { createExpense, updateAmountPaid, updateExpense } from '../actions'

export const expensesFormSchema = z.object({
  userId: z.string().optional(),
  description: z.string(),
  price: z.string(),
})

type ExpensesFormPropsType = {
  players: GamePlayerDataType[]
  gameId: string
  expenseId?: string
  defaultValues?: GameExpenseDataType
}

export function ExpensesForm({
  players,
  gameId,
  expenseId,
  defaultValues,
}: ExpensesFormPropsType) {
  const form = useForm<z.infer<typeof expensesFormSchema>>({
    resolver: zodResolver(expensesFormSchema),
    defaultValues: {
      description: defaultValues?.description,
      price: defaultValues?.price.toString(),
      userId: defaultValues?.game_player,
    },
  })

  async function onSubmit(values: z.infer<typeof expensesFormSchema>) {
    if (defaultValues) {
      await updateExpense(values, expenseId)
    } else {
      await createExpense(gameId, values)
    }

    if (values.userId) {
      const gamePlayer = players.filter(
        (player) => player.player_id === values.userId,
      )[0]

      await updateAmountPaid(
        parseFloat(values.price) + gamePlayer.amount_paid,
        gamePlayer.id,
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="userId"
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
                      <SelectItem key={player.id} value={player.player_id}>
                        <header className="relative flex flex-row items-end gap-4 w-full">
                          <Avatar>
                            <AvatarImage
                              src={player?.users?.user_metadata?.avatar_url}
                            />
                            <AvatarFallback>
                              {player?.users?.user_metadata?.name ? (
                                player?.users?.user_metadata?.name[0]
                              ) : (
                                <User className="w-4 h-4" />
                              )}
                            </AvatarFallback>
                          </Avatar>

                          <div className="text-left">
                            <strong>
                              {player?.users?.user_metadata?.name}{' '}
                            </strong>
                            <p className="text-muted-foreground text-xs">
                              Ganhos{' '}
                              {formatCurrencyBRL(
                                player?.users?.cumulative_winnings,
                              )}
                            </p>
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
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input inputMode="numeric" placeholder="R$ 0,00" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full">
          {defaultValues ? 'Salvar alterações' : 'Adicionar despesa'}
        </Button>
      </form>
    </Form>
  )
}
