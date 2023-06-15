<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DealerJoin extends Mailable {
    use Queueable, SerializesModels;

    public $email;
    public $subject;

    public function __construct($email, $subject) {
         $this->email   = $email;
         $this->subject = $subject;
    }

    public function build() {
        return $this->from($this->email, '4science')
            ->subject($this->subject)
            ->view("admin.auth.email.dealerJoin");
    }
}
