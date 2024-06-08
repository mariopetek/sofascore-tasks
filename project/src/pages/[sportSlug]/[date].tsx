import { getSportEventsByDate, getSportTournaments } from '@/api/sport'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { Event } from '@/model/event'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import EventDetailsWidget from '@/modules/EventDetailsWidget'
import SportEventsPanel from '@/modules/sport/SportEventsPanel'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { isoDateFormat } from '@/utils/date'
import { Box } from '@kuma-ui/core'

interface SportDatePageProps {
  tournaments: Tournament[]
  dateEvents: Event[]
  selectedDate: string
  sportSlug: Sport['slug']
}

export default function SportDatePage({ tournaments, dateEvents, selectedDate, sportSlug }: SportDatePageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={tournaments} />
      <EventDetailsContextProvider>
        <SportEventsPanel events={dateEvents} selectedDate={selectedDate} sportSlug={sportSlug} />
        <EventDetailsWidget />
      </EventDetailsContextProvider>
    </Box>
  )
}

export async function getServerSideProps(context: { params: { sportSlug: Sport['slug']; date: string } }) {
  const { params } = context
  const { sportSlug, date } = params

  const tournaments = await getSportTournaments(sportSlug)

  const selectedDate = new Date(date)
  const dateEvents = await getSportEventsByDate(sportSlug, selectedDate)

  return {
    props: {
      tournaments,
      dateEvents,
      selectedDate: isoDateFormat(selectedDate),
      sportSlug,
    },
  }
}
