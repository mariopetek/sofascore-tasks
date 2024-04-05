import { useEffect, useState } from 'react'
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
    const [pokemonError, setPokemonError] = useState(false)

    async function fetchPokemon() {
        setPokemonLoading(true)
        setPokemonError(false)

        try {
            const allPokemonDataResponse = await fetch(
                'https://pokeapi.co/api/v2/pokemon/'
            )
            const allPokemonData =
                (await allPokemonDataResponse.json()) as AllPokemonData

            allPokemonData.results.forEach(async pokemonResult => {
                const pokemonInfoResponse = await fetch(pokemonResult.url)
                const pokemonInfo =
                    (await pokemonInfoResponse.json()) as PokemonInfo

                const speciesInfoResponse = await fetch(pokemonInfo.species.url)
                const speciesInfo =
                    (await speciesInfoResponse.json()) as PokemonSpeciesInfo

                setPokemon(prevPokemon => [
                    ...prevPokemon,
                    { ...pokemonInfo, ...speciesInfo }
                ])
            })
        } catch (err) {
            setPokemonError(true)
        } finally {
            setPokemonLoading(false)
        }
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

    return {
        pokemon,
        pokemonLoading,
        pokemonError
    }
}
