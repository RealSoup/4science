<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\PurchaseAt;
use DB;

class PurchaseAtController extends Controller {

    protected $purchaseAt;
	protected $params;

    public function __construct(PurchaseAt $pa, Request $req) {
        $this->purchaseAt = $pa;
    }

	public function index(Request $req) {
        return response()->json($this->purchaseAt->orderBy('pa_name')->get(), 200);
    }

    public function store(Request $req) {
        $rst = DB::table('shop_purchase_at')->insertGetId([
            'pa_type' => $req->filled('pa_type') ? $req->pa_type : 'LAND',
            'pa_name' => $req->filled('pa_name') ? $req->pa_name : '',
            'pa_price' => $req->filled('pa_price') ? $req->pa_price : 0,
        ]);
        if ($rst) return response()->json($rst, 200);
        else return response()->json("Fail", 500);
    }

	public function update(Request $req, $pa_id) {
        $rst = DB::table('shop_purchase_at')->where('pa_id', $pa_id)->update([
            'pa_type' => $req->filled('pa_type') ? $req->pa_type : 'LAND',
            'pa_name' => $req->filled('pa_name') ? $req->pa_name : '',
            'pa_price' => $req->filled('pa_price') ? $req->pa_price : 0,
        ]);

		if ($rst) return response()->json('success', 200);
        else return response()->json("Fail", 500);
    }

    public function destroy($pa_id) {
		if(PurchaseAt::destroy($pa_id)) return response()->json('success', 200);
		else return response()->json("Fail", 500);
    }
}
