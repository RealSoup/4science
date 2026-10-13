<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\{GoodsAttr, GoodsElasticSearch, SearchAi};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

//  AI 검색 검수 - 사람이 채점하는 화면 (관리자 > Site관리 > AI 검색 검수)
//  탭 A AI 수첩(la_search_ai): 검색어 통역(바꾼 말)이 맞는지 / 탭 B 상품 속성(la_shop_goods_attr): 신뢰도 낮은 속성 줄이 맞는지
//  사람이 검수한 줄은 AI(SearchAi::save)·규칙(GoodsAttr::sync)이 다시 덮어쓰지 않음
//  오류는 200 + ok:false 로 돌려줌 (공통 axios 422 처리는 입력칸 오류 전용)
class SearchReviewController extends Controller {
    const PER_AI    = 30;       //  AI 수첩 한 쪽 줄 수
    const PER_GOODS = 20;       //  상품 속성 한 쪽 상품 수
    const LOG_DAYS  = 30;       //  검색·보정 횟수를 세는 기간 (일)

    //  ───── 탭 A AI 수첩 ─────

    //  목록 - checked: N 검수 안 함(기본) / Y / X / all, status: ok / empty / bad, sort: alt 보정 많이 쓴 순(기본) / search 검색 많은 순 / new 최근
    public function aiIndex(Request $req) {
        //  최근 검색·보정 횟수 (1페이지 검색만 셈 - 다음 페이지 보기는 같은 검색) - 두 표의 글자 정렬 규칙이 달라 맞춰서 붙임
        $logs = DB::table('search_logs')
            ->selectRaw('sl_keyword_norm COLLATE utf8mb4_unicode_ci AS kw, COUNT(*) AS cnt, SUM(sl_alt IS NOT NULL) AS alt_cnt')
            ->where('created_at', '>=', now()->subDays(self::LOG_DAYS))->where('sl_page', 1)
            ->groupBy('sl_keyword_norm');

        $q = DB::table('search_ai as a')->where('a.sa_kind', 'query');
        $checked = $req->input('checked', 'N');
        if (in_array($checked, ['N', 'Y', 'X']))
            $q->where('a.sa_checked', $checked);
        if (in_array($req->status, ['ok', 'empty', 'bad']))
            $q->where('a.sa_status', $req->status);
        if ($req->filled('search'))
            $q->where('a.sa_text', 'like', '%' . trim($req->search) . '%');

        //  전체 개수는 수첩만으로 셈 (검색 기록 집계는 이번 쪽 줄을 뽑을 때 한 번만)
        $total  = (clone $q)->count();
        $pageNo = max(1, (int) $req->input('page', 1));
        $sort   = ['alt' => 'l.alt_cnt', 'search' => 'l.cnt', 'new' => 'a.sa_id'][$req->sort] ?? 'l.alt_cnt';
        $items  = $q->leftJoinSub($logs, 'l', 'l.kw', '=', 'a.sa_text')->orderByDesc($sort)->orderByDesc('a.sa_id')
            ->select('a.sa_id', 'a.sa_text', 'a.sa_hash', 'a.sa_result', 'a.sa_dropped', 'a.sa_status', 'a.sa_model', 'a.sa_checked', 'a.sa_checked_at', 'a.updated_at', 'l.cnt', 'l.alt_cnt')
            ->forPage($pageNo, self::PER_AI)->get();

        //  다시 묻는 중인 검색어 (대기 목록에 있음)
        $queued = DB::table('search_ai_queue')->where('sq_kind', 'query')->whereIn('sq_hash', $items->pluck('sa_hash'))
            ->pluck('sq_tries', 'sq_hash');

        $defs = GoodsAttr::defs();
        $list = $items->map(function ($r) use ($queued, $defs) {
            $res = json_decode((string) $r->sa_result, true) ?: [];
            return [
                'id'         => $r->sa_id,
                'text'       => $r->sa_text,
                'alts'       => $res['alts'] ?? [],
                'maker'      => $res['maker'] ?? null,
                'attrs'      => array_map(fn($a) => ($defs[$a['key']]['name'] ?? $a['key']) . ' ' . $a['value'], $res['attrs'] ?? []),
                'dropped'    => $r->sa_dropped,
                'status'     => $r->sa_status,
                'model'      => $r->sa_model,
                'checked'    => $r->sa_checked,
                'checked_at' => $r->sa_checked_at,
                'updated_at' => $r->updated_at,
                'cnt'        => (int) $r->cnt,
                'alt_cnt'    => (int) $r->alt_cnt,
                'queued'     => $queued->has($r->sa_hash) ? ($queued[$r->sa_hash] >= SearchAi::MAX_TRIES ? 'fail' : 'wait') : null,
            ];
        });

        return response()->json([
            'list'      => $list,
            'total'     => $total,
            'last_page' => max(1, (int) ceil($total / self::PER_AI)),
            'counts'    => DB::table('search_ai')->where('sa_kind', 'query')->selectRaw('sa_checked, COUNT(*) AS n')->groupBy('sa_checked')->pluck('n', 'sa_checked'),
            'log_days'  => self::LOG_DAYS,
        ]);
    }

