<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

//  검색 기준 지표 (AI 검색 1단계) - 검색 개선 전후 비교용, 화면 출력만 (DB 저장 없음)
//  검색 1건 = 같은 손님(uuid, 없으면 IP) + 같은 날 + 같은 검색어 → 페이지 넘김·정렬·필터 변경은 1건으로 묶음
//  주문은 지금 기준 유효 주문만 (결제 전 0 / 취소 60 / 결제실패 61 제외)
class SearchReport extends Command {
    protected $signature   = 'search:report
                                {--from= : 시작일 (기본: 7일 전)}
                                {--to= : 종료일, 그날 포함 (기본: 어제)}
                                {--top=20 : 검색어 목록 개수}
                                {--min=5 : 클릭 적은 검색어 - 결과 있는 검색이 이 건수 이상인 것만}
                                {--index= : 이 검색 인덱스만 (예: shop_goods_v2)}';
    protected $description = '검색 기준 지표 (0건 비율·클릭률·장바구니/견적/주문 전환·검색어 순위)';

    private $where;     //  기간·인덱스 조건 (la_search_logs 별칭 l)
    private $binds;
    private $total;     //  전체 검색 건수

    public function handle() {
        $from = Carbon::parse($this->option('from') ?: today()->subDays(7)->toDateString())->startOfDay();
        $to   = Carbon::parse($this->option('to') ?: today()->subDay()->toDateString())->endOfDay();
        if ($from->gt($to)) {
            $this->error("시작일({$from->toDateString()})이 종료일({$to->toDateString()})보다 늦습니다. --to도 지정하세요.");
            return 1;
        }

        $this->where = 'l.created_at BETWEEN ? AND ?';
        $this->binds = [$from->toDateTimeString(), $to->toDateTimeString()];
        if ($this->option('index')) {
            $this->where  .= ' AND l.sl_index = ?';
            $this->binds[] = $this->option('index');
        }

        $this->info("검색 기준 지표: {$from->toDateString()} ~ {$to->toDateString()}" . ($this->option('index') ? " / 인덱스 {$this->option('index')}" : ''));
        if ($to->gt(now()->subDays(7)))
            $this->warn('※ 종료일이 7일 안이라 주문 전환은 앞으로 더 늘 수 있음 (클릭 후 7일까지 연결)');

        if (!DB::selectOne("SELECT COUNT(*) AS n FROM la_search_logs l WHERE {$this->where}", $this->binds)->n) {
            $this->warn('기간 안에 검색 기록이 없습니다.');
            return 0;
        }

        $this->summary();
        $this->positions();
        $this->speed();
        $this->keywords();
        $this->visitors();
        return 0;
    }

    //  검색 1건씩 묶은 표 (손님 + 날짜 + 검색어)
    private function groupSql(): string {
        return "
            SELECT COALESCE(l.sl_uuid, l.ip) AS visitor, l.sl_keyword_norm AS kw, DATE(l.created_at) AS d,
                   MAX(l.sl_user_id)   AS user_id,
                   MAX(l.sl_is_mobile) AS mobile,
                   MAX(l.sl_total)     AS max_total,
                   MAX(l.sl_page)      AS max_page,
                   MAX(IF(e.sle_action = 'click', 1, 0))    AS clicked,
                   MAX(IF(e.sle_action = 'cart', 1, 0))     AS carted,
                   MAX(IF(e.sle_action = 'estimate', 1, 0)) AS estimated,
                   MAX(IF(o.od_id IS NOT NULL, 1, 0))       AS bought
            FROM la_search_logs l
            LEFT JOIN la_search_log_events e ON e.sle_sl_id = l.sl_id
            LEFT JOIN la_shop_order o ON e.sle_action = 'purchase' AND o.od_id = e.sle_ref_id
                                     AND o.od_step NOT IN ('0', '60', '61')
            WHERE {$this->where}
            GROUP BY visitor, kw, d";
    }

