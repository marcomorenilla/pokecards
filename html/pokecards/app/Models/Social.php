<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

#[Fillable(['user_id', 'maze_id', 'reaction', 'count'])]
class Social extends Model
{
    protected $table = 'social';
    public function users(): BelongsTo
    {
        return $this->belongsTo('users', 'user_id', 'id');
    }

    public function mazes(): BelongsTo
    {
        return $this->belongsTo('mazes', 'maze_id', 'user_id');
    }

    public function pokemons(): HasManyThrough
    {
        return $this->hasManyThrough(Pokemon::class, Maze::class);
    }
}
