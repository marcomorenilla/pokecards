<?php

use App\Http\Controllers\PokemonController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::inertia('/auth', 'auth')->name('login');


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', [UserController::class, 'show'])->name('home');
    Route::post('/users/addCoins', [UserController::class, 'addCoins'])->name('users.addCoins');
    Route::post('/dbCreateTypes', [TypeController::class, 'createTypes'])->name('type.create');
    Route::post('/dbCreatePokemon', [PokemonController::class, 'createPokemon'])->name('pokemons.create');
});
