<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Contracts\EventDispatcher\Event;

class UserController extends Controller
{
    public function view()
    {
        $users = User::all();
        return response()->json($users, 201);
    }

    public function show()
    {
        return Inertia::render('index', [
            'allUsers' => User::all(),
        ]);
    }

    public function create(Request $request)
    {
        $data = $request->all();

        $user = User::create($data);

        return redirect('/auth');
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials, true)) {
            $request->session()->regenerate();

            return redirect('/');
        }

        return Inertia::render('error', [
            'status' => 401
        ]);
    }

    public function addCoins(Request $request)
    {
        $coins = $request->coins;

        $user = User::findOrfail(Auth::id());
        $user->increment('coins', $coins);

        return back()->with('Message', 'Monedas recargadas');
    }
}
