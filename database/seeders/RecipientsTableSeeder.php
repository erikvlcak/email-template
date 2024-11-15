<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\Email;
use App\Models\User;

class RecipientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Get all email IDs and user emails
        $emailIds = Email::pluck('id')->toArray();
        $userEmails = User::pluck('email')->toArray();

        for ($i = 1; $i <= 10; $i++) {
            DB::table('recipients')->insert([
                'email_id' => $faker->randomElement($emailIds),
                'receiver_email' => $faker->randomElement($userEmails),
                'is_read' => $faker->boolean,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
