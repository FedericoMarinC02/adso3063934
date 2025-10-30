<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pet;

class PetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pet = new Pet;
        $pet->name = 'Firulais';
        $pet->kind = 'Dog';
        $pet->weight = 7.6;
        $pet->age = 2;
        $pet->breed = 'French bulldog';
        $pet->location = 'Paris';
        $pet->description = 'Black dog, so charming, lovely';
        $pet->save();

        $pet = new Pet;
        $pet->name = 'Killer';
        $pet->kind = 'Dog';
        $pet->weight = 18;
        $pet->age = 6;
        $pet->breed = 'Cane Corso';
        $pet->location = 'Milan';
        $pet->description = 'Explosive & be careful with it, Danger';
        $pet->save();

        $pet = new Pet;
        $pet->name = 'George';
        $pet->kind = 'Pig';
        $pet->weight = 30;
        $pet->age = 4;
        $pet->breed = 'Mini pig';
        $pet->location = 'Wembley';
        $pet->description = 'Cute & lovely mini pig, friendly with kids';
        $pet->save();

        $pet = new Pet;
        $pet->name = 'Anubis';
        $pet->kind = 'Cat';
        $pet->weight = 10;
        $pet->age = 3;
        $pet->breed = 'Persa';
        $pet->location = 'Cairo';
        $pet->description = 'Majestic cat, calm and quiet';
        $pet->save();
    }
}
