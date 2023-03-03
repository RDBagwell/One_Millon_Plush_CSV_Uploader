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
        Schema::create('csv_uploads', function (Blueprint $table) {
            $table->id();
            $table->string("time_ref")->default("");
            $table->string("account")->default("");
            $table->string("code")->default("");
            $table->string("country_code")->default("");
            $table->string("product_type")->default("");
            $table->string("value")->default("");
            $table->string("status")->default("");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('csv_uploads');
    }
};
