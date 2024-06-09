import { getEventDetails, getEventIncidents } from '@/api/event'
import { getSportTournaments } from '@/api/sport'
import { useWindowResize } from '@/hooks/useWindowResize'
import { Event, Incident } from '@/model/event'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import EventDetailsPanel from '@/modules/event/EventDetailsPanel'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { Box } from '@kuma-ui/core'

interface EventPageProps {
  tournaments: Tournament[]
  eventDetails: Event
  eventIncidents: Incident[]
}

export default function EventPage({ tournaments, eventDetails, eventIncidents }: EventPageProps) {
  const windwWidth = useWindowResize()

  return (
    <Box
      maxWidth="1392px"
      width="100%"
      display="flex"
      alignItems="flex-start"
      justifyContent={windwWidth <= 900 ? 'center' : 'flex-start'}
      gap="spacings.xl"
    >
      {windwWidth <= 900 ? null : <TournamentsPanel tournaments={tournaments} />}
      <EventDetailsPanel event={eventDetails} incidents={eventIncidents} />
    </Box>
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
