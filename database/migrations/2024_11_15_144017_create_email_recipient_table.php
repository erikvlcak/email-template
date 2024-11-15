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
        Schema::create('email_recipient', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('email_id');
            $table->unsignedBigInteger('recipient_id');
            $table->timestamps();

            // Define foreign key constraints
            $table->foreign('email_id')->references('id')->on('emails')->onDelete('cascade');
            $table->foreign('recipient_id')->references('id')->on('recipients')->onDelete('cascade');

            // Define unique constraints
            $table->unique(['email_id', 'recipient_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_recipient');
    }
};
