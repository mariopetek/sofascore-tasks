import { getSportTournaments } from '@/api/sport'
import { getTournamentDetails, getTournamentStandings } from '@/api/tournament'
import { Sport } from '@/model/sport'
import { Tournament, TournamentStanding } from '@/model/tournament'
import TournamentsPanel from '@/modules/sport/Tournaments/TournamentsPanel'
import TournamentHeadingPanel from '@/modules/tournament/TournamentHeadingPanel'
import TournamentStandingsPanel from '@/modules/tournament/TournamentStandingsPanel'
import { Box } from '@kuma-ui/core'

interface TournamentDetailsPageProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
  tournamentDetails: Tournament
  tournamentStandings: TournamentStanding[]
}

export default function TournamentDetailsStandingsPage({
  tournaments,
  sportSlug,
  tournamentDetails,
  tournamentStandings,
}: TournamentDetailsPageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={tournaments} sportSlug={sportSlug} />
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TournamentHeadingPanel tournament={tournamentDetails} sportSlug={sportSlug} />
        <TournamentStandingsPanel standings={tournamentStandings} />
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

  return {
    props: {
      tournaments,
      sportSlug,
      tournamentDetails,
      tournamentStandings,
    },
  }
}
