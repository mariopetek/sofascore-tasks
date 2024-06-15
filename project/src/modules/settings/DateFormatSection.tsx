import { useDateContext } from '@/context/DateContext'
import { Box, Heading } from '@kuma-ui/core'
import { useTranslation } from 'react-i18next'

export default function DateFormatSection() {
  const [t] = useTranslation('global')

  const { dateLocale, setDateLocale } = useDateContext()
  return (
    <Box padding="spacings.lg" bg="colors.surface.s2" borderRadius="radii.md">
      <Heading
        as="h2"
        paddingBottom="spacings.sm"
        color="colors.primary.default"
        fontSize="fontSizes.xs"
        fontWeight="fontWeights.bold"
      >
        {t('settingsPanel.dateFormat')}
      </Heading>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={() => setDateLocale('de-DE')}
      >
        <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm" paddingY="spacings.md">
          {t('settingsPanel.deDEDateFormat')}
        </Box>
        {dateLocale === 'de-DE' ? (
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
        onClick={() => setDateLocale('en-US')}
      >
        <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm" paddingY="spacings.md">
          {t('settingsPanel.enUSDateFormat')}
        </Box>
        {dateLocale === 'en-US' ? (
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
