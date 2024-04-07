import { forwardRef } from 'react'
import { useLikedPokemonContext } from '../hooks/useLikedPokemonContext'
import LikedPokemonCard from './LikedPokemonCard'

import styles from './styles/LikedPokemonModal.module.css'

const LikedPokemonModal = forwardRef<HTMLDivElement>((_, ref) => {
    const { likedPokemon } = useLikedPokemonContext()

    return (
        <div className={styles.pokemonModalContainer}>
            <div ref={ref} className={styles.pokemonModal}>
                {likedPokemon.length === 0 ? (
                    <div className={styles.noPokemonContainer}>
                        <p className={styles.noPokemonText}>
                            You haven't liked any Pokémon yet.
                        </p>
                    </div>
                ) : (
                    <div className={styles.pokemonListContainer}>
                        {likedPokemon.map(pokemon => (
                            <LikedPokemonCard
                                key={pokemon.id}
                                pokemonInfo={pokemon}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
})

export default LikedPokemonModal