    //  고치기 전 미리 세기 - 원래 검색어와 바꾼 말이 그대로 들어간 상품 수
    public function aiCount(Request $req) {
        $text = (string) $req->input('text', '');
        try {
            return response()->json(['ok' => true, 'base' => SearchAi::exactCount($text), 'alts' => $this->countAlts($text, (array) $req->input('alts', []))]);
        } catch (\Throwable $e) {
            return response()->json(['ok' => false, 'message' => '검색 서버 확인 실패: ' . mb_substr($e->getMessage(), 0, 100)]);
        }
    }

    //  맞음 Y / 틀림 X - 틀림은 손님 검색에서 바로 빠짐 (SearchAi::lookup)
    public function aiCheck(Request $req, int $id) {
        if (!in_array($req->checked, ['Y', 'X']))
            return response()->json(['ok' => false, 'message' => '맞음/틀림 값이 없습니다']);
        DB::table('search_ai')->where('sa_id', $id)->update($this->checkedBy('sa', $req->checked));
        return response()->json(['ok' => true]);
    }

    //  고치기 - 사람이 넣은 바꾼 말(최대 3개)로 바꾸고 맞음 처리 (상품 수가 적어도 저장 - 화면에서 경고만)
    public function aiFix(Request $req, int $id) {
        $row = DB::table('search_ai')->where('sa_id', $id)->where('sa_kind', 'query')->first();
        if (!$row)
            return response()->json(['ok' => false, 'message' => '없는 줄입니다']);
        try {
            $alts = $this->countAlts($row->sa_text, (array) $req->input('alts', []));
        } catch (\Throwable $e) {
            return response()->json(['ok' => false, 'message' => '검색 서버 확인 실패: ' . mb_substr($e->getMessage(), 0, 100)]);
        }
        $result = ['alts' => $alts] + (json_decode((string) $row->sa_result, true) ?: ['maker' => null, 'attrs' => []]);
        $kept   = array_filter($result, fn($v) => $v !== [] && $v !== null);
        DB::table('search_ai')->where('sa_id', $id)->update([
            'sa_result' => json_encode($result, JSON_UNESCAPED_UNICODE),
            'sa_status' => $kept ? 'ok' : 'empty',
        ] + $this->checkedBy('sa', 'Y'));
        return response()->json(['ok' => true, 'alts' => $alts]);
    }

