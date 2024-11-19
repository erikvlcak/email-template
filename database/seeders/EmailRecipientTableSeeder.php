<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Email;
use App\Models\Recipient;

class EmailRecipientTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all emails and recipients
        $emails = Email::all();
        $recipients = Recipient::all();

        // Loop through each email and assign random recipients
        foreach ($emails as $email) {
            // Get a random subset of recipients
            $randomRecipients = $recipients->random(rand(1, 50)); // Adjust the range as needed

            foreach ($randomRecipients as $recipient) {
                DB::table('email_recipient')->insert([
                    'email_id' => $email->id,
                    'recipient_id' => $recipient->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
