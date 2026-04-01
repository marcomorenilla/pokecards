export async function dbPokemonSeeder() {
    const pokedex = [];
    const pokemons = await getAllPokemon();
    for (const pokemon of pokemons) {
        const newPokemon = await getPokemonDetail(pokemon.url);
        const { species } = newPokemon;

        const {
            id,
            base_experience,
            weight,
            height,
            moves,
            stats,
            types,
            sprites,
        } = newPokemon;

        const pokemonFullInfo = {
            id,
            name: newPokemon.name,
            base_experience,
            weight,
            height,
            moves,
            stats,
            types,
            sprite: sprites.other['official-artwork'].front_default,
        };
        const pokemonSpecie = await getPokemonDescription(species.url);
        const { flavor_text_entries: flavors } = pokemonSpecie;
        const description = flavors.find(
            (flavor: any) => flavor.language.name == 'es',
        );
        const finalPokemon = await createPokemon(pokemonFullInfo, description);
        pokedex.push(finalPokemon);
    }
    return pokedex;
}

async function getAllPokemon() {
    // endpoint https://pokeapi.co/api/v2/pokemon?limit=151

    try {
        const request = await fetch(
            'https://pokeapi.co/api/v2/pokemon?limit=151',
        );

        if (request.ok) {
            const response = await request.json();
            const { results } = response;

            return results;
        }
    } catch (err) {
        console.error('error de pokeapi', err);
    }
}

async function getPokemonDetail(url: string) {
    // endpoint "https://pokeapi.co/api/v2/pokemon/{number}/"
    /**
     * Me proporciona
     * base_experience
     * height
     * weight
     * sprite
     * english_main_movement
     * english_secondary_movement
     * hp
     * attack
     * defense
     * special_attack
     * special_deffense
     * speed
     * types - vienen en nombre hay que transformarlos a id
     */

    try {
        const request = await fetch(url);
        if (request.ok) {
            const response = await request.json();
            return response;
        }
    } catch (err) {
        console.error(err);
    }
}

async function getPokemonDescription(url: string) {
    //endpoint https://pokeapi.co/api/v2/pokemon-species/1/
    try {
        const request = await fetch(url);
        if (request.ok) {
            const response = await request.json();
            return response;
        }
    } catch (err) {
        console.error(err);
    }
}

async function getMovement(url: string) {
    try {
        const request = await fetch(url);
        if (request.ok) {
            const response = await request.json();
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

async function getType(url: string) {
    try {
        const request = await fetch(url);
        if (request.ok) {
            const response = await request.json();
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

async function getSpanishName(pokemon: any, types: any) {
    const newPokemon = pokemon;
    newPokemon['types'] = [];
    for (const type of types) {
        const returnedType = await getType(type.type.url);
        const { names } = returnedType;
        const spanishType = names.find(
            (name: any) => name.language.name == 'es',
        );

        newPokemon['types'].push(spanishType.name);
    }

    return newPokemon;
}

async function createPokemon(fullInfo: any, description: any) {
    const {
        moves,
        name,
        height,
        weight,
        base_experience,
        stats,
        id,
        types,
        sprite,
    } = fullInfo;

    const pokemon: any = {
        id,
        name,
        height,
        weight,
        base_experience,
        sprite,
    };
    const mainMovement: any = await getMovement(moves[0].move.url);
    const { names } = mainMovement;
    const moveEs = names.find((name: any) => name.language.name == 'es');
    const mainMovementName = moveEs.name;

    pokemon['main_movement'] = mainMovementName;
    if (moves[1]) {
        const mainMovement: any = await getMovement(moves[1].move.url);
        const { names } = mainMovement;
        const moveEs = names.find((name: any) => name.language.name == 'es');
        const secondaryMovementName = moveEs.name;
        pokemon['secondary_movement'] = secondaryMovementName;
    } else {
        pokemon['secondary_movement'] = null;
    }

    stats.map((statRaw: any) => {
        const { stat, base_stat } = statRaw;
        const { name } = stat;
        let key = '';
        if (name == 'special-attack') {
            key = 'special_attack';
        } else if (name == 'special-defense') {
            key = 'special_defense';
        } else {
            key = name;
        }
        const value = base_stat;

        pokemon[key] = value;
    });

    pokemon['description'] = description.flavor_text;

    const finalPokemon = await getSpanishName(pokemon, types);
    return finalPokemon;
}
