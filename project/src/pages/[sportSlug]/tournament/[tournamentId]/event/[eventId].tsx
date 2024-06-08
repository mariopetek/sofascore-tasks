import { getEventDetails, getEventIncidents } from '@/api/event'
import { getSportTournaments } from '@/api/sport'
import { Event, Incident } from '@/model/event'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import EventDetailsPanel from '@/modules/event/EventDetailsPanel'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { Box } from '@kuma-ui/core'

interface EventPageProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
  eventDetails: Event
  eventIncidents: Incident[]
}

export default function EventPage({ tournaments, sportSlug, eventDetails, eventIncidents }: EventPageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={tournaments} sportSlug={sportSlug} />
      <EventDetailsPanel event={eventDetails} incidents={eventIncidents} />
    </Box>
  )
}

export async function getServerSideProps(context: {
  params: { sportSlug: Sport['slug']; tournamentId: Tournament['id']; eventId: Event['id'] }
}) {
  const { params } = context
  const { sportSlug, tournamentId, eventId } = params

  const tournaments = await getSportTournaments(sportSlug)

  const eventDetails = await getEventDetails(eventId)

  const eventIncidents = await getEventIncidents(eventId)

  return {
    props: {
      tournaments,
      sportSlug,
      eventDetails,
      eventIncidents,
    },
  }
}
