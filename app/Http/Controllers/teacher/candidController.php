<?php

namespace App\Http\Controllers\teacher;
use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function Ramsey\Uuid\v1;

class candidController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return view('pages.teacher.candidatures');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $offreId = request()->route('id');
        $user = Auth::user();
        $user_candidatures = Category::where('type', 'candidature')
            ->where('user_id', $user->id)
            ->where('parent1_id', $offreId)
            ->first();
        return view('pages.teacher.formulaire-candidature', compact('offreId', 'user_candidatures'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $offreId)
    {
        //
         $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'sexe'            => 'required|string|max:10',
            'date_naissance'  => 'required|date',
            'contact'         => 'required|string|max:20',
            'email'           => 'required|email|max:255',
            'cv'              => 'required|file|mimes:pdf,doc,docx|max:2048',
            'attestation'     => 'required|file|mimes:pdf,doc,docx|max:2048',
            'diplome'         => 'required|file|mimes:pdf,doc,docx|max:2048',
            'demande'         => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        Category::create([
            'type'         => 'candidature',
            'user_id'      => Auth::id(),
            'parent_id'    => $offreId, // lien avec candidature
            'name'         => $validated['name'],
            'sexe'         => $validated['sexe'],
            'date_naissance'=> $validated['date_naissance'],
            'contact'      => $validated['contact'],
            'email'        => $validated['email'],
            'cv'           => $request->file('cv')->store('dossiers', 'public'),
            'attestation'  => $request->file('attestation')->store('dossiers', 'public'),
            'diplome'      => $request->file('diplome')->store('dossiers', 'public'),
            'demande'      => $request->file('demande')->store('dossiers', 'public'),
            'status'       => 'soumis',
            'module_id'    => 2,
        ]);
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
