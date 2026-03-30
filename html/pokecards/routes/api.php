<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'view']);

Route::post('/users', [UserController::class, 'store']);

Route::post('/users/authenticate', [UserController::class, 'authenticate']);

Route::post('/users/authenticate/new', [UserController::class, 'save']);

Route::middleware('auth:sanctum')->group(function () {
    //Route::get('/store', [UserController::class, 'show']);
});
