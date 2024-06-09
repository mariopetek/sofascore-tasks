import { getSportTournaments } from '@/api/sport'
import { getTeamDetails, getTeamPlayers } from '@/api/team'
import { useWindowResize } from '@/hooks/useWindowResize'
import { Player } from '@/model/player'
import { Sport } from '@/model/sport'
import { Team, TeamDetails } from '@/model/team'
import { Tournament } from '@/model/tournament'
import TeamHeadingPanel from '@/modules/team/TeamHeadingPanel'
import TeamSquadPanel from '@/modules/team/TeamSquadPanel'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { Box } from '@kuma-ui/core'

interface TeamSquadPageProps {
  sportTournaments: Tournament[]
  sportSlug: Sport['slug']
  teamDetails: TeamDetails
  teamPlayers: Player[]
}

export default function TeamSquadPage({ sportTournaments, sportSlug, teamDetails, teamPlayers }: TeamSquadPageProps) {
  const windowWidth = useWindowResize()

  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      {windowWidth <= 900 ? null : <TournamentsPanel tournaments={sportTournaments} />}
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TeamHeadingPanel team={teamDetails} sportSlug={sportSlug} />
        <TeamSquadPanel players={teamPlayers} teamDetails={teamDetails} sportSlug={sportSlug} />
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

  return {
    props: {
      sportTournaments,
      sportSlug,
      teamDetails,
      teamPlayers,
    },
  }
}