    //  다시 묻기 - 검수 안 함으로 되돌리고 대기 목록에 넣음 → 1분 작업(search:ai-fill)이 AI에 다시 물어 덮어씀
    //  답이 올 때까지는 지금 답을 그대로 씀, 실패해서 멈춘 대기 줄이 있으면 지우고 새로 넣음
    public function aiAsk(int $id) {
        $row = DB::table('search_ai')->where('sa_id', $id)->where('sa_kind', 'query')->first(['sa_text', 'sa_hash']);
        if (!$row)
            return response()->json(['ok' => false, 'message' => '없는 줄입니다']);
        DB::transaction(function () use ($id, $row) {
            DB::table('search_ai')->where('sa_id', $id)->update(['sa_checked' => 'N', 'sa_checked_id' => null, 'sa_checked_at' => null]);
            DB::table('search_ai_queue')->where('sq_kind', 'query')->where('sq_hash', $row->sa_hash)->delete();
            SearchAi::enqueue('query', $row->sa_text, 'manual');
        });
        return response()->json(['ok' => true]);
    }

    //  바꾼 말 정리 + 상품 수 [['q', 'hits'], ...] - 손님 검색과 같은 글자 정리, 원래 검색어·빈칸·중복 빼고 3개까지
    protected function countAlts(string $text, array $alts): array {
        $out = [];
        foreach ($alts as $a) {
            $q = GoodsElasticSearch::keyword((string) $a);
            if ($q === '' || $q === $text || mb_strlen($q) > 60 || isset($out[$q]))
                continue;
            $out[$q] = ['q' => $q, 'hits' => SearchAi::exactCount($q)];
            if (count($out) >= 3)
                break;
        }
        return array_values($out);
    }

    //  ───── 탭 B 상품 속성 ─────

