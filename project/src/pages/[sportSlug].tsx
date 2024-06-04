import { getSportEventsByDate, getSportTournaments } from '@/api/sport'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { Event } from '@/model/event'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import EventDetailsPanel from '@/modules/sport/Events/Details/EventDetailsPanel'
import EventsPanel from '@/modules/sport/Events/EventsPanel'
import TournamentsPanel from '@/modules/sport/Tournaments/TournamentsPanel'
import { isoDateFormat } from '@/utils/date'
import { Box } from '@kuma-ui/core'

interface SportPageProps {
  tournaments: Tournament[]
  todayEvents: Event[]
  todayDate: string
  sportSlug: Sport['slug']
}

export default function SportTodayPage({ tournaments, todayEvents, todayDate, sportSlug }: SportPageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={tournaments} />
      <EventDetailsContextProvider>
        <EventsPanel events={todayEvents} selectedDate={todayDate} sportSlug={sportSlug} />
        <EventDetailsPanel />
      </EventDetailsContextProvider>
    </Box>
  )
}

export async function getServerSideProps(context: { params: { sportSlug: Sport['slug'] } }) {
  const { params } = context
  const { sportSlug } = params

  const tournaments = await getSportTournaments(sportSlug)

  const todayDate = new Date('2024-06-01')
  const todayEvents = await getSportEventsByDate(sportSlug, todayDate)

  return {
    props: {
      tournaments,
      todayEvents,
      todayDate: isoDateFormat(todayDate),
      sportSlug,
    },
  }
}
