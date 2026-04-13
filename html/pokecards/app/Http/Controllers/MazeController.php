<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MazeController extends Controller
{
    public function render()
    {
        $pokemons = Collection::with('pokemons.types')->get();
        return Inertia::render('maze', ["pokemons" => $pokemons]);
    }
}
