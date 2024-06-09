import { getSportTournaments } from '@/api/sport'
import { getTournamentDetails } from '@/api/tournament'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import TournamentHeadingPanel from '@/modules/tournament/TournamentHeadingPanel'
import { Box } from '@kuma-ui/core'
import { Event } from '@/model/event'
import EventDetailsWidget from '@/modules/EventDetailsWidget'
import TournamentsPanel from '@/modules/TournamentsPanel'
import TournamentEventsPanel from '@/modules/tournament/TournamentEventsPanel'

interface TournamentDetailsPageProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
  tournamentDetails: Tournament
  tournamentEvents: Event[]
  tournamentId: Tournament['id']
}

export default function TournamentDetailsMatchesPage({ tournaments, tournamentDetails }: TournamentDetailsPageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={tournaments} />
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TournamentHeadingPanel tournament={tournamentDetails} />
        <Box display="flex" gap="spacings.xl" alignItems="flex-start">
          <EventDetailsContextProvider>
            <TournamentEventsPanel tournament={tournamentDetails} />
            <EventDetailsWidget />
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

  return {
    props: {
      tournaments,
      sportSlug,
      tournamentDetails,
    },
  }
}
