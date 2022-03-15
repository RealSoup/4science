<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\OptionChild;
use Session;

class OptionChildController extends Controller {

	public function index(OptionChild $opc, Request $req) {
		if ($req->filled('op_id'))
            $opc = $opc->Op_id($req->op_id)->get();
        return response()->json($opc, 200);
    }

}
