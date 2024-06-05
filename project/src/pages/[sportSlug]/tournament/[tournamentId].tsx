import { getSportTournaments } from '@/api/sport'
import { getTournamentDetails, getTournamentEvents } from '@/api/tournament'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import EventDetailsPanel from '@/modules/sport/Events/Details/EventDetailsPanel'
import TournamentsPanel from '@/modules/sport/Tournaments/TournamentsPanel'
import TournamentHeadingPanel from '@/modules/tournament/TournamentHeadingPanel'
import TournamentEventsPanel from '@/modules/tournament/TournamentEventsPanel'
import { Box } from '@kuma-ui/core'
import { Event } from '@/model/event'

interface TournamentDetailsPageProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
  tournamentDetails: Tournament
  tournamentEvents: Event[]
  tournamentId: Tournament['id']
}

export default function TournamentDetailsMatchesPage({
  tournaments,
  sportSlug,
  tournamentDetails,
  tournamentEvents,
  tournamentId,
}: TournamentDetailsPageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={tournaments} sportSlug={sportSlug} />
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TournamentHeadingPanel tournament={tournamentDetails} sportSlug={sportSlug} />
        <Box display="flex" gap="spacings.xl">
          <EventDetailsContextProvider>
            <TournamentEventsPanel events={tournamentEvents} tournamentId={tournamentId} />
            <EventDetailsPanel />
          </EventDetailsContextProvider>
        </Box>
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

  const previousEvents = await getTournamentEvents(tournamentId, 'last', 0)

  const upcomingEvents = await getTournamentEvents(tournamentId, 'next', 0)

  let tournamentEvents = [] as Event[]

  if (previousEvents.length < 8) {
    tournamentEvents = [...previousEvents, ...upcomingEvents.slice(upcomingEvents.length - 2, upcomingEvents.length)]
  } else {
    tournamentEvents = [
      ...previousEvents.slice(previousEvents.length - 8, previousEvents.length),
      ...upcomingEvents.slice(upcomingEvents.length - 2, upcomingEvents.length),
    ]
  }

  return {
    props: {
      tournaments,
      sportSlug,
      tournamentDetails,
      tournamentEvents,
      tournamentId,
    },
  }
}
