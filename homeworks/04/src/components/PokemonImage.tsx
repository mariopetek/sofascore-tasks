import { PiHeartStraightLight } from 'react-icons/pi'
import { PiHeartStraightFill } from 'react-icons/pi'

import { IconContext } from 'react-icons'

import styles from './styles/PokemonImage.module.css'
import { useState } from 'react'
import { Pokemon } from '../model'

type ButtonProps = {
    clickHandler: () => void
}

function LikedButton({ clickHandler }: ButtonProps) {
    return (
        <IconContext.Provider
            value={{
                className: styles.likedButton
            }}>
            <PiHeartStraightFill onClick={clickHandler} />
        </IconContext.Provider>
    )
}

function LikeButton({ clickHandler }: ButtonProps) {
    return (
        <IconContext.Provider
            value={{
                className: styles.likeButton
            }}>
            <PiHeartStraightLight onClick={clickHandler} />
        </IconContext.Provider>
    )
}

type PokemonImageProps = {
    pokemonNumber: number
    pokemonInfo: Pokemon
}

function PokemonImage({ pokemonNumber, pokemonInfo }: PokemonImageProps) {
    const isOdd = pokemonNumber % 2 == 1

    const pokemonImageUrl =
        pokemonInfo.sprites.other['official-artwork'].front_default

    const [isLiked, setIsLiked] = useState(false)

    const clickHandler = () => {
        setIsLiked(currentLiked => !currentLiked)
    }

    return (
        <div
            className={`${styles.pokemonImageContainer}  ${
                isOdd ? styles.odd : styles.even
            }`}>
            {isLiked ? (
                <LikedButton clickHandler={clickHandler} />
            ) : (
                <LikeButton clickHandler={clickHandler} />
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
