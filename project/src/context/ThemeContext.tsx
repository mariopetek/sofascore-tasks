import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'

interface ContextValue {
  isDark: boolean
  setIsDark: Dispatch<SetStateAction<boolean>>
}

const ThemeContext = createContext<ContextValue>({} as ContextValue)

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
      document.documentElement.style.colorScheme = 'dark'
    }
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    }
  }, [isDark])

  return <ThemeContext.Provider value={{ isDark, setIsDark }}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => useContext(ThemeContext)
