<?php

namespace App\Http\Controllers\gestionnaire;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;

class add_roleController extends Controller
{
    // 
    public function index(String $id)
    {
        $user = User::findOrFail($id);
        $role = $user->role->name ?? null;
        $roles = Role::all();
        return view('pages.gestionnaire.edit_user', compact('user', 'role', 'roles'));
    }
}
