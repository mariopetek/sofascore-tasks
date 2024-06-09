import { Box } from '@kuma-ui/core'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const [t] = useTranslation('global')

  return (
    <Box
      as="footer"
      height="116px"
      bg="colors.surface.s1"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      gap="spacings.xl"
      boxShadow="0 2px 16px 0 rgba(0, 0, 0, 0.12)"
    >
      <Box
        maskSize="132px 20px"
        maskImage="url(/graphics/sofascore_lockup.svg)"
        backgroundColor="colors.onSurface.lv1"
        width="132px"
        height="20px"
      ></Box>
      <Box as="span" fontSize="fontSizes.xs" color="colors.onSurface.lv2">
        © 2024 Sofascore – {t('footer.allRightsReserved')}
      </Box>
    </Box>
  )
}
