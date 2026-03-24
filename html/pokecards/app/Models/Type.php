<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $fillable = ['type', 'type_color']

    public function pokemons(): BelongsToMany{
        return $this->belongsToMany(Pokemon::class, 'types_pokemons', 'types_id', 'pokemons_id');
    }
}
