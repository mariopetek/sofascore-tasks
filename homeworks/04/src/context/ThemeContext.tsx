import { createContext, PropsWithChildren, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | null

type ThemeContextType = {
    theme: Theme
    setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export default function ThemeContextProvider({ children }: PropsWithChildren) {
    const [theme, setTheme] = useState<Theme>(() => {
        return localStorage.getItem('theme') as Theme
    })

    useEffect(() => {
        try {
            if (theme === null) {
                localStorage.removeItem('theme')
            } else {
                localStorage.setItem('theme', theme)
            }
        } catch (err) {
            console.error(err)
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
