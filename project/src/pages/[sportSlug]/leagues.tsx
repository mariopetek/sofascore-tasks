import { getSportTournaments } from '@/api/sport'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { Box } from '@kuma-ui/core'

interface LeaguesPageProps {
  tournaments: Tournament[]
}

export default function LeaguesPage({ tournaments }: LeaguesPageProps) {
  return (
    <Box
      maxWidth="1392px"
      width="100%"
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      gap="spacings.xl"
    >
      <TournamentsPanel tournaments={tournaments} />
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
    },
  }
}
