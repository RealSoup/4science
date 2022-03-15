<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Point {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $type;
    public $po_type;
    public $key;
    public $point;
    public $content;
    public $uid;
    public function __construct($type, $po_type, $key, $point, $content, $uid) {
        $this->type = $type;
        $this->po_type = $po_type;
        $this->key = $key;
        $this->point = $point;
        $this->content = $content;
        $this->uid = $uid;
    }

    public function broadcastOn() {
        return new PrivateChannel('channel-name');
    }
}
