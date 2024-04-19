import PokemonRow from './PokemonRow'
import { useFetchPokemon } from '../hooks/useFetchPokemon'

import styles from './styles/PokemonList.module.css'
import LoadingIndicator from './LoadingIndicator'
import ErrorMessage from './ErrorMessage'

function PokemonList() {
    const { pokemon, pokemonLoading, pokemonError } = useFetchPokemon()

    return (
        <div className={styles.pokemonListContainer}>
            {pokemonError ? (
                <div className={styles.errorWrapper}>
                    <ErrorMessage text="Something went wrong. Please try again." />
                </div>
            ) : (
                pokemon.map((pokemonDetails, index) => (
                    <PokemonRow
                        key={pokemonDetails.id}
                        pokemonNumber={index + 1}
                        pokemon={pokemonDetails}
                    />
                ))
            )}
            {pokemonLoading && (
                <div className={styles.loadingWrapper}>
                    <LoadingIndicator />
                </div>
            )}
        </div>
    )
}

export default PokemonList
