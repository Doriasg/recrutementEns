<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActualitesImagesTable extends Migration
{
    public function up()
    {
        Schema::create('actualites_images', function (Blueprint $table) {
            $table->id(); // Identifiant unique
            $table->foreignId('actualite_id')->constrained('actualites')->onDelete('cascade'); // Clé étrangère vers Actualites
            $table->foreignId('image_id')->constrained('images')->onDelete('cascade'); // Clé étrangère vers Images
            $table->timestamps(); // created_at et updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('actualites_images');
    }
}
