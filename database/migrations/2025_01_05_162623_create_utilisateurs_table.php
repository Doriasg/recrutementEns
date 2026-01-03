<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUtilisateursTable extends Migration
{
    public function up()
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id(); // Identifiant unique
            $table->string('nom'); // Nom complet
            $table->string('email')->unique(); // Email unique
            $table->string('mot_de_passe'); // Mot de passe
            $table->timestamp('date_inscription')->useCurrent(); // Date d'inscription
            $table->timestamp('dernière_connexion')->nullable(); // Dernière connexion
            $table->timestamps(); // created_at et updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('utilisateurs');
    }
}
