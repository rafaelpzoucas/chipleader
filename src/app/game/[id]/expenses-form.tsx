'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader, Plus, User } from 'lucide-react'

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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import { GameExpenseDataType, GamePlayerDataType } from '@/models/games'
import { useState } from 'react'
import { CurrencyInput } from 'react-currency-mask'
import {
  createExpense,
  decreaseAmountPaid,
  getCurrentAmountPaid,
  increaseAmountPaid,
  updateExpense,
} from '../actions'

export const expensesFormSchema = z.object({
  gamePlayerId: z.string().optional(),
  description: z.string(),
  price: z.number(),
})

type ExpensesFormPropsType = {
  players: GamePlayerDataType[]
  gameId: string
  expenseId?: string
  defaultValues?: GameExpenseDataType
  currentPlayerId?: string
}

export function ExpensesForm({
  players,
  gameId,
  expenseId,
  defaultValues,
  currentPlayerId,
}: ExpensesFormPropsType) {
  const { toast } = useToast()

  const [isCreatingExpense, setIsCreatingExpense] = useState(false)
  const [isNewExpenseFormOpen, setIsNewExpenseFormOpen] = useState(false)

  const form = useForm<z.infer<typeof expensesFormSchema>>({
    resolver: zodResolver(expensesFormSchema),
    defaultValues: {
      description: defaultValues?.description,
      price: defaultValues?.price,
      gamePlayerId: defaultValues?.game_player_id,
    },
  })

  async function onSubmit(values: z.infer<typeof expensesFormSchema>) {
    if (defaultValues) {
      await updateExpense(values, expenseId)

      if (values.gamePlayerId) {
        const gamePlayer = players.filter(
          (player) => player.id === values.gamePlayerId,
        )[0]

        const newIncreaseValue = gamePlayer.amount_paid + values.price

        await increaseAmountPaid(newIncreaseValue, gamePlayer.id)

        if (currentPlayerId) {
          const currentPlayer = await getCurrentAmountPaid(currentPlayerId)

          const newDecreaseValue = currentPlayer.amount_paid - values.price

          await decreaseAmountPaid(newDecreaseValue, currentPlayerId)
        }
      }

      toast({
        title: 'Despesa atualizada com sucesso!',
        variant: 'success',
      })
    } else {
      setIsCreatingExpense(true)

      await createExpense(gameId, values)

      if (values.gamePlayerId) {
        const gamePlayer = players.filter(
          (player) => player.id === values.gamePlayerId,
        )[0]
        const newValue = values.price + gamePlayer.amount_paid

        await increaseAmountPaid(newValue, gamePlayer.id)
      }

      form.reset({
        description: '',
        price: 0,
        gamePlayerId: '',
      })

      setIsNewExpenseFormOpen(false)
    }
  }

  return (
    <Sheet open={isNewExpenseFormOpen} onOpenChange={setIsNewExpenseFormOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          <Plus className="w-4 h-4 mr-2" />
          Despesa
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Nova despesa</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="gamePlayerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vincular a um jogador</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                                {/* <p className="text-muted-foreground text-xs">
                                        Ganhos{' '}
                                        {formatCurrencyBRL(
                                          player?.users?.cumulative_winnings,
                                        )}
                                      </p> */}
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

            <Button className="w-full" disabled={isCreatingExpense}>
              {defaultValues ? (
                'Salvar alterações'
              ) : isCreatingExpense ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  <span>Adicionando despesa...</span>
                </>
              ) : (
                <span>Adicionar despesa</span>
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
