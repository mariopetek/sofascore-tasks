import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'
import globalEnUS from '@/languages/enUS/global.json'
import globalHrHR from '@/languages/hrHR/global.json'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'

export type LanguageLocale = 'hr-HR' | 'en-US'

interface ContextValue {
  languageLocale: LanguageLocale
  setLanguageLocale: Dispatch<SetStateAction<LanguageLocale>>
}

const LanguageContext = createContext<ContextValue>({} as ContextValue)

i18next.init({
  interpolation: { escapeValue: true },
  lng: 'hr-HR',
  resources: {
    'en-US': {
      global: globalEnUS,
    },
    'hr-HR': {
      global: globalHrHR,
    },
  },
})

export const LanguageContextProvider = ({ children }: PropsWithChildren) => {
  const [languageLocale, setLanguageLocale] = useState<LanguageLocale>('hr-HR')

  return (
    <I18nextProvider i18n={i18next}>
      <LanguageContext.Provider value={{ languageLocale, setLanguageLocale }}>{children}</LanguageContext.Provider>
    </I18nextProvider>
  )
}

export const useLanguageContext = () => useContext(LanguageContext)
