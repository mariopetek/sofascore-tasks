import { Event } from '@/model/event'
import { europeanDateFormat, isoDateFormat } from '@/utils/date'
import { Box, Heading, Image } from '@kuma-ui/core'
import EventLabel from '../EventLabel'

interface TeamNextEventPanelProps {
  nextEvent: Event
}

export default function TeamNextEventPanel({ nextEvent }: TeamNextEventPanelProps) {
  const tournamentLogo = `https://academy-backend.sofascore.dev/tournament/${nextEvent.tournament.id}/image`
  const tournamentCountry = nextEvent.tournament.country.name
  const tournamentName = nextEvent.tournament.name

  const startTime = new Date(nextEvent.startDate).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })
  const startDate = new Date(nextEvent.startDate)

  const todayDate = new Date()
  const tomorrowDate = new Date()
  tomorrowDate.setDate(todayDate.getDate() + 1)

  const homeTeamLogo = `https://academy-backend.sofascore.dev/team/${nextEvent.homeTeam.id}/image`
  const awayTeamLogo = `https://academy-backend.sofascore.dev/team/${nextEvent.awayTeam.id}/image`

  const homeTeamName = nextEvent.homeTeam.name
  const awayTeamName = nextEvent.awayTeam.name

  return (
    <Box
      bg="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      paddingBottom="spacings.lg"
      borderRadius="radii.lg"
    >
      <Heading
        as="h2"
        paddingX="spacings.xxxl"
        paddingTop="spacings.lg"
        paddingBottom="spacings.md"
        textAlign="center"
        fontSize="fontSizes.md"
        fontWeight="bold"
        color="colors.onSurface.lv1"
      >
        Next match
      </Heading>
      <Box paddingX="spacings.lg" paddingY="spacings.md" display="flex" alignItems="center" gap="spacings.xxxl">
        <Image src={tournamentLogo} width="32px" height="32px" />
        <Box display="flex" alignItems="center" fontSize="fontSizes.sm" fontWeight="fontWeights.bold">
          <Box as="span" color="colors.onSurface.lv1">
            {tournamentCountry}
          </Box>
          <Box
            maskSize="24px 24px"
            maskImage="url(/icons/system/ic_pointer_right.svg)"
            backgroundColor="colors.onSurface.lv2"
            width="24px"
            height="24px"
          ></Box>
          <Box as="span" color="colors.onSurface.lv2">
            {tournamentName}
          </Box>
        </Box>
      </Box>

      <EventLabel event={nextEvent} />
    </Box>
  )
}
