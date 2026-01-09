<?php

namespace App\Http\Controllers\gestionnaire;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Category;


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
        $users = User::all();
        $offres = Category::where('type', 'offre')->get();
        $role = $user->role->name ?? null;

        return view('pages.gestionnaire.dashbord', compact('user', 'role', 'users', 'offres'));
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
