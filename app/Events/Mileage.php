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

    public $type;
    public $ml_type;
    public $key;
    public $mileage;
    public $content;
    public $uid;
    public function __construct($type, $ml_type, $key, $mileage, $content, $uid) {
        $this->type = $type;
        $this->ml_type = $ml_type;
        $this->key = $key;
        $this->mileage = $mileage;
        $this->content = $content;
        $this->uid = $uid;
    }

    public function broadcastOn() {
        return new PrivateChannel('channel-name');
    }
}
