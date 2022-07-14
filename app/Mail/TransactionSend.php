<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TransactionSend extends Mailable {
    use Queueable, SerializesModels;

    public $email;
    public $subject;
    public $params;
    public $file;

    public function __construct($email, $subject, $params, $file) {
         $this->email   = $email;
         $this->subject = $subject;
         $this->params  = $params;
         $this->file    = $file;
    }

    public function build() {
        return $this->from($this->email, '4science')
            ->subject($this->subject)
            ->view("admin.order.email.emailForm")
            // ->with($this->params)
            ->attach($this->file, [ 'as' => 'Transaction.pdf', 'mime' => 'application/pdf' ]);
    }
}
