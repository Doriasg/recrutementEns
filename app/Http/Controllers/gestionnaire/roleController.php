<?php

namespace App\Http\Controllers\gestionnaire;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;

class roleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $roles = Role::all();
        return view('pages.gestionnaire.roles', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('pages.gestionnaire.create_role');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'permissions' => 'nullable|string',
            'taches' => 'nullable|string',
        ]);
        Role::create($validated);
        return redirect()->route('role.gestionnaire')->with('success', 'Rôle créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $role = Role::findOrFail($id);
        return view('pages.gestionnaire.show_role', compact('role'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        return view('pages.gestionnaire.edit_role');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'permissions' => 'nullable|string',
            'taches' => 'nullable|string',
        ]);
        $role = Role::findOrFail($id);
        $role->update($validated);
        return redirect()->route('role.gestionnaire')->with('success', 'Rôle mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $role = Role::findOrFail($id);
        $role->delete();
        return redirect()->route('role.gestionnaire')->with('success', 'Rôle supprimé avec succès.');
    }
}
