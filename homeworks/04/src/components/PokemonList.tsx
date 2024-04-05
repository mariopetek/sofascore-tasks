import PokemonRow from './PokemonRow'
import { useFetchPokemon } from '../hooks/useFetchPokemon'

function PokemonList() {
    const { pokemon, pokemonLoading, pokemonError } = useFetchPokemon()

    if (pokemonLoading) return <div>Loading...</div>
    if (pokemonError) return <div>Something went wrong. Please try again.</div>

    return pokemon.map((pokemonDetails, index) => (
        <PokemonRow
            key={pokemonDetails.name}
            pokemonNumber={index + 1}
            pokemon={pokemonDetails}
        />
    ))
}

export default PokemonList
