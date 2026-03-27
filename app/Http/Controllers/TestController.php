<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\MerckImport;
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

      

        
        $keyword  = strtolower($req->keyword) ?? '';        
        if ($req->filled('keyword')) {
            if (if_not_my_ip($req->ip()))
                event(new \App\Events\GoodsSearch($req->keyword, auth()->check() ? auth()->user()->id : 0, $req->ip(), $req->filled('referer')?$req->referer:''));  //  검색어 데이터화

            $page   = $req->page ?? 1;
            $perPage = 20;
            $offset = ($page - 1) * $perPage;


            // 모드별 검색 필드 설정
            $searchQuery = [];
            if ($req->filled('mode')) {
                // 특정 필드만 검색
                $fieldMap = [
                    'gd_name' => ['match' => ['gd_name' => $keyword]],
                    'gm_name' => ['match' => ['gm_name' => $keyword]],
                    'gm_code' => ['term'  => ['gm_code'  => $keyword]],
                    'cat_no'  => [
                        'bool' => [
                            'should' => [
                                ['prefix' => ['gm_catno'     => $keyword]],
                                ['match'  => ['gm_catno_all' => $keyword]],
                            ],
                        ],
                    ],
                    'maker'   => ['match' => ['mk_name'  => $keyword]],
                ];
                $searchQuery = $fieldMap[$req->mode] ?? [];
            } else {
                // 전체 검색
                $searchQuery = [
                    'function_score' => [
                        'query' => [
                            'bool' => [
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
                                    ['wildcard'     => ['gm_code' => '*' . $keyword]],      // *a2115 → STARA2115 ✅
                                    ['wildcard'     => ['gm_code' => '*' . $keyword . '*']], // 중간 포함

                                    ['term'         => ['mk_name.keyword' => $keyword]],
                                    ['match'        => ['mk_name'         => $keyword]],
                                    ['wildcard'     => ['mk_name.keyword' => '*' . $keyword . '*']],

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
                                            'type' => 'best_fields',
                                        ],
                                    ],
                                ],
                                'minimum_should_match' => 1,
                            ],
                        ],
                        'functions' => [
                                
                            [ 'filter' => ['term' => ['gd_name.keyword' => $keyword]], 'weight' => 10000, ],            // ✅ 완전일치 (줄자)
                            [ 'filter' => ['prefix' => ['gd_name.keyword' => $keyword]], 'weight' => 5000, ],           // ✅ 키워드로 시작 (줄자10M, 줄자걸이X → 줄자루는 해당없음)
                            [ 'filter' => ['wildcard' => ['gd_name.keyword' => '*' . $keyword]], 'weight' => 5000, ],   // ✅ 키워드로 끝남 (삼성줄자)
                            [ 'filter' => ['wildcard' => ['gd_name.keyword' => '* ' . $keyword . ' *']], 'weight' => 5000, ],   // ✅ 키워드 앞뒤로 공백/경계가 있는 경우 (삼성줄자10M → "줄자" 앞뒤에 경계)
                            [ 'filter' => ['match_phrase' => ['gd_name.exact' => $keyword]], 'weight' => 8000, ],

                            [ 'filter' => ['term' => ['gm_catno' => $keyword]], 'weight' => 10000, ],   //  켓넘버 완전일치 가산점
                            [ 'filter' => ['prefix' => ['gm_catno' => $keyword]], 'weight' => 5000, ],  //  켓넘버 앞부분일치 가산점

                            [ 'filter' => ['term' => ['gm_code' => $keyword]], 'weight' => 10000, ],    //  모델명 완전일치 가산점
                            [ 'filter' => ['prefix' => ['gm_code' => $keyword]], 'weight' => 5000, ],   //  모델명 앞부분일치 가산점
                            [ 'filter' => ['wildcard' => ['gm_code' => '*' . $keyword]], 'weight' => 8000, ],
                            
                            [ 'filter' => ['term' => ['mk_name.keyword' => $keyword]], 'weight' => 10000, ],    //  제조사 완전일치 가산점
                            [ 'filter' => ['match' => ['mk_name' => $keyword]], 'weight' => 3000, ],  // research 매칭 상위
                            
                        ],
                        'score_mode' => 'sum',
                        'boost_mode' => 'sum',
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
                    'sort'  => [ '_score', ],
                    'track_total_hits' => true,
                    'explain' => true,
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
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////


        else if ( false ) {
            $req->merge(array('v_type' => "WEB"));

            $total = $this->goods->search_cnt($req);
            $page = $req->filled('page') ? $req->page : 1;
            $limit = $req->filled('limit') ? $req->limit : 15;
            $offset = ($page*$limit)-$limit;
            if($offset>intval($total)) {
                $page = ceil($total / $limit);
                $offset = ($page*$limit)-$limit;
            }       

            if ($req->filled('keyword')) {
                if (if_not_my_ip($req->ip()))
                    event(new \App\Events\GoodsSearch($req->keyword, auth()->check() ? auth()->user()->id : 0, $req->ip(), $req->filled('referer')?$req->referer:''));  //  검색어 데이터화
                
                $kw = '*'.trim($req->keyword).'*';
                if ( $req->filled('mode') ) {
                    if($req->mode == 'gd_name') $kw .= "@gd_name {$kw}";
                    if($req->mode == 'gm_name') $kw .= "@gm_name {$kw}";
                    if($req->mode == 'gm_code') $kw .= "@gm_code {$kw}";
                    if($req->mode == 'cat_no')  $kw .= "@gm_catno {$kw}";
                    if($req->mode == 'maker')   $kw .= "@mk_name {$kw}";
                }
                $cl = new SphinxClient ();
                $cl->SetServer( env('DB_HOST'), 9312 );
                $cl->SetFilter('deleted_at', array(0));             //  삭제 상품 제외
                $cl->SetFilter('gd_enable', array(crc32('Y')));     //  활성화 상품만 검색되게
                $cl->SetFilter('gd_type', array(crc32('NON')));     //  렌탈은 검색 안되게
                $cl->SetGroupBy('gc_ca01', SPH_GROUPBY_ATTR );
                $cl->SetGroupDistinct ( "gd_id" );
                $cl_rst = $cl->Query( $kw, 'sph_goods' );
                
                if ($cl_rst['total_found'] > 0) {
                    $data['sch_cate_info']['all'] = array_reduce( $cl_rst['matches'], fn($sum, $el) => $sum + $el['attrs']['@distinct'], 0);
        
                    foreach ($cl_rst['matches'] as $v) {
                        $tmp['key'] = $v['attrs']['@groupby'];
                        $tmp['name'] = $v['attrs']['gc_ca01_name'];
                        $tmp['cnt'] = $v['attrs']['@distinct'];
                        $data['sch_cate_info']['ca01'][] = $tmp;
                    }
                    
                    if ($req->filled('ca01')) {
                        $cl->SetFilter('gc_ca01', array($req->ca01));
                        $cl->SetGroupBy('gc_ca02', SPH_GROUPBY_ATTR );
                        $cl->SetGroupDistinct ( "gd_id" );
                        $cl_rst = $cl->Query( $kw, 'sph_goods' );
                        abort_if(!array_key_exists('matches', $cl_rst), 501, '존재 하지 않는 카테고리 입니다.');

                        foreach ($cl_rst['matches'] as $v) {
                            $tmp['key'] = $v['attrs']['@groupby'];
                            $tmp['name'] = $v['attrs']['gc_ca02_name'];
                            $tmp['cnt'] = $v['attrs']['@distinct'];
                            $data['sch_cate_info']['ca02'][] = $tmp;
                        }
                    }
        
                    if ($req->filled('ca02')) {
                        $cl->SetFilter('gc_ca01', array($req->ca01));
                        $cl->SetFilter('gc_ca02', array($req->ca02));
                        $cl->SetGroupBy('gc_ca03', SPH_GROUPBY_ATTR );
                        $cl->SetGroupDistinct ( "gd_id" );
                        $cl_rst = $cl->Query( $kw, 'sph_goods' );
                        abort_if(!array_key_exists('matches', $cl_rst), 501, '존재 하지 않는 카테고리 입니다.');
        
                        foreach ($cl_rst['matches'] as $v) {
                            $tmp['key'] = $v['attrs']['@groupby'];
                            $tmp['name'] = $v['attrs']['gc_ca03_name'];
                            $tmp['cnt'] = $v['attrs']['@distinct'];
                            $data['sch_cate_info']['ca03'][] = $tmp;
                        }
                    }
        
                    if ($req->filled('ca03')) {
                        $cl->SetFilter('gc_ca01', array($req->ca01));
                        $cl->SetFilter('gc_ca02', array($req->ca02));
                        $cl->SetFilter('gc_ca03', array($req->ca03));
                        $cl->SetGroupBy('gd_mk_id', SPH_GROUPBY_ATTR );
                        $cl->SetGroupDistinct ( "gd_id" );
                        $cl_rst = $cl->Query( $kw, 'sph_goods' );
                        abort_if(!array_key_exists('matches', $cl_rst), 501, '존재 하지 않는 카테고리 입니다.');
                        
                        foreach ($cl_rst['matches'] as $v) {
                            $tmp['key'] = $v['attrs']['@groupby'];
                            $tmp['name'] = $v['attrs']['mk_name'];
                            $tmp['cnt'] = $v['attrs']['@distinct'];
                            $data['sch_cate_info']['maker'][] = $tmp;
                        }
                    }
                }
            }

            $qry = $this->goods->search($req, $offset, $limit);
        
            if( gettype($qry) == 'string' && $qry == 'no-catno' )
                return response()->json($qry);
            
            
            if ($req->filled('limit'))  //  메인 베스트
                $data['list'] = $qry->limit($req->limit)->get(); 
            else {
                // $data['list'] = $qry->paginate();
                // $data['list']->appends($req->all())->links();

                //  포사의 PICK
                $pick_data = $this->goods->search($req, 0, 12, '4s_pick')->get();
                // dd($pick_data);
                // $pick_data = $pick_data->where('gd_seq', '<', 999999)->orderBy('gd_seq')->limit(12)->get();
                if(count($pick_data)) {
                    $data['pick'][0] = $pick_data->take(6);
                    if (count($pick_data) > 6)
                        $data['pick'][1] = $pick_data->skip(6)->take(6);
                }
                
                $data_rst = $qry->get();
                $data['list'] = new LengthAwarePaginator($data_rst, $total, $limit, $page, ['path' => $req->url(), 'query' => $req->query()]);

                foreach ($data['list'] as $v) {
                    $v->goodsModelPrime = $this->goods->goods_discount_checker ($v->goodsModelPrime, $v->gd_dc);
                    // if( auth()->check() && auth()->user()->level == 12 ) {
                    //     $v->goodsModelPrime->dc_type = "dealer";
                    //     $v->goodsModelPrime->gm_price_dc = $v->goodsModelPrime->gm_price*auth()->user()->dc_mul;
                    //     $v->goodsModelPrime->gm_price_dc_add_vat = rrp($v->goodsModelPrime->gm_price_dc);
                    // } else if ($v->gd_dc) {
                    //     $v->goodsModelPrime->dc_type = "goods_dc";
                    //     $v->goodsModelPrime->gm_price_dc = $this->goods->cal_dc($v->goodsModelPrime->gm_price, $v->gd_dc);
                    //     $v->goodsModelPrime->gm_price_dc_add_vat = rrp($v->goodsModelPrime->gm_price_dc);
                    // }
                }
            }
        }
        
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