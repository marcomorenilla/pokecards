<?php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pokemon;
use App\Models\Type;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class PokemonController extends Controller
{

    public function createPokemon(Request $request)
    {
        $pokedex = $request->input('pokedex');

        $allTypeNames = collect($pokedex)->pluck('types')->flatten()->unique();
        $typeMap = Type::whereIn('type', $allTypeNames)->pluck('id', 'type');


        DB::transaction(function () use ($pokedex, $typeMap) {
            foreach ($pokedex as $pokeData) {
                Log::channel('custom')->info('weight: ' . $pokeData['weight']);

                $pokemon = Pokemon::create([
                    'pokeapi_id'         => $pokeData['id'],
                    'name'               => $pokeData['name'],
                    'hp'                 => $pokeData['hp'],
                    'attack'             => $pokeData['attack'],
                    'defense'            => $pokeData['defense'],
                    'special_attack'     => $pokeData['special_attack'],
                    'special_defense'    => $pokeData['special_defense'],
                    'speed'              => $pokeData['speed'],
                    'weight'             => $pokeData['weight'],
                    'height'             => $pokeData['height'],
                    'description'        => $pokeData['description'],
                    'main_movement'      => $pokeData['main_movement'],
                    'secondary_movement' => $pokeData['secondary_movement'],
                    'base_experience'    => $pokeData['base_experience'],
                    'sprite'             => $pokeData['sprite'],
                ]);

                $typeIds = collect($pokeData['types'])->map(fn($name) => $typeMap[$name]);

                $pokemon->types()->sync($typeIds);
            }
        });
    }
}
