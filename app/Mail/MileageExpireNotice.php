<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MileageExpireNotice extends Mailable {
    use Queueable, SerializesModels;

    public $name;
    public $month;
    public $amount;
    public $link;

    public function __construct($name, $month, $amount, $link) {
        $this->name   = $name;
        $this->month  = $month;
        $this->amount = $amount;
        $this->link   = $link;
    }

    public function build() {
        return $this->from(config('mail.mailers.smtp.username'), '4science')
            ->subject('[4science] 소멸 예정 마일리지 안내')
            ->view('admin.user.email.mileageExpireNotice');
    }
}