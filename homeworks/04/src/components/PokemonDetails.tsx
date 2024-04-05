import { FlavorTextEntry, Pokemon } from '../model'
import { capitalizeText, replaceNewlineAndFormFeed } from '../utils'

import styles from './styles/PokemonDetails.module.css'

type PokemonDetailsProps = {
    pokemonNumber: number
    pokemonInfo: Pokemon
}

function PokemonDetails({ pokemonNumber, pokemonInfo }: PokemonDetailsProps) {
    const isOdd = pokemonNumber % 2 == 1

    const pokemonHeading = `#${String(pokemonNumber).padStart(
        4,
        '0'
    )} ${capitalizeText(pokemonInfo.name)}`

    const pokemonHealthPoints = `${
        pokemonInfo.stats[0].base_stat
    } ${pokemonInfo.stats[0].stat.name.toUpperCase()}`

    const pokemonHeight = pokemonInfo.height * 10

    const findEnglishTextEntry = (textEntries: FlavorTextEntry[]) => {
        return textEntries.filter(entry => entry.language.name === 'en')[0]
            .flavor_text
    }

    const pokemonDetailsText = replaceNewlineAndFormFeed(
        findEnglishTextEntry(pokemonInfo.flavor_text_entries)
    )

    return (
        <div
            className={`${styles.pokemonDetailsContainer} ${
                isOdd ? styles.odd : styles.even
            }`}>
            <div className={styles.pokemonStatsContainer}>
                <h2 className={styles.pokemonHeading}>{pokemonHeading}</h2>
                <div className={styles.pokemonStats}>
                    <span>
                        <strong>Health points:</strong> {pokemonHealthPoints}
                    </span>
                    <span>
                        <strong>Height:</strong> {pokemonHeight} cm
                    </span>
                    <span>
                        <strong>Weight:</strong> {pokemonInfo.weight} kg
                    </span>
                    <div className={styles.typeList}>
                        <span>
                            <strong>Type:</strong>
                        </span>
                        <ul>
                            {pokemonInfo.types.map(typeInfo => (
                                <li
                                    key={typeInfo.type.name}
                                    className={`${styles.typeListItem} ${
                                        styles[typeInfo.type.name]
                                    }`}>
                                    {typeInfo.type.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p>
                        <strong>Details:</strong> {pokemonDetailsText}
                    </p>
                </div>
            </div>
            <div className={styles.pokemonViewContainer}>
                <span>
                    <strong>Full view:</strong>
                </span>
                <div className={styles.pokemonImages}>
                    <img
                        className={styles.pokemonImage}
                        src={pokemonInfo.sprites.front_default}
                        alt="Pokemon front view"
                    />
                    <img
                        className={styles.pokemonImage}
                        src={pokemonInfo.sprites.back_default}
                        alt="Pokemon back biew"
                    />
                </div>
            </div>
        </div>
    )
}

export default PokemonDetails
