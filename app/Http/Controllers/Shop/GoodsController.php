<?php
namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Goods, Category, GoodsCategory, Order};
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Lib\SphinxClient;
use App\Traits\Crawling;
use Illuminate\Support\Facades\Log;

class GoodsController extends Controller {
    use Crawling;    //  trait

    protected $goods;

	public function __construct( Goods $gd ) { $this->goods = $gd; }
    
    public function index (Request $req) {
        abort_if((!$req->filled('ca01') && !$req->filled('keyword')), 501, '검색값이 없습니다.');
        abort_if((
            ($req->filled('ca01') && Category::where('ca_id', $req->ca01)->doesntExist()) ||
            ($req->filled('ca02') && Category::where('ca_id', $req->ca02)->doesntExist()) ||
            ($req->filled('ca03') && Category::where('ca_id', $req->ca03)->doesntExist()) ||
            ($req->filled('ca04') && Category::where('ca_id', $req->ca04)->doesntExist()) 
        ), 501, '존재 하지 않는 카테고리 입니다.');

        $data['categorys'] = Category::getSelectedCate( $req->filled('ca01') ? $req->ca01 : 0, 
                                                        $req->filled('ca02') ? $req->ca02 : 0, 
                                                        $req->filled('ca03') ? $req->ca03 : 0 );

        /*
            스핑크스(Sphinx) 검색 엔진은 기본적으로 limit 20이 설정되어있고 뺄수 없다
            페이지를 위해 검색된 count 재설정
        */
        
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
            $referer = $_SERVER['HTTP_REFERER'] ?? null;
            Log::info('🔍 $_SERVER[HTTP_REFERER]: ' . $referer);
            
            if (if_not_my_ip($req->ip()))
                event(new \App\Events\GoodsSearch($req->keyword, auth()->check() ? auth()->user()->id : 0, $req->ip()));  //  검색어 데이터화
            
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
		return response()->json($data);
    }

    public function show(Category $cate, Request $req, $gd_id) {
        abort_if($this->goods::where('gd_id', $gd_id)->Enable()->doesntExist(), 501, '존재 하지 않는 상품입니다.');

        $data['goods'] = $this->goods->with('maker')->with('purchaseAt')->with('fileGoodsAdd')->with('goodsOption')->with('goodsCategoryFirst')
            ->with('goodsModelPrime')
            ->with('goodsRelate')
            ->Enable()
            ->find($gd_id);
        //  모델의 appends에 초기 값을 세팅 할수 있지만
        //  데이터를 가공하고 나면 
        //  나중에 appends 초기 세팅값이 들어가서
        //  가공한게 날아간다.

        $bought_gm = [];
        if (auth()->check()) {
            $order = Order::with('orderModel')->SchWriter(auth()->user()->id)->OdAccept()->oldest()->get();
            foreach ($order as $od)
                foreach ($od->orderModel as $odm) 
                    if (intval($odm->odm_gd_id) == intval($gd_id)) {
                        if ( array_key_exists($odm->odm_gm_id, $bought_gm) )    $bought_gm[$odm->odm_gm_id]['cnt']++;
                        else                                                    $bought_gm[$odm->odm_gm_id]['cnt'] = 1;
                        $bought_gm[$odm->odm_gm_id]['date'] = date('y년 n월 j일', strtotime($od->created_at));
                    }
        }

        foreach ($data['goods']->goodsModelEnable as $val) {

            $val->ea = 0;
            $val->bundleDc;

            if( auth()->check() )   //  이전 구매이력 표시
                foreach ($bought_gm as $k => $v)
                    if ( intval($val->gm_id) == $k )
                        $val->bought_gm = $v;

            $val = $this->goods->goods_discount_checker ($val, $data['goods']->gd_dc);

            // if( auth()->check() && auth()->user()->level == 12 ) {
            //     $val->dc_type = "dealer";
            //     $val->gm_price_dc = $val->gm_price*auth()->user()->dc_mul;
            //     $val->gm_price_dc_add_vat = rrp($val->gm_price_dc);
            // } else if ($data['goods']->gd_dc) {
            //     $val->dc_type = "goods_dc";
            //     $val->gm_price_dc = $data['goods']->cal_dc($val->gm_price, $data['goods']->gd_dc);
            //     $val->gm_price_dc_add_vat = rrp($val->gm_price_dc);
            // }
        }

        foreach ($data['goods']->goodsOption as $go) {
            foreach ($go->goodsOptionChild as $goc)
                $goc->ea = 0;
        }

        foreach ($data['goods']->goodsRelate as $v)
            $v->goods;

        $ca01 = $data['goods']->goodsCategoryFirst->gc_ca01 ? $data['goods']->goodsCategoryFirst->gc_ca01 : 0;
        $ca02 = $data['goods']->goodsCategoryFirst->gc_ca02 ? $data['goods']->goodsCategoryFirst->gc_ca02 : 0;
        $ca03 = $data['goods']->goodsCategoryFirst->gc_ca03 ? $data['goods']->goodsCategoryFirst->gc_ca03 : 0;
        $data['categorys'] = Category::getSelectedCate( $ca01, $ca02, $ca03);
        $data['goods']['gd_mng_info'] = $data['goods']['gd_mng_info'] != '' ? $data['goods']['gd_mng_info'] : Category::$mngTel;
        /* if ( $data['goods']->goodsCategoryFirst->gc_ca01 =='0040' ) {
			if (isset($data['goods']->gd_desc)) {
				$improve_description = "";
				$tempArray = explode("<br />", $data['goods']->gd_desc);
				foreach ( $tempArray as $key => $value) {
					$tempArray02 = explode(" : ", $value);
					foreach ( $tempArray02 as $key02 => $value02) {
						if ( $key02 == 0 )      $improve_description .= "<span class='desc_title'>".$value02."</span>";
						else if ( $key02 == 1 ) $improve_description .= "<span class='desc_content'>".$value02."</span><br />";
					}
				}
				$improve_description .= "<span class='desc_title'>MSDS</span>";
				$improve_description .= "<span class='desc_content'><a href='https://www.sigmaaldrich.com/KR/ko/search' target='_blank'>MSDS(물질안전보건자료) 바로가기</a></span>";
				$data['goods']->gd_desc = $improve_description;
			}
		} */

        //  Thermo 상세 설명을 웹에서 크롤링 하기 위한 설정
        if (isset($data['goods']->gd_desc)) {
            $pattern = '/<a\b(?=[^>]*\bhref="([^"]+)")(?=[^>]*\bclass="[^"]*\bexternal_description_link\b[^"]*")[^>]*>External Description Link<\/a>/i';
            preg_match_all($pattern, $data['goods']->gd_desc, $matches);
            foreach ($matches[1] as $url)
                if (filter_var($url, FILTER_VALIDATE_URL))
                    $data['gd_desc_thermo'] = $url;
        }
        

        event(new \App\Events\GoodsView($gd_id));  //  조회수 증가, 최근 본 상품 등록
        return response()->json($data);
    }

    public function recentGoods(Request $req) {
        // DB::enableQueryLog();
        $data = null;
        $gd_id_str = \Cookie::get('RecentGoods');
        if ($gd_id_str)
            $data = $this->goods->whereIn('gd_id', explode(',', $gd_id_str))->orderByRaw('FIELD(gd_id, '.$gd_id_str.')')->get();
        return response()->json($data);
    }

    public function getDef(Request $req) {
        //  상품 기본 값 반환 ex) 배송비, 배송비 할인 최대금액
        return response()->json($this->goods);
    }

    public function getThermo_desc (Request $req) {
        return $this->crawl($req->url);
    }
}
