import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ArrowLeft, Copy, MoreVertical, Plus } from 'lucide-react'
import Link from 'next/link'
import { PlayerCardSheet } from './player-card-sheet'

export default function Game({ params }: { params: { id: string } }) {
  return (
    <main className="space-y-8 p-4 pb-10">
      <header className="flex flex-row items-center">
        <Link href="/dashboard" className="p-3">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold">Jogo ativo agora</h1>

        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto p-2">
            <MoreVertical className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Adicionar despesa</DropdownMenuItem>
            <DropdownMenuItem>Sair do jogo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <section>
        <h1 className="text-lg font-bold">Prêmios</h1>

        <ul>
          <li>1º lugar: R$ 500,00</li>
          <li>2º lugar: R$ 300,00</li>
          <li>3º lugar: R$ 150,00</li>
        </ul>
      </section>

      <Button className="w-full">Encerrar jogo</Button>

      <section className="space-y-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Convidar jogadores
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Compartilhar link</SheetTitle>

              <div className="flex flex-row gap-3">
                <Card className="flex items-center px-4 w-full truncate text-muted-foreground bg-secondary">
                  https://chipleaders.vercel.app/game/uenfl8jhdldndund8gpoa9mnbuebtmrfisad8f
                </Card>
                <Button
                  variant="outline"
                  size="icon"
                  className="aspect-square h-10 w-10"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <PlayerCardSheet />
        <PlayerCardSheet />
        <PlayerCardSheet />
        <PlayerCardSheet />
        <PlayerCardSheet />
      </section>

      <section className="space-y-3">
        <header className="flex flex-row items-center justify-between">
          <h1 className="text-lg font-bold">Despesas</h1>

          <span className="text-sm">R$ 16,42 para cada</span>
        </header>

        <div>
          <div className="flex flex-row items-center justify-between py-3 border-t">
            <span>Salgadinhos</span>
            <strong className="ml-auto mr-2">R$ 150,00</strong>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2">
                <MoreVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem>Excluir</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar despesa
              </Button>
            </SheetTrigger>

            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Nova despesa</SheetTitle>
              </SheetHeader>

              <form action="" className="space-y-4">
                <div className="space-y-1">
                  <Label>Descrição</Label>
                  <Input placeholder="Digite a descrição..." />
                </div>

                <div className="space-y-1">
                  <Label>Valor</Label>
                  <Input placeholder="R$ 0,00" />
                </div>

                <Button className="w-full">Adicionar despesa</Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </section>
    </main>
  )
}
