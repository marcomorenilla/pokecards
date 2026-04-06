import { router } from '@inertiajs/react';
import { dbPokemonSeeder } from './dbPokemonSeeder';
import { dbTypesSeeder } from './dbTypesSeeder';

export const asyncSeeder = async () => {
    const newTypes = await dbTypesSeeder();
    const typesPayload = { types: newTypes };
    router.post('/dbCreateTypes', typesPayload, {
        onSuccess: () => console.log('exito creando tipos', typesPayload),
        onError: () => console.log('error creando tipos'),
    });
    const newPokedex = await dbPokemonSeeder();
    const pokedexPayload = { pokedex: newPokedex };
    router.post('/dbCreatePokemon', pokedexPayload, {
        onSuccess: () => console.log('pokedex creada', pokedexPayload),
        onError: () => console.log('error creando pokemon'),
    });
};
