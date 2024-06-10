import { useWindowResize } from '@/hooks/useWindowResize'
import { Box } from '@kuma-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const [t] = useTranslation('global')

  const windowWidth = useWindowResize()

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
      name:
        windowWidth <= 400
          ? `${t('header.americanFootball').slice(0, 2)}. ${t('header.americanFootball').split(' ')[1]}`
          : t('header.americanFootball'),
      icon: '/icons/sports/icon_american_football.svg',
    },
  ]

  const router = useRouter()
  const activeSportSlug = router.asPath.split('/')[1]

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      backgroundColor="colors.primary.default"
      zIndex="2"
      display="flex"
      flexDirection="column"
      paddingX="spacings.lg"
    >
      <Box display="flex" alignItems="center" paddingY="spacings.lg">
        {windowWidth <= 700 ? null : <Box flex="1"></Box>}
        <Link href="/">
          <Box
            flex="1"
            maskSize="132px 20px"
            maskImage="url(/graphics/sofascore_lockup.svg)"
            backgroundColor="colors.surface.s1"
            width="132px"
            height="20px"
          ></Box>
        </Link>
        <Box display="flex" gap="spacings.xl" flex="1" justifyContent="flex-end">
          {windowWidth <= 900 && SPORTS.find(sport => sport.slug === activeSportSlug) !== undefined ? (
            <Link href={`/${activeSportSlug}/leagues`}>
              <Box
                maskSize="24px 24px"
                maskImage="url(/icons/system/ic_trophy.svg)"
                backgroundColor="colors.surface.s1"
                width="24px"
                height="24px"
              ></Box>
            </Link>
          ) : null}
          {SPORTS.find(sport => sport.slug === activeSportSlug) !== undefined ? (
            <Link href={`/${activeSportSlug}/tracked-events`}>
              <Box
                maskSize="24px 24px"
                maskImage="url(/icons/system/bookmark.svg)"
                backgroundColor="colors.surface.s1"
                width="24px"
                height="24px"
              ></Box>
            </Link>
          ) : null}

          <Link href={`/settings`}>
            <Box
              marginLeft="auto"
              maskSize="24px 24px"
              maskImage="url(/icons/system/ic_settings.svg)"
              backgroundColor="colors.surface.s1"
              width="24px"
              height="24px"
            ></Box>
          </Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" gap="spacings.md" paddingX="spacings.xs">
        {SPORTS.map(sport => (
          <Link href={`/${sport.slug}`} key={sport.slug}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              gap="spacings.xs"
              paddingY="spacings.lg"
              position="relative"
              paddingX="spacings.xs"
              flexWrap="wrap"
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
              {activeSportSlug === sport.slug && (
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
