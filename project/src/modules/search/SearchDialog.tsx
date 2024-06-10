import { Box, Button, Heading, Input } from '@kuma-ui/core'
import StyledPanel from '../styledComponents/StyledPanel'
import { useSearchDialogContext } from '@/context/SearchDialogContext'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { SearchType } from '@/model/search'
import PlayersSearchOutput from './PlayersSearchOutput'
import TeamsSearchOutput from './TeamsSearchOutput'
import { useTranslation } from 'react-i18next'

export default function SearchDialog() {
  const [t] = useTranslation('global')

  const { isDialogOpen, setIsDialogOpen } = useSearchDialogContext()

  const [searchType, setSearchType] = useState<SearchType>('player')
  const [searchQuery, setSearchQuery] = useState('')

  function handleSearchQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value)
  }

  function handleOutsideDialogClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleCloseDialog()
    }
  }

  function handleCloseDialog() {
    setIsDialogOpen(false)
    setSearchQuery('')
  }

  useEffect(() => {
    setSearchQuery('')
  }, [searchType])

  return !isDialogOpen ? null : (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="colors.surface.s2"
      backdropFilter="blur(10px)"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      paddingX="spacings.lg"
      paddingY="spacings.xxxl"
      zIndex={3}
      onClick={handleOutsideDialogClick}
    >
      <StyledPanel>
        <Box paddingX="spacings.lg" display="flex" justifyContent="space-between" alignItems="center">
          <Heading as="h2" color="colors.onSurface.lv1" fontWeight="fontWeights.bold" fontSize="fontSizes.md">
            {t('search.searchPlayersOrTeams')}
          </Heading>
          <Button
            maskSize="24px 24px"
            maskImage="url(/icons/system/ic_close.svg)"
            backgroundColor="colors.onSurface.lv1"
            width="24px"
            height="24px"
            onClick={handleCloseDialog}
          ></Button>
        </Box>
        <Box display="flex" padding="spacings.lg" gap="spacings.lg">
          <Box flex="1" display="flex" justifyContent="flex-end">
            <Box
              onClick={() => setSearchType('player')}
              cursor="pointer"
              paddingX="spacings.lg"
              paddingY="spacings.sm"
              color={searchType === 'player' ? 'colors.surface.s1' : 'colors.primary.default'}
              bg={searchType === 'player' ? 'colors.primary.default' : 'colors.surface.s1'}
              borderWidth="2px"
              borderStyle="solid"
              borderColor="colors.primary.default"
              borderRadius="radii.xs"
              fontSize="fontSizes.md"
              fontWeight="fontWeights.bold"
            >
              {t('search.players')}
            </Box>
          </Box>
          <Box flex="1" display="flex" justifyContent="flex-start">
            <Box
              onClick={() => setSearchType('team')}
              cursor="pointer"
              paddingX="spacings.lg"
              paddingY="spacings.sm"
              color={searchType === 'team' ? 'colors.surface.s1' : 'colors.primary.default'}
              bg={searchType === 'team' ? 'colors.primary.default' : 'colors.surface.s1'}
              borderWidth="2px"
              borderStyle="solid"
              borderColor="colors.primary.default"
              borderRadius="radii.xs"
              fontSize="fontSizes.md"
              fontWeight="fontWeights.bold"
            >
              {t('search.teams')}
            </Box>
          </Box>
        </Box>
        <Box paddingX="spacings.lg">
          <Box
            display="flex"
            paddingX="spacings.lg"
            paddingY="spacings.sm"
            borderRadius="radii.md"
            bg="colors.surface.s2"
            alignItems="center"
            gap="spacings.sm"
          >
            <Box
              maskSize="24px 24px"
              maskImage="url(/icons/system/search.svg)"
              backgroundColor="colors.onSurface.lv1"
              width="24px"
              height="24px"
            ></Box>
            <Input
              id="search"
              type="text"
              placeholder={t('search.searchPlaceholder')}
              width="100%"
              borderStyle="1px"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              bg="none"
              border="none"
              outline="none"
              fontSize="fontSizes.lg"
              fontFamily="inherit"
              color="colors.onSurface.lv1"
            />
            {searchQuery.length > 0 ? (
              <Button
                maskSize="20px 20px"
                maskImage="url(/icons/system/ic_close.svg)"
                backgroundColor="colors.onSurface.lv1"
                width="20px"
                height="20px"
                onClick={() => setSearchQuery('')}
              ></Button>
            ) : null}
          </Box>
        </Box>
        <Box marginTop="spacings.lg" overflowY="auto" maxHeight="50vh">
          {searchType === 'player' && searchQuery.length >= 2 ? (
            <PlayersSearchOutput query={searchQuery} handleCloseDialog={handleCloseDialog} />
          ) : null}
          {searchType === 'team' && searchQuery.length >= 2 ? (
            <TeamsSearchOutput query={searchQuery} handleCloseDialog={handleCloseDialog} />
          ) : null}
        </Box>
      </StyledPanel>
    </Box>
  )
}
