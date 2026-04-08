import { router } from '@inertiajs/react';
import { dbPokemonSeeder } from './dbPokemonSeeder';
import { dbTypesSeeder } from './dbTypesSeeder';

export const asyncSeeder = async () => {
    console.log('Iniciando proceso de sembrado optimizado...');

    // 1. Obtenemos los tipos y el mapa de traducciones
    const { dbTypes, typeMap } = await dbTypesSeeder();
    
    // 2. Enviamos los tipos a la base de datos
    router.post('/dbCreateTypes', { types: dbTypes }, {
        onSuccess: () => console.log('Tipos creados correctamente'),
        onError: () => console.error('Error al crear tipos en la DB'),
    });

    // 3. Obtenemos los 151 Pokémon
    const newPokedex = await dbPokemonSeeder(typeMap);
    
    // 4. Enviamos la pokedex completa a la base de datos
    router.post('/dbCreatePokemon', { pokedex: newPokedex }, {
        onSuccess: () => console.log('Pokedex sembrada con éxito en la base de datos'),
        onError: () => console.error('Error al crear los Pokémon en la DB'),
    });
};
