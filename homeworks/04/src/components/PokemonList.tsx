import PokemonRow from './PokemonRow'
import { useFetchPokemon } from '../hooks/useFetchPokemon'

import styles from './styles/PokemonList.module.css'
import LoadingIndicator from './LoadingIndicator'
import ErrorMessage from './ErrorMessage'

function PokemonList() {
    const { pokemon, pokemonLoading, morePokemonLoading, pokemonError } =
        useFetchPokemon()

    return (
        <div className={styles.pokemonListContainer}>
            {pokemonLoading && (
                <div className={styles.loadingWrapper}>
                    <LoadingIndicator />
                </div>
            )}
            {pokemonError && (
                <div className={styles.errorWrapper}>
                    <ErrorMessage text="Something went wrong. Please try again." />
                </div>
            )}
            {!pokemonLoading &&
                !pokemonError &&
                pokemon.map((pokemonDetails, index) => (
                    <PokemonRow
                        key={pokemonDetails.id}
                        pokemonNumber={index + 1}
                        pokemon={pokemonDetails}
                    />
                ))}
            {morePokemonLoading && (
                <div className={styles.loadingWrapper}>
                    <LoadingIndicator />
                </div>
            )}
        </div>
    )
}

export default PokemonList
