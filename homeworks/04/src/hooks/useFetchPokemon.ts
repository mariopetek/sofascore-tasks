import { useEffect, useRef, useState } from 'react'
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
    const [pokemonLoading, setPokemonLoading] = useState(false)
    const [pokemonError, setPokemonError] = useState(false)
    const [fetchUrl, setFetchUrl] = useState(
        'https://pokeapi.co/api/v2/pokemon/'
    )
    const nextFetchUrl = useRef<string | null>(null)

    useEffect(() => {
        async function fetchPokemon() {
            setPokemonLoading(true)
            setPokemonError(false)

            try {
                const allPokemonDataResponse = await fetch(fetchUrl)
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
                        const { flavor_text_entries } =
                            (await speciesInfoResponse.json()) as PokemonSpeciesInfo

                        return {
                            ...pokemonInfo,
                            flavor_text_entries
                        }
                    }
                )

                const newPokemon = (await Promise.all(
                    newPokemonPromises
                )) as Pokemon[]

                setPokemon(prevPokemon => [...prevPokemon, ...newPokemon])

                nextFetchUrl.current = allPokemonData.next
            } catch (err) {
                setPokemonError(true)
            } finally {
                setPokemonLoading(false)
            }
        }

        fetchPokemon()
    }, [fetchUrl])

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                setFetchUrl(() => nextFetchUrl.current!)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return {
        pokemon,
        pokemonLoading,
        pokemonError
    }
}
