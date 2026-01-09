<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;

class homeController extends Controller
{
    //
    public function index() {
        $offres = Category::where('type', 'offre')->get();
        return view('pages.public.home', compact('offres'));
    }
}
