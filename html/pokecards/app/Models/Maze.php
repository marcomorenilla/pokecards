<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['user_id', 'pokemon_id', 'position'])]

class Maze extends Model
{

    public function pokemons(): BelongsTo
    {
        return $this->belongsTo(Pokemon::class, 'pokemon_id', 'pokeapi_id');
    }

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function likes(): HasMany
    {
        return $this->hasMany(Social::class, 'maze_id', 'user_id')->where('reaction', 1);
    }

    public function dislikes(): HasMany
    {
        return $this->hasMany(Social::class, 'maze_id', 'user_id')->where('reaction', 0);
    }
}
