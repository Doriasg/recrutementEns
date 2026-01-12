<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class homeController extends Controller
{
    //
    // Dans votre contrôleur qui affiche les offres
public function index()
{

    $offres = Category::where('type', 'offre')
                     ->where('status', 'active')
                     ->get();
    
    return view('pages.public.home', compact('offres'));
}
}
