import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export function useThemeContext() {
    const themeContext = useContext(ThemeContext)
    if (themeContext === null) {
        throw new Error(
            'useThemeContext must be used within a ThemeContextProvider'
        )
    }
    return themeContext
}
