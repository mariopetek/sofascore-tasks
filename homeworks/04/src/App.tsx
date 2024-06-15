import './App.css'
import './themes.css'
import Header from './components/Header'
import PokemonList from './components/PokemonList'
import { useThemeContext } from './hooks/useThemeContext'

function App() {
    const { theme } = useThemeContext()

    document.getElementById('root')!.classList.remove('light', 'dark')
    if (theme !== null) {
        document.getElementById('root')!.classList.add(theme)
    }

    return (
        <>
            <Header />
            <PokemonList />
        </>
    )
}

export default App
