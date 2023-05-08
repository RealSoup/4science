<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\{User, UserMileage};
use DB;

class MileageController extends Controller {
    protected $mileage;

    public function __construct(Request $req, UserMileage $ml) {
        $this->mileage = $ml;
    }

    public function index(Request $req, $id) {
        $rst = array();
        $ml = $this->mileage->with('orderModel')->Uid($id)->latest();
        if ($req->filled('limit'))
            $rst['list'] = $ml->limit($req->limit)->get();
        else {
			$rst['list'] = $ml->paginate(10);
            $rst['list']->appends($req->all())->links();
		}
        $rst['config'] = UserMileage::$config;
        return response()->json($rst, 200);
    }

    public function update(Request $req, $id) {
        $ml =  $this->mileage->find($id);
        $config = UserMileage::$config['voucher'];
        $req_price = $config[$ml->refine_content[0]]['point'] * $ml->refine_content[1];
        $enable_price = (int) $this->enable($ml->ml_uid);
        
        if ( $req->ml_type == 'OK') {
            if ( $enable_price >= $req_price  ) {
                foreach ($this->mileage->Uid($ml->ml_uid)->Enable()->where('ml_enable_m', '>', 0)->get() as $v) {
                    $req_price -= $v->ml_enable_m;
                    $tmp = 0;
                    if ($req_price >= 0) 	$tmp = 0;
                    else 					$tmp = abs($req_price);
                    DB::table('user_mileage')->where('ml_id', $v->ml_id)->update(["ml_type" => 'SP', "ml_enable_m" => $tmp]);        
                    if ($req_price <= 0) break;
                }
            } else 
                return response()->json(["msg"=>"마일리지 부족"], 500);
        }
        
        $ml->ml_type = $req->ml_type;
        $ml->updated_id = auth()->user()->id;
        $ml->save();   

        return response()->json("success", 200);
    }

    public function enable($id) {
        return $this->mileage->enableMileage($id);
    }
}
