<?php

namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Goods, GoodsCategory, Maker};

class MakerController extends Controller {

	public function index() {
        return response()->json(Maker::all(), 200);
    }

	public function makerShop(Request $req, $mk_id) {
        $rst['mk'] = Maker::with('fileInfo')->find($mk_id);
        $rst['gd'] = Goods::where('gd_mk_id', $mk_id)->paginate(30);
        $rst['gd']->appends($req->all())->links();
        
        return response()->json($rst, 200);
    }

}
