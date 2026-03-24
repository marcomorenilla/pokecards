<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    protected $fillable = ['number', 'name', 'hp', 'attack', 'defense', 'special_attack', 'special_defense', 'speed', 'weigth', 'height', 'description', 'main_movement', 'secondary_movement', 'base_experience', 'sprite']

    public function types(): BelongsToMany{
        return $this->belongsToMany(Type::class, 'types_pokemons', 'pokemons_id', 'types_id');
    }
}
