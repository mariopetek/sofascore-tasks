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
            <PokemonImage pokemonNumber={pokemonNumber} pokemonInfo={pokemon} />
            <PokemonDetails
                pokemonNumber={pokemonNumber}
                pokemonInfo={pokemon}
            />
        </div>
    )
}

export default PokemonRow
