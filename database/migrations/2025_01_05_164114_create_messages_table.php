<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id(); // Identifiant unique
            $table->string('nom'); // Nom de l'expéditeur
            $table->string('email'); // Email de l'expéditeur
            $table->text('contenu'); // Contenu du message
            $table->timestamp('date_envoi')->useCurrent(); // Date d'envoi
            $table->timestamps(); // created_at et updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
