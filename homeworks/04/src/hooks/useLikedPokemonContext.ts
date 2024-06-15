import { useContext } from 'react'
import { LikedPokemonContext } from '../context/LikedPokemonContext'

export function useLikedPokemonContext() {
    const likedPokemonContext = useContext(LikedPokemonContext)
    if (likedPokemonContext === null) {
        throw new Error(
            'useLikedPokemonContext must be used within a LikedPokemonContextProvider'
        )
    }
    return likedPokemonContext
}
