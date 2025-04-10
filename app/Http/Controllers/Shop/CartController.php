<?php

namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Cart, Goods};
use Carbon\Carbon;
use Session;
use Illuminate\Support\Arr;
use DB;
use Cookie;

class CartController extends Controller {
    protected $cart;
    protected $goods;

    public function __construct(Cart $ca, Goods $gd) {
        $this->cart = $ca;
        $this->goods = $gd;
    }

    public function index(Request $req){
        //  삭제된 상품 체크 & 삭제
        self::find_deleted_goods_and_delete();

        $rst = [];
        $carts = $this->cart->Created_id(auth()->user()->id)->get();
        
        //  모델없이 옵션만 있는것 체크 & 삭제
        $carts = self::find_only_option_and_delete($carts);
        // dd($carts);
        $collect = $this->goods->getGoodsDataCollection($carts, 'cart');
        if ( gettype($collect) == 'string' && strpos($collect, 'goods null') === 0 )
            return response()->json(["message"=>$collect], 200);
        
        foreach ($collect['lists'] as $pa) {
            foreach ($pa as $item)
                $rst[] = $item;
        }
        return response()->json($rst);
    }

    public function find_only_option_and_delete($carts) {
        //  모델없이 옵션만 있는것 체크 & 삭제
        foreach ($carts->filter( fn($c) => $c->ct_type == 'OPTION' ) as $k => $opt) {
            if (  !$carts->filter( fn($c) => $c->ct_type == 'MODEL' )->contains('ct_gd_id', $opt->ct_gd_id) ) {
                DB::table('shop_cart')->where('ct_id', $opt->ct_id)->delete();
                $carts->forget($k);
            }
        }
        return $carts;
    }

    public function find_deleted_goods_and_delete() {
        //  삭제된 상품 체크 & 삭제
        $del_cart_gd = DB::table('shop_cart')
        ->join('shop_goods', 'shop_cart.ct_gd_id', '=', 'shop_goods.gd_id')
        ->where('shop_cart.created_id', auth()->user()->id)
        ->whereNotNull('shop_goods.deleted_at')
        ->delete();        
    }

    public function store(Request $req) {
        // dd($req->all());
        if ($req->filled('type') && $req->type == 'add') {   //  관심상품에서 상품 추가
            foreach ($req->list as $v)
                $rst = $this->cart->insert([
                    'ct_gd_id'   => $v['gd_id'],
                    'ct_key'     => $v['gm_id'], 
                    'ct_ea'      => 1,
                    "created_id" => auth()->user()->id,
                    'ip'         => $req->ip()
                ]);
        } else {
            $my_ct = $this->cart->Created_id(auth()->user()->id)->get();
            foreach ($req->all() as $r) {
                $is_proc = false;
                foreach ($my_ct as $v) {
                    if ((   array_key_exists('gm_id', $r) && $v->ct_key == $r['gm_id']  ) ||
                        (   array_key_exists('go_id', $r) && $v->ct_key == $r['goc_id'] ) ) {
                        $is_proc = true;
                        $rst = DB::table('shop_cart')->where('ct_id', $v->ct_id)->increment('ct_ea', $r['ea']);
                        break;
                    }
                }
                if (!$is_proc) {
                    $rst = $this->cart->insert([
                        'ct_gd_id'   => $r['gd_id'],
                        'ct_key'     => array_key_exists('gm_id', $r) ? $r['gm_id'] : $r['goc_id'],
                        'ct_type'    => array_key_exists('gm_id', $r) ? 'MODEL' : 'OPTION',
                        'ct_ea'      => $r['ea'],
                        "created_id" => auth()->user()->id,
                        'ip'         => $req->ip()
                    ]);
                }
            }          
        }
        if ($rst)   return response()->json($rst, 200);
        else        return response()->json("장바구니 에러", 400);
    }

	public function update(Request $req) {
        $rst = $this->cart->updateOrCreate( ['ct_id'=>$req->ct_id], ['ct_ea'=>$req->ea] );
        if($rst) return response()->json("장바구니 수량 변경", 200);
        else return response()->json("장바구니 에러", 400);
    }

    public function destroy(Request $req, $id) {
        foreach ($req->payload as $v)
            $rst = $this->cart->where('ct_id', $v)->delete();
		if($rst) return response()->json("삭제완료", 200);
        else return response()->json(["type"=>"alert", "message"=>"삭제 오류"], 400);
    }
}