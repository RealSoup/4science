<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendTransaction extends Mailable {
    use Queueable, SerializesModels;

    public $email;
    public $subject;
    public $params;
    public $files;

    public function __construct($email, $subject, $params, $files) {
         $this->email   = $email;
         $this->subject = $subject;
         $this->params  = $params;
         $this->files   = (array) $files; // 문자열로 와도 배열로 통일
    }

    public function build() {
        $mail = $this->from($this->email, '4science')
            ->subject($this->subject)
            ->view("admin.order.email.sendTransaction")
            ->with($this->params);

        foreach ($this->files as $index => $file) {
            if (!file_exists($file)) {
                continue;
            }

            $mail->attach($file, [
                'as'   => $this->attachName($file, $index),
                'mime' => $this->attachMime($file),
            ]);
        }

        return $mail;
    }

    // 파일 종류별로 표시 이름 지정
    private function attachName($path, $index) {
        if (str_contains($path, 'bankbook')) {
            return '통장사본.jpg';
        }
        if (str_contains($path, 'license')) {
            return '사업자등록증사본.jpg';
        }
        return "{$this->params['file_nm']}_Statement.pdf"; // PDF는 기존 이름 유지
    }

    // 확장자 기준 mime 자동 판별
    private function attachMime($path) {
        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        return match($ext) {
            'jpg', 'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            default => 'application/pdf',
        };
    }
}