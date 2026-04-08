const typeColors: any = {
    normal: '#A8A878',
    fire: '#f08030',
    water: '#6390f0',
    grass: '#78c850',
    electric: '#ffcb05',
    ice: '#98D8D8',
    fighting: '#CC0000',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    stellar: '#7776a8',
    unknown: '#F85888',
    todos: '#2e2e2e',
    favs: '#CC0000',
};

export async function dbTypesSeeder() {
    const typesData = await getAllTypes();
    if (!typesData) return { dbTypes: [], typeMap: {} };
    
    const { results } = typesData;

    const typeMap: Record<string, string> = {};

    const dbTypes = await Promise.all(
        results.map(async (type: any) => {
            const { name, url } = type;
            const details = await getType(url);
            
            const spanishName = details?.names.find(
                (n: any) => n.language.name === 'es'
            )?.name || name;

            typeMap[name] = spanishName;

            return {
                type: spanishName,
                type_color: typeColors[name] || '#777777',
            };
        })
    );

    return { dbTypes, typeMap };
}

async function getAllTypes() {
    try {
        const request = await fetch('https://pokeapi.co/api/v2/type/');
        if (request.ok) {
            return await request.json();
        }
    } catch (err) {
        console.error('Error al obtener tipos:', err);
    }
}

async function getType(url: string) {
    try {
        const request = await fetch(url);
        if (request.ok) {
            return await request.json();
        }
    } catch (err) {
        console.error('Error al obtener detalle del tipo:', err);
    }
}
