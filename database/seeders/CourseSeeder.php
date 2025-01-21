<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filePath = base_path('database/seeders/data/default_courses.json');
        if (!file_exists($filePath)) {
            $this->command->error("File {$filePath} tidak ditemukan.");
            return;
        }

        $jsonContent = file_get_contents($filePath);

        // decode to array
        $courses = json_decode($jsonContent, true);

        if (is_array($courses)) {
            foreach ($courses as $course) {
                Course::create([
                    'title' => $course['title'],
                    'slug' => Str::slug($course['title']), 
                    'description' => $course['description'],
                    'price' => $course['price'],
                    'is_active' => $course['is_active'],
                    'thumbnail' => $course['thumbnail'],
                ]);
                $this->command->info('Inserting course: ' . $course['title']);
            }
            $this->command->info('Seeder selesai.');
        } else {
            $this->command->error('Gagal decode JSON.');
        }
    }
}
