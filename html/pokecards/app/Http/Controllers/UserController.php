<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;

use function Symfony\Component\Clock\now;

class UserController extends Controller
{
    public function view()
    {
        $users = User::all();
        return response()->json($users, 201);
    }
    public function store(Request $request)
    {
        $data = $request->all();

        $user = User::create($data);

        return response()->json($user, 201);
    }

    public function authenticate(Request $request)
    {
        $user = User::where('email', $request->email)->first();


        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Las credenciales son incorrectas.'
            ], 401);
        }

        $token = ["user" => $user['email'], "logged_at" => time()];

        return response()->json([
            'user' => $user,
            'acces_token' => Hash::make($token["user"]),
            'logged_at' => $token["logged_at"],
            'message' => '¡Bienvenido de nuevo!'
        ], 200);
    }

    public function authenticate2(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/');
        }

        return back()->withErrors(['email' => 'Datos incorrectos']);
    }
}