    //  1. 요약 - 전체 / PC / 모바일
    private function summary() {
        $rows = collect(DB::select("
            SELECT mobile, COUNT(*) AS searches, COUNT(DISTINCT visitor) AS visitors, COUNT(DISTINCT kw) AS keywords,
                   SUM(max_total = 0) AS zero, SUM(max_total > 0) AS found, SUM(max_page >= 2) AS next_page,
                   SUM(clicked) AS clicked, SUM(carted) AS carted, SUM(estimated) AS estimated, SUM(bought) AS bought
            FROM ({$this->groupSql()}) g
            GROUP BY mobile WITH ROLLUP", $this->binds));

        $cols = [
            '전체'   => $rows->first(fn($r) => is_null($r->mobile)),
            'PC'     => $rows->first(fn($r) => (string) $r->mobile === '0'),
            '모바일' => $rows->first(fn($r) => (string) $r->mobile === '1'),
        ];
        $this->total = $cols['전체']->searches;

        $metrics = [
            '검색 건수'            => fn($r) => number_format($r->searches),
            '손님 수'              => fn($r) => number_format($r->visitors),
            '검색어 종류'          => fn($r) => number_format($r->keywords),
            '결과 0건 비율'        => fn($r) => $this->pct($r->zero, $r->searches),
            '클릭률'               => fn($r) => $this->pct($r->clicked, $r->found),
            '장바구니 전환'        => fn($r) => $this->pct($r->carted, $r->found),
            '견적 전환'            => fn($r) => $this->pct($r->estimated, $r->found),
            '주문 전환'            => fn($r) => $this->pct($r->bought, $r->found),
            '2페이지 이상 본 비율' => fn($r) => $this->pct($r->next_page, $r->found),
        ];
        $table = [];
        foreach ($metrics as $label => $f)
            $table[] = array_merge([$label], array_map(fn($r) => $r ? $f($r) : '-', array_values($cols)));

        $this->section('1. 요약');
        $this->table(array_merge([''], array_keys($cols)), $table);
        $this->line('  클릭률·전환율 = 결과가 있었던 검색 중, 그 행동이 1번이라도 있었던 비율');
    }

    //  2. 클릭 순위 분포 (한 페이지 15개 기준) - 위쪽 상품을 많이 누를수록 순서가 좋다는 뜻
    private function positions() {
        $r = DB::selectOne("
            SELECT COUNT(*) AS clicks, AVG(e.sle_position) AS avg_pos,
                   SUM(e.sle_position <= 3)             AS p1,
                   SUM(e.sle_position BETWEEN 4 AND 10)  AS p2,
                   SUM(e.sle_position BETWEEN 11 AND 15) AS p3,
                   SUM(e.sle_position BETWEEN 16 AND 30) AS p4,
                   SUM(e.sle_position > 30)              AS p5
            FROM la_search_log_events e
            JOIN la_search_logs l ON l.sl_id = e.sle_sl_id
            WHERE e.sle_action = 'click' AND {$this->where}", $this->binds);

        $this->section('2. 클릭한 상품 순위');
        $this->table(['순위', '클릭'], [
            ['1~3위',                $this->pct($r->p1, $r->clicks)],
            ['4~10위',               $this->pct($r->p2, $r->clicks)],
            ['11~15위 (1페이지 끝)', $this->pct($r->p3, $r->clicks)],
            ['16~30위 (2페이지)',    $this->pct($r->p4, $r->clicks)],
            ['31위~ (3페이지부터)',  $this->pct($r->p5, $r->clicks)],
            ['평균 순위',            $r->clicks ? round($r->avg_pos, 1) . '위' : '-'],
        ]);
    }

    //  3. 검색 속도 - ES 처리 시간 (화면에 뜨기까지의 전체 시간 아님), 검색 페이지 단위
    private function speed() {
        $r   = DB::selectOne("SELECT COUNT(*) AS n, AVG(l.sl_took_ms) AS avg_ms, MAX(l.sl_took_ms) AS max_ms, SUM(l.sl_took_ms >= 1000) AS slow
                              FROM la_search_logs l WHERE {$this->where}", $this->binds);
        $p95 = DB::selectOne("SELECT l.sl_took_ms FROM la_search_logs l WHERE {$this->where}
                              ORDER BY l.sl_took_ms LIMIT 1 OFFSET " . (int) floor(($r->n - 1) * 0.95), $this->binds);

        $this->section('3. 검색 속도 (ES 처리 시간)');
        $this->table(['항목', '시간'], [
            ['평균',              round($r->avg_ms) . 'ms'],
            ['95%는 이 시간 안에', $p95->sl_took_ms . 'ms'],
            ['가장 느림',         $r->max_ms . 'ms'],
            ['1초 이상',          $this->pct($r->slow, $r->n)],
        ]);
    }

    //  4~6. 검색어 순위
    private function keywords() {
        $rows = collect(DB::select("
            SELECT kw, COUNT(*) AS searches, SUM(max_total = 0) AS zero, SUM(max_total > 0) AS found,
                   SUM(clicked) AS clicked, SUM(carted) AS carted, SUM(estimated) AS estimated, SUM(bought) AS bought
            FROM ({$this->groupSql()}) g
            GROUP BY kw", $this->binds));
        $top = (int) $this->option('top');
        $min = (int) $this->option('min');

        $this->section("4. 많이 찾는 검색어 Top {$top}");
        $this->table(['검색어', '검색', '0건', '클릭률', '장바구니', '견적', '주문'],
            $rows->sortByDesc('searches')->take($top)
                ->map(fn($r) => [$r->kw, $r->searches, $r->zero, $this->pct($r->clicked, $r->found), $r->carted, $r->estimated, $r->bought])
                ->values()->all());

        $this->section("5. 결과 0건 검색어 Top {$top} - 상품 없음·오타·동의어 후보");
        $this->table(['검색어', '0건 검색', '전체 검색'],
            $rows->filter(fn($r) => $r->zero > 0)->sortByDesc('zero')->take($top)
                ->map(fn($r) => [$r->kw, $r->zero, $r->searches])
                ->values()->all());

        $this->section("6. 결과는 있는데 클릭이 적은 검색어 Top {$top} (결과 있는 검색 {$min}건 이상) - 순서 개선 후보");
        $this->table(['검색어', '결과 있는 검색', '클릭률'],
            $rows->filter(fn($r) => $r->found >= $min)
                ->sort(fn($a, $b) => [$a->clicked / $a->found, $b->found] <=> [$b->clicked / $b->found, $a->found])
                ->take($top)
                ->map(fn($r) => [$r->kw, $r->found, $this->pct($r->clicked, $r->found)])
                ->values()->all());
    }

    //  7. 검색 많이 한 손님 - 한 명(봇 등)이 숫자를 흔드는지 확인용
    private function visitors() {
        $rows = DB::select("
            SELECT visitor, MAX(user_id) AS user_id, COUNT(*) AS searches, COUNT(DISTINCT kw) AS keywords, SUM(clicked) AS clicked
            FROM ({$this->groupSql()}) g
            GROUP BY visitor
            ORDER BY searches DESC
            LIMIT 5", $this->binds);

        $this->section('7. 검색 많이 한 손님 Top 5 - 한 명이 너무 많으면 봇 의심');
        $this->table(['손님 (uuid 앞 8자리 / IP)', '회원번호', '검색', '전체 중', '검색어 종류', '클릭'],
            array_map(fn($r) => [
                strlen($r->visitor) === 36 ? substr($r->visitor, 0, 8) : $r->visitor,
                $r->user_id ?: '비회원',
                $r->searches,
                round($r->searches / $this->total * 100, 1) . '%',
                $r->keywords,
                $r->clicked,
            ], $rows));
    }

    private function section(string $title) {
        $this->newLine();
        $this->info($title);
    }

    //  12.3% (45)
    private function pct($n, $total): string {
        return $total > 0 ? round($n / $total * 100, 1) . '% (' . number_format($n) . ')' : '-';
    }
}