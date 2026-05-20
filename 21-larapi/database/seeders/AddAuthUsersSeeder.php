<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AddAuthUsersSeeder extends Seeder
{
    /**
     * Run the database seeds - Solo agrega usuarios sin borrar nada
     */
    public function run(): void
    {
        // Crear usuario administrador solo si no existe
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'document' => '1111111111',
                'fullname' => 'Administrador',
                'gender' => 'M',
                'birthdate' => '1990-01-01',
                'photo' => '',
                'phone' => '3001234567',
                'password' => bcrypt('password123'),
                'active' => true,
                'role' => 'administrador',
            ]
        );

        // Crear usuario customer solo si no existe
        User::firstOrCreate(
            ['email' => 'customer@example.com'],
            [
                'document' => '2222222222',
                'fullname' => 'Cliente Normal',
                'gender' => 'F',
                'birthdate' => '1995-05-15',
                'photo' => '',
                'phone' => '3009876543',
                'password' => bcrypt('password123'),
                'active' => true,
                'role' => 'customer',
            ]
        );
    }
}
