<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActualitesTable extends Migration
{
    public function up()
    {
        Schema::create('actualites', function (Blueprint $table) {
            $table->id(); // Identifiant unique
            $table->string('titre'); // Titre
            $table->text('contenu'); // Contenu
            $table->date('date_publication'); // Date de publication
            $table->enum('type_actualite', ['article', 'evenement', 'communique', 'blog']); // Type
            $table->foreignId('auteur_id')->constrained('utilisateurs')->onDelete('cascade'); // Clé étrangère vers utilisateurs
            $table->timestamps(); // created_at et updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('actualites');
    }
}


