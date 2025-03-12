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
    public $ip;
    public function __construct($keyword, $uid, $ip) { 
        $this->keyword = $keyword;
        $this->uid = $uid;
        $this->ip = $ip;
    }
    public function broadcastOn() { return new PrivateChannel('channel-name'); }
}
