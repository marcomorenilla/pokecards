<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Maze;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MazeController extends Controller
{
    public function render()
    {
        $maze = Maze::with('pokemons.types')->get();
        $pokemons = Collection::with('pokemons.types')->get();
        return Inertia::render('maze', ["pokemons" => $pokemons, "maze" => $maze]);
    }

    public function addToMaze(Request $request)
    {
        $userId = $request->input('user_id');
        $pokemonId = $request->input('pokemon_id');
        $position = $request->input('position');

        Maze::create(['user_id' => $userId, 'pokemon_id' => $pokemonId, 'position' => $position]);
    }

    public function deleteMaze()
    {
        Maze::query()->delete();
    }
}
