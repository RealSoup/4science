<?php
namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Wish, Goods};
use DB;

class WishController extends Controller {
	public function index(Request $req) {
        self::find_deleted_goods_and_delete();  //  삭제된 상품 삭제
        
        if ($req->filled('type') && $req->type == 'cnt')
            $rst = auth()->user()->wish->count();
        else {
            foreach ($rst = auth()->user()->wish as $w)
                $w->goodsModel->goods->maker;
        }
        
		return response()->json($rst, 200);
    }

    public function store(Request $req) {
        foreach ($req->input() as $v) 
            $rst = Wish::firstOrCreate( ['wi_gm_id'=>$v['gm_id'], "created_id"=>auth()->user()->id] );
        if ($rst)   return response()->json($rst, 200);
        else        return response()->json("장바구니 에러", 400);// return alertRedirect("모델을 선택하세요", '');
    }

    public function destroy(Request $req) {
        foreach ($req->wi_id as $id)
            Wish::destroy($id);
        return response()->json('success', 200);
    }

    public function find_deleted_goods_and_delete() {
        //  삭제된 상품 체크 & 삭제
        $del_with_gd = DB::table('shop_wish')
        ->join('shop_goods_model', 'shop_wish.wi_gm_id', '=', 'shop_goods_model.gm_id')
        ->join('shop_goods', 'shop_goods_model.gm_gd_id', '=', 'shop_goods.gd_id')
        ->where('shop_wish.created_id', auth()->user()->id)
        ->whereNotNull('shop_goods.deleted_at')
        ->delete();        
    }
}