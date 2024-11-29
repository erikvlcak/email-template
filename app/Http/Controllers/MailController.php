<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Email;
use App\Models\Recipient;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class MailController extends Controller
{
    public function sendEmail(Request $request)
    {

        $emailFolder = $request->input('folder_id');

        if ($emailFolder == 2) {
            $request->validate([
                'address' => 'required|email',
                'subject' => 'required',
                'text' => 'required',
            ]);
        };

        $recipientEmail = $request->input('address');
        $emailSubject = $request->input('subject');
        $emailContent = $request->input('text');


        // Extract plain text from HTML content
        $plainTextContent = strip_tags($emailContent);

        // Send the email using Mailgun
        //Mail::to($recipientEmail)->send(new SendMail($recipientEmail, $emailSubject, $emailContent));

        // Save the sent email into the database
        $email = Email::create([
            'sender_id' => Auth::id() ?? 1, // Assuming the sender is a user with ID 1
            // 'sender_id' => auth()->id(), // Uncomment this line if the sender is the authenticated user
            'folder_id' => $emailFolder, // Set folder_id to 2 for sent emails
            'subject' => $emailSubject,
            'body' => $plainTextContent,
            'html' => $emailContent,
            'is_starred' => false,
            // 'is_important' => false,
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

    public function receiveEmail(Request $request)
    {
        $data = $request->all();

        // Extract relevant data from the request
        $from = $data['sender'];
        $subject = $data['subject'];
        $body = $data['body-plain'];
        $htmlBody = $data['body-html'] ?? null;
        $recipientEmail = $data['recipient'];

        //$randomUserId = User::inRandomOrder()->first()->id;
        // Save the received email into the database
        $email = Email::create([
            'sender_id' => Auth::id(), // Assuming the sender is a user with ID 1 MAKE IT RANDOM FROM THE LIST OF USERS
            // 'sender_id' => auth()->id(), // Uncomment this line if the sender is the authenticated user
            'folder_id' => 1, // Set folder_id to 1 for received emails
            'subject' => $subject,
            'body' => $body,
            'html' => $htmlBody,
            'is_starred' => false,
            // 'is_important' => false,
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

        return response()->json(['message' => 'Email received successfully!']);
    }

    public function getEmails(Request $request)
    {
        $query = Email::query();

        if ($request->has('folder_id')) {
            $query->where('folder_id', $request->input('folder_id'));
        }

        if ($request->has('starred')) {
            $query->where('is_starred', 1);
        }

        $emails = $query->with(['recipients', 'user'])->orderBy('created_at', 'desc')->get();
        return response()->json($emails);
    }

    public function fetchInbox()
    {
        $emails = Email::where('folder_id', 1)->with('recipients')->orderBy('created_at', 'desc')->get();
        return response()->json($emails);
    }


    public function updateEmail(Request $request, $id)
    {
        $email = Email::findOrFail($id);
        $email->update($request->all());
        return response()->json(['message' => 'Email updated successfully!']);
    }

    public function deleteEmail($id)
    {
        $email = Email::findOrFail($id);
        $email->delete();
        return response()->json(['message' => 'Email deleted successfully!']);
    }

    public function markAsRead(Request $request, $id)
    {
        $isRead = Email::findOrFail($id);
        $isRead->update(['is_read' => $request->input('is_read')]);
        return response()->json(['message' => 'Email status updated successfully!']);
    }
}
