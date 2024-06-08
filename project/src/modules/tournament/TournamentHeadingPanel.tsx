import { Tournament } from '@/model/tournament'
import { getCountryCodeByName } from '@/utils/country/country'
import { Box, Heading, Image } from '@kuma-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface TournamentHeadingPanelProps {
  tournament: Tournament
}

const LINKS = [
  { name: 'Matches', path: '' },
  { name: 'Standings', path: '/standings' },
]

export default function TournamentHeadingPanel({ tournament }: TournamentHeadingPanelProps) {
  const router = useRouter()

  const isActive = (path: string) => router.asPath === `/${tournament.sport.slug}/tournament/${tournament.id}${path}`
  return (
    <Box bg="colors.surface.s1" borderRadius="radii.lg" boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)">
      <Box padding="spacings.lg" display="flex" alignItems="center" gap="spacings.xl">
        <Box
          border="1px solid"
          borderColor="colors.onSurface.lv3"
          borderRadius="radii.sm"
          height="80px"
          width="80px"
          padding="spacings.md"
        >
          <Image
            src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`}
            alt={tournament.name}
            width="100%"
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="spacings.sm" justifyContent="center">
          <Heading as="h1" color="colors.onSurface.lv1" fontSize="fontSizes.xxl">
            {tournament.name}
          </Heading>
          <Box as="span" display="flex" alignItems="center" gap="spacings.xs">
            <Image
              src={`https://www.sofascore.com/static/images/flags/${getCountryCodeByName(tournament.country.name)}.png`}
              alt={tournament.country.name}
              width="16px"
              height="16px"
            />
            <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm" fontWeight="fontWeights.bold">
              {tournament.country.name}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box paddingX="spacings.lg" display="flex">
        {LINKS.map(link => (
          <Link key={link.path} href={`/${tournament.sport.slug}/tournament/${tournament.id}${link.path}`}>
            <Box position="relative" paddingY="spacings.lg" marginX="spacings.sm">
              <Box
                as="span"
                paddingX="spacings.sm"
                color={isActive(link.path) ? 'colors.primary.default' : 'colors.onSurface.lv2'}
                fontSize="fontSizes.sm"
              >
                {link.name}
              </Box>
              {isActive(link.path) && (
                <Box
                  height="4px"
                  width="100%"
                  backgroundColor="colors.primary.default"
                  position="absolute"
                  bottom="0"
                  borderTopLeftRadius="radii.xs"
                  borderTopRightRadius="radii.xs"
                />
              )}
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  )
}
