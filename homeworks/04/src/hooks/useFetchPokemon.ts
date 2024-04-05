import { useCallback, useEffect, useState } from 'react'
import { Pokemon, PokemonInfo, PokemonSpeciesInfo } from '../model'

type PokemonResult = {
    name: string
    url: string
}

type AllPokemonData = {
    next: string
    results: PokemonResult[]
}

export function useFetchPokemon() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [pokemonLoading, setPokemonLoading] = useState(true)
    const [morePokemonLoading, setMorePokemonLoading] = useState(false)
    const [pokemonError, setPokemonError] = useState(false)

    const [nextPageUrl, setNextPageUrl] = useState('')

    useEffect(() => {
        async function fetchPokemon() {
            setPokemonLoading(true)
            setPokemonError(false)

            try {
                const allPokemonDataResponse = await fetch(
                    'https://pokeapi.co/api/v2/pokemon/'
                )
                const allPokemonData =
                    (await allPokemonDataResponse.json()) as AllPokemonData

                const newPokemonPromises = allPokemonData.results.map(
                    async pokemonResult => {
                        const pokemonInfoResponse = await fetch(
                            pokemonResult.url
                        )
                        const pokemonInfo =
                            (await pokemonInfoResponse.json()) as PokemonInfo

                        const speciesInfoResponse = await fetch(
                            pokemonInfo.species.url
                        )
                        const speciesInfo =
                            (await speciesInfoResponse.json()) as PokemonSpeciesInfo

                        return {
                            ...pokemonInfo,
                            ...speciesInfo
                        }
                    }
                )

                const newPokemon = (await Promise.all(
                    newPokemonPromises
                )) as Pokemon[]
                setPokemon(prevPokemon => [...prevPokemon, ...newPokemon])

                setNextPageUrl(allPokemonData.next)
            } catch (err) {
                setPokemonError(true)
            } finally {
                setPokemonLoading(false)
            }
        }

        fetchPokemon()
    }, [])

    const fetchMorePokemon = useCallback(async () => {
        if (morePokemonLoading) return

        setMorePokemonLoading(true)
        setPokemonError(false)

        try {
            const allPokemonDataResponse = await fetch(nextPageUrl)
            const allPokemonData =
                (await allPokemonDataResponse.json()) as AllPokemonData

            const newPokemonPromises = allPokemonData.results.map(
                async pokemonResult => {
                    const pokemonInfoResponse = await fetch(pokemonResult.url)
                    const pokemonInfo =
                        (await pokemonInfoResponse.json()) as PokemonInfo

                    const speciesInfoResponse = await fetch(
                        pokemonInfo.species.url
                    )
                    const speciesInfo =
                        (await speciesInfoResponse.json()) as PokemonSpeciesInfo

                    return {
                        ...pokemonInfo,
                        ...speciesInfo
                    }
                }
            )

            const newPokemon = (await Promise.all(
                newPokemonPromises
            )) as Pokemon[]
            setPokemon(prevPokemon => [...prevPokemon, ...newPokemon])

            setNextPageUrl(allPokemonData.next)
        } catch (err) {
            setPokemonError(true)
        } finally {
            setMorePokemonLoading(false)
        }
    }, [morePokemonLoading, nextPageUrl])

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                fetchMorePokemon()
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [fetchMorePokemon])

    return {
        pokemon,
        pokemonLoading,
        morePokemonLoading,
        pokemonError
    }
}
