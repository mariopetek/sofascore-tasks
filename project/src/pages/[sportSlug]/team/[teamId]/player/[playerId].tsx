import { getPlayerDetails } from '@/api/player'
import { getSportTournaments } from '@/api/sport'
import { getTeamDetails } from '@/api/team'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { Player } from '@/model/player'
import { Sport } from '@/model/sport'
import { Team, TeamDetails } from '@/model/team'
import { Tournament } from '@/model/tournament'
import EventDetailsWidget from '@/modules/EventDetailsWidget'
import PlayerEventsPanel from '@/modules/player/PlayerEventsPanel'
import PlayerHeadingPanel from '@/modules/player/PlayerHeadingPanel'
import StyledPageContainer from '@/modules/styledComponents/StyledPageContainer'
import StyledPanelContainer from '@/modules/styledComponents/StyledPanelContainer'
import StyledTournamentsPanelWrapper from '@/modules/styledComponents/StyledTournamentsPanelWrapper'
import TournamentsPanel from '@/modules/TournamentsPanel'
import { Box } from '@kuma-ui/core'

interface PlayerPageProps {
  sportTournaments: Tournament[]
  teamDetails: TeamDetails
  playerDetails: Player
}

export default function PlayerPage({ sportTournaments, teamDetails, playerDetails }: PlayerPageProps) {
  return (
    <StyledPageContainer>
      <StyledTournamentsPanelWrapper>
        <TournamentsPanel tournaments={sportTournaments} />
      </StyledTournamentsPanelWrapper>
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <PlayerHeadingPanel player={playerDetails} team={teamDetails} />
        <StyledPanelContainer>
          <EventDetailsContextProvider>
            <PlayerEventsPanel player={playerDetails} />
            <EventDetailsWidget />
          </EventDetailsContextProvider>
        </StyledPanelContainer>
      </Box>
    </StyledPageContainer>
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
      teamDetails,
      playerDetails,
    },
  }
}
