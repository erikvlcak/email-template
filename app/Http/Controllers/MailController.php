<?php
// app/Http/Controllers/MailController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Email;
use App\Models\Recipient;
use Illuminate\Support\Facades\DB;

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

        // Send the email using Mailgun
        Mail::to($recipientEmail)->send(new SendMail($recipientEmail, $emailSubject, $emailContent));

        // Save the sent email into the database
        $email = Email::create([
            'sender_id' => 1, // Assuming the sender is a user with ID 1
            // 'sender_id' => auth()->id(), // Uncomment this line if the sender is the authenticated user
            'folder_id' => 1, // Assuming 1 is the ID for the 'sent' folder
            'subject' => $emailSubject,
            'body' => $emailContent,
            'html' => null,
            'is_starred' => false,
            'is_important' => false,
        ]);

        // Save the recipient into the database
        $recipient = Recipient::create([
            'email_id' => $email->id,
            'receiver_email' => $recipientEmail,
            'is_read' => false,
        ]);

        // Create an entry in the intermediary email_recipient table
        DB::table('email_recipient')->insert([
            'email_id' => $email->id,
            'recipient_id' => $recipient->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Email sent successfully!']);
    }

    public function getEmails()
    {
        $emails = Email::with('recipients')->orderBy('created_at', 'desc')->get();
        return response()->json($emails);
    }
}