<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Pet;

class MassiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 100 additional users (factory generates unique emails)
        User::factory()->count(100)->create();

        // Create 200 pets
        Pet::factory()->count(200)->create();
    }
}
