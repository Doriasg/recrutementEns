<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class AnneeAcademique extends Model
{
    //
    protected $table = 'annee_academique';
    protected $fillable = [
        'name',
        'statut',
    ];
    public function offres(){
        return $this->hasMany(Appel::class);
    }
}
