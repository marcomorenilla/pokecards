<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'pokemon_id'])]

class Maze extends Model
{

    public function pokemons(): BelongsTo
    {
        return $this->belongsTo(Pokemon::class, 'pokemon_id', 'pokeapi_id');
    }
}
