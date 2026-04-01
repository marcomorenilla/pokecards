<?php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pokemon;
use App\Models\Type;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class PokemonController extends Controller
{

    public function createPokemon(Request $request)
    {
        $pokedex = $request->input('pokedex');

        // 1. Optimizamos: Obtenemos todos los tipos de una sola vez para no consultar la DB en cada vuelta
        $allTypeNames = collect($pokedex)->pluck('types')->flatten()->unique();
        $typeMap = Type::whereIn('type', $allTypeNames)->pluck('id', 'type');

        // 2. Usamos una transacción para que si un Pokémon falla, no se guarden datos a medias
        DB::transaction(function () use ($pokedex, $typeMap) {
            foreach ($pokedex as $pokeData) {

                // 3. Creamos el Pokémon
                // Nota: He mapeado los nombres del JSON a los de tu migración (hp, attack, etc.)
                $pokemon = Pokemon::create([
                    'pokeapi_id'         => $pokeData['id'],
                    'name'               => $pokeData['name'],
                    'hp'                 => $pokeData['hp'],
                    'attack'             => $pokeData['attack'],
                    'defense'            => $pokeData['defense'],
                    'special_attack'     => $pokeData['special_attack'],
                    'special_defense'    => $pokeData['special_defense'],
                    'speed'              => $pokeData['speed'],
                    'weigth'             => $pokeData['weight'],
                    'height'             => $pokeData['height'],
                    'description'        => $pokeData['description'],
                    'main_movement'      => $pokeData['main_movement'],
                    'secondary_movement' => $pokeData['secondary_movement'],
                    'base_experience'    => $pokeData['base_experience'],
                    'sprite'             => $pokeData['sprite'],
                ]);

                // 4. Relacionamos los tipos usando el mapa que creamos en el paso 1
                $typeIds = collect($pokeData['types'])->map(fn($name) => $typeMap[$name]);

                // sync() escribe en la tabla pivote 'types_pokemons'
                $pokemon->types()->sync($typeIds);
            }
        });

        return response()->json(['message' => '¡Pokédex guardada con éxito!']);
    }
}
