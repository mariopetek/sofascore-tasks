import { getSportTournaments } from '@/api/sport'
import { TournamentWithLogo } from '@/model/tournament'
import EventsPanel from '@/modules/sport/Events/EventsPanel'
import TournamentsPanel from '@/modules/sport/Tournaments/TournamentsPanel'
import { Box } from '@kuma-ui/core'
import Head from 'next/head'

interface SportPageProps {
  tournamentsWithLogo: TournamentWithLogo[]
  sportName: string
  sportSlug: string
}

export default function SportPage({ tournamentsWithLogo, sportName, sportSlug }: SportPageProps) {
  return (
    <>
      <Head>
        <title>Sofascore | {sportName}</title>
      </Head>
      <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
        <TournamentsPanel tournaments={tournamentsWithLogo} />
        <EventsPanel sportSlug={sportSlug} />
      </Box>
    </>
  )
}

export async function getServerSideProps(context: { params: { sportSlug: string } }) {
  const { params } = context
  const { sportSlug } = params
  const tournaments = await getSportTournaments(sportSlug)
  const tournamentsWithLogo = tournaments.map(tournament => {
    return {
      ...tournament,
      logo: `https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`,
    } as TournamentWithLogo
  })
  const sportName = tournaments[0].sport.name

  return {
    props: {
      tournamentsWithLogo,
      sportName,
      sportSlug,
    },
  }
}
