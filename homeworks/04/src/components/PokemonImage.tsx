import { Pokemon } from '../model'
import { useLikedPokemonContext } from '../hooks/useLikedPokemonContext'

import styles from './styles/PokemonImage.module.css'
import LikedButton from './LikedButton'
import LikeButton from './LikeButton'

type PokemonImageProps = {
    pokemonNumber: number
    pokemonInfo: Pokemon
}

function PokemonImage({ pokemonNumber, pokemonInfo }: PokemonImageProps) {
    const isOdd = pokemonNumber % 2 == 1

    const pokemonDefaultImageUrl =
        pokemonInfo.sprites.other['official-artwork'].front_default
    const pokemonShinyImageUrl =
        pokemonInfo.sprites.other['official-artwork'].front_shiny

    const { likedPokemon, setLikedPokemon } = useLikedPokemonContext()

    const clickHandler = () => {
        setLikedPokemon(prevLikedPokemon => {
            if (prevLikedPokemon.some(p => p.id === pokemonInfo.id)) {
                return prevLikedPokemon.filter(p => p.id !== pokemonInfo.id)
            } else {
                return [
                    ...prevLikedPokemon,
                    { ...pokemonInfo, number: pokemonNumber }
                ]
            }
        })
    }

    const isLiked = likedPokemon.some(p => p.id === pokemonInfo.id)

    const pokemonImageUrl = isLiked
        ? pokemonShinyImageUrl
        : pokemonDefaultImageUrl

    return (
        <div
            className={`${styles.pokemonImageContainer}  ${
                isOdd ? styles.odd : styles.even
            }`}>
            {isLiked ? (
                <LikedButton
                    clickHandler={clickHandler}
                    additionalClasses={`${
                        isOdd ? styles.oddButton : styles.evenButton
                    }`}
                />
            ) : (
                <LikeButton
                    clickHandler={clickHandler}
                    additionalClasses={`${
                        isOdd ? styles.oddButton : styles.evenButton
                    }`}
                />
            )}
            <img
                className={styles.pokemonImage}
                src={pokemonImageUrl}
                alt="Pokemon official artwork"
            />
        </div>
    )
}

export default PokemonImage
