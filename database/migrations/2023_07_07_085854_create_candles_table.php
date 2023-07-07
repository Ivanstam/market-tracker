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
        // For simplicity sake just use the close values
        // TODO: Implement high, low, open and volume
        Schema::create('candles', function (Blueprint $table) {
            $table->id();
            // Remove the candle table as well when it's parent is deleted
            $table->foreignId('stock_id')->constrained()->onDelete('cascade');
            $table->date('date')->nullable();
            $table->double('close')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candles');
    }
};
