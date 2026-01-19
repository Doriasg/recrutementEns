<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidatures extends Model
{
    //
    protected $fillable = [
    'user_id',
    'ue_id',
    'appel_id',
    'vue',
    'statut',
    'decision',
];
    public function appels(){
        return $this->belongsTo(Appel::class);
    }
}
