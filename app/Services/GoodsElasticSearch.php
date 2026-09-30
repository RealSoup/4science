<?php

namespace App\Services;

use App\Models\Shop\Goods;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

//  상품 Elasticsearch 검색 공통 도구 - 웹(Shop\GoodsController)·관리자(Admin\Shop\GoodsController) 공용
//  검색어 매칭 규칙(buildQuery)을 공유하므로 고객에게 검색되는 상품은 관리자 검색에서도 동일하게 검색됨
class GoodsElasticSearch {
    const INDEX      = 'shop_goods';
    const MAX_WINDOW = 10000;      //  ES 조회 한도 (from + size)

    protected $client;

    public function __construct() {
        $this->client = app(\Elastic\Elasticsearch\Client::class);
    }

    //  ES 검색 실행, ES 장애 시 대체 함수(기존 Sphinx) 실행
    public static function withFallback(callable $es, callable $fallback, string $label = '') {
        try {
            return $es();
        } catch (\Elastic\Elasticsearch\Exception\ElasticsearchException | \Elastic\Transport\Exception\TransportException $e) {
            \Log::error("{$label} ES 검색 실패 → Sphinx 전환: " . $e->getMessage());
            return $fallback();
        }
    }

    public static function keyword($kw): string {
        return strtolower(trim($kw ?? ''));
    }

    //  캣넘버 검색인데 캣넘버 형식이 아닌지 (기존 Sphinx와 같은 기준)
    public static function invalidCatno(string $keyword, $mode): bool {
        return $keyword !== '' && $mode == 'cat_no' && !preg_match("/\d{2}-([\d-]{5,10})/", $keyword);
    }

    //  선택한 카테고리 경로 [21, 305] - ca01부터 이어진 단계까지만
    public static function catePath($req): array {
        $path = [];
        foreach (['ca01', 'ca02', 'ca03', 'ca04'] as $ca) {
            if (!(int) $req->$ca) break;
            $path[] = (int) $req->$ca;
        }
        return $path;
    }

    //  경로의 가장 깊은 단계 하나로 필터 (cate_path2 = "21_305") - 다중 카테고리 상품 포함
    public static function catePathFilter(array $path): ?array {
        return $path ? ['term' => ['cate_path' . count($path) => implode('_', $path)]] : null;
    }

    //  고객에게 노출되는 상품 조건
    public static function customerFilters(): array {
        return [
            ['term' => ['gd_enable' => 'Y']],
            ['term' => ['gd_type' => 'NON']],                                   //  렌탈 제외
            ['bool' => ['must_not' => [['term' => ['is_deleted' => true]]]]],   //  삭제 상품 제외
        ];
    }

    //  정렬 - hot(기본): 검색어 있으면 점수순, 없으면 관리자 지정 순서
    public static function sort($sort, bool $hasKeyword): array {
        return match($sort) {
            'new'     => [['gd_id'      => ['order' => 'desc']], '_score'],
            'edit'    => [['updated_at' => ['order' => 'desc']], '_score'],
            'lowPri'  => [['gm_price'   => ['order' => 'asc']],  '_score'],
            'highPri' => [['gm_price'   => ['order' => 'desc']], '_score'],
            default   => $hasKeyword
                ? ['_score']
                : [
                    ['gd_seq'      => ['order' => 'asc']],
                    ['gd_rank'     => ['order' => 'asc']],
                    ['gd_view_cnt' => ['order' => 'asc']],
                ],
        };
    }

    //  개인화 가산점 - 로그인 회원의 최근 30일 관심 대분류 상위 3개 (고객 검색 전용)
    public function personalizeFunctions(): array {
        if (!auth()->check()) return [];

        $userId   = auth()->id();
        $cacheKey = "user_preference:{$userId}";
        $cached   = Redis::get($cacheKey);
        $ca01List = $cached ? json_decode($cached, true) : [];

        if (empty($ca01List)) {
            $ca01List = DB::table('user_behavior_logs')
                ->where('created_id', $userId)
                ->whereIn('ubl_action_type', ['purchase', 'cart', 'view'])
                ->where('created_at', '>=', now()->subDays(30))
                ->whereNotNull('ubl_ca01')
                ->where('ubl_ca01', '!=', 0)
                ->selectRaw('ubl_ca01, COUNT(*) as cnt')
                ->groupBy('ubl_ca01')
                ->orderByDesc('cnt')
                ->limit(3)
                ->pluck('ubl_ca01')
                ->toArray();

            Redis::setex($cacheKey, 86400, json_encode($ca01List));
        }

        $functions = [];
        foreach ($ca01List as $i => $ca01) {
            $functions[] = [
                'filter' => ['term' => ['gc_ca01' => (int) $ca01]],
                'weight' => (int) (300 / ($i + 1)),
            ];
        }
        return $functions;
    }

