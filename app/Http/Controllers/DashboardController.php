<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user(); 
        $role = $user->role->name ?? null;

        return view('dashboard', compact('user', 'role'));
    }
}
