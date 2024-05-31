import { useThemeContext } from '@/context/ThemeContext'
import { Box, Button } from '@kuma-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SPORTS = [
  {
    slug: 'football',
    name: 'Football',
    icon: '/icons/sports/icon_football.svg',
  },
  {
    slug: 'basketball',
    name: 'Basketball',
    icon: '/icons/sports/icon_basketball.svg',
  },
  {
    slug: 'american-football',
    name: 'American Football',
    icon: '/icons/sports/icon_american_football.svg',
  },
]

export default function Header() {
  const { isDark, setIsDark } = useThemeContext()

  const router = useRouter()
  const isActive = (href: string) => router.asPath.startsWith(href)

  return (
    <Box as="header" position="sticky" top={0} backgroundColor="colors.primary.default" zIndex={1}>
      <Button
        position="absolute"
        top="spacings.lg"
        right="spacings.xl"
        maskSize="24px 24px"
        maskImage="url(/icons/system/ic_settings.svg)"
        backgroundColor="colors.surface.s1"
        width="24px"
        height="24px"
        onClick={() => setIsDark(v => !v)}
      ></Button>
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
      <Box height="48px" display="flex" justifyContent="center" gap="spacings.lg">
        {SPORTS.map(sport => (
          <Link href={sport.slug} key={sport.slug}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              gap="spacings.xs"
              paddingX="spacings.xs"
              position="relative"
            >
              <Box
                maskSize="16px 16px"
                maskImage={`url(${sport.icon})`}
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
