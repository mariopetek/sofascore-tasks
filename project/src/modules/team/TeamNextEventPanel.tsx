import { Event } from '@/model/event'
import { Box, Heading, Image } from '@kuma-ui/core'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import EventLabelLink from '../eventLabel/EventLabelLink'

interface TeamNextEventPanelProps {
  nextEvent: Event
}

export default function TeamNextEventPanel({ nextEvent }: TeamNextEventPanelProps) {
  const [t] = useTranslation('global')

  const tournamentLogo = `https://academy-backend.sofascore.dev/tournament/${nextEvent.tournament.id}/image`
  const tournamentCountry = nextEvent.tournament.country.name
  const tournamentName = nextEvent.tournament.name

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
        {t('teamNextEventPanel.nextMatch')}
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
          <Link href={`/${nextEvent.tournament.sport.slug}/tournament/${nextEvent.tournament.id}`}>
            <Box as="span" color="colors.onSurface.lv2" _hover={{ color: 'colors.onSurface.lv3' }}>
              {tournamentName}
            </Box>
          </Link>
        </Box>
      </Box>

      <EventLabelLink event={nextEvent} />
    </Box>
  )
}
