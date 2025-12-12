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
        $pet->breed = 'French Bulldog';
        $pet->location = 'Paris';
        $pet->description = 'Black dog, so charming, lovely';
        $pet->save();

        $pet = new Pet;
        $pet->name = 'Killer';
        $pet->kind = 'Dog';
        $pet->weight = 18;
        $pet->age = 6;
        $pet->breed = 'Canne Corso';
        $pet->location = 'Millan';
        $pet->description = 'Explosive & , be carefully with it, Danger';
        $pet->save();

        $pet = new Pet;
        $pet->name = 'Pistacho';
        $pet->kind = 'Cat';
        $pet->weight = 5;
        $pet->age = 1;
        $pet->breed = 'Mestizo';
        $pet->location = 'Manizales';
        $pet->description = 'Beatifull & , sweet';
        $pet->save();

        $pet = new Pet;
        $pet->name = 'Pipo';
        $pet->kind = 'Pajaro';
        $pet->weight = 2.5;
        $pet->age = 2;
        $pet->breed = 'Guacamayo';
        $pet->location = 'Asia';
        $pet->description = 'Colorido y amigable';
        $pet->save();


    }
}