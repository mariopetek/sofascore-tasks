import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

export type DateLocale = 'de-DE' | 'en-US'

interface ContextValue {
  dateLocale: DateLocale
  setDateLocale: Dispatch<SetStateAction<DateLocale>>
}

const DateContext = createContext<ContextValue>({} as ContextValue)

export const DateContextProvider = ({ children }: PropsWithChildren) => {
  const [dateLocale, setDateLocale] = useState<DateLocale>('de-DE')

  return <DateContext.Provider value={{ dateLocale, setDateLocale }}>{children}</DateContext.Provider>
}

export const useDateContext = () => useContext(DateContext)
