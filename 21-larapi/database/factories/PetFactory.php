<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pet>
 */
class PetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $petNames = [
            'Luna', 'Bella', 'Charlie', 'Lucy', 'Daisy', 'Max', 'Rosie', 'Lola',
            'Lily', 'Leo', 'Stella', 'Cooper', 'Bailey', 'Oliver', 'Milo', 'Buddy',
            'Sadie', 'Penny', 'Coco', 'Sophie', 'Olive', 'Ruby', 'Ollie', 'Molly',
            'Pepper', 'Willow', 'Gracie', 'Scout', 'Maggie', 'Jack', 'Finn', 'Chloe',
            'Frankie', 'Poppy', 'Gus', 'Nala', 'Teddy', 'Ziggy', 'Ginger', 'Loki',
            'Piper', 'Lulu', 'Bear', 'Ellie', 'Rocky', 'Louie', 'Jasper', 'Winston',
            'Tucker', 'Cleo', 'Duke', 'Harley', 'Zeus', 'Blue', 'Koda', 'Toby',
            'Bentley', 'Jax', 'Kobe', 'Ace', 'Apollo', 'Shadow', 'Bruno', 'Moose',
            'Murphy', 'Marley', 'Archie', 'Hank', 'Thor', 'Benji', 'Simba', 'Bandit',
            'Dexter', 'King', 'Diesel', 'Beau', 'Maverick', 'Cash', 'Henry', 'Mia',
            'Riley', 'Roxy', 'Nova', 'Honey', 'Lady', 'Lucky', 'Princess', 'Winnie',
            'Maya', 'Dixie', 'Athena', 'Zoe', 'Layla', 'Remi', 'Lexi', 'Sasha', 'Oakley'

        ];

        $dogBreeds = [
            "Labrador Retriever",
            "French Bulldog",
            "German Shepherd",
            "Golden Retriever",
            "Poodle",
            "Bulldog",
            "Beagle",
            "Rottweiler",
            "Siberian Husky",
            "Chihuahua"
        ];
        $catBreeds = [
            "Persian",
            "Siamese",
            "Maine Coon",
            "British Shorthair",
            "Bengal",
            "Sphynx",
            "Ragdoll",
            "Scottish Fold",
            "Abyssinian",
            "Russian Blue"
        ];

        $kind = fake()->randomElement(['Dog', 'Cat', 'Pig', 'Bird']);
        switch ($kind) {
            case 'Dog':
                $breed = fake()->randomElement($dogBreeds);
                break;
            case 'Cat':
                $breed = fake()->randomElement($catBreeds);
                break;
            case 'Pig':
                $breed = fake()->randomElement(['Large White','Duroc','Landrace']);
                break;
            default:
                $breed = fake()->word();
                break;
        }

        return [
            'name'        => fake()->randomElement($petNames),
            'kind'        => $kind,
            'weight'      => (float) fake()->randomFloat(1, 1, 40),
            'age'         => fake()->numberBetween(0, 15),
            'breed'       => $breed,
            'location'    => fake()->city(),
            'description' => fake()->sentence(8),
            'active'      => fake()->boolean(80),
            'status'      => fake()->randomElement(['available','adopted','pending'])
        ];
    }
}
