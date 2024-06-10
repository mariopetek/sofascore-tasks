import { getSportTournaments } from '@/api/sport'
import { getTeamDetails, getTeamTournaments } from '@/api/team'
import { Sport } from '@/model/sport'
import { Team, TeamDetails } from '@/model/team'
import { Tournament } from '@/model/tournament'
import StyledPageContainer from '@/modules/styledComponents/StyledPageContainer'
import StyledTournamentsPanelWrapper from '@/modules/styledComponents/StyledTournamentsPanelWrapper'
import TeamHeadingPanel from '@/modules/team/TeamHeadingPanel'
import TeamStandingsPanel from '@/modules/team/TeamStandingsPanel'
import TournamentsPanel from '@/modules/tournamentsPanel/TournamentsPanel'
import { Box } from '@kuma-ui/core'

interface TeamStandingsPageProps {
  sportTournaments: Tournament[]
  sportSlug: Sport['slug']
  teamDetails: TeamDetails
  teamTournaments: Tournament[]
}

export default function TeamStandingsPage({
  sportTournaments,
  sportSlug,
  teamDetails,
  teamTournaments,
}: TeamStandingsPageProps) {
  return (
    <StyledPageContainer>
      <StyledTournamentsPanelWrapper>
        <TournamentsPanel tournaments={sportTournaments} />
      </StyledTournamentsPanelWrapper>
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <TeamHeadingPanel team={teamDetails} sportSlug={sportSlug} />
        <TeamStandingsPanel tournaments={teamTournaments} teamId={teamDetails.id} />
      </Box>
    </StyledPageContainer>
  )
}

export async function getServerSideProps(context: { params: { sportSlug: Sport['slug']; teamId: Team['id'] } }) {
  const { params } = context
  const { sportSlug, teamId } = params

  const sportTournaments = await getSportTournaments(sportSlug)

  const teamDetails = await getTeamDetails(teamId)

  const teamTournaments = await getTeamTournaments(teamId)

  return {
    props: {
      sportTournaments,
      sportSlug,
      teamDetails,
      teamTournaments,
    },
  }
}
