<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GoodsView {
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $gd_id;
    public function __construct($gd_id) { $this->gd_id = $gd_id; }
    public function broadcastOn() { return new PrivateChannel('channel-name'); }
}
