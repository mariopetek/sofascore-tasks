import { createContext, PropsWithChildren, useState } from 'react'
import { LikedPokemon } from '../model'

type LikedPokemonContextType = {
    likedPokemon: LikedPokemon[]
    setLikedPokemon: React.Dispatch<React.SetStateAction<LikedPokemon[]>>
}

export const LikedPokemonContext =
    createContext<LikedPokemonContextType | null>(null)

export default function LikedPokemonContextProvider({
    children
}: PropsWithChildren) {
    const [likedPokemon, setLikedPokemon] = useState<LikedPokemon[]>([])

    return (
        <LikedPokemonContext.Provider value={{ likedPokemon, setLikedPokemon }}>
            {children}
        </LikedPokemonContext.Provider>
    )
}
