<?php
namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ShowWindow;
use App\Models\Shop\{Goods, Category};

class ListingController extends Controller {   
    protected $goods;
	public function __construct( Goods $gd ) { $this->goods = $gd; }

	public function index(Request $req, Category $ca, $type, $group=null) {
        $arr_sw = ShowWindow::select('sw_group', 'sw_key')->Type($type)->get();
        $group_filter = $group?$arr_sw->where('sw_group', $group):$arr_sw;
        $gd_ids = $group_filter->pluck('sw_key');
        $rst['data'] = $this->goods->SchGd_id($gd_ids)->select("shop_goods.gd_id", "shop_goods.gd_name")
                            ->selectRaw('gm_price * ? as gm_price_add_vat', [1.1])
                            ->join('shop_goods_model', function ($join) { $join->on('shop_goods.gd_id', '=', 'shop_goods_model.gm_gd_id')->where('gm_prime', '=', 'Y'); })
                            ->orderBy('gd_rank')->orderBy('gd_view_cnt')->paginate();
        $rst['data']->appends($req->all())->links();
        foreach ($arr_sw->groupBy('sw_group') as $k => $v) $rst['cate'][$k] = $ca->getName($k);
        return response()->json($rst, 200);
    }

    public function sale(Request $req) {
        $rst = $this->goods->select("shop_goods.gd_id", "shop_goods.gd_name", "shop_goods.gd_dc", "shop_goods.gd_enable")
            ->with('goodsModelPrime')
            ->where("shop_goods.gd_dc", "<>", 0)
            ->where("shop_goods.gd_enable", "Y")
            ->orderBy('gd_dc', 'desc')
            ->paginate(50);
        foreach ($rst as $v) {
            $v->goodsModelPrime = $this->goods->goods_discount_checker ($v->goodsModelPrime, $v->gd_dc);
        }
        $rst->appends($req->all())->links();
        return response()->json($rst, 200);
    }
}
