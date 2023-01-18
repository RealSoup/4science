<?php
namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Goods, Category, GoodsCategory, Hash};
use Illuminate\Support\Facades\DB;

class GoodsController extends Controller {
    protected $goods;

	public function __construct( Goods $gd ) { $this->goods = $gd; }
    
    public function index(Request $req) {
        $data['categorys'] = Category::getSelectedCate( $req->filled('ca01') ? $req->ca01 : 0, 
                                                        $req->filled('ca02') ? $req->ca02 : 0, 
                                                        $req->filled('ca03') ? $req->ca03 : 0 );

        $gd = $this->goods->select(
                                "shop_goods.gd_id", "shop_goods.gd_name", "shop_goods.gd_mk_id", "shop_makers.mk_name",
                                "shop_goods_category.gc_ca01", "shop_goods_category.gc_ca01_name", "shop_goods_category.gc_ca02", "shop_goods_category.gc_ca02_name",
                                "shop_goods_category.gc_ca03", "shop_goods_category.gc_ca03_name", "shop_goods_category.gc_ca04", "shop_goods_category.gc_ca04_name",
                                "shop_goods_model.gm_code", "shop_goods_model.gm_spec", "shop_goods_model.gm_unit")
                            ->selectRaw('gm_price * ? as gm_price_add_vat', [1.1])
                            ->leftJoin('shop_goods_category', function ($join) { $join->on('shop_goods.gd_id', '=', 'shop_goods_category.gc_gd_id')->where('gc_prime', '=', 'Y'); })
                            ->join('shop_goods_model', function ($join) { $join->on('shop_goods.gd_id', '=', 'shop_goods_model.gm_gd_id')->where('gm_prime', '=', 'Y'); })
                            ->join('shop_makers', function ($join) { $join->on('shop_goods.gd_mk_id', '=', 'shop_makers.mk_id'); });

        if ($req->filled('keyword')){
            $gd_name = $gm_name = $gm_code = $cat_no = $hash = $maker = null;
            $ftWord = (preg_match("/[-+*.]/", $req->keyword)) ? '"'.$req->keyword.'"' : $req->keyword;
            if ( !$req->filled('mode') || $req->mode == 'gd_name' ) $gd_name = $ftWord;
            if ( !$req->filled('mode') || $req->mode == 'gm_name' ) $gm_name = $ftWord;
            if ( !$req->filled('mode') || $req->mode == 'gm_code' ) $gm_code = $req->keyword;
            if ( !$req->filled('mode') || $req->mode == 'maker' )   $maker = $req->keyword;
            if ( !$req->filled('mode') ) $hash = $req->keyword;
            $isNum=true;
            if ( !$req->filled('mode') || $req->mode == 'cat_no'  ) {
                $cat_no  = $req->keyword;
                $cat_no = explode('-', $cat_no);
                foreach ($cat_no as $k=>$vv) {
                    $cat_no[$k] = @intval($vv);
                    if ( preg_match("/[^0-9]/i", $vv) ) {
                        $isNum = false; 
                        break;
                    }
                }
            }

            $gd->when($gd_name, fn ($q, $v) => $q->whereIn('gd_id', function($q) use($v) { $q->select('gd_id')->from('shop_goods')->whereFullText('gd_name', $v)->where('gd_enable', 'Y'); }, 'or'))
                ->when($gm_name, fn ($q, $v) => $q->whereIn('gd_id', function($q) use($v) { $q->select('gm_gd_id')->from('shop_goods_model')->whereFullText('gm_name', $v)->where('gm_enable', 'Y'); }, 'or'))
                ->when($gm_code, fn ($q, $v) => $q->whereIn('gd_id', function($q) use($v) { $q->select('gm_gd_id')->from('shop_goods_model')->where('gm_code', $v)->where('gm_enable', 'Y'); }, 'or'))
                ->when($cat_no, function ($q, $v) use($isNum) {
                    if (!$isNum) return;
                    else         return $q->whereIn('gd_id', function($q) use($v) {
                        if (count($v)==2)       $q->select('gm_gd_id')->from('shop_goods_model')->where('gm_catno01', "{$v[0]}")->where('gm_catno02', "{$v[1]}")->where('gm_enable', 'Y');
                        else if (count($v)==3)  $q->select('gm_gd_id')->from('shop_goods_model')->where('gm_catno01', "{$v[0]}")->where('gm_catno02', "{$v[1]}")->where('gm_catno03', "{$v[2]}")->where('gm_enable', 'Y'); 
                    }, 'or');
                })->when($hash, function ($q, $v) {
                    $h = Hash::HsTag($v)->first();
                    if ( !$h )  return;
                    else        return $q->whereIn('gd_id', function($q) use($h) {
                        $q->select('gd_id')->from('shop_hash_join')->where('hs_id', $h->hs_id);
                    }, 'or');
                })->when($maker, fn ($q, $v) => $q->where("mk_name", $v));
        }
        $gd->when($req->ca01,     fn ($q, $v) => $q->Ca01($v))
            ->when($req->ca02,     fn ($q, $v) => $q->Ca02($v))
            ->when($req->ca03,     fn ($q, $v) => $q->Ca03($v))
            ->when($req->ca04,     fn ($q, $v) => $q->Ca04($v))
            ->when($req->gd_mk_id, fn ($q, $v) => $q->maker($v));

        // 정렬 설정 Strart
        $gd = $gd->orderBy('gd_rank')->orderBy('gd_view_cnt');
        switch ($req->sort) {
            case 'hot':     $gd = $gd->orderBy('gd_view_cnt'); break;
            case 'new':     $gd = $gd->latest('gd_id');        break;
            case 'lowPri':  $gd = $gd->oldest('gm_price');     break;
            case 'highPri': $gd = $gd->latest('gm_price');     break;
        }
        // 정렬 설정 End
        
        // echo_query($gd);
        if ($req->filled('limit'))  //  메인 베스트
            $data['list'] = $gd->limit($req->limit)->get(); 
        else {
            $data['list'] = $gd->paginate();
            $data['list']->appends($req->all())->links();

                       
            $data['pick'][0] = $data['list']->take(6);
            if (count($data['list']) > 6)
                $data['pick'][1] = $data['list']->skip(6)->take(6);
            
        }

        if ( $req->filled('keyword') && $data['list']->total()>0 ) {
            //  검색시 카테고리 상세 검색을 위한
            //  검생 상품이 속한 카테고리 배열정보
            // $grouped = collect($data['list']->items())->groupBy('gc_ca01');
            $grouped = $gd->get();
            $data['sch_cate_info']['all'] = count($grouped);

            $grouped = $grouped->groupBy('gc_ca01');
       
            foreach ($grouped as $v) {
                $tmp['key'] = $v[0]->gc_ca01;
                $tmp['name'] = $v[0]->gc_ca01_name;
                $tmp['cnt'] = count($v);
                $data['sch_cate_info']['ca01'][] = $tmp;
            }
            if ($req->filled('ca01')) {
                $grouped = $grouped[$req->ca01]->groupBy('gc_ca02');
                foreach ($grouped as $v) {
                    $tmp['key'] = $v[0]->gc_ca02;
                    $tmp['name'] = $v[0]->gc_ca02_name;
                    $tmp['cnt'] = count($v);
                    $data['sch_cate_info']['ca02'][] = $tmp;
                }
            }

            if ($req->filled('ca02')) {
                $grouped = $grouped[$req->ca02]->groupBy('gc_ca03');
                foreach ($grouped as $v) {
                    $tmp['key'] = $v[0]->gc_ca03;
                    $tmp['name'] = $v[0]->gc_ca03_name;
                    $tmp['cnt'] = count($v);
                    $data['sch_cate_info']['ca03'][] = $tmp;
                }
            }

            if ($req->filled('ca03')) {
                $grouped = $grouped[$req->ca03]->groupBy('gd_mk_id');
                foreach ($grouped as $v) {
                    $tmp['key'] = $v[0]->gd_mk_id;
                    $tmp['name'] = $v[0]->mk_name;
                    $tmp['cnt'] = count($v);
                    $data['sch_cate_info']['maker'][] = $tmp;
                }
            }
        }
		return response()->json($data);
    }

