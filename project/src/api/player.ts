import { Player } from '@/model/player'

export async function getPlayerDetails(playerId: Player['id']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/player/${playerId}`)
  const player = (await response.json()) as Player

  return player
}
