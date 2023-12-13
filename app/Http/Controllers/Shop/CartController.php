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
        $rst = [];
        $carts = $this->cart->Created_id(auth()->user()->id)->get();





        // foreach ($req->payload as $v) {
        //     $ct = $this->cart
        //         ->Created_id(auth()->user()->id)
        //         ->whereRaw('(SELECT ct_gd_id FROM la_shop_cart WHERE ct_id = ?) = ct_gd_id', [$v])
        //         ->where('ct_id', '!=', $v)
        //         ->get();

        //     $flag = true;
        //     foreach ($ct as $v1)
        //         if ($v1->ct_type == 'MODEL') $flag = false;
        //     if ($flag)
        //         $rst = $this->cart->Created_id(auth()->user()->id)->where('ct_gd_id', $ct[0]->ct_gd_id)->delete();
        //     else
        //         $rst = $this->cart->where('ct_id', $v)->delete();
        // }     





        $collect = $this->goods->getGoodsDataCollection($carts, 'cart');
        foreach ($collect['lists'] as $pa) {
            foreach ($pa as $item)
                $rst[] = $item;
        }
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

    // public function destroy(Request $req, $id) {
    //     foreach ($req->payload as $v) {
    //         $ct = $this->cart
    //             ->Created_id(auth()->user()->id)
    //             ->whereRaw('(SELECT ct_gd_id FROM la_shop_cart WHERE ct_id = ?) = ct_gd_id', [$v])
    //             ->where('ct_id', '!=', $v)
    //             ->get();

    //         $flag = true;
    //         foreach ($ct as $v1)
    //             if ($v1->ct_type == 'MODEL') $flag = false;
    //         if ($flag)
    //             $rst = $this->cart->Created_id(auth()->user()->id)->where('ct_gd_id', $ct[0]->ct_gd_id)->delete();
    //         else
    //             $rst = $this->cart->where('ct_id', $v)->delete();
    //     }        
        
	// 	if($rst) return response()->json("삭제완료", 200);
    //     else return response()->json(["type"=>"alert", "message"=>"삭제 오류"], 400);
    // }
}
