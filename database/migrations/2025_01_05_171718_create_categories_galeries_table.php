<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesGaleriesTable extends Migration
{
    public function up()
    {
        Schema::create('categories_galeries', function (Blueprint $table) {
            $table->id(); // Identifiant unique
            $table->string('nom'); // Nom de la catégorie
            $table->text('description')->nullable(); // Description de la catégorie
            $table->timestamps(); // created_at et updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('categories_galeries');
    }
}