    //  상품 단위 목록 - state: todo 검수 대상(검수 안 함 + 신뢰도 < 속성 기준, 기본) / done 검수 끝(맞음·틀림 - 사람이 고치거나 넣은 값도 맞음)
    //  key: 속성 하나만, search: 상품 번호 또는 상품명
    //  속성 표가 100만 줄이 넘음 → 조건이 꼭 색인(idx_review = ga_checked, ga_conf)을 타게 씀 (안 타면 쿼리마다 2초+)
    public function attrIndex(Request $req) {
        $defs = GoodsAttr::defs();
        $done = $req->state === 'done';

        //  검수 대상 - "신뢰도 < 가장 높은 속성 기준"을 먼저 걸어 색인으로 대상 줄만 읽은 뒤 속성별 기준으로 거름
        $maxConf = max(array_column($defs, 'min_conf') ?: [1]);
        $target  = fn($q) => $q->where('a.ga_checked', 'N')->where('a.ga_conf', '<', $maxConf)->whereColumn('a.ga_conf', '<', 'd.ad_min_conf');

        $rows = DB::table('shop_goods_attr as a')->join('shop_goods_attr_def as d', 'd.ad_key', '=', 'a.ga_key')->where('d.ad_enable', 'Y');
        if ($done)
            $rows->whereIn('a.ga_checked', ['Y', 'X']);
        else
            $target($rows);
        if (isset($defs[$req->key]))
            $rows->where('a.ga_key', $req->key);
        if ($req->filled('search')) {
            $s = trim($req->search);
            ctype_digit($s) ? $rows->where('a.ga_gd_id', (int) $s)
                            : $rows->whereIn('a.ga_gd_id', DB::table('shop_goods')->where('gd_name', 'like', "%{$s}%")->select('gd_id'));
        }

        //  상품 묶음 - 검수 대상은 줄 많은 상품 먼저 (한 번에 많이 정리), 검수 끝은 최근 상품 번호 순
        $grp = (clone $rows)->select('a.ga_gd_id')->selectRaw('COUNT(*) AS cnt')->groupBy('a.ga_gd_id');
        if (!$done)
            $grp->orderByDesc('cnt');
        $page  = $grp->orderByDesc('a.ga_gd_id')->paginate(self::PER_GOODS);
        $gdIds = collect($page->items())->pluck('ga_gd_id')->all();

        //  보여 줄 모델 = 대상 줄이 있는 모델, 그 모델의 속성은 전부 (이미 검색에 쓰는 값도) - 모델 하나를 통째로 보고 판단
        //  저장하면 보이는 값이 모두 검수됨 → 사람이 손댄 모델·속성은 밤 규칙 작업이 지우거나 다시 넣지 않음
        $gmIds = (clone $rows)->whereIn('a.ga_gd_id', $gdIds)->distinct()->pluck('a.ga_gm_id')->all();
        $attrs = DB::table('shop_goods_attr as a')->join('shop_goods_attr_def as d', 'd.ad_key', '=', 'a.ga_key')->where('d.ad_enable', 'Y')
            ->whereIn('a.ga_gd_id', $gdIds)->whereIn('a.ga_gm_id', $gmIds)
            ->orderBy('a.ga_gm_id')->orderBy('d.ad_seq')->orderBy('a.ga_seq')
            ->get(['a.ga_id', 'a.ga_gd_id', 'a.ga_gm_id', 'a.ga_key', 'a.ga_seq', 'a.ga_from', 'a.ga_raw', 'a.ga_value', 'a.ga_num', 'a.ga_num_max', 'a.ga_op', 'a.ga_unit', 'a.ga_conf', 'a.ga_source', 'a.ga_checked']);
        $goods = DB::table('shop_goods as g')->leftJoin('shop_makers as mk', 'mk.mk_id', '=', 'g.gd_mk_id')
            ->whereIn('g.gd_id', $gdIds)->get(['g.gd_id', 'g.gd_name', 'g.gd_enable', 'mk.mk_name'])->keyBy('gd_id');
        $models = DB::table('shop_goods_model')->whereIn('gm_id', $attrs->pluck('ga_gm_id')->unique())
            ->get(['gm_id', 'gm_name', 'gm_code', 'gm_catno', 'gm_spec'])->keyBy('gm_id');

        $list = collect($page->items())->map(function ($p) use ($attrs, $goods, $models) {
            $g = $goods[$p->ga_gd_id] ?? null;
            return [
                'gd_id'   => $p->ga_gd_id,
                'gd_name' => $g->gd_name ?? '(삭제된 상품)',
                'enable'  => $g->gd_enable ?? 'N',
                'maker'   => $g->mk_name ?? '',
                'cnt'     => (int) $p->cnt,
                'models'  => $attrs->where('ga_gd_id', $p->ga_gd_id)->groupBy('ga_gm_id')->map(function ($rs, $gmId) use ($models) {
                    $m = $models[$gmId] ?? null;
                    return [
                        'gm_id'   => $gmId,
                        'name'    => $m->gm_name ?? '',
                        'code'    => $m->gm_code ?? '',
                        'catno'   => $m->gm_catno ?? '',
                        'spec'    => $m->gm_spec ?? '',
                        'attrs'   => $rs->values(),
                    ];
                })->values(),
            ];
        });

        $todo = $target(DB::table('shop_goods_attr as a')->join('shop_goods_attr_def as d', 'd.ad_key', '=', 'a.ga_key')->where('d.ad_enable', 'Y'))
            ->selectRaw('COUNT(*) AS n_rows, COUNT(DISTINCT ga_gd_id) AS n_goods')->first();
        return response()->json([
            'list'      => $list,
            'total'     => $page->total(),
            'last_page' => $page->lastPage(),
            'defs'      => collect($defs)->map(fn($d) => ['name' => $d['name'], 'unit' => $d['unit']]),
            'todo'      => ['rows' => (int) $todo->n_rows, 'goods' => (int) $todo->n_goods],
        ]);
    }

