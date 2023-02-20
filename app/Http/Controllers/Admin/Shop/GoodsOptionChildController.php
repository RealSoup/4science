<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\GoodsOptionChild;
use Session;

class GoodsOptionChildController extends Controller {

	public function index(GoodsOptionChild $goc, Request $req) {
		if ($req->filled('go_id'))
            $goc = $goc->Go_id($req->go_id)->get();
        return response()->json($goc, 200);
    }

}
