import PokemonRow from './PokemonRow'
import { useFetchPokemon } from '../hooks/useFetchPokemon'

import styles from './styles/PokemonList.module.css'

function PokemonList() {
    const { pokemon, pokemonLoading, morePokemonLoading, pokemonError } =
        useFetchPokemon()

    return (
        <div className={styles.pokemonListContainer}>
            {pokemonLoading && <div>Loading...</div>}
            {pokemonError && <div>Something went wrong. Please try again.</div>}
            {!pokemonLoading &&
                !pokemonError &&
                pokemon.map((pokemonDetails, index) => (
                    <PokemonRow
                        key={pokemonDetails.id}
                        pokemonNumber={index + 1}
                        pokemon={pokemonDetails}
                    />
                ))}
            {morePokemonLoading && <div>Loading...</div>}
        </div>
    )
}

export default PokemonList
