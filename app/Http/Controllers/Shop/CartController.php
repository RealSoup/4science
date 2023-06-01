<?php

namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Cart, Goods, GoodsModel, GoodsDiscount};
use Carbon\Carbon;
use Session;
use Illuminate\Support\Arr;
use DB;
use Cookie;

class CartController extends Controller {
    protected $ck_expires;    //  분단위 설정으로 7일
    protected $cart;
    protected $goods;

    public function __construct(Cart $ca, Goods $gd) {
        // $this->ck_expires = 60*24*((int)cache("config.server")->ck_expires);
        $this->cart = $ca;
        $this->goods = $gd;
    }

    public function index(Request $req){
// DB::enableQueryLog();
        // $params = $req->input();
        $rst = [];
        $carts = $this->cart->Created_id(auth()->user()->id)->get();

        $collect = $this->goods->getGoodsDataCollection($carts, 'cart');

        foreach ($collect['lists'] as $pa) {
            foreach ($pa as $item)
                $rst[] = $item;
        }
        // $ca_gd['lists'] = $ca_gd['lists']->collapse();
        // dump($ca_gd['lists']->toArray());
        // $params = Arr::collapse([$params, $ca_gd]);



///////////////////////////////////////////////////////////////////////////

        // $params['md_cnt'] = 0;
        // foreach ($params['lists'] as $gd_list) {    //  주문 갯수
        //     foreach ($gd_list as $gd){
        //         $params['md_cnt'] += count($gd->goodsModel);
        //     }
        // }
        // /*
        // cartModel을 gm_id를 키로하는 콜렉션 생성
        // gm_id로 검색하여 cm_id를 표시해야해서 추가
        //
        // cartOption을 opc_id를 키로하는 콜렉션 생성
        // opc_id로 검색하여 co_id를 표시해야해서 추가
        // =================================== */
        // $params['cart_model'] = collect();
        // $params['cart_option'] = collect();
        // foreach ($params['carts'] as $key => $value) {
        //     $params['cart_model']->push($value->cartModel);
        //     $params['cart_option']->push($value->cartOption);
        // }
        // $params['cart_model'] = $params['cart_model']->collapse();
        // $params['cart_option'] = $params['cart_option']->collapse();
        // foreach ($params['cart_model'] as $key => $value) {
        //     // $params['cart_model']->pull($key); //킴테크 gd_id = 1과 함께 다른 상품을 담으면 오류떠서 일단 주석처리
        //     $params['cart_model'][$value->cm_gm_id] = $value;
        // }
        // foreach ($params['cart_option'] as $key => $value) {
        //     $params['cart_option']->pull($key);
        //     $params['cart_option'][$value->co_opc_id] = $value;
        // }
        /* =================================== */
// dd($params);
        return response()->json($rst);
    }

    public function store(Request $req) {
        
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
            if ($req->filled('gm_id')) 
                $rst = $this->cart->insert([
                    'ct_gd_id'   => $req->gd_id,
                    'ct_key'     => $req->gm_id,
                    'ct_ea'      => $req->ea,
                    "created_id" => auth()->user()->id,
                    'ip'         => $req->ip()
                ]);
            else if ($req->filled('go_id')) 
                $rst = $this->cart->insert([
                    'ct_gd_id'   => $req->gd_id,
                    'ct_key'     => $req->goc_id,
                    'ct_type'    => 'OPTION',
                    'ct_ea'      => $req->ea,
                    "created_id" => auth()->user()->id,
                    'ip'         => $req->ip()
                ]);
        }
        if ($rst)   return response()->json($rst, 200);
        else        return response()->json("장바구니 에러", 400);// return alertRedirect("모델을 선택하세요", '');
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
