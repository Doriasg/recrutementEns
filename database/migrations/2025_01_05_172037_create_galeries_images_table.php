<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGaleriesImagesTable extends Migration
{
    public function up()
    {
        Schema::create('galeries_images', function (Blueprint $table) {
            $table->id(); // Identifiant unique
            $table->foreignId('galerie_id')->constrained('galeries')->onDelete('cascade'); // Clé étrangère vers Galeries
            $table->foreignId('image_id')->constrained('images')->onDelete('cascade'); // Clé étrangère vers Images
            $table->timestamps(); // created_at et updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('galeries_images');
    }
}
