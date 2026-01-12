<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        
        $user = Auth::user(); 
        $role = $user->role->name;
        if ($role === 'administrateur') {
            return redirect()->route('dashboard.administrateur');
        } elseif ($role === 'evaluateur') {
            return redirect()->route('dashboard.evaluateur');
        } elseif ($role === 'gestionnaire') {
            return redirect()->route('dashboard.gestionnaire');
        }
        elseif ($role === 'enseignant') {
            return redirect()->route('dashboard.enseignant');
        }
        print('Nou ne pouvons pas accéder à cette page');
    }
    
}
