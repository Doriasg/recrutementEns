<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appel extends Model
{
    //
    protected $fillable = [
        'title',
        'description',
        'annee_id',
        'semestre_id',
        'fichier_url',
        'visible',
        'created_at',
        'updated_at',
    ];
}
