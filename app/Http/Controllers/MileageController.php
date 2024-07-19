<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreGiftCard;
use App\Models\{User, UserMileage};
use DB;

class MileageController extends Controller {
    protected $mileage;

    public function __construct(Request $req, UserMileage $ml) {
        $this->mileage = $ml;
    }

    public function index(Request $req) {
        $rst = array();
        $ml = $this->mileage->with('orderModel')->Uid(auth()->user()->id)->latest()->orderByDesc('ml_id');
        $rst['list'] = $ml->paginate(10);
        $rst['list']->appends($req->all())->links();
        $rst['config'] = UserMileage::$config['voucher'];
        return response()->json($rst, 200);
    }

    public function enable() { return $this->mileage->enableMileage(auth()->user()->id); }
    
    public function store(StoreGiftCard $req) {
        $p = intval(-UserMileage::$config['voucher'][$req->type]['point'] * $req->ea);
        UserMileage::insert([
            "ml_uid"     => auth()->check() ? auth()->user()->id : 0,
            "ml_tbl"     => 'voucher',
            "ml_key"     => 0,
            "ml_type"    => 'REQ',
            "ml_content" => "{$req->type}||{$req->ea}||{$req->name}||{$req->hp}",
            "ml_mileage" => $p,
            "ml_enable_m" => $p,
            'created_id' => auth()->check() ? auth()->user()->id : 0
        ]);
        return response()->json($this->enable(), 200);
    }

    // public function update(Request $req, $id) {
    //     DB::table('Mileage')->where('ml_id', $id)->update([
    //         "ml_key" => $req->filled('ml_key') ? $req->ml_key : 0,
    //         "updated_id"  => auth()->check() ? auth()->user()->id : 0
    //     ]);        
    //     return response()->json("success", 200);
    // }
}
