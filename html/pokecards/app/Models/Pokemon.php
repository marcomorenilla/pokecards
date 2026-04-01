<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Pokemon extends Model
{
    protected $table = 'pokemons';
    protected $fillable = ['pokeapi_id', 'name', 'hp', 'attack', 'defense', 'special_attack', 'special_defense', 'speed', 'weigth', 'height', 'description', 'main_movement', 'secondary_movement', 'base_experience', 'sprite'];

    public function types(): BelongsToMany
    {
        return $this->belongsToMany(Type::class, 'types_pokemons', 'pokemons_id', 'types_id');
    }
}
