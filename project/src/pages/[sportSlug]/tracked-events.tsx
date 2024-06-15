import { getSportTournaments } from '@/api/sport'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import EventDetailsWidget from '@/modules/eventDetails/EventDetailsWidget'
import StyledPageContainer from '@/modules/styledComponents/StyledPageContainer'
import StyledPanelContainer from '@/modules/styledComponents/StyledPanelContainer'
import StyledTournamentsPanelWrapper from '@/modules/styledComponents/StyledTournamentsPanelWrapper'
import TournamentsPanel from '@/modules/tournamentsPanel/TournamentsPanel'
import TrackedEventsPanel from '@/modules/trackedEvents/TrackedEventsPanel'

interface TrackedEventsPageProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
}

export default function TrackedEventsPage({ tournaments, sportSlug }: TrackedEventsPageProps) {
  return (
    <StyledPageContainer>
      <StyledTournamentsPanelWrapper>
        <TournamentsPanel tournaments={tournaments} />
      </StyledTournamentsPanelWrapper>
      <StyledPanelContainer>
        <EventDetailsContextProvider>
          <TrackedEventsPanel sportSlug={sportSlug} />
          <EventDetailsWidget />
        </EventDetailsContextProvider>
      </StyledPanelContainer>
    </StyledPageContainer>
  )
}

export async function getServerSideProps(context: { params: { sportSlug: Sport['slug'] } }) {
  const { params } = context
  const { sportSlug } = params

  const tournaments = await getSportTournaments(sportSlug)

  return {
    props: {
      tournaments,
      sportSlug,
    },
  }
}
