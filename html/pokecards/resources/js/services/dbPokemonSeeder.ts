export async function dbPokemonSeeder(typeMap: Record<string, string>) {
    const pokemons = await getAllPokemon();
    if (!pokemons) return [];

    // Caché para no repetir llamadas de movimientos (Guardamos la promesa)
    const moveCache: Record<string, Promise<string>> = {};

    const getCachedMoveName = (url: string) => {
        if (!moveCache[url]) {
            moveCache[url] = getMovement(url).then(data => 
                data?.names.find((n: any) => n.language.name === 'es')?.name || data.name
            );
        }
        return moveCache[url];
    };

    // Lanzamos todas las peticiones en paralelo
    const pokedex = await Promise.all(
        pokemons.map(async (pokemon: any) => {
            const detail = await getPokemonDetail(pokemon.url);
            const species = await getPokemonDescription(detail.species.url);
            
            return await transformPokemonData(detail, species, typeMap, getCachedMoveName);
        })
    );

    return pokedex;
}

async function transformPokemonData(
    detail: any, 
    species: any, 
    typeMap: Record<string, string>,
    getMoveName: (url: string) => Promise<string>
) {
    const { id, name, height, weight, base_experience, stats, types, sprites, moves } = detail;

    // Traducir movimientos (usando el caché)
    const mainMove = moves[0] ? await getMoveName(moves[0].move.url) : null;
    const secondaryMove = moves[1] ? await getMoveName(moves[1].move.url) : null;

    // Traducir descripción
    const description = species.flavor_text_entries.find(
        (f: any) => f.language.name === 'es'
    )?.flavor_text.replace(/\f/g, ' ') || "";

    // Mapear stats
    const statsObj: any = {};
    stats.forEach((s: any) => {
        const key = s.stat.name.replace('-', '_');
        statsObj[key] = s.base_stat;
    });

    return {
        id,
        name,
        height,
        weight,
        base_experience,
        main_movement: mainMove,
        secondary_movement: secondaryMove,
        ...statsObj,
        description,
        sprite: sprites.other['official-artwork'].front_default,
        types: types.map((t: any) => typeMap[t.type.name] || t.type.name)
    };
}

async function getAllPokemon() {
    try {
        const request = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (request.ok) {
            const response = await request.json();
            return response.results;
        }
    } catch (err) {
        console.error('Error pokeapi list:', err);
    }
}

async function getPokemonDetail(url: string) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (err) { console.error(err); }
}

async function getPokemonDescription(url: string) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (err) { console.error(err); }
}

async function getMovement(url: string) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (err) { console.error(err); }
}
