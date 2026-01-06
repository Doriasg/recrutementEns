<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'nom',
        'description',
    ];

    // Relation avec les statistiques
   /* public function statistiques()
    {
        return $this->hasMany(StatistiqueModule::class, 'module_id');
    }

    // Relation avec les domaines
    public function domaines()
    {
        return $this->hasMany(Domaine::class, 'module_id');
    }

    // Relation avec les projets
    public function projets()
    {
        return $this->hasMany(Projet::class, 'module_id');
    }

    // Relation avec les entreprises
    public function entreprises()
    {
        return $this->hasMany(Entreprise::class, 'module_id');
    }

    // Relation avec les partenaires
    public function partenaires()
    {
        return $this->hasMany(Partenaire::class, 'module_id');
    }*/
    public function categories(){
        return $this->hasMany(Category::class, 'module_id');
    }
}