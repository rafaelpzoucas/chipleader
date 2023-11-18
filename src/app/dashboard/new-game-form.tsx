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
import { createGame } from '@/controllers/games'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const newGameFormSchema = z.object({
  buyin: z.number(),
})

export function NewGameForm() {
  const router = useRouter()

  const newGameForm = useForm<z.infer<typeof newGameFormSchema>>({
    resolver: zodResolver(newGameFormSchema),
    defaultValues: {
      buyin: 25,
    },
  })

  async function handleCreateGame(values: z.infer<typeof newGameFormSchema>) {
    const response = await createGame(values.buyin)

    if (response) {
      router.push(`/api/invite/game?code=${response[0].id}`)
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
                    <Input placeholder="R$ 25,00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Criar jogo
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
