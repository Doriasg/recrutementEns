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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('sexe')->nullable();
            $table-> string('photo_url');
            $table->date('date_naissance')->nullable();
            $table->string('lieu_naissance')->nullable();
            $table->string('telephone')->unique()->nullable();
            $table->string('adresse')->nullable();
            $table-> string('diplome')->nullable();
            $table->string('email')->unique();
            $table->string('password', 255);
            $table->foreignId('role_id')->constrained('role')->cascadeOnDelete()->default('null');
            $table->timestamps();
        });
    }
   
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