    //  검색 쿼리 (고객·관리자 공통)
    //  키워드 없음: 필터만 / 모드 지정: 해당 필드만 / 캣넘버 형식: 코드 우선 / 그 외: 전체 검색 + 인기도
    public function buildQuery(string $keyword, $mode, array $filters, array $personalize = []): array {
        if ($keyword === '')
            return ['bool' => ['filter' => $filters]];

        if (!empty($mode)) {
            // 특정 필드만 검색
            $fieldMap = [
                'gd_name' => [
                    'bool' => [
                        'should' => [
                            ['match'        => ['gd_name'       => $keyword]],
                            ['match'        => ['gd_name.exact' => $keyword]],
                            ['match_phrase' => ['gd_name.exact' => $keyword]],
                        ],
                        'minimum_should_match' => 1,
                    ]
                ],
                'gm_name' => [
                    'bool' => [
                        'should' => [
                            ['match'        => ['gm_name'           => $keyword]],
                            ['match'        => ['gm_name.exact'     => ['query' => $keyword, 'boost' => 100]]],
                            ['match_phrase' => ['gm_name.exact'     => ['query' => $keyword, 'boost' => 500]]],
                            ['match'        => ['gm_name_all'       => $keyword]],
                            ['match'        => ['gm_name_all.exact' => ['query' => $keyword, 'boost' => 100]]],
                            ['match_phrase' => ['gm_name_all.exact' => ['query' => $keyword, 'boost' => 500]]],
                        ],
                        'minimum_should_match' => 1,
                    ]
                ],
                'gm_code' => [
                    'bool' => [
                        'should' => [
                            ['term'   => ['gm_code'             => $keyword]],
                            ['term'   => ['gm_code_all.keyword' => $keyword]],
                            ['prefix' => ['gm_code_all.keyword' => $keyword]],
                        ]
                    ]
                ],
                'cat_no'  => [
                    'bool' => [
                        'should' => [
                            ['prefix' => ['gm_catno'     => $keyword]],
                            ['match'  => ['gm_catno_all' => $keyword]],
                        ],
                    ],
                ],
                'maker' => [
                    'bool' => [
                        'should' => [
                            ['match'    => ['mk_name'         => $keyword]],
                            ['prefix'   => ['mk_name.keyword' => $keyword]],             // KAYAKU → KAYAKU(MICROCHEM)
                            ['wildcard' => ['mk_name.keyword' => '*' . $keyword . '*']], // 중간포함
                        ],
                        'minimum_should_match' => 1,
                    ]
                ],
            ];
            return [
                'bool' => [
                    'must'   => [$fieldMap[$mode] ?? ['match_all' => (object) []]],
                    'filter' => $filters,
                ],
            ];
        }

        $isCatnoPattern = (bool) preg_match('/^\d{2,}-\d+(-\d+)?$/', $keyword);

        if ($isCatnoPattern) {
            // 카탈로그 번호 패턴: korean analyzer 완전 배제, term/prefix만 사용
            return [
                'function_score' => [
                    'query' => ['bool' => [
                        'should' => [
                            ['term'   => ['gm_catno'             => $keyword]],
                            ['term'   => ['gm_catno_all.keyword' => $keyword]],
                            ['prefix' => ['gm_catno'             => $keyword]],
                            ['prefix' => ['gm_catno_all.keyword' => $keyword]],
                            ['term'   => ['gm_code'              => $keyword]],
                            ['term'   => ['gm_code_all.keyword'  => $keyword]],
                            ['prefix' => ['gm_code'              => $keyword]],
                            ['prefix' => ['gm_code_all.keyword'  => $keyword]],
                        ],
                        'minimum_should_match' => 1,
                        'filter' => $filters,
                    ]],
                    'functions' => array_merge([
                        ['filter' => ['term'   => ['gm_catno_all.keyword' => $keyword]], 'weight' => 100000],
                        ['filter' => ['term'   => ['gm_catno'             => $keyword]], 'weight' => 50000],
                        ['filter' => ['term'   => ['gm_code_all.keyword'  => $keyword]], 'weight' => 9000],
                        ['filter' => ['term'   => ['gm_code'              => $keyword]], 'weight' => 10000],
                        ['filter' => ['prefix' => ['gm_catno_all.keyword' => $keyword]], 'weight' => 10000],
                        ['filter' => ['prefix' => ['gm_code_all.keyword'  => $keyword]], 'weight' => 5000],
                    ], $personalize),
                    'score_mode' => 'sum',
                    'boost_mode' => 'sum',
                ],
            ];
        }

        // 전체 검색
        return [
            'function_score' => [
                'query' => ['bool' => [
                    'should' => [
                        [
                            'dis_max' => [
                                'tie_breaker' => 0.3,   // gd_name/gm_name_all 둘 다 매칭돼도 최고점+나머지30%만 인정 (중복가중 방지)
                                'queries' => [
                                    // ① 완전 구문 일치 (최고점)
                                    ['term'           => ['gd_name.keyword' => ['value' => $keyword, 'boost' => 500]]],
                                    ['constant_score' => ['filter' => ['match_phrase' => ['gd_name.exact' => ['query' => $keyword]]], 'boost' => 300]],
                                    ['constant_score' => ['filter' => ['match_phrase' => ['gm_name_all'   => ['query' => $keyword, 'analyzer' => 'korean_exact']]], 'boost' => 200]],

                                    // ② 모든 토큰 포함 (AND)
                                    ['match'          => ['gd_name' => ['query' => $keyword, 'analyzer' => 'korean_exact', 'operator' => 'and', 'boost' => 50]]],
                                    ['match'          => ['gd_name' => ['query' => $keyword, 'analyzer' => 'korean_search', 'operator' => 'and', 'boost' => 50]]],   // 동의어 매칭
                                    ['constant_score' => ['filter' => ['match' => ['gm_name_all' => ['query' => $keyword, 'analyzer' => 'korean_exact', 'operator' => 'and']]], 'boost' => 40]],
                                    ['constant_score' => ['filter' => ['match' => ['gm_name_all' => ['query' => $keyword, 'analyzer' => 'korean_search', 'operator' => 'and']]], 'boost' => 40]],  // 동의어 매칭
                                    ['constant_score' => ['filter' => ['match' => ['gm_name_all.exact' => ['query' => $keyword, 'operator' => 'and']]], 'boost' => 60]],

                                    // ③ 개별 토큰 OR 매칭 (낮은 점수)
                                    ['match'          => ['gd_name' => ['query' => $keyword, 'analyzer' => 'korean_exact', 'boost' => 5]]],
                                    ['match'          => ['gd_name' => ['query' => $keyword, 'analyzer' => 'korean_search', 'boost' => 4]]],  //  동의어 매칭 (operator 없음 = OR)
                                ],
                            ],
                        ],

                        // gd_keyword (이름 매칭과 별개로 유지)
                        ['match' => ['gd_keyword' => ['query' => $keyword, 'analyzer' => 'korean_exact', 'operator' => 'and', 'boost' => 30]]],
                        ['match' => ['gd_keyword' => ['query' => $keyword, 'analyzer' => 'korean_search', 'operator' => 'and', 'boost' => 30]]],    // 동의어 매칭
                        ['match' => ['gd_keyword' => ['query' => $keyword, 'analyzer' => 'korean_exact', 'boost' => 3]]],
                        ['match' => ['mk_name'    => ['query' => $keyword, 'analyzer' => 'korean_exact', 'boost' => 3]]],

                        // ④ 코드/카탈로그 (term/prefix만)
                        ['term'   => ['gm_catno'             => $keyword]],
                        ['prefix' => ['gm_catno'             => $keyword]],
                        ['term'   => ['gm_code'              => $keyword]],
                        ['prefix' => ['gm_code'              => $keyword]],
                        ['term'   => ['gm_code_all.keyword'  => $keyword]],
                        ['prefix' => ['gm_code_all.keyword'  => $keyword]],
                        ['term'   => ['mk_name.keyword'      => $keyword]],

                        // ⑤ 오타 허용 (낮은 boost)
                        [
                            'multi_match' => [
                                'query'          => $keyword,
                                'fields'         => ['gd_name^3', 'gm_name_all', 'mk_name^2'],
                                'fuzziness'      => 'AUTO',
                                'prefix_length'  => 2,
                                'max_expansions' => 50,
                                'boost'          => 0.5,
                                'type'           => 'best_fields',
                            ],
                        ],
                    ],
                    'minimum_should_match' => 1,
                    'filter' => $filters,
                ]],
                'functions' => array_merge([

                    // 1순위 카탈로그 정확일치
                    [ 'filter' => ['term'       => ['gm_catno_all.keyword' => $keyword]],   'weight' => 100000],
                    [ 'filter' => ['term'       => ['gm_catno' => $keyword]],               'weight' => 10000, ],
                    [ 'filter' => ['prefix'     => ['gm_catno' => $keyword]],               'weight' => 5000, ],

                    // 2순위 모델코드 정확일치
                    [ 'filter' => ['term'       => ['gm_code' => $keyword]],                'weight' => 10000, ],
                    [ 'filter' => ['prefix'     => ['gm_code' => $keyword]],                'weight' => 5000, ],
                    [ 'filter' => ['wildcard'   => ['gm_code' => '*' . $keyword]],          'weight' => 8000, ],
                    [ 'filter' => ['term'       => ['gm_code_all.keyword'  => $keyword]],   'weight' => 9000],
                    [ 'filter' => ['prefix'     => ['gm_code_all.keyword' => $keyword]],    'weight' => 5000],

                    // 3순위 제조사명 완전일치
                    [ 'filter' => ['term'       => ['mk_name.keyword' => $keyword]],        'weight' => 10000, ],
                    [ 'filter' => ['match'      => ['mk_name' => $keyword]],                'weight' => 3000, ],

                    // 4순위 - 키워드 태그 매칭 (gd_name/gm_name_all로 이미 안 잡힐 때만 보완용으로 적용)
                    [
                        'filter' => [
                            'bool' => [
                                'must' => [
                                    ['match' => ['gd_keyword' => $keyword]],
                                ],
                                'must_not' => [
                                    ['match' => ['gd_name'     => ['query' => $keyword, 'analyzer' => 'korean_exact', 'operator' => 'and']]],
                                    ['match' => ['gm_name_all' => ['query' => $keyword, 'analyzer' => 'korean_exact', 'operator' => 'and']]],
                                ],
                            ],
                        ],
                        'weight' => 5000,
                    ],

                    // 5순위 - 구문일치 전용 weight
                    [ 'filter' => ['match_phrase' => ['gm_name_all' => ['query' => $keyword, 'analyzer' => 'korean_exact']]],  'weight' => 3000, ],

                    // 6순위 - 인기도 (factor 100, 최대 +3000)
                    [ 'field_value_factor' => [ 'field' => 'purchase_score', 'factor' => 100, 'modifier' => 'none', 'missing' => 0, ], ],

                ], $personalize),
                'score_mode' => 'sum',
                'boost_mode' => 'sum',
            ],
        ];
    }

