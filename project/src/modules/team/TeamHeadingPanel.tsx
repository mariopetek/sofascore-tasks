import { Sport } from '@/model/sport'
import { TeamDetails } from '@/model/team'
import { getCountryCodeByName } from '@/utils/country/country'
import { Box, Heading, Image } from '@kuma-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface TeamHeadingPanelProps {
  team: TeamDetails
  sportSlug: Sport['slug']
}

const LINKS = [
  { name: 'Details', path: '' },
  { name: 'Matches', path: '/matches' },
  { name: 'Standings', path: '/standings' },
  { name: 'Squad', path: '/squad' },
]

export default function TeamHeadingPanel({ team, sportSlug }: TeamHeadingPanelProps) {
  const router = useRouter()

  const isActive = (path: string) => router.asPath === `/${sportSlug}/team/${team.id}${path}`
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
          <Image src={`https://academy-backend.sofascore.dev/team/${team.id}/image`} alt={team.name} width="100%" />
        </Box>
        <Box display="flex" flexDirection="column" gap="spacings.sm" justifyContent="center">
          <Heading as="h1" color="colors.onSurface.lv1" fontSize="fontSizes.xxl">
            {team.name}
          </Heading>
          <Box as="span" display="flex" alignItems="center" gap="spacings.xs">
            <Image
              src={`https://www.sofascore.com/static/images/flags/${getCountryCodeByName(team.country.name)}.png`}
              alt={team.country.name}
              width="16px"
              height="16px"
            />
            <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm" fontWeight="fontWeights.bold">
              {team.country.name}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box paddingX="spacings.lg" display="flex">
        {LINKS.map(link => (
          <Link key={link.path} href={`/${sportSlug}/team/${team.id}${link.path}`}>
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
