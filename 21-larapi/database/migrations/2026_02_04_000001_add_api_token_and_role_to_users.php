<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations - Agrega columnas faltantes sin afectar datos
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Agrega api_token solo si no existe
            if (!Schema::hasColumn('users', 'api_token')) {
                $table->string('api_token', 60)->nullable()->unique()->after('remember_token');
            }
            
            // Agrega role solo si no existe
            if (!Schema::hasColumn('users', 'role')) {
                $table->enum('role', ['administrador', 'customer'])->default('customer')->after('password');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'api_token')) {
                $table->dropColumn('api_token');
            }
            if (Schema::hasColumn('users', 'role')) {
                $table->dropColumn('role');
            }
        });
    }
};
