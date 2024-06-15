import { getEventDetails, getEventIncidents } from '@/api/event'
import { getSportTournaments } from '@/api/sport'
import { Event, Incident } from '@/model/event'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import EventDetailsPanel from '@/modules/event/EventDetailsPanel'
import StyledPageContainer from '@/modules/styledComponents/StyledPageContainer'
import StyledTournamentsPanelWrapper from '@/modules/styledComponents/StyledTournamentsPanelWrapper'
import TournamentsPanel from '@/modules/tournamentsPanel/TournamentsPanel'

interface EventPageProps {
  tournaments: Tournament[]
  eventDetails: Event
  eventIncidents: Incident[]
}

export default function EventPage({ tournaments, eventDetails, eventIncidents }: EventPageProps) {
  return (
    <StyledPageContainer>
      <StyledTournamentsPanelWrapper>
        <TournamentsPanel tournaments={tournaments} />
      </StyledTournamentsPanelWrapper>
      <EventDetailsPanel event={eventDetails} incidents={eventIncidents} />
    </StyledPageContainer>
  )
}

export async function getServerSideProps(context: {
  params: { sportSlug: Sport['slug']; tournamentId: Tournament['id']; eventId: Event['id'] }
}) {
  const { params } = context
  const { sportSlug, eventId } = params

  const tournaments = await getSportTournaments(sportSlug)

  const eventDetails = await getEventDetails(eventId)

  const eventIncidents = await getEventIncidents(eventId)

  return {
    props: {
      tournaments,
      eventDetails,
      eventIncidents,
    },
  }
}
