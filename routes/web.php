<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MailController;


Route::get('/', function () {
    return view('emails.createmail');
});

Route::post('/send-email', [MailController::class, 'sendEmail'])->name('send.email');
Route::post('/emails/receive', [MailController::class, 'receiveEmail'])->name('emails.receive');
Route::get('/inbox', [MailController::class, 'inbox'])->name('emails.inbox');
Route::get('/sent', [MailController::class, 'sent'])->name('emails.sent');
