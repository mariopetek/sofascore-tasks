import { Pokemon } from '../model'
import PokemonImage from './PokemonImage'
import PokemonDetails from './PokemonDetails'

import styles from './styles/PokemonRow.module.css'

type PokemonRowProps = {
    pokemonNumber: number
    pokemon: Pokemon
}

function PokemonRow({ pokemonNumber, pokemon }: PokemonRowProps) {
    return (
        <div className={styles.pokemonRowContainer}>
            {pokemonNumber % 2 == 1 ? (
                <>
                    <PokemonImage
                        pokemonNumber={pokemonNumber}
                        pokemonImageUrl={
                            pokemon.sprites.other['official-artwork']
                                .front_default
                        }
                    />
                    <PokemonDetails
                        pokemonNumber={pokemonNumber}
                        pokemonInfo={pokemon}
                    />
                </>
            ) : (
                <>
                    <PokemonDetails
                        pokemonNumber={pokemonNumber}
                        pokemonInfo={pokemon}
                    />
                    <PokemonImage
                        pokemonNumber={pokemonNumber}
                        pokemonImageUrl={
                            pokemon.sprites.other['official-artwork']
                                .front_default
                        }
                    />
                </>
            )}
        </div>
    )
}

export default PokemonRow
