import { getSportTournaments } from '@/api/sport'
import { getTeamDetails } from '@/api/team'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { useWindowResize } from '@/hooks/useWindowResize'
import { Sport } from '@/model/sport'
import { Team, TeamDetails } from '@/model/team'
import { Tournament } from '@/model/tournament'
import EventDetailsWidget from '@/modules/EventDetailsWidget'
import TeamEventsPanel from '@/modules/team/TeamEventsPanel'
import TeamHeadingPanel from '@/modules/team/TeamHeadingPanel'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { Box } from '@kuma-ui/core'

interface TeamMatchesPageProps {
  sportTournaments: Tournament[]
  sportSlug: Sport['slug']
  teamDetails: TeamDetails
}

export default function TeamMatchesPage({ sportTournaments, sportSlug, teamDetails }: TeamMatchesPageProps) {
  const windowWidth = useWindowResize()

  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      {windowWidth <= 900 ? null : <TournamentsPanel tournaments={sportTournaments} />}
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TeamHeadingPanel team={teamDetails} sportSlug={sportSlug} />
        <Box
          display="flex"
          gap={windowWidth <= 900 ? 'spacings.md' : 'spacings.xl'}
          flexDirection={windowWidth <= 900 ? 'column' : 'row'}
          alignItems={windowWidth <= 900 ? 'center' : 'flex-start'}
        >
          <EventDetailsContextProvider>
            <TeamEventsPanel team={teamDetails} />
            <EventDetailsWidget />
          </EventDetailsContextProvider>
        </Box>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context: { params: { sportSlug: Sport['slug']; teamId: Team['id'] } }) {
  const { params } = context
  const { sportSlug, teamId } = params

  const sportTournaments = await getSportTournaments(sportSlug)

  const teamDetails = await getTeamDetails(teamId)

  return {
    props: {
      sportTournaments,
      sportSlug,
      teamDetails,
    },
  }
}
