import { getSports, getSportTournaments } from '@/api/sport'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import EventDetailsPanel from '@/modules/sport/Events/Details/EventDetailsPanel'
import EventsPanel from '@/modules/sport/Events/EventsPanel'
import TournamentsPanel from '@/modules/sport/Tournaments/TournamentsPanel'
import { Box } from '@kuma-ui/core'
import Head from 'next/head'

interface SportPageProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
  sportName: Sport['name']
}

export default function SportPage({ tournaments, sportSlug, sportName }: SportPageProps) {
  return (
    <>
      <Head>
        <title>{`${sportName} | Mini Sofascore`}</title>
      </Head>
      <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
        <TournamentsPanel tournaments={tournaments} />
        <EventDetailsContextProvider>
          <EventsPanel sportSlug={sportSlug} />
          <EventDetailsPanel />
        </EventDetailsContextProvider>
      </Box>
    </>
  )
}

export async function getServerSideProps(context: { params: { sportSlug: Sport['slug'] } }) {
  const { params } = context
  const { sportSlug } = params

  const sports = await getSports()

  const sportName = sports.find(sport => sport.slug === sportSlug)!.name

  const tournaments = await getSportTournaments(sportSlug)

  return {
    props: {
      tournaments,
      sportSlug,
      sportName,
    },
  }
}
