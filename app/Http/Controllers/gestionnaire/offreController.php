<?php

namespace App\Http\Controllers\gestionnaire;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use  App\Models\Category;
use Illuminate\Http\Request;

class offreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $offres = Category::where('type', 'offre')->get();
        return view('pages.gestionnaire.offres', compact('offres'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    return view('pages.gestionnaire.add_offre');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'date_fin' => 'required|date',
            'fichier_url' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);
        $file_path = $request->file('fichier_url')->store('images', 'public');
        Category::create([
            'type'        => 'offre',
            'name'        => $validated['name'],
            'description' => $validated['description'],
            'fichier_url' => $file_path,
            'date_debut'  => now(),
            'date_fin'    => $validated['date_fin'] ?? null,
            'module_id'   => 2 ,
            'status'      => $validated['date_fin'] && $validated['date_fin'] < now() ? 'expirée' : 'active',
            
        ]);
        return redirect()->route('offres.gestionnaire')->with('success', 'Offre créée avec succès.');

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
        $offre = Category::findOrFail($id);
        return view('pages.gestionnaire.edit_offre', compact('offre'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'date_fin' => 'required|date',
            'fichier_url' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);
        $file_path = $request->file('fichier_url')->store('images', 'public');
        $offre = Category::findOrFail($id);
        $offre->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'date_fin' => $validated['date_fin'] ?? null,
            'fichier_url' => $file_path,
        ]);
        return redirect()->route('offres.gestionnaire')->with('success', 'Offre mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $offre = Category::findOrFail($id);
        $offre->delete();
        return redirect()->route('offres.gestionnaire')->with('success', 'Offre supprimée avec succès.');
    }
}
