type SpritesInfo = {
    front_default: string
    back_default: string
    other: {
        'official-artwork': {
            front_default: string
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
