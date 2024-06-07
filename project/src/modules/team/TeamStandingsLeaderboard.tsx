import { getTournamentStandingsClient } from '@/api/tournament'
import Loader from '@/components/Loader'
import { StandingRow, Tournament } from '@/model/tournament'
import StandingsLeaderboard from '../StandingsLeaderboard'
import { Box } from '@kuma-ui/core'
import { Team } from '@/model/team'

interface TeamStandingsLeaderboardProps {
  tournament: Tournament
  teamId: Team['id']
}

export default function TeamStandingsLeaderboard({ tournament, teamId }: TeamStandingsLeaderboardProps) {
  const { standings, standingsLoading } = getTournamentStandingsClient(tournament.id)

  let totalStandings = [] as StandingRow[]
  if (standings) {
    totalStandings = standings.find(standing => standing.type === 'total')!.sortedStandingsRows
  }

  return (
    <>
      {standings ? (
        <StandingsLeaderboard sportSlug={tournament.sport.slug} standings={totalStandings} teamId={teamId} />
      ) : null}
      {standingsLoading ? (
        <Box display="flex" justifyContent="center" padding="spacings.xxxl">
          <Loader />
        </Box>
      ) : null}
    </>
  )
}
