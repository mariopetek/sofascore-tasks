import { useEffect, useState } from 'react'

import PokemonRow from './PokemonRow'

type Pokemon = {
    name: string
    url: string
}

type AllPokemonData = {
    next: string
    results: Pokemon[]
}

function PokemonList() {
    const [allPokemonDataLoading, setAllPokemonDataLoading] = useState(false)
    const [allPokemonDataError, setAllPokemonDataError] = useState<unknown>()
    const [allPokemonData, setAllPokemonData] = useState<AllPokemonData>()

    useEffect(() => {
        async function fetchAllPokemonData() {
            setAllPokemonDataLoading(true)
            try {
                const response = await fetch(
                    'https://pokeapi.co/api/v2/pokemon/'
                )

                const allPokemonData = (await response.json()) as AllPokemonData
                setAllPokemonData(allPokemonData)
            } catch (err) {
                setAllPokemonDataError(err)
            } finally {
                setAllPokemonDataLoading(false)
            }
        }
        fetchAllPokemonData()
    }, [])

    if (allPokemonDataLoading) return <div>Loading...</div>
    if (allPokemonDataError)
        return <div>Something went wrong. Please try again.</div>

    if (allPokemonData)
        return allPokemonData.results.map((pokemon, index) => (
            <PokemonRow
                key={pokemon.name}
                pokemonNumber={index + 1}
                pokemonInfoUrl={pokemon.url}
            />
        ))
}

export default PokemonList
