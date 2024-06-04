import { Tournament } from '@/model/tournament'

export async function getTournamentDetails(tournamentId: Tournament['id']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/tournament/${tournamentId}`)
  const sports = (await response.json()) as Tournament

  return sports
}
