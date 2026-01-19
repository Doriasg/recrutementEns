<?php

namespace App\Http\Controllers;
use App\Models\AnneeAcademique;

use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
         $annee = AnneeAcademique::where('active', 1)-> first();
         $message = "";
        if(!$annee){
            $message = 'Aucune année académique en cours';
        }
        $user = Auth::user(); 
        $role = $user->role->name;
        if ($role === 'administrateur') {
            return view('pages.admin.dashboard', compact('annee', 'message'));
        } elseif ($role === 'Evaluateur') {
            return view('pages.examiner.dashboard', compact('annee', 'message'));
        } elseif ($role === 'Super administrateur') {
            return view('pages.gestionnaire.dashboard', compact('annee', 'message'));;
        }
        elseif ($role === 'user') {
            return view('pages.teacher.dashboard', compact('annee', 'message'));
        }
        print('Nous ne pouvons pas accéder à cette page');
    }
    
}
