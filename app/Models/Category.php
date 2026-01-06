<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Module;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'user_id',
        'parent1_id',
        'parent2_id',
        'parent3_id',
        'name',
        'type',
        'description',
        'status',
        'fichier_url',
        'mission',
        'vision',
        'fondateurs',
        'ifu',
        'rib',
        'cv',
        'demande',
        'attestion',
        'diplome',
        'date_debut',
        'date_fin',
        'is_active',
    ];

    // Relation avec le module
    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id');
    }

    // Relation avec le parent1 (peut être une entreprise, un projet, etc.)
    public function parent1()
    {
        return $this->belongsTo(Category::class, 'parent1_id');
    }

    // Relation avec le parent2 (peut être un partenaire, etc.)
    public function parent2()
    {
        return $this->belongsTo(Category::class, 'parent2_id');
    }

    // Relation avec le parent3 (peut être un partenaire, etc.)
    public function parent3()
    {
        return $this->belongsTo(Category::class, 'parent3_id');
    }
}