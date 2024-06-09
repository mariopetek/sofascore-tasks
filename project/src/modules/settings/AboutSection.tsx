import Separator from '@/components/Separator'
import { Box, Heading } from '@kuma-ui/core'
import { useTranslation } from 'react-i18next'

export default function AboutSection() {
  const [t] = useTranslation('global')

  return (
    <Box
      paddingX="spacings.lg"
      paddingTop="spacings.lg"
      paddingBottom="spacings.xxxl"
      bg="colors.surface.s2"
      borderRadius="radii.md"
      display="flex"
      flexDirection="column"
      gap="spacings.lg"
    >
      <Heading
        as="h1"
        paddingBottom="spacings.sm"
        color="colors.onSurface.lv1"
        fontSize="fontSizes.lg"
        fontWeight="fontWeights.bold"
      >
        {t('settingsPanel.about')}
      </Heading>
      <Box>
        <Box as="h2" fontSize="fontSizes.md" fontWeight="fontWeights.bold" color="colors.onSurface.lv1">
          {t('settingsPanel.sofascoreAcademy')}
        </Box>
        <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm">
          {t('settingsPanel.class')}
        </Box>
      </Box>
      <Box paddingTop="spacings.sm">
        <Separator />
      </Box>
      <Box>
        <Box as="h2" color="colors.onSurface.lv2" fontWeight="fontWeights.bold" fontSize={'fontSizes.xs'}>
          {t('settingsPanel.appName')}
        </Box>
        <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm">
          Mini Sofascore App
        </Box>
      </Box>
      <Box>
        <Box as="h2" color="colors.onSurface.lv2" fontWeight="fontWeights.bold" fontSize={'fontSizes.xs'}>
          {t('settingsPanel.apiCredit')}
        </Box>
        <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm">
          Sofascore
        </Box>
      </Box>
      <Box>
        <Box as="h2" color="colors.onSurface.lv2" fontWeight="fontWeights.bold" fontSize={'fontSizes.xs'}>
          {t('settingsPanel.developer')}
        </Box>
        <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm">
          Mario Petek
        </Box>
      </Box>
      <Box paddingTop="spacings.sm">
        <Separator />
      </Box>
      <Box
        maskSize="132px 20px"
        maskImage="url(/graphics/sofascore_lockup.svg)"
        backgroundColor="colors.primary.default"
        width="132px"
        height="20px"
        alignSelf="center"
      ></Box>
    </Box>
  )
}
