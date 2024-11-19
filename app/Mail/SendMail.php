<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;

    public $recipientEmail;
    public $emailSubject;
    public $emailContent;

    public function __construct($recipientEmail, $emailSubject, $emailContent)
    {
        $this->recipientEmail = $recipientEmail;
        $this->emailSubject = $emailSubject;
        $this->emailContent = $emailContent;
    }

    public function build()
    {
        return $this->view('emails.sendmail')
            ->with([
                'emailSubject' => $this->emailSubject,
                'emailContent' => $this->emailContent,
            ])
            ->subject($this->emailSubject)
            ->html($this->emailContent); // Ensure the content is sent as HTML
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->emailSubject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.sendmail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
