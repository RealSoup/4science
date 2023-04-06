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
        if ($event->mode == 'insert') {
            DB::table('user_mileage')->insert( [
                'ml_uid'        => $event->uid,
                'ml_tbl'        => $event->tbl,
                'ml_key'        => $event->key,
                'ml_type'       => $event->type,
                'ml_content'    => $event->content,
                'ml_mileage'    => $event->mileage,
                'ml_enable_m'   => $event->mileage,
                'created_id' => auth()->user()->id
            ] );
        } else if ($event->mode == 'delete') {
            DB::table('mileage')
                ->where([ ['ml_uid', $event->uid], ['ml_tbl', $event->tbl], ['ml_key', $event->key] ])
                ->delete();
        }

    }

}
