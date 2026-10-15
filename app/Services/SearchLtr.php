<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

//  검색 순서 학습 (AI 검색 2-5 ②) - 손님이 실제로 고른 상품(클릭 1 · 장바구니/견적 2 · 결제 3)으로 매주 배운 모델이 ES 1~50등을 다시 줄 세움
//  · 학습: 매주 일요일 search:ltr-train (web01 파이썬 숙제) → 지난주 기록 모의고사를 통과한 모델만 storage/app/ltr에 들어옴 (SearchLtrModel)
//  · 재료(FEATURES)는 이 파일 한 곳에서만 계산 - 학습 숙제와 손님 검색이 같은 코드를 씀
//  · 검색어와 상품이 맞는지는 ES에 이름표 붙인 조건(named query)으로 같이 물어봄 → 검색과 같은 분석기로 판정, ES 점수·결과는 그대로
//  · 쓰는 때: SEARCH_LTR 켜짐 + 통과한 모델 있음 + 인기상품순 검색어 검색 + 1~50등이 보이는 쪽 (1~4쪽), 오류가 나면 원래 순서 그대로
class SearchLtr {
    const TOP = 50;     //  다시 줄 세우는 범위 - ES 1~50등 안에서만 바꾸고 51등부터는 그대로

    //  재료 이름 => 상식 울타리 (1: 값이 크면 손해 보지 않음 / -1: 값이 작으면 손해 보지 않음 / 0: 자유)
    //  울타리 = 기록이 적어도 "규격이 맞는데 내려간다" 같은 엉뚱한 규칙을 못 배우게 막음
    //  이름이나 순서를 바꾸면 쓰던 모델은 자동으로 쉬고(이름 검사), 다음 주 학습부터 새 재료로 배움
    const FEATURES = [
        'es_score'   => 1,      //  ES 점수
        'es_rank'    => -1,     //  ES 등수 (1~50, 그 밖이면 51)
        'es_ratio'   => 1,      //  ES 점수 ÷ 1등 점수
        'm_phrase'   => 1,      //  상품명에 검색어가 그대로 (붙은 말 그대로)
        'm_name'     => 1,      //  상품명에 단어가 모두
        'm_name_syn' => 1,      //  상품명에 단어가 모두 (동의어 포함)
        'm_model'    => 1,      //  모델명에 단어가 모두
        'm_keyword'  => 1,      //  키워드 칸에 단어가 모두
        'm_words'    => 1,      //  단어가 하나씩 상품 어딘가(상품명·모델명·키워드·제조사)에 모두
        'm_maker'    => 1,      //  제조사 이름이 검색어와 맞음
        'm_code'     => 1,      //  모델코드·캣넘버가 검색어와 같거나 검색어로 시작
        'm_spec'     => 1,      //  규격·속성이 맞음 ("비커 500ml"의 500ml) - 규격 가산점과 같은 조건
        'sr_score'   => 1,      //  자리 보정 점수 (la_search_rank) - 이 검색어에서 자리에 비해 많이 고른 정도
        'sr_clicks'  => 0,      //    클릭한 손님 수
        'sr_carts'   => 0,      //    장바구니·견적 손님 수
        'sr_orders'  => 0,      //    결제한 손님 수
        'sr_seen'    => 0,      //    본 손님 수
        'sr_avg_pos' => 0,      //    본 자리 평균 (기록 없으면 빈 값)
        'pop'        => 0,      //  전체 인기도 (purchase_score - 조회·주문·견적, search:update-score)
        'views'      => 0,      //  조회수 (log10)
        'price'      => 0,      //  대표 모델 가격 (log10)
        'models'     => 0,      //  모델 수
        'age_days'   => 0,      //  등록 후 지난 날
        'admin_pick' => 0,      //  관리자 지정 상품 (포사의 PICK 후보, gd_seq ≠ 999999)
        'q_words'    => 0,      //  검색어 단어 수
        'q_spec'     => 0,      //  검색어에 규격 숫자 (500ml 등)
        'q_hangul'   => 0,      //  검색어에 한글
        'q_total'    => 0,      //  검색 결과 수 (log10)
    ];

    //  재료 계산에 필요한 상품 칸 (ES _source)
    const SOURCE = ['gd_id', 'purchase_score', 'gd_view_cnt', 'gm_price', 'gm_code_all', 'created_at', 'gd_seq'];

