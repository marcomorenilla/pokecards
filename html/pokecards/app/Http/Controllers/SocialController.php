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
        $usersWithMazes = User::with('mazes.pokemons.types')->get();
        $liked = Social::where('user_id', Auth::id())->get();
        return Inertia::render('social', ['reacted' => $liked, 'users_mazes' => $usersWithMazes]);
    }
    public function toggleLikeReaction(Request $request)
    {
        @unlink(storage_path('logs/poke.log'));
        $userId =  Auth::id();
        $mazeId = $request->input('maze_id');
        $reaction = $request->input('reaction');

        Log::channel('custom')->info('request', [$request->all()]);

        $exists = Social::where('user_id', $userId)->where('maze_id', $mazeId)->where('reaction', $reaction)->first();
        Log::channel('custom')->info('exists', [$exists]);

        if ($exists) {
            $exists->delete();
        } else {
            Social::create([
                'user_id' => $userId,
                'maze_id' => $mazeId,
                'reaction' => $reaction,
                'count' => 1
            ]);
        }

        return back();
    }
}
