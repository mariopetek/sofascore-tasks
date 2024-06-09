import { useThemeContext } from '@/context/ThemeContext'
import { Box, Heading } from '@kuma-ui/core'
import { useTranslation } from 'react-i18next'

export default function ThemeSection() {
  const [t] = useTranslation('global')

  const { isDark, setIsDark } = useThemeContext()
  return (
    <Box padding="spacings.lg" bg="colors.surface.s2" borderRadius="radii.md">
      <Heading
        as="h2"
        paddingBottom="spacings.sm"
        color="colors.primary.default"
        fontSize="fontSizes.xs"
        fontWeight="fontWeights.bold"
      >
        {t('settingsPanel.theme')}
      </Heading>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsDark(false)}
      >
        <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm" paddingY="spacings.md">
          {t('settingsPanel.light')}
        </Box>
        {!isDark ? (
          <Box
            maskSize="24px 24px"
            maskImage="url(/icons/system/ic_radio_1.svg)"
            backgroundColor="colors.primary.default"
            width="24px"
            height="24px"
          ></Box>
        ) : (
          <Box
            maskSize="24px 24px"
            maskImage="url(/icons/system/ic_radio_0.svg)"
            backgroundColor="colors.onSurface.lv2"
            width="24px"
            height="24px"
          ></Box>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={() => setIsDark(true)}
      >
        <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm" paddingY="spacings.md">
          {t('settingsPanel.dark')}
        </Box>
        {isDark ? (
          <Box
            maskSize="24px 24px"
            maskImage="url(/icons/system/ic_radio_1.svg)"
            backgroundColor="colors.primary.default"
            width="24px"
            height="24px"
          ></Box>
        ) : (
          <Box
            maskSize="24px 24px"
            maskImage="url(/icons/system/ic_radio_0.svg)"
            backgroundColor="colors.onSurface.lv2"
            width="24px"
            height="24px"
          ></Box>
        )}
      </Box>
    </Box>
  )
}
