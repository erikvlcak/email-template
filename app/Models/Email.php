<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Folder;
use App\Models\User;
use App\Models\Recipient;

class Email extends Model
{
   protected $fillable = [
      'sender_id',
      'folder_id',
      'subject',
      'body',
      'html',
      'is_starred',
      'is_important',
   ];

   public function user()
   {
      return $this->belongsTo(User::class, 'sender_id');
   }

   public function recipients()
   {
      return $this->hasMany(Recipient::class);
   }

   public function folder()
   {
      return $this->belongsTo(Folder::class);
   }
}