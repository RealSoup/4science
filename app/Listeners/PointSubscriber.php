<?php
namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use DB;

class PointSubscriber {
    public function subscribe($events) {
        $events->listen( \App\Events\Point::Class, [PointSubscriber::class, 'Point'] );
    }

    public function Point($event) {
        if ($event->type == 'insert') {
            DB::table('point')->insert( [
                'po_uid' => auth()->user()->id,
                'po_type' => $event->po_type,
                'po_key' => $event->key,
                'po_content' => $event->content,
                'po_point' => $event->point,
                'po_enable_p' => $event->point,
                'created_id' => auth()->user()->id
            ] );
        } else if ($event->type == 'delete') {
            DB::table('point')
                ->where([ ['po_uid', $event->uid], ['po_type', $event->po_type], ['po_key', $event->key] ])
                ->delete();
        }

    }

}
