<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        
        return response()->json($users);
    }

    public function getCurrentUser(Request $request)
    {
        $user = $request->user();

        return response()->json($user);
    }
}
