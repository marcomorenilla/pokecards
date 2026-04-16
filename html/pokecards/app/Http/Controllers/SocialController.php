<?php

namespace App\Http\Controllers;

use App\Models\Maze;
use App\Models\Social;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SocialController extends Controller
{
    public function render()
    {
        $mazes =  Maze::with('pokemons.types')->get();

        return Inertia::render('social', ['pokemons' => $mazes]);
    }
}
