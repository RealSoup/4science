<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GoodsSearch {
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $keyword;
    public $uid;
    public function __construct($keyword, $uid) { 
        $this->keyword = $keyword;
        $this->uid = $uid;
    }
    public function broadcastOn() { return new PrivateChannel('channel-name'); }
}
