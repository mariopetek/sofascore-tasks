import { createContext, PropsWithChildren, useState } from 'react'
import { Pokemon } from '../model'

type LikedPokemonContextType = {
    likedPokemon: Pokemon[]
    setLikedPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>
}

export const LikedPokemonContext =
    createContext<LikedPokemonContextType | null>(null)

export default function LikedPokemonContextProvider({
    children
}: PropsWithChildren) {
    const [likedPokemon, setLikedPokemon] = useState<Pokemon[]>([])

    return (
        <LikedPokemonContext.Provider value={{ likedPokemon, setLikedPokemon }}>
            {children}
        </LikedPokemonContext.Provider>
    )
}
