<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Email;

class Recipient extends Model
{
    public function emails()
    {
        return $this->hasMany(Email::class);
    }
}
