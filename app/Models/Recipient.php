<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Email;

class Recipient extends Model
{
    protected $fillable = [
        'email_id',
        'receiver_email',
        'is_read',
    ];

    public function email()
    {
        return $this->belongsTo(Email::class);
    }
}
