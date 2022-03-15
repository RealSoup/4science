<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\Option;
use Session;

class OptionController extends Controller {

	public function index(Option $op, Request $req) {
		if ($req->filled('gd_id'))
            $op = $op->Gd_id($req->gd_id)->get();
        return response()->json($op, 200);
    }

}
