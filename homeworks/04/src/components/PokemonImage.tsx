import { PokemonInfo } from '../model'
import { PiHeartStraightLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'

import styles from './styles/PokemonImage.module.css'

type PokemonImageProps = {
    pokemonNumber: number
    pokemonInfo: PokemonInfo
}

function PokemonImage({ pokemonInfo, pokemonNumber }: PokemonImageProps) {
    const placement = {
        likeButton: pokemonNumber % 2 == 1 ? 'placeRight' : 'placeLeft',
        pokemonImage: pokemonNumber % 2 == 1 ? 'justifyEnd' : 'justifyStart'
    }
    return (
        <div
            className={`${styles.pokemonImageContainer} ${
                styles[placement.pokemonImage]
            }`}>
            <IconContext.Provider
                value={{
                    className: `${styles.likeButton} ${
                        styles[placement.likeButton]
                    }`
                }}>
                <PiHeartStraightLight />
            </IconContext.Provider>
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
