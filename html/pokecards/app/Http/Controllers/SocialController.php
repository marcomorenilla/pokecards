<?php

namespace App\Http\Controllers;

use App\Models\Maze;
use App\Models\Social;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class SocialController extends Controller
{
    public function render()
    {
        @unlink(storage_path('/logs/poke.log'));
        //$usersWithMazes = User::with('mazes.pokemons.types')->get();
        $usersWithMazes = User::with(['mazes' => function ($query) {
            $query->withCount(['likes', 'dislikes'])
                ->with('pokemons.types');
        }])->get();
        $liked = Social::where('user_id', Auth::id())->get();
        return Inertia::render('social', ['reacted' => $liked, 'users_mazes' => $usersWithMazes]);
    }

    public function toggleLikeReaction(Request $request)
    {
        @unlink(storage_path('/logs/poke.log'));
        $userId = Auth::id();
        $mazeId = $request->input('maze_id');
        $newReaction = (int) $request->input('reaction');

        $existingReaction = Social::where('user_id', $userId)
            ->where('maze_id', $mazeId)
            ->first();
        Log::channel('custom')->info('existing reaction', [$existingReaction]);
        if ($existingReaction) {
            if ($existingReaction->reaction == $newReaction) {
                $existingReaction->delete();
            } else {
                $existingReaction->update(['reaction' => $newReaction]);
            }
        } else {
            Social::create([
                'user_id'  => $userId,
                'maze_id'  => $mazeId,
                'reaction' => $newReaction,
                'count'    => 1
            ]);
        }

        return back();
    }
}
