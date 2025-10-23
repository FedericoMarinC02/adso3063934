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
        $pet = new pet;
        $pet->name        = 'Firulais';
        $pet->Kind        = 'Dog';
        $pet->weight      = 7.6;
        $pet->age         = 2;
        $pet->breed       = 'French Bulldog';
        $pet->location    = 'Paris';
        $pet->description = 'Black dog, so charming, lovely.';
        $pet->save();

        $pet = new pet;
        $pet->name        = 'Killer';
        $pet->Kind        = 'Dog';
        $pet->weight      = 18;
        $pet->age         = 6;
        $pet->breed       = 'Cane Corso';
        $pet->location    = 'Milan';
        $pet->description = 'Explosive & Hungry, be carefully with it, Danger.';
        $pet->save();

        $pet = new pet;
        $pet->name        = 'Pato';
        $pet->Kind        = 'Pig';
        $pet->weight      = 30;
        $pet->age         = 4;
        $pet->breed       = 'Mini Pig';
        $pet->location    = 'Colombia';
        $pet->description = 'Fat, Little, cute.';
        $pet->save();

        $pet = new pet;
        $pet->name        = 'Michifus';
        $pet->Kind        = 'Cat';
        $pet->weight      = 6;
        $pet->age         = 2;
        $pet->breed       = 'sphinx';
        $pet->location    = 'sphinx';
        $pet->description = 'majestic, tender, playful, calm.';
        $pet->save();
        
    }
}
