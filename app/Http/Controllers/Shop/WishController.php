<?php
namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Wish, Goods};

class WishController extends Controller {
	public function index(Request $req) {
        if ($req->filled('type') && $req->type == 'cnt')
            $rst = auth()->user()->wish->count();
        else {
            foreach ($rst = auth()->user()->wish as $w)
                $w->goodsModel->goods->maker;
        }
        
		return response()->json($rst, 200);
    }

    public function destroy(Request $req) {
        foreach ($req->wi_id as $id)
            Wish::destroy($id);
        return response()->json('success', 200);
    }
}