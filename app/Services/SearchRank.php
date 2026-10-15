<?php

namespace App\Services;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\{DB, Schema};

//  검색어별 자리 보정 점수 (AI 검색 2-5 ①) - la_search_rank
//  "기대보다 몇 점 더 골랐나" - 1위 상품은 원래 잘 눌리고 3쪽 상품은 찾아 들어가야 보이므로, 자리 덕분에 생긴 몫은 빼고 셈
//  · 자리 곡선: n번째 자리에 보인 상품을 손님이 누른 비율 (1쪽은 자리마다, 16~30·31~60·61~위는 묶음, 포사의 PICK은 따로) - 매번 로그에서 다시 셈
//  · 검색어×상품마다 손님 1명 = 1표: 기대 = 본 가장 좋은 자리의 클릭률 / 실제 = 가장 강한 행동 (클릭 1, 장바구니·견적 2, 결제된 주문 3)
//  · 최근일수록 무겁게 (30일마다 절반) / 점수 = 실제 합 - 기대 합 / 가산점 비율 = 점수 ÷ (그 검색어 최고 점수, 3보다 작으면 3)
//  매일 밤 search:update-score가 통째로 다시 채우고, 검색할 때 functions()로 꺼내 씀 (SEARCH_RANK_WEIGHT, 0 = 끔)
//  나중에 XGBoost 학습(2-5 ②)의 재료로도 씀
class SearchRank {
    const DAYS      = 90;       //  최근 며칠 기록으로 계산
    const HALF_LIFE = 30;       //  며칠 지날 때마다 절반 무게
    const MIN_KW    = 3;        //  클릭한 손님이 이만큼 이상인 검색어만
    const MIN_GOODS = 2;        //  행동한 손님이 이만큼 이상인 상품만 (한 손님이 모든 쪽을 넘기며 누른 상품 제외)
    const FULL      = 3;        //  만점 기준 - 검색어 최고 점수가 이보다 작으면 이 값으로 나눔 (증거가 적으면 만점 안 줌)
    const PER_PAGE  = 15;       //  검색 결과 한 쪽 상품 수 - 자리 = (쪽 - 1) × 15 + 순서
    const MAX_GOODS = 50;       //  검색 한 번에 가산점을 줄 최대 상품 수
    const POINTS    = ['click' => 1, 'cart' => 2, 'estimate' => 2, 'purchase' => 3];

    //  행동 표시 (손님 × 상품)
    const F_CLICK = 1;          //  클릭
    const F_CART  = 2;          //  장바구니·견적
    const F_ORDER = 4;          //  결제된 주문
    const F_LIST  = 8;          //  목록에서 클릭 (자리 1~)
    const F_PICK  = 16;         //  포사의 PICK에서 클릭 (자리 0)

    //  자리 묶음 - 1쪽은 자리마다, 그 뒤는 16(16~30위) / 31(31~60위) / 61(61위~)
    public static function bucket(int $pos): int {
        return $pos <= 15 ? $pos : ($pos <= 30 ? 16 : ($pos <= 60 ? 31 : 61));
    }

    //  검색할 때 가산점 - 이 검색어에서 손님이 기대보다 많이 고른 상품에 + (비율 × SEARCH_RANK_WEIGHT)
    //  인기상품순·일반 검색만 (캣넘버 등 칸 지정 검색, 가격순·신상품순 제외)
    public static function functions(string $keyword, $mode, $sort): array {
        $weight = (int) config('search.rank_weight', 0);
        if ($weight <= 0 || $keyword === '' || !empty($mode) || ($sort ?: 'hot') !== 'hot')
            return [];

        try {
            $rows = DB::table('search_rank')->where('sr_keyword', $keyword)->where('sr_score', '>', 0)
                ->orderByDesc('sr_score')->limit(self::MAX_GOODS)->pluck('sr_score', 'sr_gd_id');
        } catch (\Throwable $e) {
            \Log::error('자리 보정 점수 읽기 실패: ' . $e->getMessage());
            return [];
        }

        //  같은 점수는 한 조건으로 묶음 (ES 문서 _id = gd_id)
        $byWeight = [];
        foreach ($rows as $gdId => $score)
            $byWeight[max(1, (int) round($weight * $score))][] = (string) $gdId;

        $functions = [];
        foreach ($byWeight as $w => $ids)
            $functions[] = ['filter' => ['ids' => ['values' => $ids]], 'weight' => $w];
        return $functions;
    }

    //  점수 계산 후 la_search_rank 통째로 바꿈 (트랜잭션 - 검색 중인 손님은 바뀌기 전 점수를 그대로 봄)
    public static function rebuild(): array {
        $r = self::build();
        DB::transaction(function () use ($r) {
            DB::table('search_rank')->delete();
            foreach (array_chunk($r['rows'], 500) as $chunk)
                DB::table('search_rank')->insertOrIgnore($chunk);     //  대소문자·악센트만 다른 검색어(general_ci에서 같은 값)는 앞의 것만
        });
        return $r;
    }

