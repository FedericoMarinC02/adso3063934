<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Definimos el género primero
        $gender = fake()->randomElement(['Female', 'Male']);
        
        // Generamos nombres según el género
        if ($gender === 'Female') {
            $fullname = fake()->firstNameFemale() . " " . fake()->lastName();
        } else {
            $fullname = fake()->firstNameMale() . " " . fake()->lastName();
        }
        
        // Generamos el nombre de la imagen
        $photoFilename = $this->downloadUserImage($gender);

        return [
            'document' => fake()->numerify('75######'),
            'fullname' => $fullname,
            'gender' => $gender,
            'birthdate' => fake()->date(),
            'phone' => fake()->numerify('310######'),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'photo' => $photoFilename,
        ];
    }

    /**
     * Descarga imagen desde randomuser.me según el género
     *
     * @param string $gender
     * @return string
     */
    private function downloadUserImage(string $gender): string
    {
        $genderPath = strtolower($gender) === 'female' ? 'women' : 'men';
        $randomNumber = rand(1, 99);
        $filename = uniqid() . '_' . strtolower($gender) . '.jpg';
        $filepath = public_path('images/' . $filename);
        
        try {
            // Crear directorio si no existe
            if (!File::exists(public_path('images'))) {
                File::makeDirectory(public_path('images'), 0755, true);
            }
            
            // URL directa de randomuser.me
            $imageUrl = "https://randomuser.me/api/portraits/{$genderPath}/{$randomNumber}.jpg";
            
            // Usar copy() para descargar
            if (copy($imageUrl, $filepath)) {
                return $filename;
            }
            
        } catch (\Exception $e) {
            // En caso de error, imagen por defecto
            return 'default_' . strtolower($gender) . '.jpg';
        }
        
        return 'default_' . strtolower($gender) . '.jpg';
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
