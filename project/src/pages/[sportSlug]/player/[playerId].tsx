import { getPlayerDetails } from '@/api/player'
import { getSportTournaments } from '@/api/sport'
import { EventDetailsContextProvider } from '@/context/EventDetailsContext'
import { Player, PlayerDetails } from '@/model/player'
import { Sport } from '@/model/sport'
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
  playerDetails: PlayerDetails
}

export default function PlayerPage({ sportTournaments, playerDetails }: PlayerPageProps) {
  return (
    <StyledPageContainer>
      <StyledTournamentsPanelWrapper>
        <TournamentsPanel tournaments={sportTournaments} />
      </StyledTournamentsPanelWrapper>
      <Box maxWidth="920px" width="100%" display="flex" flexDirection="column" gap="spacings.md">
        <PlayerHeadingPanel player={playerDetails} />
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

export async function getServerSideProps(context: { params: { sportSlug: Sport['slug']; playerId: Player['id'] } }) {
  const { params } = context
  const { sportSlug, playerId } = params

  const sportTournaments = await getSportTournaments(sportSlug)

  const playerDetails = await getPlayerDetails(playerId)

  return {
    props: {
      sportTournaments,
      playerDetails,
    },
  }
}
