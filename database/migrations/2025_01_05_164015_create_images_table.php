<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImagesTable extends Migration
{
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id(); // Identifiant unique
            $table->string('url'); // URL ou chemin de l'image
            $table->string('titre')->nullable(); // Titre ou légende de l'image
            $table->text('description')->nullable(); // Description
            $table->date('date_ajout')->useCurrent(); // Date d'ajout
            $table->enum('type_image', ['actualite', 'entreprise', 'autre'])->nullable(); // Type d'utilisation
            $table->timestamps(); // created_at et updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('images');
    }
}
