<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;
use App\Models\ReceivedEmail;
use App\Models\SentEmail;

class MailController extends Controller
{
    public function sendEmail(Request $request)
    {
        $request->validate([
            'address' => 'required|email',
            'subject' => 'required',
            'text' => 'required',
        ]);

        $recipientEmail = $request->input('address');
        $emailSubject = $request->input('subject');
        $emailContent = $request->input('text');

        // Send the email
        Mail::to($recipientEmail)->send(new SendMail($recipientEmail, $emailSubject, $emailContent));

        // Save the sent email into the database
        SentEmail::create([
            'recipient' => $recipientEmail,
            'subject' => $emailSubject,
            'body' => $emailContent,
        ]);

        return back()->with('success', 'Email sent successfully!');
    }

    public function receiveEmail(Request $request)
    {
        // Extract the relevant data from the request
        $from = $request->input('sender');
        $subject = $request->input('subject');
        $body = $request->input('body-plain');

        // Store the received email in the database
        ReceivedEmail::create([
            'from' => $from,
            'subject' => $subject,
            'body' => $body,
        ]);

        // Respond with a JSON message
        return response()->json(['message' => 'Email received']);
    }

    public function inbox()
    {
        $emails = ReceivedEmail::orderBy('created_at', 'desc')->get();
        return view('emails.inbox', compact('emails'));
    }

    public function sent()
    {
        $sentEmails = SentEmail::orderBy('created_at', 'desc')->get();
        return view('emails.sent', compact('sentEmails'));
    }
}
