import { getFinishedGames } from '@/controllers/games'
import { GameDataType } from '@/models/games'
import { HistoryCard } from './history-card'

export default async function History() {
  const games: GameDataType[] = await getFinishedGames()

  return (
    <>
      {games.length > 0 ? (
        games.map((game) => <HistoryCard key={game.id} game={game} />)
      ) : (
        <div>
          <h1>Nenhum jogo recente...</h1>
        </div>
      )}
    </>
  )
}
