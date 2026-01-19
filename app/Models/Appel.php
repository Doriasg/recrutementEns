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
        'date_fin',
        'created_at',
        'updated_at',
    ];
    public function candidatures(){
        return $this->hasMany(Candidatures::class);
    }
    public function annee(){
        return $this->belongsTo(AnneeAcademique::class);
    }
}
