import { getSportEventsByDate, getSportTournaments } from '@/api/sport'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { Event } from '@/model/event'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import EventDetailsWidget from '@/modules/EventDetailsWidget'
import SportEventsPanel from '@/modules/sport/SportEventsPanel'
import StyledPageContainer from '@/modules/styledComponents/StyledPageContainer'
import StyledPanelContainer from '@/modules/styledComponents/StyledPanelContainer'
import StyledTournamentsPanelWrapper from '@/modules/styledComponents/StyledTournamentsPanelWrapper'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { isoDateFormat } from '@/utils/date'

interface SportPageProps {
  tournaments: Tournament[]
  todayEvents: Event[]
  todayDate: string
  sportSlug: Sport['slug']
}

export default function SportTodayPage({ tournaments, todayEvents, todayDate, sportSlug }: SportPageProps) {
  return (
    <StyledPageContainer>
      <StyledTournamentsPanelWrapper>
        <TournamentsPanel tournaments={tournaments} />
      </StyledTournamentsPanelWrapper>
      <StyledPanelContainer>
        <EventDetailsContextProvider>
          <SportEventsPanel events={todayEvents} selectedDate={todayDate} sportSlug={sportSlug} />
          <EventDetailsWidget />
        </EventDetailsContextProvider>
      </StyledPanelContainer>
    </StyledPageContainer>
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
