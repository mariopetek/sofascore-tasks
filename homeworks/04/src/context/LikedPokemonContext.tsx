import { createContext, PropsWithChildren, useState } from 'react'
import { LikedPokemon } from '../model'

type LikedPokemonContextType = {
    likedPokemon: LikedPokemon[]
    setLikedPokemon: React.Dispatch<React.SetStateAction<LikedPokemon[]>>
    pendingPokemon: LikedPokemon[]
    setPendingPokemon: React.Dispatch<React.SetStateAction<LikedPokemon[]>>
}

export const LikedPokemonContext =
    createContext<LikedPokemonContextType | null>(null)

export default function LikedPokemonContextProvider({
    children
}: PropsWithChildren) {
    const [likedPokemon, setLikedPokemon] = useState<LikedPokemon[]>([])
    const [pendingPokemon, setPendingPokemon] = useState<LikedPokemon[]>([])

    return (
        <LikedPokemonContext.Provider
            value={{
                likedPokemon: likedPokemon.sort(
                    (p1, p2) => p1.number - p2.number
                ),
                setLikedPokemon,
                pendingPokemon,
                setPendingPokemon
            }}>
            {children}
        </LikedPokemonContext.Provider>
    )
}
