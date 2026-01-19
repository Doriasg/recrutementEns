<?php

namespace App\Http\Controllers\gestionnaire;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Appel;
use App\Models\Category;
use App\Models\AnneeAcademique;
use App\Models\Candidatures;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class DashboardgestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = Auth::user();
        $annee = AnneeAcademique::where('active', 1)-> first();
        if(!$annee){
            $message = 'Aucune année académique en cours';
        }
        //on récupère tous les utilisateurs et les appels
        $users = User::all();
        $appels = Appel::with('candidatures')->get();
        $candidatures = Candidatures::all();

        return view('pages.gestionnaire.dashbord', compact('users', 'user', 'appels', 'candidatures','annee'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
