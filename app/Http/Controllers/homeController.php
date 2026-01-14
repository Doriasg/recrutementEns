<?php

namespace App\Http\Controllers;
use App\Models\AnneeAcademique;
use App\Models\Appel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class homeController extends Controller
{
    //
    // Dans votre contrôleur qui affiche les offres
public function index()
{
    //on reupère lannee académique en cours
    $annee = AnneeAcademique::where('active', 1)-> first();
    //on retourne l apage d'accueil s'il y a une année académique en cours. Sinon on renvoie un message
    if($annee){
        $today_date = now();
        $appels = Appel::where('date_limite', '>', $today_date)->get();
        return view('pages.public.home', compact('annee', 'appels'));
    }
    else{
        $message = 'Aucune année académique en cours';
        return view('erreur', compact('message'));
    }
    
}
}
