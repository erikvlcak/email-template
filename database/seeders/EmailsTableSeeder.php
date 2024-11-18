<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\User;
use App\Models\Folder;

class EmailsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Get all user IDs and folder IDs
        $userIds = User::pluck('id')->toArray();
        $folderIds = Folder::pluck('id')->toArray();

        for ($i = 1; $i <= 10; $i++) {
            DB::table('emails')->insert([
                'sender_id' => $faker->randomElement($userIds),
                'folder_id' => $faker->randomElement($folderIds),
                'subject' => $faker->sentence,
                'body' => $faker->paragraphs(3, true),
                'html' => null,
                'is_starred' => $faker->boolean,
                'is_important' => $faker->boolean,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
