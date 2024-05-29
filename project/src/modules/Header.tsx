import { getSports } from '@/api/sport'
import { useThemeContext } from '@/context/ThemeContext'
import { Box, Button } from '@kuma-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SPORTS_ICONS_URLS = {
  football: '/icons/sports/icon_football.svg',
  basketball: '/icons/sports/icon_basketball.svg',
  'american-football': '/icons/sports/icon_american_football.svg',
} as Record<string, string>

export default function Header() {
  const { isDark, setIsDark } = useThemeContext()

  const router = useRouter()
  const isActive = (href: string) => router.asPath === href

  const { sports, sportsError } = getSports()

  if (sportsError) return <Box>Error</Box>
  if (!sports) return <Box>Loading...</Box>

  return (
    <Box as="header" position="sticky" top={0} backgroundColor="colors.primary.default" zIndex={1}>
      <Button onClick={() => setIsDark(v => !v)}>Theme</Button>
      <Box height="64px" display="flex" justifyContent="center" alignItems="center">
        <Link href="/">
          <Box
            maskSize="132px 20px"
            maskImage="url(/graphics/sofascore_lockup.svg)"
            backgroundColor="colors.surface.s1"
            width="132px"
            height="20px"
          ></Box>
        </Link>
      </Box>
      <Box height="48px" display="flex" justifyContent="center" gap="16px">
        {sports.map(sport => (
          <Link href={sport.slug} key={sport.id}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              gap="4px"
              padding="0 4px"
              position="relative"
            >
              <Box
                maskSize="16px 16px"
                maskImage={`url(${SPORTS_ICONS_URLS[sport.slug]})`}
                backgroundColor="colors.surface.s1"
                width="16px"
                height="16px"
              ></Box>
              <Box color="colors.surface.s1" fontSize="fontSizes.sm">
                {sport.name}
              </Box>
              {isActive(`/${sport.slug}`) && (
                <Box
                  height="4px"
                  width="100%"
                  backgroundColor="colors.surface.s1"
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