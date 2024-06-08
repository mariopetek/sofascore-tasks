import { getPlayerDetails } from '@/api/player'
import { getSportTournaments } from '@/api/sport'
import { getTeamDetails } from '@/api/team'
import { Player } from '@/model/player'
import { Sport } from '@/model/sport'
import { Team, TeamDetails } from '@/model/team'
import { Tournament } from '@/model/tournament'
import PlayerHeadingPanel from '@/modules/player/PlayerHeadingPanel'
import TournamentsPanel from '@/modules/sport/Tournaments/TournamentsPanel'
import { Box } from '@kuma-ui/core'

interface PlayerPageProps {
  sportTournaments: Tournament[]
  sportSlug: Sport['slug']
  teamDetails: TeamDetails
  playerDetails: Player
}

export default function PlayerPage({ sportTournaments, sportSlug, teamDetails, playerDetails }: PlayerPageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={sportTournaments} sportSlug={sportSlug} />
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <PlayerHeadingPanel player={playerDetails} team={teamDetails} />
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context: {
  params: { sportSlug: Sport['slug']; teamId: Team['id']; playerId: Player['id'] }
}) {
  const { params } = context
  const { sportSlug, teamId, playerId } = params

  const sportTournaments = await getSportTournaments(sportSlug)

  const teamDetails = await getTeamDetails(teamId)

  const playerDetails = await getPlayerDetails(playerId)

  return {
    props: {
      sportTournaments,
      sportSlug,
      teamDetails,
      playerDetails,
    },
  }
}
