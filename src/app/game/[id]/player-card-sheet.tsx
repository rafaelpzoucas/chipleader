import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Minus, Plus } from 'lucide-react'

export function PlayerCardSheet() {
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="p-4 w-full">
          <header className="flex flex-row items-end gap-4 w-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="text-left">
              <strong>Rafael Zoucas</strong>
              <p className="text-muted-foreground text-xs">Ranking #12</p>
            </div>

            <div className="flex flex-col ml-auto text-sm h-full">
              <strong>R$ 100,00</strong>
            </div>
          </header>
        </Card>
      </SheetTrigger>
      <SheetContent side="bottom" className="flex flex-col gap-5">
        <header className="flex flex-row items-end gap-4 w-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="text-left">
            <strong>Rafael Zoucas</strong>
            <p className="text-muted-foreground text-xs">Ranking #12</p>
          </div>
        </header>

        <div className="flex flex-row items-center justify-between gap-4">
          <Button variant="destructive" className="w-full">
            Eliminar
          </Button>

          <Card className="flex flex-row items-center justify-between w-full">
            <Button variant="ghost" size="icon">
              <Minus className="w-4 h-4" />
            </Button>
            <p className="text-sm">R$ 75,00</p>
            <Button variant="ghost" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </Card>
        </div>

        <footer>
          <Button className="w-full">Salvar</Button>
        </footer>
      </SheetContent>
    </Sheet>
  )
}
