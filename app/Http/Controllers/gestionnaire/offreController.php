<?php

namespace App\Http\Controllers\gestionnaire;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\AnneeAcademique;
use Illuminate\Http\Request;
use App\Models\Appel;
use App\Models\User;
use App\Models\Candidatures;
use Illuminate\Support\Facades\Auth;

class OffreController extends Controller
{
    /* =======================
       OFFRES
    ======================== */

    public function index()
    {
        $annee = AnneeAcademique::where('active', 1);
        $offres = Appel::all();
        $date_actuelle = now();
        return view('pages.gestionnaire.offres', compact('offres', 'annee', 'date_actuelle'));
    }

    public function create()
    {
        $annees = AnneeAcademique::all();
        $semestres = Category::where('type', 'semestre')->get();
        return view('pages.gestionnaire.add_offre', compact('annees', 'semestres'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'annee_id'        => 'required|int',
            'semestre_id'        => 'required|int',
            'description' => 'nullable|string',
            'date_fin'    => 'required|date',
            'fichier_url' => 'required|file|mimes:pdf,doc,docx|max:2048',
            
        ]);

        $filePath = $request->file('fichier_url')->store('offres', 'public');

        Appel::create([
            'title'        => $validated['title'],
            'description' => $validated['description'],
            'semestre_id'  => $validated['semestre_id'],
            'annee_id' => $validated['annee_id'],
            'fichier_url' => $filePath,
            'date_debut'  => now(),
            'date_fin'    => $validated['date_fin'],
            
           
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
        $ues = Category::where('type', 'ue')->get();
        $appel = Appel::findOrFail($id); // Récupère l'offre
        return view('pages.teacher.formulaire-candidature', compact('appel', 'ues'));
    }

    // Soumission du formulaire
  public function storeCandidature(Request $request, $id)
{
    // Validation
    $validated = $request->validate([
        'nom' => 'required|string',
        'prenom' => 'required|string',
        'sexe' => 'required|in:M,F',
        'photo_url' => 'required|image',
        'date_naissance' => 'required|date',
        'lieu_naissance' => 'required|string',
        'telephone' => 'required|string',
        'adresse' => 'required|string',
        'email' => 'required|email',
        'diplome' => 'required|file',
        'ifu' => 'required|string',
        'ue_id' => 'required|exists:categories,id',
        'cv' => 'required|file',
    ]);

    // Stockage des fichiers
    $photoPath = $request->file('photo_url')->store('photos');
    $diplomePath = $request->file('diplome')->store('diplomes');
    $cv = $request->file('cv')->store('cvs');

    // Création de la candidature
    Candidatures::create([
    'user_id' => auth::user()->id,
    'appel_id'=> $id, // <-- juste l'ID, pas l'objet entier
    'ue_id' => $validated['ue_id'],
    'nom' => $validated['nom'],
    'vue' => 0,
    'statut' => 'En attente',
]);

    return redirect()->route('dashboard.enseignant')->with('success', 'Candidature soumise avec succès !');
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