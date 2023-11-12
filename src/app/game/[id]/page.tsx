import { getGameById } from '@/controllers/games'
import { GameDataType } from '@/models/games'
import ActiveGame from './active-game'
import { InactiveGame } from './inactive-game'

export default async function Game({ params }: { params: { id: string } }) {
  const game: GameDataType[] = await getGameById(params.id)

  return (
    <main className="p-4 pb-10">
      {game[0].status ? (
        <ActiveGame game={game[0]} />
      ) : (
        <InactiveGame game={game[0]} />
      )}
    </main>
  )
}
