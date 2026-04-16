<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;
use App\Models\Pokemon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class CollectionController extends Controller
{
    public function getCards(Request $request)
    {
        @unlink(storage_path('logs/poke.log'));
        $totalCards = $request->input('cards', 1);
        $userId = Auth::id();

        Log::channel('custom')->info('total de cartas', [
            'total_cards' => $totalCards,
        ]);
        Log::channel('custom')->info('user id', [
            'user id' => $userId,
        ]);



        if (!$userId) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        $randArray = [];
        for ($i = 0; $i < $totalCards; $i++) {
            $randArray[] = rand(1, 151);
        }

        $uniquePokemons = Pokemon::with('types')->whereIn('id', $randArray)->get()->keyBy('id');

        $pokemons = array_map(function ($id) use ($uniquePokemons, $userId) {
            $pokemon = $uniquePokemons[$id];

            $collection = Collection::firstOrCreate(
                ['user_id' => $userId, 'pokemon_id' => $pokemon->id],
                ['quantity' => 0]
            );
            $collection->increment('quantity');

            return $pokemon;
        }, $randArray);

        return  response()->json($pokemons);
    }
    public function showCollection()
    {
        $userId = Auth::id();

        $pokemons = Collection::where('user_id', $userId)->with('pokemons.types')->get();
        return Inertia::render('collection', [
            'pokemons' => $pokemons
        ]);
    }
}
