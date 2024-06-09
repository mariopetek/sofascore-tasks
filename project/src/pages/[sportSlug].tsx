import { getSportEventsByDate, getSportTournaments } from '@/api/sport'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { useWindowResize } from '@/hooks/useWindowResize'
import { Event } from '@/model/event'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import EventDetailsWidget from '@/modules/EventDetailsWidget'
import SportEventsPanel from '@/modules/sport/SportEventsPanel'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { isoDateFormat } from '@/utils/date'
import { Box } from '@kuma-ui/core'

interface SportPageProps {
  tournaments: Tournament[]
  todayEvents: Event[]
  todayDate: string
  sportSlug: Sport['slug']
}

export default function SportTodayPage({ tournaments, todayEvents, todayDate, sportSlug }: SportPageProps) {
  const windwWidth = useWindowResize()

  return (
    <Box
      maxWidth="1392px"
      width="100%"
      display="flex"
      alignItems="flex-start"
      justifyContent={windwWidth <= 900 ? 'center' : 'flex-start'}
      gap="spacings.xl"
    >
      {windwWidth <= 900 ? null : <TournamentsPanel tournaments={tournaments} />}
      <Box
        display="flex"
        flex="1"
        gap={windwWidth <= 900 ? 'spacings.md' : 'spacings.xl'}
        alignItems={windwWidth <= 900 ? 'center' : 'flex-start'}
        flexDirection={windwWidth <= 900 ? 'column' : 'row'}
      >
        <EventDetailsContextProvider>
          <SportEventsPanel events={todayEvents} selectedDate={todayDate} sportSlug={sportSlug} />
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

  const todayDate = new Date()
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