    public function show(Category $cate, Request $req, $gd_id) {
        $data['goods'] = $this->goods->with('maker')->with('purchaseAt')->with('fileGoodsAdd')->with('option')->with('goodsCategoryFirst')
            ->with(['goodsModel' => function ($query) { $query->where('gm_enable', 'Y'); } ])
            ->find($gd_id);
        
        //  모델의 appends에 초기 값을 세팅 할수 있지만
        //  데이터를 가공하고 나면 
        //  나중에 appends 초기 세팅값이 들어가서
        //  가공한게 날아간다.
        foreach ($data['goods']->goodsModel as $val) {
            $val->ea = 0;
            $val->bundleDc;
        }
        
        foreach ($data['goods']->option as $op) {
            foreach ($op->optionChild as $opc)
                $opc->ea = 0;
        }


        event(new \App\Events\GoodsView($data['goods']));  //  조회수 증가
        // $data['categorys'] = collect();
        // $data['categorys'][0] = $cate->getCate(0);
        // if ($data['goods']->goodsCategoryFirst->gc_ca01)    $data['categorys'][1] = $cate->getCate($data['goods']->goodsCategoryFirst->gc_ca01);
        // if ($data['goods']->goodsCategoryFirst->gc_ca02)    $data['categorys'][2] = $cate->getCate($data['goods']->goodsCategoryFirst->gc_ca02);
        // if ($data['goods']->goodsCategoryFirst->gc_ca03)    $data['categorys'][3] = $cate->getCate($data['goods']->goodsCategoryFirst->gc_ca03);
        
        return response()->json($data);
    }

    public function recentGoods(Request $req) {
        // DB::enableQueryLog();
        $data = null;
        if ($req->filled('gd_id')) {
            $data = $this->goods->whereIn('gd_id', explode(',', $req->gd_id))->orderByRaw('FIELD(gd_id, '.$req->gd_id.')')->get();
        }
        // dd(DB::getQueryLog());
        // dd($data->toArray());
        return response()->json($data);
    }
}
