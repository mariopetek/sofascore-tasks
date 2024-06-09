import { Box } from '@kuma-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const [t] = useTranslation('global')

  const SPORTS = [
    {
      slug: 'football',
      name: t('header.football'),
      icon: '/icons/sports/icon_football.svg',
    },
    {
      slug: 'basketball',
      name: t('header.basketball'),
      icon: '/icons/sports/icon_basketball.svg',
    },
    {
      slug: 'american-football',
      name: t('header.americanFootball'),
      icon: '/icons/sports/icon_american_football.svg',
    },
  ]

  const router = useRouter()
  const isActive = (href: string) => router.asPath.startsWith(href)

  return (
    <Box as="header" position="sticky" top="0" backgroundColor="colors.primary.default" zIndex="2">
      <Link href={`/settings`}>
        <Box
          position="absolute"
          top="spacings.lg"
          right="spacings.xl"
          maskSize="24px 24px"
          maskImage="url(/icons/system/ic_settings.svg)"
          backgroundColor="colors.surface.s1"
          width="24px"
          height="24px"
        ></Box>
      </Link>
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
          <Link href={`/${sport.slug}`} key={sport.slug}>
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
