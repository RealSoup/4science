<?php

namespace App\Listeners;

use App\Events\BoardView;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class BoardSubscriber {
    // [추가] 게시판별로 세션에 기억할 '조회한 글 번호' 최대 개수 (세션 파일이 커지는 것 방지)
    const VIEWED_MAX = 300;

    public function subscribe($events) {
        $events->listen(
            \App\Events\BoardView::Class,
            [BoardSubscriber::class, 'BoardView']
        );
    }

    // [수정] 글마다 쿠키를 만들던 방식 → 세션 배열 하나에 글 번호를 모으는 방식
    //        (기존: board_gd_inquiry_{글번호} 쿠키가 글 하나당 282B씩 쌓여 400 오류 발생)
    public function BoardView($event) {
        $key    = 'board_viewed.' . $event->board->getTable();     // 예: board_viewed.board_gd_inquiry
        $bo_id  = (int) $event->board->bo_id;
        $viewed = $event->request->session()->get($key, []);

        if (!in_array($bo_id, $viewed, true)) {
            if ($event->board->increment('bo_click')) {
                $viewed[] = $bo_id;
                // [추가] 너무 많아지면 오래된 것부터 버림
                if (count($viewed) > self::VIEWED_MAX)
                    $viewed = array_slice($viewed, -self::VIEWED_MAX);
                $event->request->session()->put($key, $viewed);
            }
        }
    }
}
