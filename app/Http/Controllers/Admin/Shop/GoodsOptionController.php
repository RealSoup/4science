<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\GoodsOption;
use Session;

class GoodsOptionController extends Controller {

	public function index(GoodsOption $go, Request $req) {
		if ($req->filled('gd_id'))
            $go = $go->Gd_id($req->gd_id)->get();
        return response()->json($go, 200);
    }

}
