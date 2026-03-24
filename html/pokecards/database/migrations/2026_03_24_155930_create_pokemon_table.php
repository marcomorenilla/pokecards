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
        Schema::create('pokemons', function (Blueprint $table) {
            $table->id();
            $table->string('number', 4)->unique;
            $table->string('name');
            $table->unsignedInteger('hp');
            $table->unsignedInteger('attack');
            $table->unsignedInteger('defense');
            $table->unsignedInteger('special_attack');
            $table->unsignedInteger('special_defense');
            $table->unsignedInteger('speed');
            $table->integer('weigth');
            $table->integer('height');
            $table->string('description');
            $table->string('main_movement');
            $table->string('secondary_movement');
            $table->string('base_experience');
            $table->string('sprite');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pokemons');
    }
};
