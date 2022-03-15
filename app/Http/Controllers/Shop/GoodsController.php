<?php
namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Goods, Category};
use Illuminate\Support\Facades\DB;

class GoodsController extends Controller {
    protected $goods;
    protected $category;

	public function __construct( Goods $gd, Category $cate ) {
        $this->goods = $gd;
        $this->category = $cate;
    }

    public function index(Request $req) {
        $data['categorys'] = collect();
        $data['categorys'][0] = $this->category->getCate(0);
        if ($req->filled('ca01'))    $data['categorys'][1] = $this->category->getCate($req->ca01);
        if ($req->filled('ca02'))    $data['categorys'][2] = $this->category->getCate($req->ca02);
        if ($req->filled('ca03'))    $data['categorys'][3] = $this->category->getCate($req->ca03);

        $gd = $this->goods->joinGoodsCate();
        // 판매 가능 모델만 Join...
        $gd = $gd->join('shop_goods_model', function ($join) { 
            $join->on('shop_goods.gd_id', '=', 'shop_goods_model.gm_gd_id')->where('gm_enable', 'Y'); 
        });
   
        $gd = $gd->select(
                "shop_goods.*", "shop_goods_category.*", "shop_goods_model.gm_catno03",
                DB::raw('MIN(gc_id)'), DB::raw('MIN(gm_catno03)'),
                DB::raw("(SELECT mk_name FROM la_shop_makers WHERE la_shop_makers.mk_id = la_shop_goods.gd_mk_id) as mk_name")
            )
            ->selectRaw('gm_price * ? as gm_price_add_vat', [1.1])
            ->groupBy('shop_goods.gd_id');

  
        if ($req->keyword){
            switch ($req->mode) {
                case 'gd_name':     $gd = $gd->SchGd_name($req->keyword); break;
                case 'gm_name':     $gd = $gd->where('gm_name', 'like', '%'.$req->keyword.'%'); break;
                case 'gm_code':     $gd = $gd->where('gm_code', 'like', '%'.$req->keyword.'%'); break;
                case 'cat_no':      $ct = explode('-', $req->keyword);
                    if (count($ct) == 3) {
                        $gd = $gd->where('gm_catno01', $ct[0])->where('gm_catno02', $ct[1])->where('gm_catno03', $ct[2]);
                    } else if (count($ct) == 2){
                        $gd = $gd->where('gm_catno01', $ct[0])->where('gm_catno02', 'like', $ct[1].'%');
                    } else if (count($ct) == 1){
                        $gd = $gd->where( function($query) use ($ct) {
                                $query->where('gm_catno01', 'like', $ct[0].'%')
                                    ->orWhere('gm_catno02', 'like', $ct[0].'%'); 
                        });
                    }
                break;
                default:                    
                    $gd = $gd->where( function($query) use ($req) {
                        $query->SchGd_name($req->keyword)
                                ->orWhere('gm_name', 'like', '%'.$req->keyword.'%')
                                ->orWhere('gm_code', 'like', '%'.$req->keyword.'%');                        
                        $ct = explode('-', $req->keyword);
                        if (count($ct) == 3) {
                            //  숫자로만 되어있는 조합만 캣넘버
                            if( preg_match("/^[0-9]/i", $ct[0]) && preg_match("/^[0-9]/i", $ct[1]) && preg_match("/^[0-9]/i", $ct[2]) )
                                $query->orWhere('gm_catno01', $ct[0])->orWhere('gm_catno02', $ct[1])->orWhere('gm_catno03', $ct[2]);
                        } else if (count($ct) == 2){
                            if( preg_match("/^[0-9]/i", $ct[0]) && preg_match("/^[0-9]/i", $ct[1]) )
                                $query->orWhere('gm_catno01', $ct[0])->orWhere('gm_catno02', 'like', $ct[1].'%');
                        } else if (count($ct) == 1){
                            if( preg_match("/^[0-9]/i", $ct[0]) )
                                $query->orWhere('gm_catno01', $ct[0])->orWhere('gm_catno02', 'like', $ct[0].'%');
                        }
                    });
                break;
            }
        }

        if ($req->filled('keyword')) {
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

        if ($req->ca01)         $gd = $gd->Ca01($req->ca01);
        if ($req->ca02)         $gd = $gd->Ca02($req->ca02);
        if ($req->ca03)         $gd = $gd->Ca03($req->ca03);
        if ($req->ca04)         $gd = $gd->Ca04($req->ca04);
        if ($req->gd_mk_id)     $gd = $gd->maker($req->gd_mk_id);

        // 정렬 설정 Strart
        switch ($req->sort) {
            case 'hot':     $gd = $gd->orderBy('gd_view_cnt', 'DESC');  break;
            case 'new':     $gd = $gd->latest();                        break;
            case 'lowPri':  $gd = $gd->oldest('gm_price');              break;
            case 'highPri': $gd = $gd->latest('gm_price');              break;
        }
        // 정렬 설정 End

        // echo_query($gd);
        if ($req->filled('limit'))
            $data['list'] = $gd->limit($req->limit)->get();
        else {
            $data['list'] = $gd->paginate();
            $data['list']->appends($req->all())->links();
        }


        
		return response()->json($data);
    }

    public function show(Request $req, $gd_id) {
        $data['goods'] = $this->goods->find($gd_id);
        $data['goods']->maker;
        $data['goods']->purchaseAt;
        $data['goods']->fileGoodsAdd;
        // $data['goods']->goodsCategoryFirst;
        $data['goods']->load(['goodsModel' => function ($query) {
            $query->where('gm_enable', 'Y');
        }]);

        foreach ($data['goods']->goodsModel as $val)
            $val->ea = 0;
        
        foreach ($data['goods']->option as $op) {
            foreach ($op->optionChild as $opc)
                $opc->ea = 0;
        }
        event(new \App\Events\GoodsView($data['goods']));  //  조회수 증가
        $data['categorys'] = collect();
        $data['categorys'][0] = $this->category->getCate(0);
        if ($data['goods']->goodsCategoryFirst->gc_ca01)    $data['categorys'][1] = $this->category->getCate($data['goods']->goodsCategoryFirst->gc_ca01);
        if ($data['goods']->goodsCategoryFirst->gc_ca02)    $data['categorys'][2] = $this->category->getCate($data['goods']->goodsCategoryFirst->gc_ca02);
        if ($data['goods']->goodsCategoryFirst->gc_ca03)    $data['categorys'][3] = $this->category->getCate($data['goods']->goodsCategoryFirst->gc_ca03);

        
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
