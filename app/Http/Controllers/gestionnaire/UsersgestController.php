<?php

namespace App\Http\Controllers\gestionnaire;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\AnneeAcademique;
use App\Models\User;
use App\Models\Role;

class UsersgestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $annee = AnneeAcademique::where('active', 1)->first();
        if (!$annee) {
            $message = 'Aucune année académique en cours';
        }
        $users = User::all();
        $user = Auth::user();
        $role = $user->role->name ?? null;
        return view('pages.gestionnaire.users', compact('user', 'role', 'users', 'annee'));
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
        $user = User::findOrFail($id);
        $role = $user->role->name ?? null;
        return view('pages.gestionnaire.show_user', compact('user', 'role'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id, Request $request)
    {
        //
        $roles = Role::all();
        $user = User::findOrFail($id); // récupère l'utilisateur
        return view('pages.gestionnaire.edit_user', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    // Validation
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'sexe' => 'nullable|string|in:Masculin,Féminin',
        'photo_url' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        'date_naissance' => 'nullable|date',
        'lieu_naissance' => 'nullable|string|max:255',
        'telephone' => 'nullable|string|max:20',
        'adresse' => 'nullable|string|max:255',
        'diplome' => 'nullable|string|max:255',
        'email' => 'required|email|max:255',
        'role_id' => 'required|exists:roles,id',
    ]);

    // Si un fichier photo est uploadé, on le traite
    if ($request->hasFile('photo_url')) {
        $file = $request->file('photo_url');
        $filename = time().'_'.$file->getClientOriginalName();
        $path = $file->storeAs('public/photos', $filename); // stocke dans storage/app/public/photos
        $validated['photo_url'] = '/storage/photos/'.$filename;
    } else {
        unset($validated['photo_url']); // pour éviter d'écraser la photo existante
    }

    // Met à jour l'utilisateur
    $user->update($validated);

    return redirect()
        ->route('users.gestionnaire', $user->id)
        ->with('success', 'Utilisateur mis à jour avec succès.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
