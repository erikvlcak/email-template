<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipient extends Model
{
    public function emails()
    {
        return $this->hasMany(Email::class);
    }
}
