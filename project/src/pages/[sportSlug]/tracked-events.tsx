import { getSportTournaments } from '@/api/sport'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { useWindowResize } from '@/hooks/useWindowResize'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import EventDetailsWidget from '@/modules/EventDetailsWidget'
import TournamentsPanel from '@/modules/TournamentsPanel'
import TrackedEventsPanel from '@/modules/trackedEvents/TrackedEventsPanel'
import { Box } from '@kuma-ui/core'

interface TrackedEventsPageProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
}

export default function TrackedEventsPage({ tournaments, sportSlug }: TrackedEventsPageProps) {
  const windowWidth = useWindowResize()
  return (
    <Box
      maxWidth="1392px"
      width="100%"
      display="flex"
      justifyContent={windowWidth <= 900 ? 'center' : 'flex-start'}
      alignItems="flex-start"
      gap="spacings.xl"
    >
      {windowWidth <= 900 ? null : <TournamentsPanel tournaments={tournaments} />}
      <Box maxWidth="920px" width="100%" display="flex" gap="spacings.xl">
        <EventDetailsContextProvider>
          <TrackedEventsPanel sportSlug={sportSlug} />
          <EventDetailsWidget />
        </EventDetailsContextProvider>
      </Box>
    </Box>
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
