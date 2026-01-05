<?php

namespace App\Http\Controllers\gestionnaire;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $users = User::all();
        $user = Auth::user(); 
        $role = $user->role->name ?? null;
        return view('pages.gestionnaire.users', compact('user', 'role', 'users'));
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

    // Valide que 'role' est présent
    $validated = $request->validate([
        'role_id' => 'required|required|exists:roles,id', // vérifie que le nom existe dans roles
    ]);

    // Met à jour l'utilisateur
    $user->update([
        'role_id' => $validated['role_id'],
    ]);

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
