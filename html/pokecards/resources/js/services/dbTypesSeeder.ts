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
    //Coger todos los tipos,
    const types = await getAllTypes();

    const { results } = types;

    const dbTypes = [];
    for (const type of results) {
        //Quedarme con los nombres
        const tplType: any = {};
        const { name, url } = type;
        //Añadir el color
        tplType['type_color'] = typeColors[name];
        //Traducirlos al castellano
        const initType = await getType(url);
        const { names } = initType;
        const spanishType = names.find(
            (type: any) => type.language.name == 'es',
        );
        //Quedarme con el nombre
        tplType['type'] = spanishType.name;
        dbTypes.push(tplType);
    }
    return dbTypes;
}
async function getAllTypes() {
    try {
        const request = await fetch('https://pokeapi.co/api/v2/type/');
        if (request.ok) {
            const response = await request.json();
            return response;
        }
    } catch (err) {
        console.error(err);
    }
}

async function getType(url: string) {
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