    public static function names(): array {
        return array_keys(self::FEATURES);
    }

    //  다시 줄 세울 수 있는 검색인지 - 인기상품순 검색어 검색만 (칸 지정·캣넘버 번호·가격순·신상품순 제외)
    //  자리 보정 가산점(SEARCH_RANK_WEIGHT)을 켜면 ES 점수가 학습 때와 달라지므로 둘 중 하나만 씀
    public static function usable(string $keyword, $mode, $sort): bool {
        return $keyword !== '' && empty($mode) && ($sort ?: 'hot') === 'hot' && !self::isCatno($keyword)
            && (int) config('search.rank_weight', 0) <= 0;
    }

    //  캣넘버 번호 검색 ("12-345-67") - 번호 일치 순서 그대로 둠 (GoodsElasticSearch::buildQuery와 같은 판별)
    public static function isCatno(string $keyword): bool {
        return (bool) preg_match('/^\d{2,}-\d+(-\d+)?$/', $keyword);
    }

    //  손님 검색 다시 줄 세우기 - [이 쪽에 보여 줄 상품 번호들, 모델 버전], 못 쓰면 null (원래 순서 그대로)
    //  $query·$postFilters: 손님 검색과 같은 쿼리·거르기 (로그인 손님 관심 분류 가산점이 ES 점수에 조금 섞임 - 학습 재료에는 없음)
    //  $pageIds: 원래 순서로 받은 이 쪽 상품 (4쪽의 51등~ 자리는 이것으로 채움)
    public static function rerank(GoodsElasticSearch $es, array $query, array $postFilters, string $keyword, $mode, $sort, int $page, int $perPage, int $total, array $pageIds): ?array {
        if (!config('search.ltr.on') || !self::usable($keyword, $mode, $sort) || ($page - 1) * $perPage >= self::TOP || $total < 2)
            return null;

        try {
            if (!$model = SearchLtrModel::current())
                return null;

            $docs = self::docs($es->search([
                'size'        => self::TOP,
                'query'       => self::withNamed($query, $keyword),
                'post_filter' => ['bool' => ['filter' => $postFilters]],
                '_source'     => self::SOURCE,
                'track_total_hits' => false,
            ])->asArray()['hits']['hits']);
            if (count($docs) < 2)
                return null;

            $sr     = DB::table('search_rank')->where('sr_keyword', $keyword)->get()->keyBy('sr_gd_id')->map(fn($r) => (array) $r)->all();
            $scores = $model->predict(self::rows($keyword, $docs, reset($docs)['score'], $total, $sr, time()));

            $ids  = array_keys($docs);                  //  ES 순서
            $rank = array_flip($ids);
            usort($ids, fn($a, $b) => [$scores[$b], $rank[$a]] <=> [$scores[$a], $rank[$b]]);     //  점수 높은 순, 같으면 ES 순서

            $rest = array_values(array_diff(array_map('intval', $pageIds), $ids));      //  51등부터 (원래 순서)
            return ['ids' => array_slice(array_merge($ids, $rest), ($page - 1) * $perPage, $perPage), 'version' => $model->version];
        } catch (\Throwable $e) {
            \Log::error('검색 순서 학습 적용 실패: ' . $e->getMessage());
            return null;
        }
    }

    //  검색 쿼리 + 이름표 조건 - 이름표 조건은 점수 0(filter)이라 결과·점수·순서는 원래 쿼리와 같고, 상품마다 맞은 이름표만 matched_queries로 받음
    public static function withNamed(array $query, string $keyword): array {
        $should = [];
        foreach (self::named($keyword) as $name => $q)
            $should[] = ['bool' => ['filter' => [$q], '_name' => $name]];
        return ['bool' => ['must' => [$query], 'should' => $should]];
    }

