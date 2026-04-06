<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pokemon;

class CollectionController extends Controller
{
    public function getCards(Request $request)
    {
        $totalCards = $request->input('cards', 1);
        $randArray = [];

        for ($i = 0; $i < $totalCards; $i++) {
            $randArray[] = rand(1, 151);
        }

        $uniquePokemons = Pokemon::whereIn('id', $randArray)->get()->keyBy('id');
        $uniquePokemons->load('types');

        $pokemons = array_map(fn($id) => $uniquePokemons[$id], $randArray);

        return response()->json($pokemons, 200);
    }
}
