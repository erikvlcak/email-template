<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MailController;
use App\Http\Controllers\UserController;

// Route::get('/', function () {
//     return view('index');
// });

Route::post('/emails/receive', [MailController::class, 'receiveEmail'])->name('emails.receive');
Route::post('/send-email', [MailController::class, 'sendEmail'])->name('send.email');
Route::get('/inbox', [MailController::class, 'inbox'])->name('emails.inbox');
Route::get('/sent', [MailController::class, 'sent'])->name('emails.sent');
Route::get('/api/fetch-inbox', [MailController::class, 'fetchInbox']);
Route::get('/api/emails', [MailController::class, 'getEmails']);
Route::get("/api/user", [UserController::class, "getCurrentUser"])->name("user.get");

Route::view('/login', 'index')->name('login');
Route::view('/{path?}', 'index')->where('path', '^((?!admin).)*$');
