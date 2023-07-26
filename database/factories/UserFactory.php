<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Spatie\Permission\Models\Role;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_email' => $this->faker->unique()->safeEmail,
            'user_firstname' => $this->faker->firstName,
            'user_lastname' => $this->faker->lastName,
            'user_phone' => $this->faker->phoneNumber,
            'user_avatar' => $this->faker->imageUrl(200, 200),
            'user_password' => bcrypt('password'),
            'user_gender' => $this->faker->numberBetween(0, 1),
            'user_status' => $this->faker->numberBetween(0, 1),
            'user_birthday' => $this->faker->date(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
