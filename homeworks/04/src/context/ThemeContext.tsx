import { createContext, useState } from 'react'

type Theme = 'light' | 'dark' | undefined

type ThemeContextType = {
    theme: Theme
    setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export default function ThemeContextProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [theme, setTheme] = useState<Theme>(undefined)

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
