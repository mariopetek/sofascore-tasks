import { getSportTournaments } from '@/api/sport'
import { getTeamDetails, getTeamPlayers } from '@/api/team'
import { Player } from '@/model/player'
import { Sport } from '@/model/sport'
import { TeamDetails } from '@/model/team'
import { Tournament } from '@/model/tournament'
import TournamentsPanel from '@/modules/sport/Tournaments/TournamentsPanel'
import TeamHeadingPanel from '@/modules/team/TeamHeadingPanel'
import TeamInfoPanel from '@/modules/team/TeamInfoPanel'
import TeamNextMatchPanel from '@/modules/team/TeamNextMatchPanel'
import TeamTournamentsPanel from '@/modules/team/TeamTournamentsPanel'
import TeamVenuePanel from '@/modules/team/TeamVenuePanel'
import { Box } from '@kuma-ui/core'

interface TeamDetailsPageProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
  teamDetails: TeamDetails
  teamPlayers: Player[]
}

export default function TeamDetailsPage({ tournaments, sportSlug, teamDetails, teamPlayers }: TeamDetailsPageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={tournaments} sportSlug={sportSlug} />
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TeamHeadingPanel team={teamDetails} sportSlug={sportSlug} />
        <Box display="flex" gap="spacings.xl">
          <Box display="flex" flexDirection="column" gap="spacings.md" maxWidth="448px" width="100%">
            <TeamInfoPanel team={teamDetails} players={teamPlayers} />
            <TeamVenuePanel />
          </Box>
          <Box display="flex" flexDirection="column" gap="spacings.md" maxWidth="100%" width="100%">
            <TeamTournamentsPanel />
            <TeamNextMatchPanel />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context: { params: { sportSlug: Sport['slug']; teamId: TeamDetails['id'] } }) {
  const { params } = context
  const { sportSlug, teamId } = params

  const tournaments = await getSportTournaments(sportSlug)

  const teamDetails = await getTeamDetails(teamId)

  const teamPlayers = await getTeamPlayers(teamId)

  return {
    props: {
      tournaments,
      sportSlug,
      teamDetails,
      teamPlayers,
    },
  }
}
