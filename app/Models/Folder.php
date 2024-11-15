<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    public function emails()
    {
        return $this->hasMany(Email::class);
    }
}