    //  ES 검색 (결과는 gd_id만 받음 - 상품 정보는 DB에서 조회)
    public function search(array $body) {
        $body['_source'] = $body['_source'] ?? ['gd_id'];
        return $this->client->search(['index' => self::INDEX, 'body' => $body]);
    }

    //  페이지 검색 - 조회 한도·결과 범위를 넘는 페이지는 마지막 페이지로 보정
    //  반환: [ES 결과, 총개수, 실제 페이지]
    public function searchPage(array $body, int $page, int $perPage): array {
        $maxPage = max(1, intdiv(self::MAX_WINDOW, $perPage));
        $page    = min(max(1, $page), $maxPage);

        $body = array_merge($body, [
            'from' => ($page - 1) * $perPage,
            'size' => $perPage,
            'track_total_hits' => true,
        ]);
        $result = $this->search($body);

        $total = $result->asArray()['hits']['total']['value'];
        if ($total > 0 && $body['from'] >= $total) {
            $page = (int) min(ceil($total / $perPage), $maxPage);
            $body['from'] = ($page - 1) * $perPage;
            $result = $this->search($body);
        }
        return [$result, $total, $page];
    }

    //  ES 결과 순서대로 상품 조회
    public function goods($result, bool $withTrashed = false) {
        $ids = collect($result->asArray()['hits']['hits'])->pluck('_source.gd_id')->map(fn($v) => (int) $v);
        if ($ids->isEmpty())
            return collect();

        return Goods::query()
            ->when($withTrashed, fn($q) => $q->withTrashed())
            ->with(['maker', 'goodsModelPrime', 'goodsCategoryFirst'])
            ->whereIn('gd_id', $ids)
            ->orderByRaw('FIELD(gd_id, ' . $ids->implode(',') . ')')
            ->get();
    }
}