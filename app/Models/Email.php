<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Folder;
use App\Models\User;
use App\Models\Recipient;

class Email extends Model
{
   public function user()
   {
    return $this->belongsTo(User::class);
   }

   public function recipients()
   {
    return $this->belongsToMany(Recipient::class);
   }

   public function folder()
   {
    return $this->belongsTo(Folder::class);
   }
}
