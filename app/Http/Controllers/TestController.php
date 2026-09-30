<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\MerckImport;
use Illuminate\Support\Facades\Redis;
use App\Models\{EngReform};
use App\Models\Shop\{Goods, Category, GoodsCategory, Order};
use DB;
use Excel;

class TestController extends Controller {

    public function search_test (Request $req) {
        // abort_if((!$req->filled('ca01') && !$req->filled('keyword')), 501, '검색값이 없습니다.');
        abort_if((
            ($req->filled('ca01') && Category::where('ca_id', $req->ca01)->doesntExist()) ||
            ($req->filled('ca02') && Category::where('ca_id', $req->ca02)->doesntExist()) ||
            ($req->filled('ca03') && Category::where('ca_id', $req->ca03)->doesntExist()) ||
            ($req->filled('ca04') && Category::where('ca_id', $req->ca04)->doesntExist()) 
        ), 501, '존재 하지 않는 카테고리 입니다.');

        $data['categorys'] = Category::getSelectedCate( $req->filled('ca01') ? $req->ca01 : 0, 
                                                        $req->filled('ca02') ? $req->ca02 : 0, 
                                                        $req->filled('ca03') ? $req->ca03 : 0 );
        
        $page    = max(1, (int) ($req->page ?? 1));
        $perPage = $req->filled('limit') ? (int) $req->limit : 15;     //  limit: 메인 베스트 개수 지정
        $offset  = ($page - 1) * $perPage;
        $keyword = strtolower(trim($req->keyword ?? ''));

        //  캣넘버 검색인데 캣넘버 형식이 아니면 (기존 Sphinx와 같은 응답)
        if ($req->filled('keyword') && $req->mode == 'cat_no' && !preg_match("/\d{2}-([\d-]{5,10})/", $keyword))
            return response()->json('no-catno');

        $isCatnoPattern = (bool) preg_match('/^\d{2,}-\d+(-\d+)?$/', $keyword);
        //  카테고리·제조사 → post_filter
        //  목록·총개수에만 적용, 사이드바 카테고리 개수(aggs)에는 미적용 (기존 Sphinx와 동일)
        $postFilters = array_values(array_filter([
            $req->filled('ca01') ? ['term' => ['gc_ca01' => (int)$req->ca01]] : null,
            $req->filled('ca02') ? ['term' => ['gc_ca02' => (int)$req->ca02]] : null,
            $req->filled('ca03') ? ['term' => ['gc_ca03' => (int)$req->ca03]] : null,
            $req->filled('ca04') ? ['term' => ['gc_ca04' => (int)$req->ca04]] : null,
            $req->filled('mk_id') ? ['term' => ['gd_mk_id' => (int)$req->mk_id]] : null,
        ]));        

        //  기본 필터 → query (검색·집계 모두 적용)
        $filters = [
            ['term' => ['gd_enable' => 'Y']],
            ['term' => ['gd_type' => 'NON']],      //  렌탈 제외
        ];
        
        // ✅ 정렬 설정
        $req->merge(['sort' => $req->sort ?? 'hot']);
        $sort = match($req->sort) {
            'new'     => [['gd_id'      => ['order' => 'desc']], '_score'],
            'lowPri'  => [['gm_price'   => ['order' => 'asc']],  '_score'],
            'highPri' => [['gm_price'   => ['order' => 'desc']], '_score'],
            default   => $req->filled('keyword')
                ? ['_score']
                //  키워드 없이 카테고리만 볼 때는 점수가 모두 같으므로 기존(Sphinx)과 같은 순서
                : [
                    ['gd_seq'      => ['order' => 'asc']],
                    ['gd_rank'     => ['order' => 'asc']],
                    ['gd_view_cnt' => ['order' => 'asc']],
                ],
        };

        // 개인화 boost 함수 생성
        $personalizeFunctions = [];
        if (auth()->check()) {
            $userId = auth()->id();
            $cacheKey = "user_preference:{$userId}";

            $cached = Redis::get($cacheKey);
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

            foreach ($ca01List as $i => $ca01) {
                $personalizeFunctions[] = [
                    'filter' => ['term' => ['gc_ca01' => (int)$ca01]],
                    'weight' => (int)(300 / ($i + 1)),
                ];
            }
        }

        $searchQuery = [];
        if ($req->filled('keyword')) {
        
            if (if_not_my_ip($req->ip()))
                event(new \App\Events\GoodsSearch($req->keyword, auth()->check() ? auth()->user()->id : 0, $req->ip(), $req->filled('referer')?$req->referer:''));  //  검색어 데이터화
        
            if ($req->filled('mode')) {
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
                        // ... 나머지 그대로
                        'bool' => [
                            'should' => [
                                ['term'  => ['gm_code'             => $keyword]],
                                ['term'  => ['gm_code_all.keyword' => $keyword]],
                                ['prefix' => ['gm_code_all.keyword'=> $keyword]],
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
                                ['prefix'   => ['mk_name.keyword' => $keyword]],          // [추가] KAYAKU → KAYAKU(MICROCHEM)
                                ['wildcard' => ['mk_name.keyword' => '*' . $keyword . '*']], // [추가] 중간포함
                            ],
                            'minimum_should_match' => 1,
                        ]
                    ],
                ];
                $modeQuery = $fieldMap[$req->mode] ?? ['match_all' => (object)[]];
                $searchQuery = [
                    'bool' => [
                        'must'   => [$modeQuery],
                        'filter' => $filters,
                    ],
                ];

            } elseif ($isCatnoPattern) {
                // 카탈로그 번호 패턴: korean analyzer 완전 배제, term/prefix만 사용
                $catnoClause = [
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
                ];

                $searchQuery = [
                    'function_score' => [
                        'query' => ['bool' => $catnoClause],
                        'functions' => array_merge([
                            ['filter' => ['term'   => ['gm_catno_all.keyword' => $keyword]], 'weight' => 100000],
                            ['filter' => ['term'   => ['gm_catno'             => $keyword]], 'weight' => 50000],
                            ['filter' => ['term'   => ['gm_code_all.keyword'  => $keyword]], 'weight' => 9000],
                            ['filter' => ['term'   => ['gm_code'              => $keyword]], 'weight' => 10000],
                            ['filter' => ['prefix' => ['gm_catno_all.keyword' => $keyword]], 'weight' => 10000],
                            ['filter' => ['prefix' => ['gm_code_all.keyword'  => $keyword]], 'weight' => 5000],
                        ], $personalizeFunctions),
                        'score_mode' => 'sum',
                        'boost_mode' => 'sum',
                    ],
                ];
            } else {    // 전체 검색

                $boolClause = [
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
                                'fields'         => [
                                    'gd_name^3', 
                                    'gm_name_all',
                                    'mk_name^2'
                                ],
                                'fuzziness'      => 'AUTO',
                                'prefix_length'  => 2,
                                'max_expansions' => 50,
                                'boost'          => 0.5,
                                'type'           => 'best_fields',
                            ],
                        ],
                    ],
                    'minimum_should_match' => 1,
                ];
                
                if (!empty($filters)) {
                    $boolClause['filter'] = $filters;
                }
                
                $searchQuery = [
                    'function_score' => [
                        'query' => ['bool' => $boolClause],
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

                            // 6순위 - 인기도 (factor 100 그대로, 최대 +2000)
                            [ 'field_value_factor' => [ 'field' => 'purchase_score', 'factor' => $isCatnoPattern ? 0 : 100, 'modifier' => 'none', 'missing' => 0, ], ],
                            
                        ], $personalizeFunctions),
                        'score_mode' => 'sum',
                        'boost_mode' => 'sum',
                    ],
                ];
            }
        } else {
            if ($req->filled('ca01'))
                $data['category_picks'] = json_decode(Redis::get('best_cate'), true)[$req->ca01] ?? [];

            // ✅ keyword 없을 때: 카테고리 필터만으로 조회
            $searchQuery = !empty($filters)
                ? ['bool' => ['filter' => $filters]]
                : ['match_all' => (object)[]];
        }

        $aggs = [
            'ca01_list' => [
                'terms' => ['field' => 'gc_ca01', 'size' => 100],
                'aggs'  => ['gd_count' => ['value_count' => ['field' => 'gd_id']]],
            ],
        ];

        if ($req->filled('ca01')) {
            $aggs['ca02_list'] = [
                'filter' => ['term' => ['gc_ca01' => (int)$req->ca01]],
                'aggs'   => [
                    'by_ca02' => [
                        'terms' => ['field' => 'gc_ca02', 'size' => 100],
                        'aggs'  => ['gd_count' => ['value_count' => ['field' => 'gd_id']]],
                    ],
                ],
            ];
        }

        if ($req->filled('ca02')) {
            $aggs['ca03_list'] = [
                'filter' => ['bool' => ['filter' => [
                    ['term' => ['gc_ca01' => (int)$req->ca01]],
                    ['term' => ['gc_ca02' => (int)$req->ca02]],
                ]]],
                'aggs' => [
                    'by_ca03' => [
                        'terms' => ['field' => 'gc_ca03', 'size' => 100],
                        'aggs'  => ['gd_count' => ['value_count' => ['field' => 'gd_id']]],
                    ],
                ],
            ];
        }

        if ($req->filled('ca03')) {
            $aggs['maker_list'] = [
                'filter' => ['bool' => ['filter' => [
                    ['term' => ['gc_ca01' => (int)$req->ca01]],
                    ['term' => ['gc_ca02' => (int)$req->ca02]],
                    ['term' => ['gc_ca03' => (int)$req->ca03]],
                ]]],
                'aggs' => [
                    'by_maker' => [
                        'terms' => ['field' => 'gd_mk_id', 'size' => 100],
                        'aggs'  => ['gd_count' => ['value_count' => ['field' => 'gd_id']]],
                    ],
                ],
            ];
        }


        //  ES는 from+size 10000까지만 조회 가능 → 넘으면 조회 가능한 마지막 페이지로
        $maxWindow = 10000;
        if ($offset + $perPage > $maxWindow) {
            $page   = max(1, intdiv($maxWindow, $perPage));
            $offset = ($page - 1) * $perPage;
        }

        $body = [
            'from'        => $offset,
            'size'        => $perPage,
            'query'       => $searchQuery,
            'post_filter' => ['bool' => ['filter' => $postFilters]],
            'sort'        => $sort,
            'track_total_hits' => true,
            'aggs'        => $aggs,
        ];
        $client = app(\Elastic\Elasticsearch\Client::class);
        $result = $client->search(['index' => 'shop_goods', 'body' => $body]);

        //  요청 페이지가 결과 범위를 넘으면 마지막 페이지로 다시 조회
        $total = $result->asArray()['hits']['total']['value'];
        if ($total > 0 && $offset >= $total) {
            $page   = (int) min(ceil($total / $perPage), intdiv($maxWindow, $perPage));
            $offset = ($page - 1) * $perPage;
            $body['from'] = $offset;
            $result = $client->search(['index' => 'shop_goods', 'body' => $body]);
        }

        $items = $this->goodsByEsHits($result);

        if ($req->filled('limit')) {    //  메인 베스트 - 페이징 없이 목록만
            $data['list'] = $items;
        } else {
            $data['list'] = new \Illuminate\Pagination\LengthAwarePaginator(
                $items, $total, $perPage, $page,
                ['path' => $req->url(), 'query' => $req->query()]
            );

            //  할인가 적용 (딜러가 / 상품할인)
            foreach ($data['list'] as $v)
                $v->goods_discount_checker($v->goodsModelPrime, $v->gd_dc);

            //  포사의 PICK - 같은 검색조건 중 관리자 지정 순서(gd_seq)가 있는 상품 12개
            $pickResult = $client->search([
                'index' => 'shop_goods',
                'body'  => [
                    'size'  => 12,
                    'query' => ['bool' => [
                        'must'     => [$searchQuery],
                        'filter'   => $postFilters,
                        'must_not' => [['term' => ['gd_seq' => 999999]]],
                    ]],
                    'sort'  => [
                        ['gd_seq'      => ['order' => 'asc']],
                        ['gd_rank'     => ['order' => 'asc']],
                        ['gd_view_cnt' => ['order' => 'asc']],
                    ],
                ],
            ]);
            $pick_data = $this->goodsByEsHits($pickResult);
            if (count($pick_data)) {
                $data['pick'][0] = $pick_data->take(6);
                if (count($pick_data) > 6)
                    $data['pick'][1] = $pick_data->skip(6)->take(6);
            }
        }





        if ($req->filled('keyword')) {
            $aggResult = $result->asArray()['aggregations'] ?? [];

            // ca01 목록
            if (!empty($aggResult['ca01_list']['buckets'])) {
                $ids = collect($aggResult['ca01_list']['buckets'])->pluck('key');
                $names = Category::whereIn('ca_id', $ids)->pluck('ca_name', 'ca_id');

                $data['sch_cate_info']['all'] = collect($aggResult['ca01_list']['buckets'])
                    ->sum(fn($b) => $b['gd_count']['value']);

                $data['sch_cate_info']['ca01'] = collect($aggResult['ca01_list']['buckets'])
                    ->map(fn($b) => [
                        'key'  => $b['key'],
                        'name' => $names[$b['key']] ?? '',
                        'cnt'  => $b['gd_count']['value'],
                    ])->toArray();
            }

            // ca02 목록
            if (!empty($aggResult['ca02_list']['by_ca02']['buckets'])) {
                $ids = collect($aggResult['ca02_list']['by_ca02']['buckets'])->pluck('key');
                $names = Category::whereIn('ca_id', $ids)->pluck('ca_name', 'ca_id');

                $data['sch_cate_info']['ca02'] = collect($aggResult['ca02_list']['by_ca02']['buckets'])
                    ->map(fn($b) => [
                        'key'  => $b['key'],
                        'name' => $names[$b['key']] ?? '',
                        'cnt'  => $b['gd_count']['value'],
                    ])->toArray();
            }

            // ca03 목록
            if (!empty($aggResult['ca03_list']['by_ca03']['buckets'])) {
                $ids = collect($aggResult['ca03_list']['by_ca03']['buckets'])->pluck('key');
                $names = Category::whereIn('ca_id', $ids)->pluck('ca_name', 'ca_id');

                $data['sch_cate_info']['ca03'] = collect($aggResult['ca03_list']['by_ca03']['buckets'])
                    ->map(fn($b) => [
                        'key'  => $b['key'],
                        'name' => $names[$b['key']] ?? '',
                        'cnt'  => $b['gd_count']['value'],
                    ])->toArray();
            }

            // maker 목록
            if (!empty($aggResult['maker_list']['by_maker']['buckets'])) {
                $ids = collect($aggResult['maker_list']['by_maker']['buckets'])->pluck('key');
                $names = \App\Models\Shop\Maker::whereIn('mk_id', $ids)->pluck('mk_name', 'mk_id');

                $data['sch_cate_info']['maker'] = collect($aggResult['maker_list']['by_maker']['buckets'])
                    ->map(fn($b) => [
                        'key'  => $b['key'],
                        'name' => $names[$b['key']] ?? '',
                        'cnt'  => $b['gd_count']['value'],
                    ])->toArray();
            }
        }
        
		return response()->json($data);
    }
    
    //  ES 검색결과 순서대로 상품 조회
    private function goodsByEsHits($result) {
        $ids = collect($result->asArray()['hits']['hits'])->pluck('_source.gd_id')->map(fn($v) => (int) $v);
        if ($ids->isEmpty())
            return collect();

        return Goods::with(['maker', 'goodsModelPrime', 'goodsCategoryFirst'])
            ->whereIn('gd_id', $ids)
            ->orderByRaw('FIELD(gd_id, ' . $ids->implode(',') . ')')
            ->get();
    }
}