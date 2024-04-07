import { useState } from 'react'
import { capitalizeText } from '../utils'
import LikedButton from './LikedButton'
import LikeButton from './LikeButton'
import { LikedPokemon } from '../model'

import styles from './styles/LikedPokemonCard.module.css'

type LikedPokemonCardProps = {
    pokemonInfo: LikedPokemon
}

function LikedPokemonCard({ pokemonInfo }: LikedPokemonCardProps) {
    const shinyImageUrl =
        pokemonInfo.sprites.other['official-artwork'].front_shiny

    const defaultImageUrl =
        pokemonInfo.sprites.other['official-artwork'].front_default

    const pokemonHeading = `#${String(pokemonInfo.number).padStart(
        4,
        '0'
    )} ${capitalizeText(pokemonInfo.name)}`

    const [isPokemonLiked, setIsPokemonLiked] = useState(true)

    return (
        <div className={styles.pokemonImageContainer}>
            <img
                src={isPokemonLiked ? shinyImageUrl : defaultImageUrl}
                alt="Pokemon official artwork"
                className={styles.pokemonImage}
            />
            <div className={styles.bottomContainer}>
                <h2 className={styles.pokemonHeading}>{pokemonHeading}</h2>
                {isPokemonLiked ? (
                    <LikedButton
                        clickHandler={() => setIsPokemonLiked(false)}
                        additionalClasses={styles.heartButton}
                    />
                ) : (
                    <LikeButton
                        clickHandler={() => setIsPokemonLiked(true)}
                        additionalClasses={styles.heartButton}
                    />
                )}
            </div>
        </div>
    )
}

export default LikedPokemonCard
