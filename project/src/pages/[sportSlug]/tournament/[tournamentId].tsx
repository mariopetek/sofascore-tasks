import { getSportTournaments } from '@/api/sport'
import { getTournamentDetails } from '@/api/tournament'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import TournamentHeadingPanel from '@/modules/tournament/TournamentHeadingPanel'
import { Box } from '@kuma-ui/core'
import { Event } from '@/model/event'
import EventDetailsWidget from '@/modules/eventDetails/EventDetailsWidget'
import TournamentsPanel from '@/modules/tournamentsPanel/TournamentsPanel'
import TournamentEventsPanel from '@/modules/tournament/TournamentEventsPanel'
import StyledPageContainer from '@/modules/styledComponents/StyledPageContainer'
import StyledTournamentsPanelWrapper from '@/modules/styledComponents/StyledTournamentsPanelWrapper'
import StyledPanelContainer from '@/modules/styledComponents/StyledPanelContainer'

interface TournamentDetailsPageProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
  tournamentDetails: Tournament
  tournamentEvents: Event[]
  tournamentId: Tournament['id']
}

export default function TournamentDetailsMatchesPage({ tournaments, tournamentDetails }: TournamentDetailsPageProps) {
  return (
    <StyledPageContainer>
      <StyledTournamentsPanelWrapper>
        <TournamentsPanel tournaments={tournaments} />
      </StyledTournamentsPanelWrapper>
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TournamentHeadingPanel tournament={tournamentDetails} />
        <StyledPanelContainer>
          <EventDetailsContextProvider>
            <TournamentEventsPanel tournament={tournamentDetails} />
            <EventDetailsWidget />
          </EventDetailsContextProvider>
        </StyledPanelContainer>
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

  return {
    props: {
      tournaments,
      sportSlug,
      tournamentDetails,
    },
  }
}
