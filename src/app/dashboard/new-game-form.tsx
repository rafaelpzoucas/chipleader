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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CurrencyInput } from 'react-currency-mask'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createGame } from '../game/actions'

const newGameFormSchema = z.object({
  buyin: z.number(),
})

export function NewGameForm() {
  const router = useRouter()
  const [isCreatingGame, setIsCreatingGame] = useState(false)

  const newGameForm = useForm<z.infer<typeof newGameFormSchema>>({
    resolver: zodResolver(newGameFormSchema),
    defaultValues: {
      buyin: 25,
    },
  })

  async function handleCreateGame(values: z.infer<typeof newGameFormSchema>) {
    setIsCreatingGame(true)

    const response = await createGame(values.buyin)

    if (response) {
      router.push(
        `/api/invite/game?code=${response[0].id}&buyin=${values.buyin}`,
      )
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Novo jogo
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
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
