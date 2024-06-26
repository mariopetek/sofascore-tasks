import ImagePlaceholder from '@/components/ImagePlaceholder'
import { useLanguageContext } from '@/context/LanguageContext'
import { PlayerDetails } from '@/model/player'
import { getCountryCodeByName } from '@/utils/country/country'
import { getFullDateByLocale } from '@/utils/date'
import { Box, Heading, Image } from '@kuma-ui/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface PlayerHeadingPanelProps {
  player: PlayerDetails
}

export default function PlayerHeadingPanel({ player }: PlayerHeadingPanelProps) {
  const [t] = useTranslation('global')

  const [isImageLoaded, setIsImageLoaded] = useState(true)

  const { languageLocale } = useLanguageContext()

  function calculateYears(dateOfBirth: Date) {
    const today = new Date()

    let yearsDifference = today.getFullYear() - dateOfBirth.getFullYear()

    const monthDifference = today.getMonth() - dateOfBirth.getMonth()
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
      yearsDifference--
    }

    return yearsDifference
  }

  return (
    <Box
      bg="colors.surface.s1"
      borderRadius="radii.lg"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      paddingBottom="spacings.xl"
    >
      <Box padding="spacings.lg" display="flex" alignItems="center" gap="spacings.xl">
        {isImageLoaded ? (
          <Box
            border="1px solid"
            borderColor="colors.onSurface.lv3"
            borderRadius="radii.sm"
            height="80px"
            width="80px"
            padding="spacings.md"
          >
            <Image
              src={`https://academy-backend.sofascore.dev/player/${player.id}/image`}
              alt={player.name}
              onError={() => setIsImageLoaded(false)}
              width="100%"
              borderRadius="50%"
            />
          </Box>
        ) : (
          <Box
            border="1px solid"
            borderColor="colors.onSurface.lv3"
            borderRadius="radii.sm"
            height="80px"
            width="80px"
            padding="spacings.md"
          >
            <ImagePlaceholder width="100%" height="100%" />
          </Box>
        )}
        <Heading as="h1" fontSize="fontSizes.xxl" fontWeight="bold" color="colors.onSurface.lv1">
          {player.name}
        </Heading>
      </Box>
      <Box paddingX="spacings.lg" paddingY="spacings.sm" display="flex" alignItems="center" gap="spacings.lg">
        <Image
          src={`https://academy-backend.sofascore.dev/team/${player.team.id}/image`}
          alt={player.team.name}
          width="40px"
          height="40px"
        />
        <Heading as="h2" fontSize="fontSizes.sm" fontWeight="bold" color="colors.onSurface.lv1">
          {player.team.name}
        </Heading>
      </Box>
      <Box paddingY="spacings.xs" display="flex" paddingX="spacings.lg" gap="spacings.lg">
        <Box
          display="flex"
          flexDirection="column"
          gap="spacings.xs"
          alignItems="center"
          paddingTop="spacings.sm"
          paddingBottom="spacings.md"
          bg="colors.secondary.highlight"
          borderRadius="radii.sm"
          flex="1"
          paddingX="spacings.sm"
          textAlign="center"
          justifyContent="center"
        >
          <Box as="span" color="colors.onSurface.lv2" fontWeight="fontWeights.bold" fontSize="fontSizes.xs">
            {t('playerHeadingPanel.nationality')}
          </Box>
          <Box display="flex" alignItems="center" gap="spacings.xs">
            <Image
              src={`https://www.sofascore.com/static/images/flags/${getCountryCodeByName(player.country.name)}.png`}
              width="16px"
              height="16px"
            />
            <Box as="span" color="colors.onSurface.lv1" fontWeight="fontWeights.bold" fontSize="fontSizes.sm">
              {player.country.name}
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="spacings.xs"
          alignItems="center"
          paddingTop="spacings.sm"
          paddingBottom="spacings.md"
          bg="colors.secondary.highlight"
          borderRadius="radii.sm"
          flex="1"
          paddingX="spacings.sm"
          textAlign="center"
          justifyContent="center"
        >
          <Box as="span" color="colors.onSurface.lv2" fontWeight="fontWeights.bold" fontSize="fontSizes.xs">
            {t('playerHeadingPanel.position')}
          </Box>
          <Box as="span" color="colors.onSurface.lv1" fontWeight="fontWeights.bold" fontSize="fontSizes.sm">
            {player.position}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="spacings.xs"
          alignItems="center"
          paddingTop="spacings.sm"
          paddingBottom="spacings.md"
          bg="colors.secondary.highlight"
          borderRadius="radii.sm"
          flex="1"
          paddingX="spacings.sm"
          textAlign="center"
          justifyContent="center"
        >
          <Box as="span" color="colors.onSurface.lv2" fontWeight="fontWeights.bold" fontSize="fontSizes.xs">
            {getFullDateByLocale(new Date(player.dateOfBirth), languageLocale)}
          </Box>
          <Box as="span" color="colors.onSurface.lv1" fontWeight="fontWeights.bold" fontSize="fontSizes.sm">
            {calculateYears(new Date(player.dateOfBirth))} {t('playerHeadingPanel.years')}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
