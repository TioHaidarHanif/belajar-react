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
        Schema::create('tutorials', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('feature')->nullable(); // Which feature this tutorial is for
            $table->string('target_user_type')->nullable(); // new, regular, admin, etc.
            $table->integer('order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->boolean('can_be_skipped')->default(true);
            $table->timestamps();
        });
        
        Schema::create('tutorial_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tutorial_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('content');
            $table->string('image')->nullable();
            $table->string('video_url')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
        
        Schema::create('user_tutorial_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('tutorial_id')->constrained()->onDelete('cascade');
            $table->foreignId('last_completed_step_id')->nullable()->constrained('tutorial_steps')->nullOnDelete();
            $table->boolean('is_completed')->default(false);
            $table->boolean('is_skipped')->default(false);
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'tutorial_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_tutorial_progress');
        Schema::dropIfExists('tutorial_steps');
        Schema::dropIfExists('tutorials');
    }
};
