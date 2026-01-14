<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('annee')->constrained('annee_academique')->cascadeOnDelete();
            $table->string('title');
            $table->string('description')->nullable();
            $table->unsignedBigInteger('semestre_id');
            $table->string('fichier_url');
            $table-> boolean('visible')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appels');
    }
};
