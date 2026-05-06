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
        
        $page   = $req->page ?? 1;
        $perPage = 20;
        $offset = ($page - 1) * $perPage;
        $keyword  = strtolower($req->keyword) ?? '';
        // ✅ 카테고리 필터 (keyword 유무 무관하게 항상 적용)
        $filters = array_values(array_filter([
            $req->filled('ca01') ? ['term' => ['gc_ca01' => (int)$req->ca01]] : null,
            $req->filled('ca02') ? ['term' => ['gc_ca02' => (int)$req->ca02]] : null,
            $req->filled('ca03') ? ['term' => ['gc_ca03' => (int)$req->ca03]] : null,
            $req->filled('ca04') ? ['term' => ['gc_ca04' => (int)$req->ca04]] : null,
            $req->filled('mk_id') ? ['term' => ['gd_mk_id' => (int)$req->mk_id]] : null,
        ]));
        
        // ✅ 정렬 설정
        $req->merge(['sort' => $req->sort ?? 'hot']);
        $sort = match($req->sort) {
            'new'     => [['gd_id'      => ['order' => 'desc']], '_score'],
            'lowPri'  => [['gm_price'   => ['order' => 'asc']],  '_score'],
            'highPri' => [['gm_price'   => ['order' => 'desc']], '_score'],
            default   => ['_score'],
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
                    'gd_name' => ['match' => ['gd_name' => $keyword]],
                    'gm_name' => ['match' => ['gm_name' => $keyword]],
                    'gm_code' => [
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
                $searchQuery = $fieldMap[$req->mode] ?? [];
            } else {    // 전체 검색

                $boolClause = [
                    'should' => [
                        ['term'         => ['gd_name.keyword' => ['value' => $keyword, 'boost' => 100]]],
                        ['match_phrase' => ['gd_name.exact'   => ['query' => $keyword, 'boost' => 80]]],  // ✅ 추가
                        ['match_phrase' => ['gd_name'         => ['query' => $keyword, 'boost' => 10]]],
                        ['match'        => ['gd_name.exact'   => ['query' => $keyword, 'boost' => 30]]],
                        ['match'        => ['gd_name'         => ['query' => $keyword, 'boost' => 5]]],
                        ['match'        => ['gm_name.exact'   => ['query' => $keyword, 'boost' => 20]]],
                        ['match'        => ['mk_name.exact'   => ['query' => $keyword, 'boost' => 20]]],

                        ['term'         => ['gm_catno' => $keyword]],
                        ['prefix'       => ['gm_catno' => $keyword]],

                        ['term'         => ['gm_code'  => $keyword]],
                        ['prefix'       => ['gm_code'  => $keyword]],
                        ['term'         => ['gm_code_all.keyword' => $keyword]],
                        ['prefix'       => ['gm_code_all.keyword' => $keyword]],
                        // ['wildcard'     => ['gm_code' => '*' . $keyword]],      // *a2115 → STARA2115 ✅
                        // ['wildcard'     => ['gm_code' => '*' . $keyword . '*']], // 중간 포함

                        ['term'         => ['mk_name.keyword' => $keyword]],
                        ['match'        => ['mk_name'         => $keyword]],
                        // ['wildcard'     => ['mk_name.keyword' => '*' . $keyword . '*']],

                        [
                            'multi_match' => [
                                'query'  => $keyword,
                                'fields' => [
                                    'gd_name^10',
                                    'gd_keyword^3',
                                    'mk_name^2',
                                    'gm_code',
                                    'gm_code_all',
                                    'gm_catno',
                                    'gm_catno_all',
                                    // gm_name, gm_name_all 제거 → 사양값 오매칭 방지
                                ],
                                'fuzziness'      => 'AUTO',   // 3~5글자→1오타, 6글자↑→2오타
                                'prefix_length'  => 2,        // 앞 2글자는 정확해야 함 (오검색 방지)
                                'max_expansions' => 50,
                                'boost'          => 0.5,      // 기존 정확 매칭보다 낮게
                                'type' => 'best_fields',
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
                                
                            // [ 'filter' => ['term' => ['gd_name.keyword' => $keyword]], 'weight' => 10000, ],            // ✅ 완전일치 (줄자)
                            // [ 'filter' => ['prefix' => ['gd_name.keyword' => $keyword]], 'weight' => 5000, ],           // ✅ 키워드로 시작 (줄자10M, 줄자걸이X → 줄자루는 해당없음)
                            // [ 'filter' => ['wildcard' => ['gd_name.keyword' => '*' . $keyword]], 'weight' => 5000, ],   // ✅ 키워드로 끝남 (삼성줄자)
                            // [ 'filter' => ['wildcard' => ['gd_name.keyword' => '* ' . $keyword . ' *']], 'weight' => 5000, ],   // ✅ 키워드 앞뒤로 공백/경계가 있는 경우 (삼성줄자10M → "줄자" 앞뒤에 경계)
                            // [ 'filter' => ['match_phrase' => ['gd_name.exact' => $keyword]], 'weight' => 8000, ],

                            [ 'filter' => ['term' => ['gm_catno' => $keyword]], 'weight' => 10000, ],   //  켓넘버 완전일치 가산점
                            [ 'filter' => ['prefix' => ['gm_catno' => $keyword]], 'weight' => 5000, ],  //  켓넘버 앞부분일치 가산점

                            [ 'filter' => ['term' => ['gm_code' => $keyword]], 'weight' => 10000, ],    //  모델명 완전일치 가산점
                            [ 'filter' => ['prefix' => ['gm_code' => $keyword]], 'weight' => 5000, ],   //  모델명 앞부분일치 가산점
                            [ 'filter' => ['wildcard' => ['gm_code' => '*' . $keyword]], 'weight' => 8000, ],
                            
                            [ 'filter' => ['term' => ['mk_name.keyword' => $keyword]], 'weight' => 10000, ],    //  제조사 완전일치 가산점
                            [ 'filter' => ['match' => ['mk_name' => $keyword]], 'weight' => 3000, ],  // research 매칭 상위
                            [ 'filter' => ['match' => ['gd_keyword' => $keyword]], 'weight' => 1000, ],
                            // 구매수 boost (최대 +5000, 클릭보다 가중치 높게)

                            ['filter' => ['term' => ['gm_code_all.keyword'  => $keyword]], 'weight' => 9000],
                            ['filter' => ['prefix' => ['gm_code_all.keyword' => $keyword]], 'weight' => 5000], 
                            ['filter' => ['term' => ['gm_catno_all.keyword' => $keyword]], 'weight' => 9000],
                            
                            [ 'field_value_factor' => [ 'field'    => 'purchase_score', 'factor'   => 1000, 'modifier' => 'none', 'missing'  => 0, ], ],
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


        $client = app(\Elastic\Elasticsearch\Client::class);
        $result = $client->search([
            'index' => 'shop_goods',
            'body'  => [
                'from'  => $offset,
                'size'  => $perPage,
                'query' => $searchQuery,
                'sort'  => $sort,
                'track_total_hits' => true,
                'aggs'  => $aggs,
                'explain' => true,  // 추가
            ],
        ]);

        $total = $result->asArray()['hits']['total']['value'];
        $ids   = collect($result->asArray()['hits']['hits'])->pluck('_source.gd_id');

        if ($ids->isEmpty()) {
            $data['list'] = new \Illuminate\Pagination\LengthAwarePaginator(
                [], 0, $perPage, $page,
                ['path' => $req->url(), 'query' => $req->query()]
            );
        } else {
            $items = Goods::with(['maker', 'goodsModelPrime', 'goodsCategoryFirst'])
                ->whereIn('gd_id', $ids)
                ->orderByRaw('FIELD(gd_id, ' . $ids->implode(',') . ')')
                ->get();

            $data['list'] = new \Illuminate\Pagination\LengthAwarePaginator(
                $items,
                $total,
                $perPage,
                $page,
                ['path' => $req->url(), 'query' => $req->query()]
            );
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

        $data['Elastic'] = '';

        
        
		return response()->json($data);
    }



    public function index() {
        
        
        exit;



        $gm = DB::table('shop_goods_model')->where('gm_catno01', '47')->orderBy('gm_gd_id')->orderBy('gm_catno03')->get();

        $cnt = 1;
        foreach ($gm->groupBy('gm_gd_id') as $group) {
            foreach ($group as $k => $v) {
                $cat02 = substr("00000{$cnt}", -6);
                DB::table('shop_goods_model')->where('gm_id', $v->gm_id)->update(['gm_catno' => "47-{$cat02}-{$v->gm_catno03}", 'gm_catno02'=> $cat02]);
            }
            // $rst = DB::table('nc_addr_relation')->where([
            //     ['receive_nm', '=', $v->ua_name],
            //     ['doro_zip', 'like', $v->ua_zip.'%'],
            //     ['doro_address', '=', $v->ua_addr1],
            //     ['doro_address_detail', '=', $v->ua_addr2],
            //     ['receive_hp_no', '=', $v->ua_hp],
            // ])->first();

            // if ( $rst && $rst->doro_zip )
            //     DB::table('user_addr')->where('ua_id', $v->ua_id)->update(['ua_zip'=> $rst->doro_zip]);
            $cnt++;
            // if ($cnt == 4) break;
        }
    }
    
    
    function mail_display () {
        $data['con'] = EngReform::find(416);
        $data['con']->fileInfo;
        //  배열값을 넘겨줘야 하는데 values 함수 안쓰면 Object가 넘어온다.
        $data['con']->file_info_cplt = $data['con']->fileInfo->where('fi_kind', 'cplt')->values();
        $data['con']->mng;
        $data['option'] = EngReform::$option;
        dump($data);
        return view('admin.eng_reform.response', $data);
    }

    function post($url, $fields) {
        $post_field_string = http_build_query($fields, '', '&');
        $ch = curl_init();                                         // curl 초기화
        curl_setopt($ch, CURLOPT_URL, $url);                       // url 지정하기
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);            // 요청결과를 문자열로 반환
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);              // connection timeout : 10초
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);           // 원격 서버의 인증서가 유효한지 검사 여부
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_field_string);  // POST DATA
        curl_setopt($ch, CURLOPT_POST, true);                      // POST 전송 여부
        $response = curl_exec($ch);
        curl_close ($ch);
        return $response;
    }

    function download() {
        return response()->download(public_path('img/estimate_logo.png'));
    }
}