<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Category;

use Illuminate\Http\Request;

class dossierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $candidat = auth::user();
        return view('pages.teacher.dossier', compact('candidat'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('pages.teacher.formulaire-candidature');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, String $id)
    {
        //
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'sexe' => 'required|string|max:10',
            'date_naissance' => 'required|date',
            'lieu_naissance' => 'required|string|max:255',
            'contact' => 'required|string|max:20',
            'email' => 'required|email|max:255|unique:users,email',
            'adresse' => 'required|string|max:500',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:2048',
            'attestation' => 'required|file|mimes:pdf,doc,docx|max:2048',
            'diplome' => 'required|file|mimes:pdf,doc,docx|max:2048',
            'demande' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);
        // Create new dossier
        Category::create([
            'user_id' => auth::id(),
            'name' => $validatedData['name'],
            'sexe' => $validatedData['sexe'],
            'date_naissance' => $validatedData['date_naissance'],
            'contact' => $validatedData['contact'],
            'email' => $validatedData['email'],
            'adresse' => $validatedData['adresse'],
            'cv' => $request->file('cv')->store('documents', 'public'),
            'attestation' => $request->file('attestation')->store('documents', 'public'),
            'diplome' => $request->file('diplome')->store('documents', 'public'),
            'demande' => $request->file('demande')->store('documents', 'public'),
            'type' => 'dossier',
            'status' => 'submitted',
            'parent1_id' => $id,
        ]);
        return view('pages.teacher.dossier');
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
