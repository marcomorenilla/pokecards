<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'view']);

Route::post('/users/authenticate', [UserController::class, 'authenticate']);


Route::middleware('auth:sanctum')->group(function () {
    //Route::get('/store', [UserController::class, 'show']);
});
