<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipient extends Model
{
    public function email()
    {
        return $this->hasOne(Email::class);
    }
}
