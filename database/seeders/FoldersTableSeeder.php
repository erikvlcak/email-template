<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FoldersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $folders = [
            ['name' => 'received', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'sent', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'all', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'drafts', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'deleted', 'created_at' => now(), 'updated_at' => now()],
            // ['name' => 'starred', 'created_at' => now(), 'updated_at' => now()],
            // ['name' => 'important', 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('folders')->insert($folders);
    }
}
