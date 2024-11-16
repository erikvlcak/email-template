<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MailController;

Route::get('/', function () {
    return view('index');
});

Route::post('/send-email', [MailController::class, 'sendEmail'])->name('send.email');
Route::get('/api/emails', [MailController::class, 'getEmails']);