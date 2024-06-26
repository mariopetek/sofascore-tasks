type SpritesInfo = {
    front_default: string
    back_default: string
    front_shiny: string
    back_shiny: string
    other: {
        'official-artwork': {
            front_default: string
            front_shiny: string
        }
    }
}

type StatInfo = {
    base_stat: number
    stat: {
        name: string
    }
}

type TypeInfo = {
    type: {
        name: string
    }
}

export type FlavorTextEntry = {
    flavor_text: string
    language: {
        name: string
    }
}

export type PokemonSpeciesInfo = {
    flavor_text_entries: FlavorTextEntry[]
}

export type PokemonInfo = {
    id: number
    name: string
    height: number
    sprites: SpritesInfo
    stats: StatInfo[]
    types: TypeInfo[]
    species: {
        url: string
    }
    weight: number
}

export type Pokemon = PokemonInfo & PokemonSpeciesInfo

export type LikedPokemon = Pokemon & { number: number }