    //  이름표 조건 (m_* 재료) - 검색 쿼리(GoodsElasticSearch::buildQuery)와 같은 칸·분석기
    public static function named(string $keyword): array {
        $exact = ['query' => $keyword, 'analyzer' => 'korean_exact', 'operator' => 'and'];
        $specs = SearchSpec::tokens($keyword, SearchSpec::makers());
        $named = [
            'm_phrase'   => ['match_phrase' => ['gd_name.exact' => ['query' => $keyword]]],
            'm_name'     => ['match' => ['gd_name' => $exact]],
            'm_name_syn' => ['match' => ['gd_name' => ['analyzer' => 'korean_search'] + $exact]],
            'm_model'    => ['match' => ['gm_name_all' => $exact]],
            'm_keyword'  => ['match' => ['gd_keyword' => $exact]],
            'm_words'    => ['bool' => ['must' => SearchSpec::wordsMatch(SearchSpec::without($keyword, $specs))]],
            'm_maker'    => ['match' => ['mk_name' => $keyword]],
            'm_code'     => ['bool' => ['should' => [
                ['term'   => ['gm_code_all.keyword'  => $keyword]],
                ['prefix' => ['gm_code_all.keyword'  => $keyword]],
                ['term'   => ['gm_catno_all.keyword' => $keyword]],
                ['prefix' => ['gm_catno'             => $keyword]],
            ], 'minimum_should_match' => 1]],
        ];
        if ($spec = SearchSpec::functions($keyword, 1))         //  규격 가산점 조건 그대로 (규격 + 나머지 단어)
            $named['m_spec'] = $spec[0]['filter'];
        return $named;
    }

    //  ES 결과 → [gd_id => [score, rank, src, matched]] (ES 순서, 등수는 $firstRank부터)
    public static function docs(array $hits, int $firstRank = 1): array {
        $docs = [];
        foreach ($hits as $i => $h)
            $docs[(int) $h['_id']] = [
                'score'   => (float) $h['_score'],
                'rank'    => $firstRank + $i,
                'src'     => $h['_source'] ?? [],
                'matched' => $h['matched_queries'] ?? [],
            ];
        return $docs;
    }

    //  재료 줄 만들기 - [gd_id => 재료 값 목록 (FEATURES 순서, 없는 값 null)]
    //  $topScore: 1등 ES 점수 / $total: 검색 결과 수 / $sr: [gd_id => la_search_rank 줄(배열)] / $at: 기준 시각 (손님 검색 = 지금, 학습 = 검색한 날)
    public static function rows(string $keyword, array $docs, float $topScore, int $total, array $sr, int $at): array {
        $query = [
            'q_words'  => count(preg_split('/\s+/u', trim($keyword), -1, PREG_SPLIT_NO_EMPTY)),
            'q_spec'   => SearchSpec::tokens($keyword, SearchSpec::makers()) ? 1 : 0,
            'q_hangul' => preg_match('/[가-힣ㄱ-ㅎㅏ-ㅣ]/u', $keyword) ? 1 : 0,
            'q_total'  => log10(max(0, $total) + 1),
        ];

        $rows = [];
        foreach ($docs as $gd => $d) {
            $s = $d['src'];
            $m = array_flip($d['matched']);
            $r = $sr[$gd] ?? null;
            $f = $query + [
                'es_score'   => $d['score'],
                'es_rank'    => min($d['rank'], self::TOP + 1),
                'es_ratio'   => $topScore > 0 ? $d['score'] / $topScore : 0,
                'sr_score'   => (float) ($r['sr_score'] ?? 0),
                'sr_clicks'  => (int) ($r['sr_clicks'] ?? 0),
                'sr_carts'   => (int) ($r['sr_carts'] ?? 0),
                'sr_orders'  => (int) ($r['sr_orders'] ?? 0),
                'sr_seen'    => (int) ($r['sr_seen'] ?? 0),
                'sr_avg_pos' => isset($r['sr_avg_pos']) ? (float) $r['sr_avg_pos'] : null,
                'pop'        => (float) ($s['purchase_score'] ?? 0),
                'views'      => log10(abs((float) ($s['gd_view_cnt'] ?? 0)) + 1),       //  조회수는 음수로 저장됨
                'price'      => log10(max(0, (float) ($s['gm_price'] ?? 0)) + 1),
                'models'     => count((array) ($s['gm_code_all'] ?? [])),
                'age_days'   => isset($s['created_at']) ? max(0, ($at - (int) $s['created_at']) / 86400) : null,
                'admin_pick' => (int) ($s['gd_seq'] ?? 999999) !== 999999 ? 1 : 0,
            ];
            foreach (self::FEATURES as $name => $_)
                if (str_starts_with($name, 'm_'))
                    $f[$name] = isset($m[$name]) ? 1 : 0;

            $rows[$gd] = array_map(fn($n) => $f[$n], self::names());
        }
        return $rows;
    }
}
