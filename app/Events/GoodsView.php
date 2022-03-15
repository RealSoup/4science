<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Shop\Goods;

class GoodsView {
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $goods;
    public function __construct(Goods $goods) { $this->goods = $goods; }
    public function broadcastOn() { return new PrivateChannel('channel-name'); }
}
