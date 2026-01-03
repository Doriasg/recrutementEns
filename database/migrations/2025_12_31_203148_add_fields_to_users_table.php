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
        Schema::table('users', function (Blueprint $table) {
            $table->string('status')->nullable()->after('password');
            $table->string('photo_url')->nullable()->after('status');
            $table->string('sexe')->nullable()->after('photo_url');
            $table->string('nom')->nullable()->after('sexe');
            $table->string('prenoms')->nullable()->after('nom');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'status',
                'photo_url',
                'sexe',
                'nom',
                'prenoms',
            ]);
        });
    }
};
