import { getSportTournaments } from '@/api/sport'
import { getTeamDetails, getTeamEvents, getTeamPlayers, getTeamTournaments } from '@/api/team'
import { Event } from '@/model/event'
import { Player } from '@/model/player'
import { Sport } from '@/model/sport'
import { Team, TeamDetails } from '@/model/team'
import { Tournament } from '@/model/tournament'
import TeamHeadingPanel from '@/modules/team/TeamHeadingPanel'
import TeamInfoPanel from '@/modules/team/TeamInfoPanel'
import TeamNextEventPanel from '@/modules/team/TeamNextEventPanel'
import TeamTournamentsPanel from '@/modules/team/TeamTournamentsPanel'
import TeamVenuePanel from '@/modules/team/TeamVenuePanel'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { Box } from '@kuma-ui/core'

interface TeamDetailsPageProps {
  sportTournaments: Tournament[]
  sportSlug: Sport['slug']
  teamDetails: TeamDetails
  teamPlayers: Player[]
  teamTournaments: Tournament[]
  nextTeamEvent: Event
}

export default function TeamDetailsPage({
  sportTournaments,
  sportSlug,
  teamDetails,
  teamPlayers,
  teamTournaments,
  nextTeamEvent,
}: TeamDetailsPageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={sportTournaments} />
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TeamHeadingPanel team={teamDetails} sportSlug={sportSlug} />
        <Box display="flex" gap="spacings.xl">
          <Box display="flex" flexDirection="column" gap="spacings.md" maxWidth="448px" width="100%">
            <TeamInfoPanel team={teamDetails} players={teamPlayers} />
            <TeamVenuePanel teamVenue={teamDetails.venue} />
          </Box>
          <Box display="flex" flexDirection="column" gap="spacings.md" maxWidth="100%" width="100%">
            <TeamTournamentsPanel tournaments={teamTournaments} />
            <TeamNextEventPanel nextEvent={nextTeamEvent} />
          </Box>
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

  const teamPlayers = await getTeamPlayers(teamId)

  const teamTournaments = await getTeamTournaments(teamId)

  const upcomingTeamEvents = await getTeamEvents(teamId, 'next', 0)

  const nextTeamEvent = upcomingTeamEvents[0]

  return {
    props: {
      sportTournaments,
      sportSlug,
      teamDetails,
      teamPlayers,
      teamTournaments,
      nextTeamEvent,
    },
  }
}
