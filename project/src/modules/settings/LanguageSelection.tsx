import { LanguageLocale, useLanguageContext } from '@/context/LanguageContext'
import { Box } from '@kuma-ui/core'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function OutsideClickHandler({ children, onOutsideClick }: PropsWithChildren<{ onOutsideClick: () => void }>) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      onOutsideClick()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return <Box ref={wrapperRef}>{children}</Box>
}

export default function LanguageSelection() {
  const [t, i18n] = useTranslation('global')

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  const { languageLocale, setLanguageLocale } = useLanguageContext()

  const LANGUAGES = [
    {
      locale: 'hr-HR',
      name: 'Hrvatski',
    },
    {
      locale: 'en-US',
      name: 'English',
    },
  ] as Array<{ locale: LanguageLocale; name: string }>

  const selectedLanguage = LANGUAGES.find(language => language.locale === languageLocale)

  return (
    <Box position="relative">
      <OutsideClickHandler onOutsideClick={() => setIsLanguageMenuOpen(false)}>
        <Box
          paddingLeft="spacings.lg"
          paddingRight="spacings.sm"
          paddingY="spacings.sm"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={isLanguageMenuOpen ? 'colors.primary.default' : 'colors.onSurface.lv3'}
          borderRadius="radii.xs"
          cursor="pointer"
          bg="colors.surface.s2"
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" flexDirection="column" gap="spacings.xs">
              <Box as="h2" color="colors.primary.default" fontSize="fontSizes.xs" fontWeight="fontWeights.bold">
                {t('settingsPanel.language')}
              </Box>
              <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm">
                {selectedLanguage?.name}
              </Box>
            </Box>
            <Box
              as="span"
              maskSize="24px 24px"
              maskImage="url(/icons/system/ic_pointer_down.svg)"
              backgroundColor="colors.onSurface.lv1"
              width="24px"
              height="24px"
            ></Box>
          </Box>
          {isLanguageMenuOpen ? (
            <Box
              position="absolute"
              top="100%"
              left="0"
              width="100%"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="colors.onSurface.lv3"
              borderRadius="radii.xs"
              bg="colors.surface.s1"
              zIndex="1"
            >
              {LANGUAGES.map((language, index) => (
                <Box
                  key={language.locale}
                  paddingX="spacings.lg"
                  paddingY="spacings.sm"
                  color="colors.onSurface.lv1"
                  fontSize="fontSizes.sm"
                  borderTopLeftRadius={index === 0 ? 'radii.xs' : '0px'}
                  borderTopRightRadius={index === 0 ? 'radii.xs' : '0px'}
                  borderBottomLeftRadius={index === LANGUAGES.length - 1 ? 'radii.xs' : '0px'}
                  borderBottomRightRadius={index === LANGUAGES.length - 1 ? 'radii.xs' : '0px'}
                  _hover={{ bg: 'colors.surface.s2' }}
                  onClick={() => {
                    setLanguageLocale(language.locale)
                    i18n.changeLanguage(language.locale)
                  }}
                >
                  {language.name}
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>
      </OutsideClickHandler>
    </Box>
  )
}
/*
{isTournamentsMenuOpen ? (
                  <Box
                    position="absolute"
                    top="100%"
                    left="0"
                    width="100%"
                    bg="colors.surface.s1"
                    boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                    borderRadius="radii.md"
                    zIndex="1"
                  >
                    {tournaments.map((tournament, index) => (
                      <Box
                        key={tournament.id}
                        paddingX="spacings.md"
                        paddingY="spacings.sm"
                        color="colors.onSurface.lv1"
                        display="flex"
                        alignItems="center"
                        gap="spacings.sm"
                        borderTopLeftRadius={index === 0 ? 'radii.md' : '0px'}
                        borderTopRightRadius={index === 0 ? 'radii.md' : '0px'}
                        borderBottomLeftRadius={index === tournaments.length - 1 ? 'radii.md' : '0px'}
                        borderBottomRightRadius={index === tournaments.length - 1 ? 'radii.md' : '0px'}
                        onClick={() => {
                          setSelectedTournament(tournament)
                          setIsTournamentsMenuOpen(false)
                        }}
                        _hover={{ bg: 'colors.surface.s2' }}
                      >
                        <Image
                          src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`}
                          width="16px"
                          height="16px"
                        />
                        <Box as="span" color="colors.onSurface.lv1">
                          {tournament.name}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : null}

*/