    //  점수 계산 (저장 안 함) - $until: 이 시각 전까지의 기록만 (켜기 전 시험에서 앞 기간만 쓸 때), $conn: DB 연결 이름
    //  반환: rows(la_search_rank 줄), curve(자리 곡선), stats(요약 숫자)
    public static function build($until = null, ?string $conn = null): array {
        $db    = DB::connection($conn);
        $until = $until ? Carbon::parse($until) : now();
        $from  = $until->copy()->subDays(self::DAYS)->toDateTimeString();
        $to    = $until->toDateTimeString();
        $now   = $until->timestamp;

        //  1. 손님 행동 [검색어][손님][상품] = [가장 강한 점수, 행동 표시] - 손님 = uuid, 없으면 IP (search:report와 같음)
        $acts = [];
        $events = $db->select("
            SELECT l.sl_keyword_norm AS kw, COALESCE(l.sl_uuid, l.ip) AS visitor, e.sle_gd_id AS gd,
                   e.sle_action AS act, e.sle_position AS pos, o.od_id AS paid
            FROM la_user_behavior_search_events e
            JOIN la_user_behavior_search l ON l.sl_id = e.sle_sl_id
            LEFT JOIN la_shop_order o ON e.sle_action = 'purchase' AND o.od_id = e.sle_ref_id
                                     AND o.od_step NOT IN ('0', '60', '61')
            WHERE l.created_at >= ? AND l.created_at < ? AND e.created_at < ? AND l.sl_mode IS NULL", [$from, $to, $to]);
        foreach ($events as $e) {
            if ($e->act === 'purchase' && !$e->paid)
                continue;                                       //  결제 전·취소 주문은 행동으로 안 셈
            $flag = match ($e->act) {
                'click'    => self::F_CLICK | ((int) $e->pos === 0 ? self::F_PICK : self::F_LIST),
                'purchase' => self::F_ORDER,
                default    => self::F_CART,
            };
            $a = $acts[$e->kw][$e->visitor][(int) $e->gd] ?? [0, 0];
            $acts[$e->kw][$e->visitor][(int) $e->gd] = [max($a[0], self::POINTS[$e->act]), $a[1] | $flag];
        }
        unset($events);

        //  점수를 매길 검색어 - 클릭한 손님 MIN_KW명 이상
        $keywords = [];
        foreach ($acts as $kw => $byVisitor) {
            $clickers = count(array_filter($byVisitor, fn($gds) => array_filter($gds, fn($a) => $a[1] & self::F_CLICK)));
            if ($clickers >= self::MIN_KW)
                $keywords[$kw] = true;
        }

        //  2. 보인 상품 - 검색어별로 모아 [손님][상품] = [가장 좋은 목록 자리 or null, PICK에 보였는지, 마지막으로 본 시각]
        //     자리 곡선은 모든 검색어로, 점수는 고른 검색어만
        $hasPick = Schema::connection($conn)->hasColumn('user_behavior_search', 'sl_pick_ids');     //  PICK 칸 추가(2-5) 전 기록 대비
        $curve   = ['list' => [], 'pick' => [0, 0]];     //  묶음 => [본 수, 누른 수]
        $units   = [];
        $kw      = null;
        $seen    = [];
        $searches = 0;

        $flush = function () use (&$kw, &$seen, &$units, &$curve, &$acts, $keywords) {
            if ($kw === null)
                return;
            foreach ($seen as $visitor => $gds)
                foreach ($gds as $gd => [$pos, $pick]) {
                    $flag = $acts[$kw][$visitor][$gd][1] ?? 0;
                    if ($pos !== null) {
                        $b = self::bucket($pos);
                        $curve['list'][$b][0] = ($curve['list'][$b][0] ?? 0) + 1;
                        $curve['list'][$b][1] = ($curve['list'][$b][1] ?? 0) + ($flag & self::F_LIST ? 1 : 0);
                    }
                    if ($pick) {
                        $curve['pick'][0]++;
                        $curve['pick'][1] += $flag & self::F_PICK ? 1 : 0;
                    }
                }
            //  점수 매길 검색어는 행동한 손님이 MIN_GOODS명 이상인 상품만 남겨 둠 (메모리 절약)
            if (isset($keywords[$kw])) {
                $actors = [];
                foreach ($acts[$kw] as $gds)
                    foreach ($gds as $gd => $a)
                        $actors[$gd] = ($actors[$gd] ?? 0) + 1;
                $keep = array_filter($actors, fn($n) => $n >= self::MIN_GOODS);
                foreach ($seen as $visitor => $gds)
                    if ($gds = array_intersect_key($gds, $keep))
                        $units[$kw][$visitor] = $gds;
            }
            $seen = [];
        };

        $rows = $db->cursor("
            SELECT sl_keyword_norm AS kw, COALESCE(sl_uuid, ip) AS visitor, sl_page, sl_gd_ids,
                   " . ($hasPick ? 'sl_pick_ids' : 'NULL') . " AS sl_pick_ids, UNIX_TIMESTAMP(created_at) AS ts
            FROM la_user_behavior_search
            WHERE created_at >= ? AND created_at < ? AND sl_mode IS NULL AND sl_total > 0
            ORDER BY sl_keyword_norm", [$from, $to]);
        foreach ($rows as $r) {
            if ($r->kw !== $kw) {
                $flush();
                $kw = $r->kw;
            }
            $searches++;
            $base = (max(1, (int) $r->sl_page) - 1) * self::PER_PAGE;
            foreach (json_decode((string) $r->sl_gd_ids, true) ?: [] as $i => $gd) {
                $s = $seen[$r->visitor][(int) $gd] ?? [null, false, 0];
                $seen[$r->visitor][(int) $gd] = [$s[0] === null ? $base + $i + 1 : min($s[0], $base + $i + 1), $s[1], max($s[2], (int) $r->ts)];
            }
            foreach (json_decode((string) $r->sl_pick_ids, true) ?: [] as $gd) {
                $s = $seen[$r->visitor][(int) $gd] ?? [null, false, 0];
                $seen[$r->visitor][(int) $gd] = [$s[0], true, max($s[2], (int) $r->ts)];
            }
        }
        $flush();

        //  3. 자리 곡선 = 누른 수 ÷ 본 수 - 뒤 자리가 앞 자리보다 높게 나오면(깊이 넘겨 본 몇 명 때문) 앞 자리 값으로 누름
        ksort($curve['list']);
        $ctr  = [];
        $prev = 1.0;
        foreach ($curve['list'] as $b => [$n, $c])
            $prev = $ctr[$b] = min($prev, $c / $n);
        $ctrPick = $curve['pick'][0] ? $curve['pick'][1] / $curve['pick'][0] : 0;

        //  4. 검색어 × 상품 점수
        $out = [];
        $at  = now()->toDateTimeString();
        foreach ($units as $kw => $byVisitor) {
            $goods = [];
            foreach ($byVisitor as $visitor => $gds)
                foreach ($gds as $gd => [$pos, $pick, $ts]) {
                    [$pt, $flag] = $acts[$kw][$visitor][$gd] ?? [0, 0];
                    $w   = 0.5 ** (max(0, $now - $ts) / 86400 / self::HALF_LIFE);
                    $exp = max($pos !== null ? $ctr[self::bucket($pos)] : 0, $pick ? $ctrPick : 0);
                    $g   = $goods[$gd] ?? ['actual' => 0, 'expected' => 0, 'seen' => 0, 'actors' => 0, 'clicks' => 0, 'carts' => 0, 'orders' => 0, 'pos' => 0, 'pos_n' => 0];
                    $g['actual']   += $w * $pt;
                    $g['expected'] += $w * $exp;
                    $g['seen']++;
                    $g['actors']   += $flag ? 1 : 0;
                    $g['clicks']   += $flag & self::F_CLICK ? 1 : 0;
                    $g['carts']    += $flag & self::F_CART ? 1 : 0;
                    $g['orders']   += $flag & self::F_ORDER ? 1 : 0;
                    if ($pos !== null) {
                        $g['pos'] += $pos;
                        $g['pos_n']++;
                    }
                    $goods[$gd] = $g;
                }

            $goods = array_filter($goods, fn($g) => $g['actors'] >= self::MIN_GOODS);
            if (!$goods)
                continue;
            $best = max(self::FULL, max(array_map(fn($g) => $g['actual'] - $g['expected'], $goods)));
            foreach ($goods as $gd => $g) {
                $gain  = $g['actual'] - $g['expected'];
                $out[] = [
                    'sr_keyword'  => $kw,
                    'sr_gd_id'    => $gd,
                    'sr_score'    => round(max(0, $gain) / $best, 4),
                    'sr_gain'     => round($gain, 3),
                    'sr_actual'   => round($g['actual'], 3),
                    'sr_expected' => round($g['expected'], 3),
                    'sr_seen'     => $g['seen'],
                    'sr_clicks'   => $g['clicks'],
                    'sr_carts'    => $g['carts'],
                    'sr_orders'   => $g['orders'],
                    'sr_avg_pos'  => $g['pos_n'] ? round($g['pos'] / $g['pos_n'], 1) : null,
                    'created_at'  => $at,
                ];
            }
        }

        return [
            'rows'  => $out,
            'curve' => ['list' => $ctr, 'pick' => $ctrPick, 'counts' => $curve],
            'stats' => [
                'from'     => $from,
                'to'       => $to,
                'searches' => $searches,
                'keywords' => count(array_unique(array_column($out, 'sr_keyword'))),
                'rows'     => count($out),
                'boosted'  => count(array_filter($out, fn($r) => $r['sr_score'] > 0)),
            ],
        ];
    }
}
