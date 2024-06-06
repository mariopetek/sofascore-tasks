import { getSportTournaments } from '@/api/sport'
import { getTeamDetails } from '@/api/team'
import { Sport } from '@/model/sport'
import { Team, TeamDetails } from '@/model/team'
import { Tournament } from '@/model/tournament'
import TournamentsPanel from '@/modules/sport/Tournaments/TournamentsPanel'
import TeamHeadingPanel from '@/modules/team/TeamHeadingPanel'
import { Box } from '@kuma-ui/core'

interface TeamMatchesPageProps {
  sportTournaments: Tournament[]
  sportSlug: Sport['slug']
  teamDetails: TeamDetails
}

export default function TeamMatchesPage({ sportTournaments, sportSlug, teamDetails }: TeamMatchesPageProps) {
  return (
    <Box maxWidth="1392px" width="100%" display="flex" alignItems="flex-start" gap="spacings.xl">
      <TournamentsPanel tournaments={sportTournaments} sportSlug={sportSlug} />
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TeamHeadingPanel team={teamDetails} sportSlug={sportSlug} />
        <Box>Team matches page</Box>
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
