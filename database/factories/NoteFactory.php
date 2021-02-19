<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Note;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class NoteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Note::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->word,
            'body' => $this->faker->paragraph(6, true),
            'user_id' => 1,
            'category_id'   => function () {
                return Category::inRandomOrder()->first()->id;
            }
        ];
    }
}
