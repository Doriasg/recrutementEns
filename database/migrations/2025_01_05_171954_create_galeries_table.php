<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGaleriesTable extends Migration
{
    public function up()
    {
        Schema::create('galeries', function (Blueprint $table) {
            $table->id(); // Identifiant unique
            $table->string('album_nom'); // Nom de l'album
            $table->foreignId('categorie_id')->nullable()->constrained('categories_galeries')->onDelete('set null'); // Catégorie
            $table->foreignId('sous_album_id')->nullable()->constrained('galeries')->onDelete('cascade'); // Sous-album
            $table->enum('type', ['actualite', 'entreprise', 'autre']); // Type
            $table->timestamps(); // created_at et updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('galeries');
    }
}
