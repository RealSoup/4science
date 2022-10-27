<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Mileage {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $mode;
    public $uid;
    public $tbl;
    public $key;
    public $type;
    public $content;
    public $mileage;
    public function __construct($mode, $uid, $tbl, $key, $type, $content, $mileage) {
        $this->mode = $mode;
        $this->uid = $uid;
        $this->tbl = $tbl;
        $this->key = $key;
        $this->type = $type;
        $this->content = $content;
        $this->mileage = $mileage;
    }

    public function broadcastOn() {
        return new PrivateChannel('channel-name');
    }
}
