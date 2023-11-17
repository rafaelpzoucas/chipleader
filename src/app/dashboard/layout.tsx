import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { createGame } from '@/controllers/games'
import { Plus } from 'lucide-react'

export default function DashboardLayout({
  children,
  userHeader,
  active,
  ranking,
  history,
}: {
  children: React.ReactNode
  userHeader: React.ReactNode
  active: React.ReactNode
  ranking: React.ReactNode
  history: React.ReactNode
}) {
  async function handleCreateGame(event: any) {
    'use server'
    await createGame(event.target.value)
  }

  return (
    <main className="space-y-6 pb-10">
      {userHeader}

      <div className="flex px-4">
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
            <form action={handleCreateGame}>
              <div className="flex flex-col gap-2 mb-4">
                <Label>Buy-in</Label>
                <Input name="buy-in" placeholder="R$ 25,00" defaultValue={25} />
              </div>

              <Button className="w-full">Criar jogo</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <section className="px-4">{active}</section>

      <section className="px-4">{ranking}</section>

      <section className="space-y-3">
        <h1 className="ml-4 font-bold">Últimos jogos</h1>
        {history}
      </section>
    </main>
  )
}
