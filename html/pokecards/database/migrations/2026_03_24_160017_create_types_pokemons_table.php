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
        Schema::create('types_pokemons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pokemons_id')->constrained()->onDelete('cascade');
            $table->foreignId('types_id')->constrained()->onDelete('cascade');
            $table->unique(['pokemons_id', 'types_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('types_pokemons');
    }
};
