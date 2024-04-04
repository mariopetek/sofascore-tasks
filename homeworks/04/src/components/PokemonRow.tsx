import { useEffect, useState } from 'react'

import { PokemonInfo, PokemonSpeciesInfo } from '../model'
import PokemonImage from './PokemonImage'
import PokemonDetails from './PokemonDetails'

import styles from './styles/PokemonRow.module.css'

type PokemonRowProps = {
    pokemonNumber: number
    pokemonInfoUrl: string
}

function PokemonRow({ pokemonNumber, pokemonInfoUrl }: PokemonRowProps) {
    const [pokemonInfoLoading, setPokemonInfoLoading] = useState(false)
    const [pokemonInfoError, setPokemonInfoError] = useState<unknown>()
    const [pokemonInfo, setPokemonInfo] = useState<
        PokemonInfo & PokemonSpeciesInfo
    >()

    useEffect(() => {
        const fetchPokemonInfo = async () => {
            setPokemonInfoLoading(true)
            try {
                const pokemonInfoResponse = await fetch(pokemonInfoUrl)
                const pokemonInfo =
                    (await pokemonInfoResponse.json()) as PokemonInfo

                const speciesInfoResponse = await fetch(pokemonInfo.species.url)
                const speciesInfo =
                    (await speciesInfoResponse.json()) as PokemonSpeciesInfo
                setPokemonInfo({ ...pokemonInfo, ...speciesInfo })
            } catch (err) {
                setPokemonInfoError(err)
            } finally {
                setPokemonInfoLoading(false)
            }
        }

        fetchPokemonInfo()
    }, [pokemonInfoUrl])

    if (pokemonInfoLoading) return <div>Loading...</div>

    if (pokemonInfoError)
        return <div>Something went wrong. Please try again.</div>

    if (pokemonInfo)
        return (
            <div className={styles.pokemonRowContainer}>
                {pokemonNumber % 2 == 1 ? (
                    <>
                        <PokemonImage
                            pokemonNumber={pokemonNumber}
                            pokemonInfo={pokemonInfo}
                        />
                        <PokemonDetails
                            pokemonNumber={pokemonNumber}
                            pokemonInfo={pokemonInfo}
                        />
                    </>
                ) : (
                    <>
                        <PokemonDetails
                            pokemonNumber={pokemonNumber}
                            pokemonInfo={pokemonInfo}
                        />
                        <PokemonImage
                            pokemonNumber={pokemonNumber}
                            pokemonInfo={pokemonInfo}
                        />
                    </>
                )}
            </div>
        )
}

export default PokemonRow
