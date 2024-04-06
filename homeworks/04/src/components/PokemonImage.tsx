import { PiHeartStraightLight } from 'react-icons/pi'
import { PiHeartStraightFill } from 'react-icons/pi'

import { IconContext } from 'react-icons'

import styles from './styles/PokemonImage.module.css'
import { Pokemon } from '../model'
import { useLikedPokemonContext } from '../hooks/useLikedPokemonContext'

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
                return [...prevLikedPokemon, pokemonInfo]
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
