<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'view']);

Route::post('/users', [UserController::class, 'store']);

Route::post('/users/authenticate', [UserController::class, 'authenticate']);
