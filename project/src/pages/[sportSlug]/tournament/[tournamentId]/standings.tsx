import { getSportTournaments } from '@/api/sport'
import { getTournamentDetails, getTournamentStandings } from '@/api/tournament'
import { Sport } from '@/model/sport'
import { StandingRow, Tournament } from '@/model/tournament'
import TournamentHeadingPanel from '@/modules/tournament/TournamentHeadingPanel'
import TournamentStandingsPanel from '@/modules/tournament/TournamentStandingsPanel'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { Box } from '@kuma-ui/core'

interface TournamentDetailsPageProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
  tournamentDetails: Tournament
  tournamentStandings: StandingRow[]
}

export default function TournamentDetailsStandingsPage({
  tournaments,
  sportSlug,
  tournamentDetails,
  tournamentStandings,
}: TournamentDetailsPageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={tournaments} />
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TournamentHeadingPanel tournament={tournamentDetails} />
        <TournamentStandingsPanel standings={tournamentStandings} sportSlug={sportSlug} />
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context: {
  params: { sportSlug: Sport['slug']; tournamentId: Tournament['id'] }
}) {
  const { params } = context
  const { sportSlug, tournamentId } = params

  const tournaments = await getSportTournaments(sportSlug)

  const tournamentDetails = await getTournamentDetails(tournamentId)

  const tournamentStandings = await getTournamentStandings(tournamentId)

  const tournamentStandingsTotal = tournamentStandings.find(standing => standing.type === 'total')!.sortedStandingsRows

  return {
    props: {
      tournaments,
      sportSlug,
      tournamentDetails,
      tournamentStandings: tournamentStandingsTotal,
    },
  }
}
