<?php

namespace App\Http\Controllers;

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

    public function save(Request $request)
    {
        $data = $request->all();

        $user = User::create($data);

        return response()->json($user, 201);
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
}
