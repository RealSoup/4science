<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailEngReform extends Mailable {
    use Queueable, SerializesModels;

    public $email;
    public $subject;
    public $params;
    public $view;

    public function __construct($email, $subject, $params, $view) {
         $this->email   = $email;
         $this->subject = $subject;
         $this->params  = $params;
         $this->view    = $view;
    }

    public function build() {
        return $this->from($this->email, '4SCIENCE')
            ->subject($this->subject)
            ->view($this->view)
            ->with($this->params);
    }
}
