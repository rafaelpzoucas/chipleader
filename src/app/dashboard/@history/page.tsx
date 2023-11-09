import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GameDataType, getFinishedGames } from '@/controllers/games'
import { formatCurrencyBRL } from '@/utils/formatCurrency'

export default async function History() {
  const games: GameDataType[] = await getFinishedGames()

  return (
    <>
      {games.length > 0 ? (
        games.map((game) => (
          <div
            key={game.id}
            className="flex flex-row justify-between gap-3 p-4 border-t"
          >
            <section className="flex flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-baseline">
                  <strong>Rafael</strong>
                  <p className="text-muted-foreground text-xs">1º lugar</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-baseline">
                  <strong>Rafael</strong>
                  <p className="text-muted-foreground text-xs">2º lugar</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-baseline">
                  <strong>Rafael</strong>
                  <p className="text-muted-foreground text-xs">3º lugar</p>
                </div>
              </div>
            </section>
            <aside className="flex flex-col items-end justify-between text-xs">
              <span>{game.created_at}</span>
              <span>Buy-in: {formatCurrencyBRL(game.buy_in)}</span>
              <span>Despesas: R$ 150,00</span>
            </aside>
          </div>
        ))
      ) : (
        <div>
          <h1>Nenhum jogo recente...</h1>
        </div>
      )}
    </>
  )
}
