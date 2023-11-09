import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

export default function Ranking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking</CardTitle>
      </CardHeader>

      <CardContent>
        <ol>
          <li className="flex flex-row items-center gap-4 py-4 w-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <strong>Rafael Zoucas</strong>
              <p className="text-muted-foreground text-xs">Ranking #12</p>
            </div>

            <div className="flex flex-col text-right ml-auto">
              <span className="text-muted-foreground text-xs">
                Prêmio acumulado
              </span>
              <strong>R$ 1000,00</strong>
            </div>
          </li>
          <li className="flex flex-row items-center gap-4 py-4 w-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <strong>Rafael Zoucas</strong>
              <p className="text-muted-foreground text-xs">Ranking #12</p>
            </div>

            <div className="flex flex-col text-right ml-auto">
              <span className="text-muted-foreground text-xs">
                Prêmio acumulado
              </span>
              <strong>R$ 1000,00</strong>
            </div>
          </li>
          <li className="flex flex-row items-center gap-4 py-4 w-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <strong>Rafael Zoucas</strong>
              <p className="text-muted-foreground text-xs">Ranking #12</p>
            </div>

            <div className="flex flex-col text-right ml-auto">
              <span className="text-muted-foreground text-xs">
                Prêmio acumulado
              </span>
              <strong>R$ 1000,00</strong>
            </div>
          </li>
          <li className="flex flex-row items-center gap-4 py-4 w-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <strong>Rafael Zoucas</strong>
              <p className="text-muted-foreground text-xs">Ranking #12</p>
            </div>

            <div className="flex flex-col text-right ml-auto">
              <span className="text-muted-foreground text-xs">
                Prêmio acumulado
              </span>
              <strong>R$ 1000,00</strong>
            </div>
          </li>
        </ol>
      </CardContent>

      <CardFooter>
        <p>Ver todos</p>

        <ChevronRight className="w-4 h-4 ml-auto" />
      </CardFooter>
    </Card>
  )
}
