import { PiHeartStraightLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'

import styles from './styles/PokemonImage.module.css'

type PokemonImageProps = {
    pokemonNumber: number
    pokemonImageUrl: string
}

function PokemonImage({ pokemonImageUrl, pokemonNumber }: PokemonImageProps) {
    const isOdd = pokemonNumber % 2 == 1

    return (
        <div
            className={`${styles.pokemonImageContainer}  ${
                isOdd ? styles.odd : styles.even
            }`}>
            <IconContext.Provider
                value={{
                    className: `${styles.likeButton} ${styles.verticalPlacement}`
                }}>
                <PiHeartStraightLight />
            </IconContext.Provider>
            <img
                className={styles.pokemonImage}
                src={pokemonImageUrl}
                alt="Pokemon official artwork"
            />
        </div>
    )
}

export default PokemonImage
