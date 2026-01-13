<?php

namespace App\Http\Controllers\gestionnaire;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OffreController extends Controller
{
    /* =======================
       OFFRES
    ======================== */

    public function index()
    {
        $offres = Category::where('type', 'offre')->get();
        return view('pages.gestionnaire.offres', compact('offres'));
    }

    public function create()
    {
        return view('pages.gestionnaire.add_offre');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string',
            'date_fin'    => 'required|date',
            'fichier_url' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $filePath = $request->file('fichier_url')->store('offres', 'public');

        Category::create([
            'type'        => 'offre',
            'name'        => $validated['name'],
            'description' => $validated['description'],
            'fichier_url' => $filePath,
            'date_debut'  => now(),
            'date_fin'    => $validated['date_fin'],
            'module_id'   => 2,
            'status'      => now()->gt($validated['date_fin']) ? 'expirée' : 'active',
        ]);

        return redirect()->route('offres.gestionnaire')
            ->with('success', 'Offre créée avec succès.');
    }

    public function edit(string $id)
    {
        $offre = Category::findOrFail($id);
        return view('pages.gestionnaire.edit_offre', compact('offre'));
    }

    public function update(Request $request, string $id)
    {
        $offre = Category::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string',
            'date_fin'    => 'required|date',
            'fichier_url' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        if ($request->hasFile('fichier_url')) {
            $offre->fichier_url = $request->file('fichier_url')->store('offres', 'public');
        }

        $offre->update([
            'name'        => $validated['name'],
            'description' => $validated['description'],
            'date_fin'    => $validated['date_fin'],
        ]);

        return redirect()->route('offres.gestionnaire')
            ->with('success', 'Offre mise à jour avec succès.');
    }

    public function destroy(string $id)
    {
        Category::findOrFail($id)->delete();
        return back()->with('success', 'Offre supprimée.');
    }

    /* =======================
       CANDIDATURE
    ======================== */
// Affichage du formulaire
 public function createCandidature(string $id)
    {
        $offre = Category::findOrFail($id); // Récupère l'offre
        return view('pages.teacher.formulaire-candidature', compact('offre'));
    }

    // Soumission du formulaire
    public function storeCandidature(Request $request, string $id)
    {
        // Validation des champs
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sexe' => 'required|string|max:10',
            'date_naissance' => 'required|date',
            'contact' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'attestation' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'diplome' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'demande' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        // Vérifier que l'offre existe
        $offre = Category::findOrFail($id);

        // Préparer les fichiers
        $cv = $request->hasFile('cv') ? $request->file('cv')->store('dossiers', 'public') : null;
        $attestation = $request->hasFile('attestation') ? $request->file('attestation')->store('dossiers', 'public') : null;
        $diplome = $request->hasFile('diplome') ? $request->file('diplome')->store('dossiers', 'public') : null;
        $demande = $request->hasFile('demande') ? $request->file('demande')->store('dossiers', 'public') : null;

        // Créer la candidature
        $candidature = Category::create([
            'type' => 'candidature',
            'user_id' => Auth::id(),
            'parent1_id' => $offre->id, 
            'name' => $validated['name'],
            'cv' => $cv,
            'attestion' => $attestation, // attention : dans ton model tu as 'attestion' avec un seul "t"
            'diplome' => $diplome,
            'demande' => $demande,
            'status' => 'en attente',
            'module_id' => 2, // Module pour les enseignants
        ]);

        return redirect()->route('dashboard.enseignant')
            ->with('success', 'Candidature soumise avec succès.');
    }
    public function show_candidature(string $id){
$candidature = Category::FindOrFail($id);
return view ("pages.examiner.show_candidature", compact("candidature"));
    }
    public function validate_candidature(string $id){
$candidature = Category::FindOrFail($id);
$candidature->status = 'validée';
$candidature->save();
return back()->with('success', 'Candidature validée avec succès.');
    }
    public function reject_candidature(string $id){
        $candidature = Category::FindOrFail($id);
        $candidature->status = 'rejetée';
        $candidature->save();
        return back()->with('success', 'Candidature rejetée avec succès.'); 
    }
}