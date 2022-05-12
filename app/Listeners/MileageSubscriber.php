<?php
namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use DB;

class MileageSubscriber {
    public function subscribe($events) {
        $events->listen( \App\Events\Mileage::Class, [MileageSubscriber::class, 'Mileage'] );
    }

    public function Mileage($event) {
        if ($event->type == 'insert') {
            DB::table('mileage')->insert( [
                'ml_uid' => auth()->user()->id,
                'ml_type' => $event->ml_type,
                'ml_key' => $event->key,
                'ml_content' => $event->content,
                'ml_mileage' => $event->mileage,
                'ml_enable_p' => $event->mileage,
                'created_id' => auth()->user()->id
            ] );
        } else if ($event->type == 'delete') {
            DB::table('mileage')
                ->where([ ['ml_uid', $event->uid], ['ml_type', $event->ml_type], ['ml_key', $event->key] ])
                ->delete();
        }

    }

}
