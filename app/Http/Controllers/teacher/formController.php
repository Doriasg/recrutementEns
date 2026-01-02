<?php

namespace App\Http\Controllers\teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class formController extends Controller
{
    //
    public function index() {
        return view('pages.teacher.formulaire-candidature');
    }
}
