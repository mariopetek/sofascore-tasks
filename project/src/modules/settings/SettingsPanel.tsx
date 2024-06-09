import { Box, Heading } from '@kuma-ui/core'
import ThemeSection from './ThemeSection'
import DateFormatSection from './DateFormatSection'
import AboutSection from './AboutSection'
import LanguageSelection from './LanguageSelection'
import { useTranslation } from 'react-i18next'

export default function SettingsPanel() {
  const [t] = useTranslation('global')

  return (
    <Box
      maxWidth="448px"
      width="100%"
      borderRadius="radii.lg"
      bg="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      paddingY="spacings.lg"
      display="flex"
      flexDirection="column"
      gap="spacings.lg"
    >
      <Box>
        <Heading
          as="h1"
          paddingX="spacings.lg"
          paddingY="spacings.md"
          color="colors.onSurface.lv1"
          fontWeight="fontWeights.bold"
          fontSize="fontSizes.lg"
        >
          {t('settingsPanel.settings')}
        </Heading>
      </Box>
      <Box display="flex" flexDirection="column" gap="spacings.lg" paddingX="spacings.sm">
        <LanguageSelection />
        <ThemeSection />
        <DateFormatSection />
        <AboutSection />
      </Box>
    </Box>
  )
}
