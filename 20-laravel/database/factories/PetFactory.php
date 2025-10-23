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
            'Luna', 'Max', 'Toby', 'Rocky', 'Sol',
            'Milo', 'Coco', 'Kiara', 'Teo', 'Princesa',
            'Bruno', 'Lola', 'Boby', 'Tommy', 'Príncipe',
            'Lucas', 'Bambú', 'Maya', 'Nala', 'Zeus',
            'Negro', 'Negra', 'Blanco', 'Blanca', 'Canela',
            'Manchas', 'Pelusa', 'Chiqui', 'Gordo', 'Gordita',
            'Flaco', 'Pecas', 'Oso', 'Tigre', 'Muñeca',
            'Gatito', 'Michi', 'Mota', 'Niebla', 'Nieve',
            'Maní', 'Café', 'Frijol', 'Dulce', 'Churro',
            'Miel', 'Galleta', 'Tequila', 'Ron', 'Chocolo',
            'Amor', 'Cariño', 'Corazón', 'Amorcito', 'Mi Cielo',
            'Tesoro', 'Bebé', 'Hermoso', 'Hermosa', 'Linda',
            'Lindo', 'Rey',
            'Bella', 'Chica', 'Paco', 'Pancho', 'Diego',
            'Juanita', 'Sara', 'Sofía', 'Martín', 'Andrés',
            'Antonio', 'Valentina', 'Alma', 'Vera', 'Rubio',
            'Salsa', 'Sombra', 'Puma', 'Trueno',
            'Cielo', 'Estrella', 'Luz', 'Alegría', 'Feliz',
        ];

        $dogBreeds = [
            'Criollo',
            'Labrador Retriever',
            'German Shepherd',
            'French Poodle',
            'Miniature Pinscher',
            'Golden Retriever',
            'Beagle',
            'Yorkshire Terrier',
            'Pitbull',
            'Schnauzer',
        ];

        $catBreeds = [
            'Criollo',
            'Turkish Angora',
            'Siamese',
            'Persian',
            'Moggie',
            'Exotic Shorthair',
            'Calico',
            'Maine Coon',
            'Bengal',
            'Himalayan',
        ];

        $pigBreeds = [
            'Criollo',
            'Duroc',
            'Landrace',
            'Large White',
            'Pietrain',
            'Hampshire',
            'Zungo',
            'San Pedreño',
            'Casco de Mula',
            'Yorkshire',
        ];

        $birdBreeds = [
            'Rock Pigeon',
            'Canary',
            'Budgerigar',
            'Parakeet',
            'Amazon Parrot',
            'Macaw',
            'Finch',
            'Cockatiel',
            'Domestic Muscovy Duck',
            'Columbian Chachalaca',
        ];

        $kind = fake()->randomElement(['dog', 'cat', 'pig', 'bird']);

        switch ($kind) {
            case 'dog':
                $breed = fake()->randomElement($dogBreeds);
                break;

            case 'cat':
                $breed = fake()->randomElement($catBreeds);
                break;

            case 'pig':
                $breed = fake()->randomElement($pigBreeds);
                break;

            case 'bird': 
                $breed = fake()->randomElement($birdBreeds);
                break;
        }

        return [
            'name' => fake()->randomElement($petNames),
            'kind' => $kind,
            'weight' => fake()->numerify('#.#'),
            'age' => fake()->numerify('#'),
            'breed' => $breed,
            'location' => fake()->city(),
            'description' => fake()->sentence(8),
        ];
    }
}
