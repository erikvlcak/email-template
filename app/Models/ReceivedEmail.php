<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReceivedEmail extends Model
{
    protected $fillable = ['from', 'subject', 'body'];
}