    //  상품 하나 저장 - items: [{ga_id, checked: Y|X, value: 고친 값(선택)}], adds: [{gm_id, key, value}] 빠진 값 추가
    //  → 그 상품 검색 색인 속성 칸 바로 갱신
    //  고친 값·추가한 값은 사람이 넣은 값(manual, 신뢰도 1) - 하나라도 못 읽으면 아무것도 저장하지 않음
    //  빼기는 지우지 않고 틀림(X)으로 남김 - 지우면 밤 규칙 작업이 같은 값을 다시 넣음
    public function attrSave(Request $req, int $gdId) {
        $items = (array) $req->input('items', []);
        $rows  = DB::table('shop_goods_attr')->where('ga_gd_id', $gdId)->whereIn('ga_id', array_column($items, 'ga_id'))->get()->keyBy('ga_id');

        $sets = $errors = [];
        foreach ($items as $it) {
            $r = $rows[$it['ga_id'] ?? 0] ?? null;
            if (!$r || !in_array($it['checked'] ?? '', ['Y', 'X']))
                continue;
            $set   = $this->checkedBy('ga', $it['checked']);
            $value = trim((string) ($it['value'] ?? ''));
            if ($it['checked'] === 'Y' && $value !== '' && $value !== $r->ga_value) {
                if (!$p = GoodsAttr::parse($r->ga_key, $value)) {
                    $errors[] = "\"{$value}\" - 읽을 수 없는 값 (예: 500ml, 1-10ul, ≥99.5%, 440x264x117mm)";
                    continue;
                }
                $set = $p + ['ga_source' => 'manual', 'ga_rule' => null, 'ga_conf' => 1] + $set;
            }
            $sets[$r->ga_id] = $set;
        }

        //  빠진 값 추가 - 이 상품의 모델, 사전에 있는 속성만
        $defs  = GoodsAttr::defs();
        $gmIds = DB::table('shop_goods_model')->where('gm_gd_id', $gdId)->pluck('gm_id')->all();
        $news  = [];
        foreach ((array) $req->input('adds', []) as $n) {
            $value = trim((string) ($n['value'] ?? ''));
            if ($value === '' || !in_array((int) ($n['gm_id'] ?? 0), $gmIds) || !isset($defs[$n['key'] ?? '']))
                continue;
            if (!$p = GoodsAttr::parse($n['key'], $value)) {
                $errors[] = "\"{$value}\" - 읽을 수 없는 값 (예: 500ml, 1-10ul, ≥99.5%, 440x264x117mm)";
                continue;
            }
            $news[] = ['ga_gd_id' => $gdId, 'ga_gm_id' => (int) $n['gm_id'], 'ga_key' => $n['key'], 'ga_from' => 'gm_spec', 'ga_raw' => mb_substr($value, 0, 200),
                       'ga_source' => 'manual', 'ga_rule' => null, 'ga_conf' => 1] + $p + $this->checkedBy('ga', 'Y');
        }

        if ($errors)
            return response()->json(['ok' => false, 'message' => implode("\n", $errors)]);
        if (!$sets && !$news)
            return response()->json(['ok' => false, 'message' => '저장할 것이 없습니다']);

        DB::transaction(function () use ($sets, $news) {
            foreach ($sets as $gaId => $set)
                DB::table('shop_goods_attr')->where('ga_id', $gaId)->update($set);
            foreach ($news as $row) {          //  순번은 그 모델·속성의 마지막 다음
                $seq = (int) DB::table('shop_goods_attr')->where('ga_gd_id', $row['ga_gd_id'])->where('ga_gm_id', $row['ga_gm_id'])
                    ->where('ga_key', $row['ga_key'])->lockForUpdate()->max('ga_seq');
                DB::table('shop_goods_attr')->insert($row + ['ga_seq' => $seq + 1]);
            }
        });
        return response()->json(['ok' => true, 'saved' => count($sets) + count($news), 'es' => GoodsAttr::pushEs($gdId)]);
    }

    //  검수 표시 칸 (sa_ / ga_ 공통)
    protected function checkedBy(string $p, string $checked): array {
        return ["{$p}_checked" => $checked, "{$p}_checked_id" => auth()->id(), "{$p}_checked_at" => now()];
    }
}
