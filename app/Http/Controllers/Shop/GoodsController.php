<?php
namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Goods, Category, GoodsCategory, GoodsSearch};
use Illuminate\Support\Facades\DB;

class GoodsController extends Controller {
    protected $goods;

	public function __construct( Goods $gd ) { $this->goods = $gd; }
    
    public function index(Request $req) {
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
if(false){
        $gs = GoodsSearch::FROM( 'shop_goods_search AS gs' )
            ->SELECT("gs.gd_name", "gs.gm_name", "gs.gm_code", "gs.mk_name", "gs.gm_catno",
                "gc_ca01", "gc_ca01_name", "gc_ca02", "gc_ca02_name", "gc_ca03", "gc_ca03_name", "gc_ca04", "gc_ca04_name",
                "gs.gd_rank", 'gs.gd_id'
            )->where('gs.gd_enable', 'Y')
            ->groupBy('gs.gd_id');
            // ->join('shop_goods AS gd', 'gd.gd_id', '=', 'gs.gd_id')
            // ->whereExists(function ($q) { $q->from('shop_goods_model')->whereColumn('gs.gd_id', 'gm_gd_id')->where('gm_prime', 'Y'); })
            // ->whereNull('gd.deleted_at');

        if ($req->filled('keyword')) {
            if ($req->filled('keyword_extra')) {
                $ftWord = "+{$req->keyword}* +{$req->keyword_extra}*";
            } else {
                if (preg_match("/[-+*.]/", $req->keyword)) 	$ftWord = "\"{$req->keyword}*\"";
                else 									    $ftWord = $req->keyword.'*';
            }

            if ( !$req->filled('mode') ) {
                $gs->selectRaw("MATCH (la_gs.gd_name) AGAINST ('{$ftWord}' IN BOOLEAN MODE) as score01, MATCH (la_gs.gm_name) AGAINST ('{$ftWord}' IN BOOLEAN MODE) as score02, 
                                MATCH (la_gs.gm_code) AGAINST ('{$ftWord}' IN BOOLEAN MODE) as score03, MATCH (la_gs.mk_name) AGAINST ('{$ftWord}' IN BOOLEAN MODE) as score04, 
                                MATCH (la_gs.gm_catno) AGAINST ('{$ftWord}' IN BOOLEAN MODE) as score05, MATCH (la_gs.gd_keyword) AGAINST ('{$ftWord}' IN BOOLEAN MODE) as score06 ")
                ->whereRaw("MATCH (la_gs.gd_name, la_gs.gm_name, la_gs.gm_code, la_gs.mk_name, la_gs.gm_catno, la_gs.gd_keyword) AGAINST ('{$ftWord}' IN BOOLEAN MODE)");
            } else {
                if ( $req->mode == 'gd_name' ) $gs->selectRaw(" MATCH (la_gs.gd_name) AGAINST ('{$ftWord}' IN BOOLEAN MODE) as score ")->whereFullText('gs.gd_name', $ftWord, ['mode' => 'boolean']);
                if ( $req->mode == 'gm_name' ) $gs->selectRaw(" MATCH (la_gs.gm_name) AGAINST ('{$ftWord}' IN BOOLEAN MODE) as score ")->whereFullText('gs.gm_name', $ftWord, ['mode' => 'boolean']);
                if ( $req->mode == 'gm_code' ) $gs->selectRaw(" MATCH (la_gs.gm_code) AGAINST ('{$ftWord}' IN BOOLEAN MODE) as score ")->whereFullText('gs.gm_code', $ftWord, ['mode' => 'boolean']);
                if ( $req->mode == 'cat_no' )  $gs->selectRaw(" MATCH (la_gs.gm_catno) AGAINST ('{$ftWord}' IN BOOLEAN MODE) as score ")->whereFullText('gs.gm_catno', $ftWord, ['mode' => 'boolean']);
                if ( $req->mode == 'maker' )   $gs->selectRaw(" MATCH (la_gs.mk_name) AGAINST ('{$ftWord}' IN BOOLEAN MODE) as score ")->whereFullText('gs.mk_name', $ftWord, ['mode' => 'boolean']);
            }

            // $grouped = $gs->get();
            // if ( $gs->count() ) {
                
               
                //  검색시 카테고리 상세 검색을 위한
                //  검생 상품이 속한 카테고리 배열정보
                
                //  검색어 없이 카테고리만 선택시 상품수가 많을수록 group by 속도가 너무 느리다
                //  그래서 검색어가 있을때만 group by 하고
                //  없으면 gm_prime = Y 로 gd_id가 겹치지 않게 한다.
                $prev = clone $gs;
                $grouped = DB::table( $prev, 'sub' )
                    ->select('sub.gc_ca01', 'sub.gc_ca01_name', DB::raw('COUNT(la_sub.gc_ca01) as sum_ca'))
                    ->groupBy('sub.gc_ca01')
                    ->get();
                
                $data['sch_cate_info']['all'] = $grouped->sum('sum_ca');
                
                foreach ($grouped as $v) {
                    $tmp['key'] = $v->gc_ca01;
                    $tmp['name'] = $v->gc_ca01_name;
                    $tmp['cnt'] = $v->sum_ca;
                    $data['sch_cate_info']['ca01'][] = $tmp;
                }
                if ($req->filled('ca01')) {
                    $grouped = DB::table( $prev->where('gc_ca01', $req->ca01), 'sub' )
                    ->select('sub.gc_ca02', 'sub.gc_ca02_name', DB::raw('COUNT(la_sub.gc_ca02) as sum_ca'))
                    ->groupBy('sub.gc_ca02')
                    ->get();

                    foreach ($grouped as $v) {
                        $tmp['key'] = $v->gc_ca02;
                        $tmp['name'] = $v->gc_ca02_name;
                        $tmp['cnt'] = $v->sum_ca;
                        $data['sch_cate_info']['ca02'][] = $tmp;
                    }
                }

                if ($req->filled('ca02')) {
                    $grouped = DB::table( $prev->where('gc_ca02', $req->ca02), 'sub' )
                    ->select('sub.gc_ca03', 'sub.gc_ca03_name', DB::raw('COUNT(la_sub.gc_ca03) as sum_ca'))
                    ->groupBy('sub.gc_ca03')
                    ->get();
                    foreach ($grouped as $v) {
                        $tmp['key'] = $v->gc_ca03;
                        $tmp['name'] = $v->gc_ca03_name;
                        $tmp['cnt'] = $v->sum_ca;
                        $data['sch_cate_info']['ca03'][] = $tmp;
                    }
                }

                if ($req->filled('ca03')) {
                    $gs->addSelect('gd.gd_mk_id')->join('shop_goods AS gd', 'gd.gd_id', '=', 'gs.gd_id');
                    $grouped = DB::table( $prev->addSelect('gd.gd_mk_id')->join('shop_goods AS gd', 'gd.gd_id', '=', 'gs.gd_id')->where('gc_ca03', $req->ca03), 'sub' )
                    ->select('sub.gd_mk_id', 'sub.mk_name', DB::raw('COUNT(la_sub.gd_mk_id) as sum_ca'))
                    ->groupBy('sub.gd_mk_id')
                    ->get();
                    foreach ($grouped as $v) {
                        $tmp['key'] = $v->gd_mk_id;
                        $tmp['name'] = $v->mk_name;
                        $tmp['cnt'] = $v->sum_ca;
                        $data['sch_cate_info']['maker'][] = $tmp;
                    }
                }
            // }
        }
        //  카테고리 where 절은 카테고리 분류한 후에 있어야
        //  결과네 카테고리 검색의 값이 바뀌지 않는다.
   
        $gs->when($req->ca01, fn ($q, $v) => $q->where('gc_ca01', $v))
            ->when($req->ca02, fn ($q, $v) => $q->where('gc_ca02', $v))
            ->when($req->ca03, fn ($q, $v) => $q->where('gc_ca03', $v))
            ->when($req->ca04, fn ($q, $v) => $q->where('gc_ca04', $v))
            ->when($req->mk_id, fn ($q, $v) => $q->where('gd_mk_id', $v));
        
        $req->sort = $req->sort ? $req->sort : 'hot';
        switch ($req->sort) {
            case 'hot':
                if ($req->filled('keyword')){
                    if ( $req->filled('mode') ) 
                        $gs->orderBy('score', 'DESC');
                    else 
                        $gs->orderBy('score01', 'DESC')->orderBy('score02', 'DESC')->orderBy('score03', 'DESC')->orderBy('score04', 'DESC')->orderBy('score05', 'DESC')->orderBy('score06', 'DESC');
                } else {
                    $gs->orderBy('gs.gd_seq');
                }
                $gs->orderBy('gd_rank')/*->orderBy('gd_view_cnt')*/; 
            break;
            case 'new':     $gs->latest('gd_id');        break;
            case 'lowPri':  $gs->join('shop_goods_model AS gm', function($q) {
                                $q->on('gm.gm_id', '=', 'gs.gm_id')->where('gm.gm_prime', 'Y');
                            })->oldest('gm_price');
            break;
            case 'highPri': $gs->join('shop_goods_model AS gm', function($q) {
                                $q->on('gm.gm_id', '=', 'gs.gm_id')->where('gm.gm_prime', 'Y');
                            })->latest('gm_price');
            break;
        }

        //  미리 위에서 명시 할수 있지만
        //  위에서 하면 카테고리 검색때문에 2번 씩 된다
        $gs->with('goods')->with('goodsModelPrime');

        // echo_query($gs);
        if ($req->filled('limit'))  //  메인 베스트
            $data['list'] = $gs->limit($req->limit)->get(); 
        else {
            $data['list'] = $gs->paginate();
            $data['list']->appends($req->all())->links();

            //  포사의 PICK
            $pick_data = clone $gs;
            $pick_data = $pick_data->where('gs.gd_seq', '<', 999999)->orderBy('gs.gd_seq')->limit(12)->get();
            if(count($pick_data)) {
                $data['pick'][0] = $pick_data->take(6);
                if (count($pick_data) > 6)
                    $data['pick'][1] = $pick_data->skip(6)->take(6);
            }
            
            
        }
} else {
    $qry = $this->goods->search($req);
    if( gettype($qry) == 'string' && $qry == 'no-catno' )
        return response()->json($qry);
    

    if ($req->filled('keyword')) { 
        // $prev = clone $gs;
        $prev = $this->goods->search($req, 'group');
        $grouped = DB::table( $prev, 'sub' )
                    ->join('shop_goods_category AS gc', 'sub.gd_id', '=', 'gc.gc_gd_id')
                    ->select('gc.gc_ca01', 'gc.gc_ca01_name', DB::raw('COUNT(la_gc.gc_ca01) as sum_ca'))
                    ->groupBy('gc.gc_ca01')
                    ->get();
        
        $data['sch_cate_info']['all'] = $grouped->sum('sum_ca');
        
        foreach ($grouped as $v) {
            $tmp['key'] = $v->gc_ca01;
            $tmp['name'] = $v->gc_ca01_name;
            $tmp['cnt'] = $v->sum_ca;
            $data['sch_cate_info']['ca01'][] = $tmp;
        }
        if ($req->filled('ca01')) {
            $grouped = DB::table( $prev, 'sub' )
                        ->join('shop_goods_category AS gc', 'sub.gd_id', '=', 'gc.gc_gd_id')
                        ->select('gc.gc_ca02', 'gc.gc_ca02_name', DB::raw('COUNT(la_gc.gc_ca02) as sum_ca'))
                        ->where('gc_ca01', $req->ca01)
                        ->groupBy('gc.gc_ca02')
                        ->get();

            foreach ($grouped as $v) {
                $tmp['key'] = $v->gc_ca02;
                $tmp['name'] = $v->gc_ca02_name;
                $tmp['cnt'] = $v->sum_ca;
                $data['sch_cate_info']['ca02'][] = $tmp;
            }
        }

        if ($req->filled('ca02')) {
            $grouped = DB::table( $prev, 'sub' )
                        ->join('shop_goods_category AS gc', 'sub.gd_id', '=', 'gc.gc_gd_id')
                        ->select('gc.gc_ca03', 'gc.gc_ca03_name', DB::raw('COUNT(la_gc.gc_ca03) as sum_ca'))
                        ->where('gc_ca02', $req->ca02)
                        ->groupBy('gc.gc_ca03')
                        ->get();
            foreach ($grouped as $v) {
                $tmp['key'] = $v->gc_ca03;
                $tmp['name'] = $v->gc_ca03_name;
                $tmp['cnt'] = $v->sum_ca;
                $data['sch_cate_info']['ca03'][] = $tmp;
            }
        }

        if ($req->filled('ca03')) {
            $grouped = DB::table( $prev, 'sub' )
                        ->join('shop_goods_category AS gc', 'sub.gd_id', '=', 'gc.gc_gd_id')
                        ->join('shop_goods AS gd', 'sub.gd_id', '=', 'gd.gd_id')
                        ->join('shop_makers AS mk', 'gd.gd_mk_id', '=', 'mk.mk_id')
                        ->select('mk.mk_id', 'mk.mk_name', DB::raw('COUNT(la_mk.mk_id) as sum_ca'))
                        ->where('gc_ca03', $req->ca03)
                        ->groupBy('mk.mk_id')
                        ->get();
            foreach ($grouped as $v) {
                $tmp['key'] = $v->mk_id;
                $tmp['name'] = $v->mk_name;
                $tmp['cnt'] = $v->sum_ca;
                $data['sch_cate_info']['maker'][] = $tmp;
            }
        }
    }

                
    $qry = $qry->with('goodsModelPrime')->with('maker');
    $req->sort = $req->sort ? $req->sort : 'hot';
    switch ($req->sort) {
        case 'hot':
            if (!$req->filled('keyword')){
                $qry->orderBy('gd_seq');
            }
            $qry->orderBy('gd_rank')/*->orderBy('gd_view_cnt')*/; 
        break;
        case 'new':     $qry->latest('gd_id');        break;
        case 'lowPri':  $qry->join('shop_goods_model AS gm', function($q) { $q->on('shop_goods.gd_id', '=', 'gm.gm_gd_id')->where('gm.gm_prime', 'Y'); })->oldest('gm_price'); break;
        case 'highPri': $qry->join('shop_goods_model AS gm', function($q) { $q->on('shop_goods.gd_id', '=', 'gm.gm_gd_id')->where('gm.gm_prime', 'Y'); })->latest('gm_price'); break;
    }

    if ($req->filled('limit'))  //  메인 베스트
        $data['list'] = $qry->limit($req->limit)->get(); 
    else {
        $data['list'] = $qry->paginate();
        $data['list']->appends($req->all())->links();

        //  포사의 PICK
        $pick_data = clone $qry;
        $pick_data = $pick_data->where('gd_seq', '<', 999999)->orderBy('gd_seq')->limit(12)->get();
        if(count($pick_data)) {
            $data['pick'][0] = $pick_data->take(6);
            if (count($pick_data) > 6)
                $data['pick'][1] = $pick_data->skip(6)->take(6);
        }
        
    }

    // foreach ($data['list'] as $v) {
    //     $v->image_src_thumb = $this->goods->getImgSrc($v->gd_id, true);
    //     $mk = DB::table('shop_makers')->where('mk_id', $v->gd_mk_id)->first();
    //     $v->mk_name = $mk->mk_name ?? NULL;
    //     $v->gm_price_add_vat = ($v->gm_price>0) ? intval($v->gm_price*1.1) : $v->gm_price;;
    // }
}
		return response()->json($data);
    }

    public function show(Category $cate, Request $req, $gd_id) {
        abort_if($this->goods::where('gd_id', $gd_id)->doesntExist(), 501, '존재 하지 않는 상품입니다.');

        event(new \App\Events\GoodsView($this->goods, $gd_id));  //  조회수 증가, 최근 본 상품 등록

        $data['goods'] = $this->goods->with('maker')->with('purchaseAt')->with('fileGoodsAdd')->with('goodsOption')->with('goodsCategoryFirst')
            ->with(['goodsModel' => function ($query) { $query->where('gm_enable', 'Y'); } ])
            ->with('goodsRelate')
            ->find($gd_id);
        //  모델의 appends에 초기 값을 세팅 할수 있지만
        //  데이터를 가공하고 나면 
        //  나중에 appends 초기 세팅값이 들어가서
        //  가공한게 날아간다.
        foreach ($data['goods']->goodsModel as $val) {
            $val->ea = 0;
            $val->bundleDc;
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
        if ( $data['goods']->goodsCategoryFirst->gc_ca01 =='0040' ) {
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
		}
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
        return response()->json($this->goods);
    }
}
