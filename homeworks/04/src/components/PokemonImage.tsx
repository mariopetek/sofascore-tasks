import { PokemonInfo } from '../model'

import styles from './styles/PokemonImage.module.css'

type PokemonImageProps = {
    pokemonNumber: number
    pokemonInfo: PokemonInfo
}

function PokemonImage({ pokemonInfo, pokemonNumber }: PokemonImageProps) {
    return (
        <div
            className={`${styles.pokemonImageContainer} ${
                pokemonNumber % 2 == 1 ? styles.justifyEnd : styles.justifyStart
            }`}>
            <img
                className={styles.pokemonImage}
                src={
                    pokemonInfo.sprites.other['official-artwork'].front_default
                }
                alt="Pokemon official artwork"
                height={400}
                width={400}
            />
        </div>
    )
}

export default PokemonImage
