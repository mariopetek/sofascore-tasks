import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ThemeContextProvider from './context/ThemeContext.tsx'
import LikedPokemonContextProvider from './context/LikedPokemonContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeContextProvider>
        <LikedPokemonContextProvider>
            <App />
        </LikedPokemonContextProvider>
    </ThemeContextProvider>
)
