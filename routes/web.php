<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MailController;

Route::get('/', function () {
    return view('index');
});

Route::post('/emails/receive', [MailController::class, 'receiveEmail'])->name('emails.receive');
Route::post('/send-email', [MailController::class, 'sendEmail'])->name('send.email');
Route::get('/api/emails', [MailController::class, 'getEmails']);
Route::get('/api/fetch-inbox', [MailController::class, 'fetchInbox']);