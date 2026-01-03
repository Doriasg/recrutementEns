<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Renommer la table
        if (Schema::hasTable('utilisateurs')) {
            Schema::rename('utilisateurs', 'users');
        }

        // 2. Modifier les colonnes
        Schema::table('users', function (Blueprint $table) {
            
            // Renommer les colonnes
            if (Schema::hasColumn('users', 'nom')) {
                $table->renameColumn('nom', 'name');
            }

            if (Schema::hasColumn('users', 'mot_de_passe')) {
                $table->renameColumn('mot_de_passe', 'password');
            }

            if (Schema::hasColumn('users', 'dernière_connexion')) {
                $table->renameColumn('dernière_connexion', 'last_login_at');
            }
        });
    }

    public function down(): void
    {
        // Revenir en arrière proprement

        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                if (Schema::hasColumn('users', 'name')) {
                    $table->renameColumn('name', 'nom');
                }

                if (Schema::hasColumn('users', 'password')) {
                    $table->renameColumn('password', 'mot_de_passe');
                }

                if (Schema::hasColumn('users', 'created_at')) {
                    $table->renameColumn('created_at', 'date_inscription');
                }

                if (Schema::hasColumn('users', 'last_login_at')) {
                    $table->renameColumn('last_login_at', 'dernière_connexion');
                }
            });

            Schema::rename('users', 'utilisateurs');
        }
    }
};
