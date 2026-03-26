<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/auth', 'auth')->name('auth');
Route::inertia('/store', 'store')->name('store');
