<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderEmail extends Mailable {
    use Queueable, SerializesModels;

    public $email;
    public $subject;
    public $params;

    public function __construct($email, $subject, $params) {
         $this->email   = $email;
         $this->subject = $subject;
         $this->params  = $params;
    }

    public function build() {
        return $this->from($this->email, '4science')
            ->subject($this->subject)
            ->view("admin.order.email.emailForm")
            ->with($this->params);
    }
}
