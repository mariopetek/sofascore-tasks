import { getSportTournaments } from '@/api/sport'
import { getTournamentDetails, getTournamentStandings } from '@/api/tournament'
import { Sport } from '@/model/sport'
import { StandingRow, Tournament } from '@/model/tournament'
import StyledPageContainer from '@/modules/styledComponents/StyledPageContainer'
import StyledTournamentsPanelWrapper from '@/modules/styledComponents/StyledTournamentsPanelWrapper'
import TournamentHeadingPanel from '@/modules/tournament/TournamentHeadingPanel'
import TournamentStandingsPanel from '@/modules/tournament/TournamentStandingsPanel'
import TournamentsPanel from '@/modules/tournamentsPanel/TournamentsPanel'
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
    <StyledPageContainer>
      <StyledTournamentsPanelWrapper>
        <TournamentsPanel tournaments={tournaments} />
      </StyledTournamentsPanelWrapper>
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TournamentHeadingPanel tournament={tournamentDetails} />
        <TournamentStandingsPanel standings={tournamentStandings} sportSlug={sportSlug} />
      </Box>
    </StyledPageContainer>
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
