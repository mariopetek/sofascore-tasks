import { getSportTournaments } from '@/api/sport'
import { TournamentWithLogo } from '@/model/tournament'
import TournamentsPanel from '@/modules/sport/TournamentsPanel/TournamentsPanel'
import { Box } from '@kuma-ui/core'
import Head from 'next/head'

interface SportPageProps {
  tournamentsWithLogo: TournamentWithLogo[]
  sportName: string
}

export default function SportPage({ tournamentsWithLogo, sportName }: SportPageProps) {
  return (
    <>
      <Head>
        <title>Sofascore | {sportName}</title>
      </Head>
      <Box maxWidth="1392px" width="100%">
        <TournamentsPanel tournaments={tournamentsWithLogo} />
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
    },
  }
}
