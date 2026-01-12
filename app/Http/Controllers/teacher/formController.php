<?php

namespace App\Http\Controllers\teacher;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class formController extends Controller
{
    //
    public function index(string $id)
{
    $candidature = Category::findOrFail($id);
    $categorie = Category::findOrFail($candidature->parent_id); // offre

    return view(
        'pages.teacher.formulaire-candidature',
        compact('candidature', 'categorie')
    );
}

}