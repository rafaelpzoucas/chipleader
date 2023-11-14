import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

export default function UserHeader() {
  return (
    <header className="flex flex-row items-end gap-4 w-full p-4">
      <form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>cn</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <button type="submit">Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </form>

      <div className="text-left">
        <strong>{'user?.email'}</strong>
        <p className="text-muted-foreground text-xs">
          Ganhos {formatCurrencyBRL(100)}
        </p>
      </div>
    </header>
  )
}
