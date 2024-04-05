import PokemonRow from './PokemonRow'
import { useFetchPokemon } from '../hooks/useFetchPokemon'

function PokemonList() {
    const { pokemon, pokemonLoading, morePokemonLoading, pokemonError } =
        useFetchPokemon()

    if (pokemonLoading) return <div>Loading...</div>
    if (pokemonError) return <div>Something went wrong. Please try again.</div>

    return (
        <>
            {pokemon.map((pokemonDetails, index) => (
                <PokemonRow
                    key={pokemonDetails.id}
                    pokemonNumber={index + 1}
                    pokemon={pokemonDetails}
                />
            ))}
            {morePokemonLoading && <div>Loading...</div>}
        </>
    )
}

export default PokemonList
