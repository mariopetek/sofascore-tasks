import { getSportTournaments } from '@/api/sport'
import { Event } from '@/model/event'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { Box } from '@kuma-ui/core'

interface EventPageProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
}

export default function EventPage({ tournaments, sportSlug }: EventPageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={tournaments} sportSlug={sportSlug} />
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md"></Box>
    </Box>
  )
}

export async function getServerSideProps(context: {
  params: { sportSlug: Sport['slug']; tournamentId: Tournament['id']; eventId: Event['id'] }
}) {
  const { params } = context
  const { sportSlug, tournamentId, eventId } = params

  const tournaments = await getSportTournaments(sportSlug)

  return {
    props: {
      tournaments,
      sportSlug,
    },
  }
}
