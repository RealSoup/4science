<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

//  검색 로그 (AI 검색 1단계) - 검색 1번 = la_user_behavior_search 1줄 (검색 상세 장부)
//  행동 로그(la_user_behavior_logs)가 주 장부 - 새 검색이면 거기에 "search" 줄을 이 검색 번호(ubl_sl_id)를 달아 넣음
//  저장에 실패해도 검색은 정상 동작해야 하므로 예외는 기록만 하고 null 반환
class SearchLogService {
    const DEDUP_TTL = 1800;     //  같은 손님이 30분 안에 같은 조건으로 다시 부르면(새로고침·뒤로가기) 같은 search_id 재사용
    const ATTR_TTL  = ['cart' => 86400, 'estimate' => 86400, 'purchase' => 604800];   //  클릭 후 연결 기간 (장바구니·견적 24시간 / 주문 7일)

    public static function store(Request $req, string $keyword, array $catePath, int $total, int $page, $items, int $tookMs, ?string $alt = null): ?int {
        try {
            if (!if_not_my_ip($req->ip()) || !GeoIp::isKorea($req->ip()))
                return null;

            $uuid = $req->cookie('tracking_uuid');
            $kw   = mb_substr($keyword, 0, 200);
            $mode = $req->mode ?: null;
            $mkId = $req->filled('mk_id') ? (int) $req->mk_id : null;
            $sort = $req->sort ?: 'hot';

            //  같은 조건 다시 부르기 판별 - 카테고리·제조사·정렬은 판별에만 쓰고 저장하지 않음
            $dedupKey = 'search_log:' . ($uuid ?: $req->ip()) . ':' . md5(json_encode([$kw, $mode, implode('_', $catePath), $mkId, $sort, $page]));
            if ($slId = Redis::get($dedupKey))
                return (int) $slId;

            $slId = DB::table('user_behavior_search')->insertGetId([
                'sl_uuid'         => $uuid,
                'sl_user_id'      => auth()->id(),
                'sl_keyword'      => mb_substr(trim($req->keyword), 0, 200),
                'sl_keyword_norm' => $kw,
                'sl_mode'         => $mode,
                'sl_page'         => $page,
                'sl_total'        => $total,
                'sl_gd_ids'       => json_encode($items->pluck('gd_id')->values()),
                'sl_alt'          => $alt ? mb_substr($alt, 0, 100) : null,      //  약한 검색 보정으로 함께 찾은 말 (AI 검색 2-4)
                'sl_took_ms'      => min($tookMs, 65535),
                'sl_is_mobile'    => saleEnv() !== 'P' ? 1 : 0,
                'ip'              => $req->ip(),
            ]);
            Redis::setex($dedupKey, self::DEDUP_TTL, $slId);

            //  행동 로그의 검색 줄 - 새로 찾은 검색만 (다음 쪽·카테고리·제조사 거르기·정렬 바꾸기는 같은 검색을 다시 본 것)
            if ($uuid && $page === 1 && !$catePath && !$mkId && $sort === 'hot')
                (new UserBehaviorService)->log($uuid, auth()->id(), 'search', mb_substr(trim((string) $req->keyword), 0, 100), $req->ip(), $slId);

            return $slId;
        } catch (\Throwable $e) {
            \Log::error('검색 로그 저장 실패: ' . $e->getMessage());
            return null;
        }
    }

    //  검색 결과 클릭 - 이벤트 저장 + 이후 장바구니·견적·주문 연결용 표시 (Redis, 7일)
    public static function click(Request $req, int $slId, int $gdId, int $position): void {
        try {
            $uuid = $req->cookie('tracking_uuid');
            $log  = DB::table('user_behavior_search')->where('sl_id', $slId)->first(['sl_uuid', 'sl_gd_ids', 'ip']);
            if (!$log)
                return;
            if ($log->sl_uuid ? $log->sl_uuid !== $uuid : $log->ip !== $req->ip())     //  본인 검색만
                return;
            if (!in_array($gdId, json_decode($log->sl_gd_ids, true) ?: []))           //  실제 노출된 상품만
                return;

            //  같은 검색에서 같은 상품 반복 클릭은 1번만
            $dedupKey = "search_ev:click:{$slId}:{$gdId}";
            if (Redis::get($dedupKey))
                return;

            DB::table('user_behavior_search_events')->insert([
                'sle_sl_id'    => $slId,
                'sle_action'   => 'click',
                'sle_gd_id'    => $gdId,
                'sle_position' => $position,
                'sle_uuid'     => $uuid,
            ]);
            Redis::setex($dedupKey, 86400, 1);

            if ($uuid)
                Redis::setex("search_attr:{$uuid}:{$gdId}", self::ATTR_TTL['purchase'], json_encode([
                    'sl_id' => $slId,
                    'pos'   => $position,
                    'at'    => time(),
                ]));
        } catch (\Throwable $e) {
            \Log::error('검색 클릭 저장 실패: ' . $e->getMessage());
        }
    }

    //  장바구니·견적·주문 → 클릭 후 연결 기간 안이면 검색 이벤트로 저장
    //  $items: [['gd_id' => 1, 'gm_id' => 2], ...]  /  $refId: 견적번호·주문번호
    public static function track(Request $req, string $action, array $items, ?int $refId = null): void {
        try {
            $uuid = $req->cookie('tracking_uuid');
            if (!$uuid || !$items)
                return;

            $rows = [];
            foreach ($items as $it) {
                $gdId = (int) $it['gd_id'];
                $gmId = (int) ($it['gm_id'] ?? 0);
                $attr = json_decode((string) Redis::get("search_attr:{$uuid}:{$gdId}"), true);
                if (!$attr || time() - $attr['at'] > self::ATTR_TTL[$action])
                    continue;

                //  장바구니 수량 추가 반복은 1번만
                if ($action === 'cart') {
                    $dedupKey = "search_ev:cart:{$attr['sl_id']}:{$gdId}:{$gmId}";
                    if (Redis::get($dedupKey))
                        continue;
                    Redis::setex($dedupKey, self::ATTR_TTL['cart'], 1);
                }

                $rows[] = [
                    'sle_sl_id'    => $attr['sl_id'],
                    'sle_action'   => $action,
                    'sle_gd_id'    => $gdId,
                    'sle_gm_id'    => $gmId ?: null,
                    'sle_position' => $attr['pos'],
                    'sle_ref_id'   => $refId,
                    'sle_uuid'     => $uuid,
                ];
            }
            if ($rows)
                DB::table('user_behavior_search_events')->insert($rows);
        } catch (\Throwable $e) {
            \Log::error("검색 이벤트({$action}) 저장 실패: " . $e->getMessage());
        }
    }
}