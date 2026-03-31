<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::inertia('/auth', 'auth')->name('login');


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', [UserController::class, 'show'])->name('home');
    Route::post('/users/addCoins', [UserController::class, 'addCoins'])->name('users.addCoins');
});
